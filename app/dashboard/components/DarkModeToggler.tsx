'use client';

import { IconButton } from "@radix-ui/themes";
import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { DashboardContext } from "../providers";

export function DarkModeToggler() {
    var context = useContext(DashboardContext);

    return <MdDarkMode onClick={() => {
        context.setTheme!(context.dark ? 'light' : 'dark');
    }} size={20} />
}