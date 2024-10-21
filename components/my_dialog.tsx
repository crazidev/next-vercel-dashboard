"use client";

import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { MdClose } from "react-icons/md";
interface MyDialogProp {
  title: string;
  description: string;
  children?: any;
  maxWidth?: string | "400";
  trigger: any;
}

export function MyDialog({ props }: { props: MyDialogProp }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{props.trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth={props?.maxWidth}>
        <Flex justify={"between"}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Close>
            <Flex gap='1'>
            <MdClose /><Text size='1' color="red">Close</Text>
            </Flex>
        </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" mb="4">
          {props.description}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {props.children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
