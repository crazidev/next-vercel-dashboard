'use client';

import { IconButton } from "@radix-ui/themes";
import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { DashboardContext } from "../app/dashboard/providers";
import { ThemeContext } from "@/components/hooks/useThemeContext";

export function DarkModeToggler() {
    var context = useContext(ThemeContext);

    return <MdDarkMode onClick={() => {
        context.setTheme!(context.dark ? 'light' : 'dark');
    }} size={20} />
}