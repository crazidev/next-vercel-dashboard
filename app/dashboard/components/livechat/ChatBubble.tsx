'use client';

import { ContextMenu, Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";
import { LuReplyAll } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";
import { MessageType } from "./hook/useLiveChat";
import { useState, useRef, useContext, useEffect } from "react";
import { DashboardContext } from "@app/dashboard/providers";
import useLayout from "@/components/hooks/useLayout";

interface ChatBubbleType { 
    data: MessageType, 
    replyToComponent: any, 
    index?: number, 
    onDelete?: () => void, 
    onReply?: (msg: MessageType) => void 
}


export const ChatBubble = (
    { data, replyToComponent, index, onDelete, onReply }: ChatBubbleType) => {
    var fromAdmin = data.from === 'admin';
    var date = data.created_at?.toDate();
    const formattedTime = moment(date).format("HH:mm");
    const context = useContext(DashboardContext);
    const { isMobile, isTablet } = useLayout();

    // For drag logic
    const [x, setX] = useState(0); // Keep track of drag position
    const isDragged = useRef(false); // To track if the bubble is being dragged

    const handleDragEnd = () => {
        if (isDragged.current) {
            setX(0);
            isDragged.current = false;
        }
    };

    const userOffset = 100;
    const adminOffset = -100;

    useEffect(() => {
        if (isDragged.current) {
            if (fromAdmin && x > userOffset) {
                onReply?.(data);
            } else if (!fromAdmin && x < adminOffset) {
                onReply?.(data);
            }
        }
    }, [x])

    return (
        <div id={data.id} className={`flex ${fromAdmin ? "" : "justify-end"} items-center relative`}>
            {(fromAdmin && x > userOffset) &&
                <motion.div
                    initial={{
                        x: -20,
                    }}
                    animate={{ x: 0 }}
                    transition={{
                        duration: 0.3
                    }}
                    exit={{
                        x: 20,
                    }}
                    className="absolute z-[-2] ml-[15px]">
                    <LuReplyAll />
                </motion.div>}

            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        // whileTap={{
                        //     scale: isDragged.current ? 1 : 1.15,
                        //     transition: {
                        //         duration: 1
                        //     }
                        // }}
                        dragMomentum={false}
                        dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                        dragSnapToOrigin
                        dragElastic={isMobile ? 0.6 : 0.7} // Increase elasticity for faster drag
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        drag="x" // Enable horizontal dragging
                        dragDirectionLock={true}
                        dragConstraints={{ left: fromAdmin ? -400 : 0, right: fromAdmin ? 0 : 400 }} // Constraint drag to right
                        style={{ x: x }} // Track the x position of the drag
                        onDrag={(event, info) => {
                            isDragged.current = true;
                            // console.log(info.offset.x)
                            setX(info.offset.x); // Update the drag position
                        }}
                        onDragEnd={handleDragEnd}
                        className={`
                            w-fit px-0 pb-2
                            border
                            select-none
                            dark:border-card-border-dark
                            border-card-border-light
                            rounded-md
                            max-w-[80%]
                            ${fromAdmin && "rounded-tl-none bg-[--gray-2]"}
                            ${!fromAdmin && "rounded-tr-none bg-[--accent-3]"}
                        `}>
                        {replyToComponent}
                        <div className="px-2">
                            <Text trim={'end'} className="text-left capitalize text-primary-500 text-[10px]">
                                {data.from === "user" ? 'You' : 'Admin'}
                            </Text>
                            <Flex align={'end'}>
                                <Text className="text-left text-[14px]">
                                    {data.text}
                                </Text>
                                <Text trim={'both'} className="ml-3 flex items-center gap-1 text-right text-[10px]" color="gray">
                                    {formattedTime}
                                    {data.created_at == undefined && <Spinner size={'1'} />}
                                </Text>
                            </Flex>
                        </div>
                    </motion.div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item onClick={() => onReply?.(data)}><LuReplyAll /> Reply</ContextMenu.Item>
                    <ContextMenu.Item onClick={() => {
                        navigator.clipboard.writeText(data.text ?? '');
                        toast.info("Copied");
                    }}><LuCopy /> Copy</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item onClick={onDelete} color="red"><AiOutlineDelete /> Delete</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
            <AnimatePresence>
                {(!fromAdmin && x < adminOffset) &&
                    <motion.div
                        initial={{
                            x: 20,
                        }}
                        animate={{ x: 0 }}
                        transition={{
                            duration: 0.3
                        }}
                        exit={{
                            x: 20,
                        }}
                        // style={{
                        //     display: x < -100 ? "block" : "none"
                        // }}
                        className="absolute z-[-2] mr-[15px]">
                        <LuReplyAll />
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
}

export function ReplyToBubble({ replyTo, className }: { replyTo: MessageType, className?: any }) {
    return <div className={`
        px-2 pb-1 pt-1
        border
        select-none
        flex flex-grow
        dark:border-card-border-dark
        border-card-border-light
        rounded-md
        border-l-4 !border-l-blue-500
        text-[12px]
        transition-all
        rounded-tl-none bg-[--gray-2] flex-col italic ${className}`}

        onClick={(e) => {
            const element = document.getElementById(replyTo.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.classList.add('animate-pulse');
                element.classList.add('bg-[var(--gray-a4)]');
                setTimeout(() => {
                    element.classList.remove('animate-pulse');
                    element.classList.remove('bg-[var(--gray-a4)]');
                }, 1000);
            }
        }}
    >
        <Text trim={'normal'} className="text-left  capitalize text-primary-500 text-[10px]">
            {replyTo.from === "user" ? 'You' : 'Admin'}
        </Text>
        <Text color="gray" className="text-left text-[12px]">
            {replyTo.text}
        </Text>
    </div>
}