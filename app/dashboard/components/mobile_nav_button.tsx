"use client";

import { useContext } from "react";
import { DashboardContext } from "../providers";
import { Text, Flex, IconButton } from "@radix-ui/themes";
import {
  TbLayoutSidebar,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

export function MobileSideBarButton() {
  const { isMobile, expandSidebar, isTablet, setExpand } =
    useContext(DashboardContext);

  return (
    <>
      {!isTablet && (
        <Flex gap={"2"} mt={'1'} align={"center"}>
          <IconButton
            variant="ghost"
            onClick={() => setExpand!(!expandSidebar)}
          >
            {expandSidebar ? (
              <TbLayoutSidebarLeftCollapse size={20} />
            ) : (
              <TbLayoutSidebarLeftExpand size={20} />
            )}
          </IconButton>
        </Flex>
      )}
    </>
  );
}
