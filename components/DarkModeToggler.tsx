'use client';


import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import logger from "@/lib/logger";
import { ThemeContext } from "@/components/hooks/useThemeContext";

export function DarkModeToggler() {
    var context = useContext(ThemeContext);
    logger(context);

    return <MdDarkMode onClick={() => {
        context.setTheme!(context.dark ? 'light' : 'dark');
    }} size={20} />
}