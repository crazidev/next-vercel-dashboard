"use client";

import { SideBarComponent } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import { createContext, useEffect, useState } from "react";
import { calculateResponsive } from "@/lib/calculateResponsive";
import Cookies from "js-cookie";

export const DashboardContext = createContext<DashboardContextProp>({
  dark: true,
});

interface DashboardContextProp {
  dark: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  expandSidebar?: boolean;
  setTheme?: (theme: "dark" | "light") => void;
  livechatOpen?: boolean,
  toggleLivechat?:  (expand: boolean) => void,
  setExpand?: (expand: boolean) => void;
}

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<DashboardContextProp>({
    dark: false,
    isMobile: false,
    isTablet: false,
    expandSidebar: false,
    livechatOpen: false,
  });

  if (typeof window !== "undefined") {
    useEffect(() => {
      let value = calculateResponsive();
      setState((prevState) => ({
        ...prevState, // preserve previous state
        isMobile: value.isMobile,
        isTablet: value.isTablet,
        dark: value.isDark,
      }));
    
      window.addEventListener("resize", (e) => {
        let value = calculateResponsive();
        setState((prevState) => ({
          ...prevState, // preserve previous state
          isMobile: value.isMobile,
          isTablet: value.isTablet,
          dark: value.isDark,
        }));
      });
    
      if (state.isTablet) {
        setState((prevState) => ({ ...prevState, expandSidebar: false }));
      }
      if (state.isMobile && state.setExpand) {
        setState((prevState) => ({ ...prevState, expandSidebar: true }));
      }
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (event) => {
        setState((prevState) => ({
          ...prevState,
          dark: event.matches,
        }));
    
        Cookies.remove("theme");
        Cookies.set("theme", event.matches ? "dark" : "light", {
          expires: 30,
        });
      });
    }, []);  // Only run once when the component mounts
    
  }

  const setTheme = (theme: "dark" | "light") => {
    Cookies.remove('theme');
    Cookies.set("theme", theme == "dark" ? "dark" : "light", {
      expires: 30,
    });
    setState({ ...state, dark: theme == "dark" });
  };
  const setExpand = (value: boolean) => {
    setState({ ...state, expandSidebar: value });
  };

  const toggleLivechat = (value: boolean) => {
    setState({ ...state, livechatOpen: value });
  };
  

  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add(state.dark ? "dark" : "light");
  }, [state.dark]);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setTheme: (theme) => setTheme(theme),
        setExpand: (value) => setExpand(value),
        toggleLivechat: (value) => toggleLivechat(value),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
