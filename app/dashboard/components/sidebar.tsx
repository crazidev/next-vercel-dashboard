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
  },
  {
    link: "/dashboard/wallets",
    name: "Wallets",
    icon: <MdOutlineWallet />,
  },
  {
    link: "/dashboard/cards",
    name: "Cards",
    icon: <TbCreditCard />,
  },
  {
    link: "/dashboard/transactions",
    name: "Transactions",
    icon: <TbChartLine />,
  },
  {
    link: "/dashboard/settings",
    name: "Settings",
    icon: <MdSettings className="" />,
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
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsReady(true);
    }
  }, [pathname]);

  return (
    <div className={`flex w-[100%] mobile:flex-col flex-row`}>
      {isReady && (
        <div className="">
          <aside
            className={`tablet:h-fit mobile:h-0 top-0 ${isMobile && !expand ? "z-0" : "z-40"
              } w-fit sticky`}
          >
            <Box
              //   className={`${isMobile || expand
              //     ? " bg-gradient-to-br from-[var(--accent-a2)] to-transparent "
              //     : "border-[2px] border-[var(--accent-3)] rounded-xl border-opacity-90"
              //     }  p-[15px] transition-all duration-300 ease-in-out h-full to-[var(--red-1)] from-transparent
              // ${isMobile ? (expand ? "translate-x-0" : "-translate-x-full") : ""}
              // ${expand ? "w-[270px]" : "w-[100%]"}`}
              // style={{
              //   transform:
              //     !expand ? "mobile:translateX(-120%)" : "mobile:translateX(0)",
              // }}
              className={`
                 mobile:hidden
                 px-2
                 tablet:pr-0
                 pt-[45px]
                 transition-all duration-300 ease-in-out 
                 to-[var(--red-1)] from-transparent
                 tablet:w-[100%] w-[230px]
                 sticky top-0
                `}
            >


              {(expand) && (
                <Flex
                  className="tablet:hidden mobile:hidden before:h-[100vh] before:-z-10 before:absolute before:backdrop-blur-sm before:inset-0 before:bg-[var(--gray-a2)]"
                  align={"center"}
                  justify={"center"}
                  gap={"3"}
                >
                  <Flex align={"center"} justify={'center'} direction={"column"} gap={"3"}>
                    <Logo className="w-[30px] h-[30px] fill-primary-500" />
                    <Flex
                      direction={"column"}
                      align={"start"}
                      justify={"center"}
                    >
                      <Text weight={"bold"}>SYNC BANK</Text>
                      {/* <Text color={"gray"} size={"1"}>
                        #1 Soft Banking
                      </Text> */}
                    </Flex>
                  </Flex>
                </Flex>
              )}


              {!expand && (
                <Flex
                  className="hidden tablet:flex"
                  direction={"column"}
                  align={"center"}
                  justify={"between"}
                >
                  <Flex align={"center"} gap={"3"}>
                    <Logo className="w-[30px] h-[30px] fill-primary-500" />
                  </Flex>
                </Flex>
              )}
              {expand ? (
                <Box height={"40px"} />
              ) : (
                <div className="bg-gray-400/50 mx-auto my-7 rounded-sm w-[20px] h-[2px]"></div>
              )}

              {navlist.map(function (nav) {
                var isActive = pathname.startsWith(nav.link) && (nav.link != '/dashboard');
                if (nav.link == "/dashboard") {
                  isActive = pathname == '/dashboard';
                }
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

                      <Text className="tablet:hidden" size={"2"}>
                        {nav.name}
                      </Text>

                    </Flex>
                  </Link>

                );
              })}
            </Box>
          </aside>
        </div>
      )}

      {/* Mobile */}
      <div className="top-0 right-0 left-0 z-20 fixed hidden mobile:flex justify-between items-center bg-card-background backdrop-blur-md py-1 pr-2 pl-2">
        <Logo className="w-[30px] h-[30px] fill-primary-500" />
        <div className="flex flex-row gap-1">
          {navlist.map(function (nav, index) {
            var isActive = pathname.startsWith(nav.link) && (nav.link != '/dashboard');
            if (nav.link == "/dashboard") {
              isActive = pathname == '/dashboard';
            }

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

      <div
        className="flex pt-3 overflow-hidden w-full"
        style={{
          padding:
            isMobile || !isReady ? "10px" : expand ? "10px" : "10px",
          paddingTop: isMobile ? "50px" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}



