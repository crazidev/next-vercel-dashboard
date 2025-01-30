import { Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends TextField.RootProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  error?: string | any;
  accept?: string;
  type?: any | 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  register?: UseFormRegisterReturn<any>;
}

export const CTextField = React.forwardRef<HTMLElement, InputProps>(
  (
    {
      leftIcon,
      label,
      rightIcon,
      error,
      type,
      accept,
      register,
      ...props
    },
    ref
  ) => {
    const isIOS = false;

    return (
      <Flex direction={"column"} gap={"1"}>
        <label>
          {label && (
            <Text size={"1"} weight={"medium"} ml={"1"}>
              {label}
            </Text>
          )}
          <TextField.Root
            type={type as any}
            size={"2"}
            {...props}
            ref={ref} // Pass the `ref` to the underlying component
            className={`h-[37px] ${props.className} ${isIOS ? "text-[16px]" : ""}`}
            {...register}
          // accept={accept as any}
          >
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
              className="font-normal text-[11px] italic capitalize"
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

CTextField.displayName = "CTextField";
