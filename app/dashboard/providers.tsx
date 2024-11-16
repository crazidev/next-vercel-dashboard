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
  });

  if (typeof window !== "undefined") {
    useEffect(() => {
      let value = calculateResponsive();
      setState({
        ...state,
        isMobile: value.isMobile,
        isTablet: value.isTablet,
        dark: value.isDark,
      });

      window.addEventListener("resize", (e) => {
        let value = calculateResponsive();
        setState({
          ...state,
          isMobile: value.isMobile,
          isTablet: value.isTablet,
          dark: value.isDark,
        });
      });

      if (state.isTablet) {
        setState({ ...state, expandSidebar: false });
      }
      if (state.isMobile && state.setExpand) {
        setState({ ...state, expandSidebar: true });
      }
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (event) => {
        if (event.matches) {
          setState({ ...state, dark: true });
        } else {
          setState({ ...state, dark: false });
        }

        Cookies.remove('theme');
        Cookies.set("theme", event.matches ? "dark" : "light", {
          expires: 30,
        });
      });
    }, [window]);
  }

  const setTheme = (theme: "dark" | "light") => {
    Cookies.remove('theme');
    Cookies.set("theme",  theme == "dark" ? "dark" : "light", {
      expires: 30,
    });
    setState({ ...state, dark: theme == "dark" });
  };
  const setExpand = (value: boolean) => {
    setState({ ...state, expandSidebar: value });
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
