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

const useThemeContext = ({ children }: any) => {
    var [state, setState] = useState<UseThemeType>({
        dark: false,
        theme: 'light',
        setTheme: (i) => { }
    });

    // if (typeof window !== 'undefined') {
    // } else {
    //   isDarkFromCookie = Cookies.get('theme') == 'dark';
    // }

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

export default useThemeContext;
