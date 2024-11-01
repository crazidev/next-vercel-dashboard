"use client";

import { AuthContainerLogo } from "@/components/auth-container-logo";
import { calculateResponsive } from "@/lib/calculate-responsive";
import { Box, Card, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { Logo } from "app/auth/shapes/logo";
import { useContext, useEffect, useState } from "react";
import { IconBase } from "react-icons/lib";
import {
  MdCardGiftcard,
  MdChevronLeft,
  MdChevronRight,
  MdDashboardCustomize,
  MdHomeMini,
  MdOutlineWallet,
  MdSettings,
} from "react-icons/md";
import {
  TbChartLine,
  TbChevronLeft,
  TbChevronRight,
  TbCreditCard,
  TbDashboard,
  TbHome2,
  TbHomeCheck,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbLink,
  TbLinkPlus,
} from "react-icons/tb";
import { DashboardContext } from "../providers";
import { usePathname } from "next/navigation";
import { MyCard } from "@/components/my_card";
import { hexToRgb } from "@/lib/utils";

export const navlist = [
  {
    link: "/dashboard",
    name: "Dashboard",
    icon: <TbDashboard />,
    isDefault: true,
  },
  {
    link: "/dashboard/wallets",
    name: "Wallets",
    icon: <MdOutlineWallet />,
    isDefault: true,
  },
  {
    link: "/dashboard/cards",
    name: "Cards",
    icon: <TbCreditCard />,
    isDefault: true,
  },
  {
    link: "/dashboard/transactions",
    name: "Transactions",
    icon: <TbChartLine />,
    isDefault: true,
  },
  {
    link: "/dashboard/settings",
    name: "Settings",
    icon: <MdSettings className="hover:animate-spin" />,
    isDefault: true,
  },
];

export function SideBarComponent({ children }: { children: React.ReactNode }) {
  const { isMobile, expandSidebar, isTablet, setExpand, setTheme } =
    useContext(DashboardContext);
  const expand = expandSidebar;  
  var pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsReady(true);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col w-[100%]">
      {isReady && (
        <aside
          className={`h-[90vh] top-0 fixed ${
            isMobile && !expand ? "z-0" : "z-40"
          } p-2`}
        >
          <Box
            className={`${
              isMobile || expand ? "bg-black/0 backdrop-blur-md" : ""
            } border-[2px] border-[var(--accent-3)] rounded-xl border-opacity-90 p-[15px] transition-all duration-300 ease-in-out h-full to-[var(--red-1)] from-transparent 
          ${isMobile ? (expand ? "translate-x-0" : "-translate-x-full") : ""}
          ${expand ? "w-[270px]" : "w-[100%]"}`}
            style={{
              transform:
                isMobile && !expand ? "translateX(-120%)" : "translateX(0)",
            }}
          >
            {(expand || isMobile) && (
              <Flex
                className="before:inset-0 before:absolute before:bg-[var(--accent-2)] before:opacity-20 before:-z-10"
                align={"center"}
                justify={"between"}
                gap={"3"}
              >
                <Flex align={"center"} gap={"3"}>
                  <Logo className="w-[30px] h-[30px] fill-primary-500" />
                  <Flex direction={"column"} align={"start"} justify={"center"}>
                    <Text weight={"bold"}>SYNC BANK</Text>
                    <Text color={"gray"} size={"1"}>
                      #1 Soft Banking
                    </Text>
                  </Flex>
                </Flex>
                {isMobile && (
                  <IconButton
                    onClick={() => setExpand!(!expand)}
                    radius="full"
                    variant="ghost"
                  >
                    {expand ? (
                      <TbLayoutSidebarLeftCollapse />
                    ) : (
                      <TbLayoutSidebarLeftExpand />
                    )}
                  </IconButton>
                )}
              </Flex>
            )}
            {!expand && (
              <Flex
                className="after:inset-0 after:absolute  before:inset-0 before:absolute before:bg-[var(--accent-2)] before:opacity-30 before:-z-10 after:-z-20 after:backdrop-blur-none before:content-[''] before:rounded-2xl after:rounded-2xl"
                direction={"column"}
                align={"center"}
                justify={"between"}
              >
                <Flex align={"center"} gap={"3"}>
                  <Logo className="w-[40px] h-[40px] fill-primary-500" />
                </Flex>
                <Box height={"39px"} />
                {/* {!isTablet && !expand && (
              <IconButton
                onClick={() => setExpand!(!expand)}
                radius="full"
                variant='surface'
                className=""
              >
                {!expand ? (
                  <TbChevronRight />
                ) : (
                  <TbChevronLeft />
                )}
              </IconButton>
            )} */}
              </Flex>
            )}

            {expand ? (
              <Box height={"40px"} />
            ) : (
              <div className="h-[2px] w-[20px] bg-gray-400/50 rounded-sm mx-auto mb-4"></div>
            )}

            {navlist.map(function (nav) {
              var isActive = pathname.startsWith(nav.link);
              // console.log(pathname, nav.link, isActive);
              return (
                // <Tooltip key={nav.link} content={nav.name}>
                <div
                  key={nav.link}
                  className={`mt-[10px]  flex flex-row align-middle px-3 py-3 bg-[var(--accent-a2)] box-content border-0 border-b-2 ${
                    isActive ? "border-[var(--accent-8)]" : "border-transparent"
                  } hover:border-[var(--accent-7)] rounded-full`}
                >
                  <Flex align={"center"} gap={"3"}>
                    <span className="rounded-full text-primary-600">
                      {nav.icon}
                    </span>{" "}
                    {expand && (
                      <Text color="gray" className="" size={"2"}>
                        {nav.name}
                      </Text>
                    )}
                  </Flex>
                </div>
                // </Tooltip>
              );
            })}
          </Box>
        </aside>
      )}
      {isMobile && (
        <div className="bg-card-background flex pl-3 pr-2 backdrop-blur-md py-1 justify-between items-center fixed top-0 right-0 left-0 z-20">
          <Logo className="w-[30px] h-[30px] fill-primary-500" />
          <div className="flex flex-row gap-1">
            {navlist.map(function (nav, index) {
              var isActive = index == 0;
              return (
                <div
                  key={nav.link}
                  className={`h-[50px] flex items-center w-[50px] justify-center hover:bg-[var(--accent-a3)] ${
                    isActive ? "border-b-2 border-primary-600 " : ""
                  }`}
                >
                  <span
                    className={`rounded-full text-primary-600 text-[25px] `}
                  >
                    {nav.icon}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div
        className="flex flex-grow mr-2 pt-5"
        style={{
          marginLeft: isMobile || !isReady ? "10px" : expand ? "300px" : "100px",
          marginTop: isMobile ? "50px" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
