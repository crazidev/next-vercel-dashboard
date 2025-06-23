import { createContext, ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UseThemeType {
  dark: boolean;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export const ThemeContext = createContext<UseThemeType>({
  dark: false,
  theme: "light",
  setTheme: (i) => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [state, setState] = useState<UseThemeType>({
    dark: false,
    theme: "light",
    setTheme: () => {},
  });

  function setTheme(value: "dark" | "light") {
    setState((prevState) => ({
      ...prevState,
      dark: value === "dark",
      theme: value,
    }));

    if (value === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }

    Cookies.set("theme", value, {
      expires: 30,
    });
  }

  function initializeTheme() {
    if (typeof window !== "undefined") {
      const cookieValue = Cookies.get("theme");
      let initialTheme =
        cookieValue ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");

      setState((prevState) => ({
        ...prevState,
        dark: initialTheme === "dark",
        theme: initialTheme as any,
      }));

      if (initialTheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (event) => {
        if (!cookieValue) {
          setTheme(event.matches ? "dark" : "light");
        }
      });

      return () => {
        mediaQuery.removeEventListener("change", () => {});
      };
    }
  }

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
