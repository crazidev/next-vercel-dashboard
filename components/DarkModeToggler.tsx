'use client';


import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";

import { ThemeContext } from "@/components/hooks/useThemeContext";

export function DarkModeToggler() {
    var context = useContext(ThemeContext);
    console.log(context);

    return <MdDarkMode onClick={() => {
        context.setTheme!(context.dark ? 'light' : 'dark');
    }} size={20} />
}