"use client";

import { Flex, Select, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
export const AuthFooter = () => {
  const [isDark, setDark] = useState(false);

  return (
    <Flex
      className="flex-none pb-[30px] lg:sticky bottom-0"
      justify={"between"}
      direction={"row"}
      align={"start"}
    >
      <Flex gap={"1"} align={"baseline"}>
        <Text weight={"medium"} size={"2"} color={"gray"}>
          2025 Copyright Dashboard
        </Text>
      </Flex>

      {/* <Select.Root defaultValue="en">
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Language</Select.Label>
            <Select.Item value="en">English</Select.Item>
            <Select.Item value="sp">Spanish</Select.Item>
            <Select.Item value="ea">German</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root> */}
    </Flex>
  );
};
