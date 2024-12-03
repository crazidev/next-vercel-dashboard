'use client';

import { useContext, useState } from "react";
import { MdSupportAgent } from "react-icons/md";
import {DashboardContext} from "@context/DashboardContext";
import { AnimatePresence, motion } from "motion/react";

export function LivechatToggler() {
    const context = useContext(DashboardContext);
    const [showNeedHelp, setShowNeedHelp] = useState(true);

    return (
        <AnimatePresence>
            {!context.livechatOpen && <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 100, }}
                animate={{ opacity: 1, scale: 1, x: 0, }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{
                    scale: 0.9
                }}
                whileTap={{
                    scale: 1.1
                }}
                onClick={() => {
                    context.toggleLivechat?.(!context.livechatOpen ?? true);
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`fixed z-20 bg-[--accent-5] rounded-full rounded-br-none p-2 bottom-[35px] flex flex-row items-center gap-2 right-[20px] border border-[--gray-7]`}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1, x: 0, transition: {
                            delay: 0.5
                        }
                    }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-[14px] font-medium mobile:hidden tablet:hidden"
                >
                    Need Help?
                </motion.span>


                {/* Support Icon */}
                <div className="relative">
                    <MdSupportAgent
                       
                        className="text-[30px] cursor-pointer"
                    />
                    {context.unreadMsg > 0 && (
                        <div className="bg-red-500 min-w-[15px] flex justify-center items-center text-[10px] font-bold rounded-full absolute top-[-5px] right-[-5px]">
                            {context.unreadMsg}
                        </div>
                    )}
                </div>
            </motion.div>}
        </AnimatePresence>
    );
}
