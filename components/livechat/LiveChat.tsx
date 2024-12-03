// src/components/LiveChat.tsx
import { motion, AnimatePresence } from "motion/react";
import { Avatar, Flex, Heading, IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { MdCancel, MdClose } from "react-icons/md";
import { ChatBubble, ReplyToBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { CreateConversationBox } from "./CreateConversationBox";
import TypingIndicator from "./TypingIndicator";
import { MessageType, useLiveChat } from "./hook/useLiveChat";
import { useContext, useState } from "react";
import {DashboardContext} from "@context/DashboardContext";

export const LiveChat = () => {
    const { toggleLivechat, livechatOpen, unreadMsg, updateUnreadMsg } = useContext(DashboardContext);

    const {
        createConversation,
        getConversation,
        recordTyping,
        sendMessage,
        getMessages,
        deleteMessage,
        setLastViewedMessage,
        checkTyping,
        playIncomingSound,
        messages,
        isTyping,
        conversion,
        exist,
        setExist,
        setFetching,
        setCanSendMsg,
        canSendMsg,
        setValue,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        handleScroll,
        replyTo,
        setReplyTo,
    } = useLiveChat();

    return (
        <>
            {livechatOpen && <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0, }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className={`${livechatOpen ? '' : "hidden"} h-[100%] max-h-screen flex flex-col w-[400px] mobile:w-full fixed top-0 right-0 z-20 p-3 mobile:p-1`}>

                <form onSubmit={handleSubmit(createConversation)}
                    className="
                dark:bg-card-background-dark
                bg-card-background-light
                w-full h-full mobile:max-h-[100%] my-auto max-h-[95%] rounded-tl-xl 
                rounded-br-xl 
                backdrop-blur-sm
                flex flex-col
                dark:border-card-border-dark
                border-card-border-light
                border-2
                p-0
                transition-all
                ">
                    <div className="fixed top-0 flex-grow bg-[--gray-2] backdrop-blur-lg flex items-center justify-between pr-3 rounded-tl-xl h-[70px] px-3 z-10 w-full">
                        <Flex align={'center'} className="gap-3">
                            <Avatar fallback={"A"} radius="full" />
                            <div>
                                <Heading size={'3'}>Customer Support</Heading>
                                <Text color="gray" size={'1'}>
                                    {isTyping
                                        ? "Typing"
                                        : "Typical reply: 1 min"}
                                </Text>
                            </div>
                        </Flex>
                        <IconButton type="button" onClick={() => {
                            toggleLivechat!(false)
                        }} variant="soft" size={'3'} radius="full" color="gray">
                            <MdClose />
                        </IconButton>
                    </div>
                    <AnimatePresence initial={false}>
                        <ScrollArea id='chatlistContainer' onScroll={handleScroll} className="flex-grow pt-[60px]">
                            {/* <motion.div layout style={{ width: isOpen ? "80vw" : 0 }} /> */}
                            <motion.div layout style={{
                                justifyContent: exist ? 'flex-end' : 'center',
                                height: livechatOpen ? '100%' : '0'
                            }} className={`flex flex-col gap-3 pt-[10px] pb-[10px] px-[10px] h-full`}>
                                <CreateConversationBox errors={errors} isSubmitting={isSubmitting} register={register} conversationExist={exist} />

                                {exist &&
                                    messages.map((e, i) => {
                                        var replyToMsg = messages.find((r) => r.id  == e.reply_to);
                                        var replyToComponent = undefined;
                                        if (replyToMsg)
                                            replyToComponent = <ReplyToBubble replyTo={replyToMsg} />;
                                        
                                        return <motion.div
                                            key={e.id}>
                                            <ChatBubble replyToComponent={replyToComponent} onReply={(msg) => setReplyTo(msg)} onDelete={() => deleteMessage(e)} data={e} />
                                        </motion.div>;
                                    })
                                }
                                <TypingIndicator isTyping={isTyping} />
                            </motion.div>

                        </ScrollArea>
                    </AnimatePresence>

                    <div className="flex flex-col items-center bg-[--gray-1]">
                        {replyTo &&
                            <div className="px-2 w-[100%] flex items-start gap-4 pr-4">
                                <ReplyToBubble className={'mt-2'} replyTo={replyTo} />
                                <IconButton autoFocus={false} type="button" onClick={() => setReplyTo(null)} variant="ghost" size={'3'} className="mt-2"><MdCancel /></IconButton>
                            </div>
                        }
                        <ChatInput onChanged={recordTyping} onSubmit={sendMessage} register={register} />
                    </div>
                </form>
            </motion.div>}</>
    );
};
