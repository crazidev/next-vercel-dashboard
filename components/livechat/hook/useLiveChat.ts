// src/hooks/useLiveChat.ts
import { firestoreDb } from "@/server/extra/firebase";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  Timestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useState, useRef, useEffect, LegacyRef, RefAttributes } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import {DashboardContext} from "@context/DashboardContext";
import usePageVisibility from "@/components/hooks/usePageVisibility";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/server/extra/yup";
import logger from "@/lib/logger";

export interface MessageType {
  text?: string;
  conversation_id?: string;
  created_at?: Timestamp;
  from?: "user" | "admin";
  id: string;
  reply_to?: string;
}

interface ConversationType {
  user?: {
    last_typed: Timestamp;
    last_viewed_message?: string;
    created_at: Timestamp;
    email: string;
    name: string;
  };
  admin?: {
    last_typed: Timestamp;
  };
}

export const useLiveChat = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        message: yup.string(),
      })
    ),
  });

  const { livechatOpen, updateUnreadMsg } = useContext(DashboardContext);
  const [exist, setExist] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [canSendMsg, setCanSendMsg] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversion, setConversation] = useState<ConversationType>();
  const [isTyping, setIsTyping] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const incomingMsgSound = useRef<HTMLAudioElement | undefined>();
  const getConversationId = () => localStorage.getItem("livechat_session");
  const isPageVisible = usePageVisibility();
  const [replyTo, setReplyTo] = useState<MessageType | null>(null);

  async function createConversation(data: any) {
    if (!exist) {
      try {
        var doc = await addDoc(collection(firestoreDb, "conversations"), {
          user: {
            email: getValues("email"),
            name: getValues("name"),
            created_at: serverTimestamp(),
          },
        });
        localStorage.setItem("livechat_session", doc.id);
        getConversation();
      } catch (error) {
        console.error("Unable to create document", error);
      }
    }
  }

  async function getConversation() {
    setFetching(true);
    var conversation_id = getConversationId();
    if (typeof Audio !== "undefined") {
      incomingMsgSound.current = new Audio(
        `${process.env.NEXT_PUBLIC_APP_URL}/incoming_msg.m4a`
      );
    }

    if (conversation_id !== null) {
      const conversationRef = doc(
        firestoreDb,
        "conversations",
        conversation_id!
      );
      const conversationDoc = await getDoc(conversationRef);
      setExist(conversationDoc.exists());
      if (conversationDoc.exists()) {
        setConversation(conversationDoc.data());
        getMessages();

        // Start listening to changes on the conversation collection
        onSnapshot(conversationRef, (doc) => {
          setConversation(doc.data());
          setExist(doc.exists());
        });
      } else {
        setExist(false);
        localStorage.removeItem("livechat_session");
      }
    }

    setFetching(false);
  }

  async function recordTyping(e: any) {
    var conversation_id = getConversationId();
    if (!conversation_id) {
      console.error("No conversation ID found in localStorage.");
      return;
    }

    const docRef = doc(firestoreDb, "conversations", conversation_id!);
    if (getValues("message")!.trim().length > 0) {
      try {
        await updateDoc(docRef, {
          "user.last_typed": serverTimestamp(),
        });
      } catch (error) {
        console.error("Document does not exist, cannot record typing.");
      }
    }
  }

  async function setLastViewedMessage(id: string) {
    var conversation_id = getConversationId();
    if (conversation_id) {
      const docRef = doc(firestoreDb, "conversations", conversation_id!);
      try {
        await updateDoc(docRef, {
          "user.last_viewed_message": id,
        });
      } catch (error) {
        console.error("Document does not exist, cannot record typing.");
      }
    }
  }

  async function sendMessage() {
    const text = getValues("message")?.trim();
    setValue("message", "");

    const conversationId = getConversationId(); // Get the conversation ID from localStorage

    // Validate the conversation ID
    if (!conversationId) {
      console.error(
        "No conversation ID found in localStorage. Cannot send message."
      );
      return;
    }

    // Reference the parent conversation document
    const conversationDoc = doc(firestoreDb, "conversations", conversationId);

    // Check if the parent conversation exists
    const conversationSnapshot = await getDoc(conversationDoc);
    if (!conversationSnapshot.exists()) {
      console.error(
        `Conversation document with ID "${conversationId}" does not exist.`
      );
      return;
    }

    // Add a message to the sub collection
    const messageCollection = collection(firestoreDb, "messages");
    // if (getValues('message')!.trim().length > 0)
    setReplyTo(null);
    await addDoc(messageCollection, {
      text: text,
      created_at: serverTimestamp(),
      from: "user",
      reply_to: replyTo?.id ?? "",
      conversation_id: conversationId,
    });
  }

  function getMessages() {
    var conversation_id = getConversationId();

    const msgsRef = collection(firestoreDb, "messages");
    const q = query(
      msgsRef,
      where("conversation_id", "==", conversation_id!),
      orderBy("created_at", "asc")
    );

    logger("Fetching livechat messages");

    onSnapshot(q, (doc) => {
      if (messages.length == 0) {
        var element = document.getElementById("chatlistContainer");
        element?.scrollTo({
          top: element?.scrollHeight,
          behavior: "smooth",
        });
      }

      setMessages(
        doc.docs.map((e) => {
          var data = e.data();
          return {
            conversation_id: data.conversation_id,
            text: data.text,
            created_at: data.created_at,
            from: data.from,
            id: e.id,
            reply_to: data.reply_to,
          };
        })
      );
    });
  }

  function deleteMessage(e: MessageType) {
    deleteDoc(doc(firestoreDb, "messages", e.id));
  }

  const checkTyping = () => {
    if (conversion?.admin?.last_typed) {
      const lastTypedTime = conversion.admin.last_typed.toDate().getTime();
      const currentTime = new Date().getTime();
      setIsTyping(currentTime - lastTypedTime < 5000);
    } else {
      setIsTyping(false);
    }
  };

  function clear() {
    setFetching(false);
    setExist(false);
    setConversation(undefined);
    setMessages([]);
  }

  function playIncomingSound() {
    incomingMsgSound?.current?.pause();
    incomingMsgSound.current!.currentTime = 0;
    incomingMsgSound.current?.play();
  }

  useEffect(() => {
    if (!exist) {
      clear();
    }
  }, [exist]);

  useEffect(() => {
    if ((watch("message") ?? "").length > 0) {
      setCanSendMsg(true);
    } else {
      setCanSendMsg(false);
    }
  }, [watch("message")]);

  useEffect(() => {
    // Run the check immediately and then every second
    checkTyping();
    const interval = setInterval(checkTyping, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [conversion]);

  useEffect(() => {
    var chatContainer = document.getElementById("chatlistContainer");
    chatContainer?.scrollTo({
      top: chatContainer?.scrollHeight,
      behavior: "smooth",
    });
  }, [livechatOpen]);

  if (typeof window !== 'undefined')
    useEffect(() => {
      if (messages.length > 0) {
        var lastMsg = messages.findLast((e) => e.from === "admin");
        if (
          lastMsg != undefined &&
          conversion?.user?.last_viewed_message != lastMsg.id
        ) {
          if (livechatOpen && isPageVisible) {
            setLastViewedMessage(lastMsg.id);
          }
        }
      }

      var adminMsgs = messages.filter((e) => e.from === "admin");
      var lastViewedIndex = adminMsgs.findIndex(
        (e) => e.id == conversion?.user?.last_viewed_message
      );
      var unreadCount = adminMsgs.slice(lastViewedIndex + 1);
      updateUnreadMsg!(unreadCount.length);
    }, [messages, livechatOpen, conversion, isPageVisible]);

  useEffect(() => {
    if (messages.length > 0) {
      var lastMsg = messages.findLast((e) => e.from === "admin");
      if (
        lastMsg != undefined &&
        conversion?.user?.last_viewed_message != lastMsg.id
      ) {
        if (!livechatOpen || !isPageVisible) {
          playIncomingSound();
        }
      }
    }
  }, [messages, conversion]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    // setScrollPosition(position);
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    if (replyTo != null) {
      document.getElementById("chat_input")?.focus();
    }
  }, [replyTo]);

  return {
    messages,
    isTyping,
    isAdmin,
    conversion,
    exist,
    canSendMsg,

    createConversation,
    getConversation,
    recordTyping,
    sendMessage,
    getMessages,
    deleteMessage,
    setLastViewedMessage,
    checkTyping,
    playIncomingSound,
    setExist,
    setFetching,
    setCanSendMsg,
    handleScroll,

    // FORM
    errors,
    isSubmitting,
    setValue,
    register,
    handleSubmit,
    replyTo,
    setReplyTo,
  };
};
