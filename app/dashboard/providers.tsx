"use client";

import { SideBarComponent } from "./components/sidebar";
import { NavBar } from "./components/my-navbar";
import { createContext, useEffect, useState } from "react";
import { calculateResponsive } from "@/lib/calculate-responsive";

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
    }, [window]);
  }

  const setTheme = (theme: "dark" | "light") => {
    setState({ ...state, dark: theme == "dark" });
  };
  const setExpand = (value: boolean) => {
    setState({ ...state, expandSidebar: value });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
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
