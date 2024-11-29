"use client";

import { SideBarComponent } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import { createContext, useEffect, useState } from "react";
import { calculateResponsive } from "@/lib/calculateResponsive";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

export const DashboardContext = createContext<DashboardContextProp>({
  // dark: true,
  unreadMsg: 0,
});

interface DashboardContextProp {
  // dark: boolean;
  // isMobile?: boolean;
  // isTablet?: boolean;
  unreadMsg: number,
  expandSidebar?: boolean;
  setTheme?: (theme: "dark" | "light") => void;
  livechatOpen?: boolean,
  toggleLivechat?: (expand: boolean) => void,
  setExpand?: (expand: boolean) => void;
  updateUnreadMsg?: (value: number) => void;
}

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  var isDarkFromCookie = false;

  if (typeof window !== 'undefined') {
  } else {
    isDarkFromCookie = Cookies.get('theme') == 'dark';
  }

  const [state, setState] = useState<DashboardContextProp>({
    unreadMsg: 0,
    expandSidebar: false,
    livechatOpen: false,
  });

  if (typeof window !== "undefined") {
    useEffect(() => {
      // if (state.isTablet) {
      //   setState((prevState) => ({ ...prevState, expandSidebar: false }));
      // }
      // if (state.isMobile && state.setExpand) {
      //   setState((prevState) => ({ ...prevState, expandSidebar: true }));
      // }
    }, []);  // Only run once when the component mounts

  }

  const setExpand = (value: boolean) => {
    setState({ ...state, expandSidebar: value });
  };

  const toggleLivechat = (value: boolean) => {
    setState({ ...state, livechatOpen: value });
  };

  const updateUnreadMsg = (value: number) => {
    setState({ ...state, unreadMsg: value });
  };


  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setExpand: (value) => setExpand(value),
        toggleLivechat: (value) => toggleLivechat(value),
        updateUnreadMsg: (value) => updateUnreadMsg(value)
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
