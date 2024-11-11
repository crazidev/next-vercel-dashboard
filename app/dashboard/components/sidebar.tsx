"use client";

import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { Logo } from "app/auth/components/shapes/logo";
import { useContext, useEffect, useState } from "react";
import { MdOutlineWallet, MdSettings } from "react-icons/md";
import {
  TbChartLine,
  TbCreditCard,
  TbDashboard,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { DashboardContext } from "../providers";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

export function SideBarComponent({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  const { isMobile, expandSidebar, isTablet, setExpand, setTheme } =
    useContext(DashboardContext);
  const expand = !isTablet && !isMobile;
  var pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsReady(true);
    }
  }, [pathname]);

  return (
    <div className="flex w-[100%] flex-col">
      {isReady && (
        <div className="">
          <aside
            className={`h-[100%] top-0 fixed ${isMobile && !expand ? "z-0" : "z-40"
              } p-2`}
          >
            <Box
              className={`${isMobile || expand
                ? " bg-gradient-to-br from-[var(--accent-a2)] to-transparent "
                : "border-[2px] border-[var(--accent-3)] rounded-xl border-opacity-90"
                }  p-[15px] transition-all duration-300 ease-in-out h-full to-[var(--red-1)] from-transparent
            ${isMobile ? (expand ? "translate-x-0" : "-translate-x-full") : ""}
            ${expand ? "w-[270px]" : "w-[100%]"}`}
              style={{
                transform:
                  isMobile && !expand ? "translateX(-120%)" : "translateX(0)",
              }}
            >
              {(expand || isMobile) && (
                <Flex
                  // className="before:absolute before:inset-0 before:-z-10 before:bg-[var(--accent-2)] before:opacity-20"
                  align={"center"}
                  justify={"between"}
                  gap={"3"}
                >
                  <Flex align={"center"} gap={"3"}>
                    <Logo className="h-[30px] w-[30px] fill-primary-500" />
                    <Flex
                      direction={"column"}
                      align={"start"}
                      justify={"center"}
                    >
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
                  className="before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[var(--accent-2)] before:opacity-30 before:content-[''] after:absolute after:inset-0 after:-z-20 after:rounded-2xl after:backdrop-blur-none"
                  direction={"column"}
                  align={"center"}
                  justify={"between"}
                >
                  <Flex align={"center"} gap={"3"}>
                    <Logo className="h-[40px] w-[40px] fill-primary-500" />
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
                <div className="mx-auto mb-4 h-[2px] w-[20px] rounded-sm bg-gray-400/50"></div>
              )}
              {navlist.map(function (nav) {
                var isActive = pathname == nav.link;
                return (
                  // <Tooltip key={nav.link} content={nav.name}>
                  <Link
                    key={nav.link}
                    className={`
                      mt-[10px] flex flex-row 
                      align-middle px-3 py-3 
                      dark:bg-card-background-dark bg-card-background-light
                      box-content
                      border-b-2
                      transition-all duration-100 ease-in
                      ${isActive
                        ? "border-[var(--accent-8)] text-primary-600"
                        : "border-transparent"
                      } 
                    hover:border-[var(--accent-7)] 
                    `}
                    href={nav.link}
                  >
                    <Flex align={"center"} gap={"3"}>
                      <span className="rounded-full text-primary-600">
                        {nav.icon}
                      </span>{" "}
                      {expand && (
                        <Text className="" size={"2"}>
                          {nav.name}
                        </Text>
                      )}
                    </Flex>
                  </Link>
                  // </Tooltip>
                );
              })}
            </Box>
          </aside>
        </div>
      )}
      {isMobile && (
        <div className="bg-card-background fixed left-0 right-0 top-0 z-20 flex items-center justify-between py-1 pl-3 pr-2 backdrop-blur-md">
          <Logo className="h-[30px] w-[30px] fill-primary-500" />
          <div className="flex flex-row gap-1">
            {navlist.map(function (nav, index) {
              var isActive = pathname == nav.link;
              return (
                <Link
                  key={nav.link}
                  href={nav.link}
                  className={`h-[50px] flex items-center w-[50px] justify-center hover:bg-[var(--accent-a3)] ${isActive ? "border-b-2 border-primary-600 " : ""}`}              >
                  <span className={`rounded-full text-[25px] text-primary-600`}>
                    {nav.icon}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <div
        className="mr-2 flex flex-grow pt-5"
        style={{
          marginLeft:
            isMobile || !isReady ? "10px" : expand ? "300px" : "100px",
          marginTop: isMobile ? "50px" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
