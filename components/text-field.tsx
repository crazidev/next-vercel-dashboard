import { Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { MdOutlineMailLock } from "react-icons/md";

export interface InputProps extends TextField.RootProps {
  leftIcon?: any;
  rightIcon?: any;
  label?: any;
}

export const CTextField = React.forwardRef<HTMLElement, InputProps>(
  ({ leftIcon, label, rightIcon, ...props }, ref) => {
    return (
      <Flex direction={"column"} gap={"1"}>
        <Text size={"1"} weight={"medium"} className="ml-1">
          {label}
        </Text>
        <TextField.Root radius={'large'} className="h-[35px]" size={'2'} {...props}>
          {leftIcon && (
            <TextField.Slot side={"left"}>{leftIcon}</TextField.Slot>
          )}
          {rightIcon && (
            <TextField.Slot side={"right"}>{rightIcon}</TextField.Slot>
          )}
        </TextField.Root>
      </Flex>
    );
  }
);
