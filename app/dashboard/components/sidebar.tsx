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
  MdHomeMini,
  MdOutlineWallet,
  MdSettings,
} from "react-icons/md";
import {
  TbCreditCard,
  TbHome2,
  TbHomeCheck,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbLink,
  TbLinkPlus,
} from "react-icons/tb";
import { DashboardContext } from "../providers";

export function SideBarComponent({ children }: { children: React.ReactNode }) {
  const { isMobile, expandSidebar, isTablet, setExpand, setTheme } =
    useContext(DashboardContext);
  const expand = expandSidebar;

  var navlist = [
    {
      link: "/dashboard",
      name: "Dashboard",
      icon: <TbHomeCheck />,
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
      icon: <TbLink />,
      isDefault: true,
    },
    {
      link: "/dashboard/settings",
      name: "Settings",
      icon: <MdSettings className="hover:animate-spin" />,
      isDefault: true,
    },
  ];

  return (
    <div className="flex flex-col w-[100%]">
      <aside
        className={`h-[100vh] top-0 fixed ${
          isMobile && !expand ? "z-0" : "z-10 "
        } p-2`}
      >
        <Card
          className={`transition-all duration-[300] ease-in-out h-full to-[var(--red-1)] from-transparent 
            ${isMobile ? (expand ? "translate-x-0" : "-translate-x-full") : ""}
            ${expand ? "w-[250px]" : "w-[100%]"}`}
          style={{
            transform:
              isMobile && !expand ? "translateX(-120%)" : "translateX(0)",
          }}
        >
          {(expand || isMobile) && (
            <Flex align={"center"} justify={"between"} gap={"3"}>
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
            <Flex direction={"column"} align={"center"} justify={"between"}>
              <Flex align={"center"} gap={"3"}>
                <Logo className="w-[40px] h-[40px] fill-primary-500" />
              </Flex>
              <Box height={"39px"} />
              {/* {!isTablet && !expand && (
                <IconButton
                  onClick={() => setExpand!(!expand)}
                  radius="full"
                  variant="ghost"
                  className=""
                >
                  {expand ? (
                    <TbLayoutSidebarLeftCollapse />
                  ) : (
                    <TbLayoutSidebarLeftExpand />
                  )}
                </IconButton>
              )} */}
            </Flex>
          )}
          <Box height={"50px"} />
          {/* <Text align={expand ? "left" : "center"} color="gray" size={"1"}>
          MAIN
        </Text> */}
          {navlist.map((nav) => (
            <Tooltip key={nav.link} content={nav.name}>
              <div className="mt-[10px] hover:animate-pulse  flex flex-row align-middle px-3 py-2 bg-[var(--gray-3)] box-content border-0 border-b-2 border-transparent hover:border-[var(--accent-7)] rounded-lg">
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
            </Tooltip>
          ))}
        </Card>
      </aside>
      <div
        className="flex flex-grow mr-2"
        style={{
          marginLeft: isMobile ? "10px" : expand ? "270px" : "85px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
