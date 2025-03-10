"use client";

import { useContext } from "react";
import {DashboardContext} from "@context/DashboardContext";
import { Text, Flex } from "@radix-ui/themes";
import {
  TbLayoutSidebar,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import useLayout from "@/components/hooks/useLayout";

export function MobileSideBarButton() {
  const { isMobile, isTablet } = useLayout();
  
  const { expandSidebar, setExpand } = useContext(DashboardContext);

  return (
    <>
      {(isMobile && !isTablet && !expandSidebar) && (
        <Flex
          gap={"2"}
          mt={"1"}
          align={"center"}
          onClick={() => setExpand!(!expandSidebar)}
        >
          {expandSidebar ? (
            <TbLayoutSidebarLeftCollapse size={20} />
          ) : (
            <TbLayoutSidebarLeftExpand size={20} />
          )}
        </Flex>
      )}
    </>
  );
}
