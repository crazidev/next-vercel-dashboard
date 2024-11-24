import { ContextMenu, Flex, Spinner, Text } from "@radix-ui/themes";
import { motion } from "motion/react";
import { MessageType } from "./LiveChat"
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";
import { LuReplyAll } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";

export const ChatBubble = (
    { data, index, onDelete }:
        { data: MessageType, index?: number, onDelete?: () => void }) => {
    var fromAdmin = data.from == 'admin';
    var date = data.created_at?.toDate();
    const formattedTime = moment(date).format("HH:mm");

    return <div className={`flex ${fromAdmin ? "" : "justify-end"}`}>
        <ContextMenu.Root>
            <ContextMenu.Trigger>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.30
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}

                    className={`
                    w-fit px-2 pb-2 pt-1
                    border
                    dark:border-card-border-dark
                    border-card-border-light
                    rounded-md
                    max-w-[80%]
                    ${fromAdmin && "rounded-tl-none bg-[--gray-2]"}
                    ${!fromAdmin && "rounded-tr-none bg-[--accent-3]"}
                    `}>
                    <Text trim={'start'} className="text-left capitalize text-primary-500 text-[10px]">
                        {data.from === "user" ? 'You' : 'Admin'}
                    </Text>
                    <Flex align={'end'}>
                        <Text className="text-left text-[14px]">
                            {data.text}
                        </Text>
                        <Text trim={'both'} className="ml-3 text-right text-[10px]" color="gray">
                            {data.created_at == undefined && <Spinner size={'1'} />}
                            {formattedTime}
                        </Text>
                    </Flex>
                </motion.div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item><LuReplyAll /> Reply</ContextMenu.Item>
                <ContextMenu.Item onClick={() => {
                    navigator.clipboard.writeText(data.text ?? '');
                    toast.info("Copied");
                }}><LuCopy /> Copy</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item onClick={onDelete} color="red"><AiOutlineDelete /> Delete</ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>

    </div>
}