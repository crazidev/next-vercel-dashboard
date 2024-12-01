import { createContext, ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UseThemeType {
    dark: boolean,
    theme: 'dark' | 'light',
    setTheme: (theme: "dark" | "light") => void;
}

export const ThemeContext = createContext<UseThemeType>({
    dark: false,
    theme: 'light',
    setTheme: (i) => { }
});

export const ThemeProvider = ({ children }: any) => {
    var isDarkFromCookie = false;
    if (typeof window !== 'undefined') {
    } else {
        isDarkFromCookie = Cookies.get('theme') == 'dark';
    }

    var [state, setState] = useState<UseThemeType>({
        dark: isDarkFromCookie,
        theme: isDarkFromCookie ? 'dark' : 'light',
        setTheme: (i) => { }
    });



    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", (event) => {
            setState((prevState) => ({
                ...prevState,
                dark: event.matches
            }));

            setTheme(event.matches ? "dark" : "light");
        });
    });

    function setTheme(value: 'dark' | 'light') {
        setState((prevState) => ({
            ...prevState,
            dark: value === 'dark',
            theme: value
        }));

        if(value == 'dark'){
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }

        Cookies.remove("theme");
        Cookies.set("theme", value, {
            expires: 30,
        });
    }

    return <ThemeContext.Provider value={{
        ...state,
        setTheme: setTheme
    }}>
        {children}
    </ThemeContext.Provider>
}