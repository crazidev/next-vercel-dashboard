'use client';

import { IconButton } from "@radix-ui/themes";
import { useContext } from "react";
import { MdDarkMode, MdSupportAgent } from "react-icons/md";
import { DashboardContext } from "../providers";

export function LivechatToggler() {
    var context = useContext(DashboardContext);

    return <MdSupportAgent onClick={() => {
        context.toggleLivechat!(!context.livechatOpen ?? true);
    }} size={20} />
}