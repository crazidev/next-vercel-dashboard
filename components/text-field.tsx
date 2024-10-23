import { Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { MdOutlineMailLock } from "react-icons/md";

export interface InputProps extends TextField.RootProps {
  leftIcon?: any;
  rightIcon?: any;
  label?: any;
  error?: any;
  type?: any,
  accept?: any
  register?: UseFormRegisterReturn<any>,
}

export const CTextField = React.forwardRef<HTMLElement, InputProps>(
  ({ leftIcon, label, rightIcon, error, type, accept, register, ...props }, ref) => {
    return (
      <Flex direction={"column"} gap={"1"}>
        <label>
          <Text size={"1"} weight={"medium"} ml={"1"}>
            {label}
          </Text>
          <TextField.Root accept={accept} type={type} className="h-[37px]" size={"2"} {...props} {...register}>
            {leftIcon && (
              <TextField.Slot side={"left"}>{leftIcon}</TextField.Slot>
            )}
            {rightIcon && (
              <TextField.Slot side={"right"}>{rightIcon}</TextField.Slot>
            )}
          </TextField.Root>
          {error && (
            <Text
              ml={"2"}
              className="text-[11px] font-normal italic normal-case"
              color="red"
            >
              {error}
            </Text>
          )}
        </label>
      </Flex>
    );
  }
);
