"use client";

import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { MdClose } from "react-icons/md";


interface MyDialogProp {
  title: string;
  description: string;
  children?: any;
  maxWidth?: string;
  trigger: any;
  closeDialogProp?: (d: () => void) => void; // Add closeDialog as a prop
}

export function MyDialog({
  title,
  description,
  children,
  maxWidth,
  trigger,
  closeDialogProp,
}: MyDialogProp) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (closeDialogProp) {
      closeDialogProp(closeDialog);
    }
  }, [closeDialogProp]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth={maxWidth ?? "350px"}>
        <Flex justify={"between"}>
          <Dialog.Title>{title}</Dialog.Title>
          <IconButton color="red" onClick={() => setIsOpen(false)}>
            <MdClose />
          </IconButton>
        </Flex>

        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}