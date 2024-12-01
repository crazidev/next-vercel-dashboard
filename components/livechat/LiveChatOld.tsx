// 'use client';




// import { firestoreDb } from "@/server/extra/firebase";
// import yup from "@/server/extra/yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Avatar, Flex, Heading, IconButton, ScrollArea } from "@radix-ui/themes"
// import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";
// import { setDoc, doc, addDoc, collection, serverTimestamp, getDoc, onSnapshot, updateDoc, query, where, Timestamp, orderBy, deleteDoc } from "firebase/firestore";
// import { AnimatePresence, motion } from "motion/react";
// import { useContext, useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { MdAttachFile, MdClose } from "react-icons/md"

// import { ChatBubble } from "./ChatBubble";
// import { ChatInput } from "./ChatInput";
// import { CreateConversationBox } from "./CreateConversationBox";
// import TypingIndicator from "./TypingIndicator";
// import { DashboardContext } from "@app/dashboard/providers";
// import React from "react";
// import usePageVisibility from "@/components/hooks/usePageVisibility";

// export interface MessageType {
//     text?: string,
//     conversation_id?: string,
//     created_at?: Timestamp,
//     from?: 'user' | 'admin',
//     id: string
// }

// interface ConversationType {
//     user?: {
//         last_typed: Timestamp,
//         last_viewed_message?: string,
//         created_at: Timestamp,
//         email: string,
//         name: string
//     },
//     admin?: {
//         last_typed: Timestamp,
//     }
// }

// export const LiveChat = () => {
//     const {
//         register,
//         handleSubmit,
//         setError,
//         watch,
//         setValue,
//         getValues,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         resolver: yupResolver(yup.object({
//             email: yup.string().email().required(),
//             name: yup.string().required(),
//             message: yup.string(),
//         }))
//     });

//     const { toggleLivechat, livechatOpen, unreadMsg, updateUnreadMsg } = useContext(DashboardContext);
//     const [exist, setExist] = useState(false);
//     const [fetching, setFetching] = useState(false);
//     const [canSendMsg, setCanSendMsg] = useState(false);
//     const [messages, setMessages] = useState<MessageType[]>([]);
//     const [conversion, setConvesation] = useState<ConversationType>();
//     const [isTyping, setIsTyping] = useState(false);
//     const livechatRef = React.useRef();
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const incomingMsgSound = useRef<HTMLAudioElement | undefined>();
//     const getConversationId = () => localStorage.getItem('livechat_session');
//     const isPageVisible = usePageVisibility();

//     async function createConversation(data: any) {
//         if (!exist) {
//             try {
//                 var doc = await addDoc(collection(firestoreDb, "conversations"), {
//                     user: {
//                         email: getValues('email'),
//                         name: getValues('name'),
//                         created_at: serverTimestamp(),
//                     }
//                 });
//                 localStorage.setItem('livechat_session', doc.id);
//                 getConversation();
//             } catch (error) {
//                 console.error("Unable to create document", error);
//             }
//         }
//     }

//     async function getConversation() {
//         setFetching(true);
//         var conversation_id = getConversationId();
//         if (typeof Audio !== "undefined") {
//             incomingMsgSound.current = new Audio(`${process.env.NEXT_PUBLIC_APP_URL}/incoming_msg.m4a`)
//         }

//         if (conversation_id !== null) {
//             const conversationRef = doc(firestoreDb, "conversations", conversation_id!);
//             const conversationDoc = await getDoc(conversationRef);
//             setExist(conversationDoc.exists());
//             if (conversationDoc.exists()) {
//                 setConvesation(conversationDoc.data())
//                 getMessages();

//                 // Start listening to changes on the conversation collection
//                 onSnapshot(conversationRef, (doc) => {
//                     setConvesation(doc.data());
//                     setExist(doc.exists());
//                 });

//             } else {
//                 setExist(false);
//                 localStorage.removeItem('livechat_session')
//             }
//         }

//         setFetching(false);
//     }


//     async function recordTyping(e: any) {
//         var conversation_id = getConversationId();
//         if (!conversation_id) {
//             console.error("No conversation ID found in localStorage.");
//             return;
//         }

//         const docRef = doc(firestoreDb, "conversations", conversation_id!);
//         if (getValues('message')!.trim().length > 0) {
//             try {
//                 await updateDoc(docRef, {
//                     'user.last_typed': serverTimestamp(),
//                     'admin.last_typed': serverTimestamp(),
//                 });
//             } catch (error) {
//                 console.error("Document does not exist, cannot record typing.");
//             }
//         }

//     }

//     async function setLastViewedMessage(id: string) {
//         var conversation_id = getConversationId();
//         if (conversation_id) {
//             const docRef = doc(firestoreDb, "conversations", conversation_id!);
//             try {
//                 await updateDoc(docRef, {
//                     'user.last_viewed_message': id,
//                 });
//             } catch (error) {
//                 console.error("Document does not exist, cannot record typing.");
//             }
//         }
//     }

//     async function sendMessage() {
//         const text = getValues('message')?.trim();
//         setValue('message', '');

//         const conversationId = getConversationId(); // Get the conversation ID from localStorage

//         // Validate the conversation ID
//         if (!conversationId) {
//             console.error("No conversation ID found in localStorage. Cannot send message.");
//             return;
//         }

//         // Reference the parent conversation document
//         const conversationDoc = doc(firestoreDb, 'conversations', conversationId);

//         // Check if the parent conversation exists
//         const conversationSnapshot = await getDoc(conversationDoc);
//         if (!conversationSnapshot.exists()) {
//             console.error(`Conversation document with ID "${conversationId}" does not exist.`);
//             return;
//         }

//         // Add a message to the subcollection
//         const messageCollection = collection(firestoreDb, 'messages');
//         // if (getValues('message')!.trim().length > 0)
//         await addDoc(messageCollection, {
//             text: text,
//             created_at: serverTimestamp(),
//             from: 'user',
//             conversation_id: conversationId,
//         });
//     }


//     function getMessages() {
//         var conversation_id = getConversationId();

//         const msgsRef = collection(firestoreDb, 'messages');
//         const q = query(msgsRef,
//             where("conversation_id", "==", conversation_id!),
//             orderBy("created_at", "asc")
//         );

//         console.log("Fetching livechat messages");

//         onSnapshot(q, (doc) => {
//             if (messages.length == 0) {
//                 var element = document.getElementById('chatlistContainer');
//                 element?.scrollTo({
//                     top: element?.scrollHeight,
//                     behavior: 'smooth'
//                 });
//             }

//             setMessages(doc.docs.map((e) => {
//                 var data = e.data();
//                 return {
//                     conversation_id: data.conversation_id,
//                     text: data.text,
//                     created_at: data.created_at,
//                     from: data.from,
//                     id: e.id,
//                 }
//             }));
//         });
//     }

//     function deleteMessage(e: MessageType) {
//         deleteDoc(doc(firestoreDb, 'messages', e.id));
//     }

//     const checkTyping = () => {
//         if (conversion?.admin?.last_typed) {
//             const lastTypedTime = conversion.admin.last_typed.toDate().getTime();
//             const currentTime = new Date().getTime();
//             setIsTyping(currentTime - lastTypedTime < 5000);
//         } else {
//             setIsTyping(false);
//         }
//     };

//     function clear() {
//         setFetching(false);
//         setExist(false);
//         setConvesation(undefined);
//         setMessages([]);
//     }

//     function playIncomingSound() {
//         incomingMsgSound?.current?.pause();
//         incomingMsgSound.current!.currentTime = 0;
//         incomingMsgSound.current?.play();
//     }

//     useEffect(() => {
//         if (!exist) {
//             clear();
//         }
//     }, [exist])


//     useEffect(() => {
//         if ((watch('message') ?? "").length > 0) {
//             setCanSendMsg(true);
//         } else {

//             setCanSendMsg(false);
//         }
//     }, [watch('message')]);

//     useEffect(() => {
//         // Run the check immediately and then every second
//         checkTyping();
//         const interval = setInterval(checkTyping, 1000);

//         // Cleanup the interval on component unmount
//         return () => clearInterval(interval);
//     }, [conversion]);

//     useEffect(() => {
//         var chatContainer = document.getElementById('chatlistContainer');
//         chatContainer?.scrollTo({
//             top: chatContainer?.scrollHeight,
//             behavior: 'smooth'
//         });

//     }, [livechatOpen]);

//     useEffect(() => {
//         if (messages.length > 0) {
//             var lastMsg = messages.findLast((e) => e.from === 'admin');
//             if (lastMsg != undefined && conversion?.user?.last_viewed_message != lastMsg.id) {
//                 if (livechatOpen && isPageVisible) {
//                     setLastViewedMessage(lastMsg.id)
//                 }
//             }
//         }

//         var adminMsgs = messages.filter((e) => e.from === 'admin');
//         var lastViewedIndex = adminMsgs.findIndex((e) => e.id == conversion?.user?.last_viewed_message);
//         var unreadCount = adminMsgs.slice(lastViewedIndex + 1);
//         updateUnreadMsg!(unreadCount.length);
//     }, [messages, livechatOpen, conversion, isPageVisible]);

//     useEffect(() => {
//         if (messages.length > 0) {
//             var lastMsg = messages.findLast((e) => e.from === 'admin');
//             if (lastMsg != undefined && conversion?.user?.last_viewed_message != lastMsg.id) {
//                 if (!livechatOpen || !isPageVisible) {
//                     playIncomingSound();
//                 }
//             }
//         }
//     }, [messages, conversion]);



//     const handleScroll = (e: any) => {
//         const { scrollTop, scrollHeight, clientHeight } = e.target;
//         const position = Math.ceil(
//             (scrollTop / (scrollHeight - clientHeight)) * 100
//         );
//         // setScrollPosition(position);
//     };


//     useEffect(() => {
//         if (document !== undefined) {
//             document.addEventListener("visibilitychange", () => {
//                 console.log(document.visibilityState);
//                 // Modify behavior…
//             });
//         }
//         getConversation();
//     }, []);

//     return <>
//         {livechatOpen && <motion.div
//             initial={{ opacity: 0, x: 300 }}
//             animate={{ opacity: 1, x: 0, }}
//             exit={{ opacity: 0, x: 300 }}
//             transition={{ duration: 0.3 }}
//             className={`${livechatOpen ? '' : "hidden"} h-[100%] max-h-screen flex flex-col w-[400px] mobile:w-full fixed top-0 right-0 z-20 p-3 mobile:p-1`}>

//             <form onSubmit={handleSubmit(createConversation)}
//                 className="
//                 dark:bg-card-background-dark
//                 bg-card-background-light
//                 w-full h-full mobile:max-h-[100%] my-auto max-h-[95%] rounded-tl-xl 
//                 rounded-br-xl 
//                 backdrop-blur-sm
//                 flex flex-col
//                 dark:border-card-border-dark
//                 border-card-border-light
//                 border-2
//                 p-0
//                 transition-all
//                 ">
//                 <div className="fixed top-0 flex-grow bg-[--gray-2] backdrop-blur-lg flex items-center justify-between pr-3 rounded-tl-xl h-[70px] px-3 z-10 w-full">
//                     <Flex align={'center'} className="gap-3">
//                         <Avatar fallback={"A"} radius="full" />
//                         <div>
//                             <Heading size={'3'}>Customer Support</Heading>
//                             <Text color="gray" size={'1'}>
//                                 {isTyping
//                                     ? "Typing"
//                                     : "Typical reply: 1 min"}
//                             </Text>
//                         </div>
//                     </Flex>
//                     <IconButton type="button" onClick={() => {
//                         toggleLivechat!(false)
//                     }} variant="soft" size={'3'} radius="full" color="gray">
//                         <MdClose />
//                     </IconButton>
//                 </div>
//                 <AnimatePresence initial={false}>
//                     <ScrollArea id='chatlistContainer' onScroll={handleScroll} ref={livechatRef.current} className="flex-grow pt-[60px]">
//                         {/* <motion.div layout style={{ width: isOpen ? "80vw" : 0 }} /> */}
//                         <motion.div layout style={{
//                             justifyContent: exist ? 'flex-end' : 'center',
//                             height: livechatOpen ? '100%' : '0'
//                         }} className={`flex flex-col gap-3 pt-[10px] pb-[10px] px-[10px] h-full`}>
//                             <CreateConversationBox errors={errors} isSubmitting={isSubmitting} register={register} conversationExist={exist} />

//                             {exist &&
//                                 messages.map((e, i) => {
//                                     return <motion.div
//                                         key={e.id}>
//                                         <ChatBubble onDelete={() => deleteMessage(e)} data={e} />
//                                     </motion.div>;
//                                 })
//                             }
//                             <TypingIndicator isTyping={isTyping} />
//                         </motion.div>

//                     </ScrollArea>
//                 </AnimatePresence>

//                 <div className="flex items-center">
//                     <ChatInput onChanged={recordTyping} onSubmit={sendMessage} register={register} />
//                 </div>
//             </form>
//         </motion.div>}
//     </>
// }

// can u create another file or class then mode the logics to there