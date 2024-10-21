"use client";

import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
interface MyDialogProp {
  title: string;
  description: string;
  children?: any;
  maxWidth?: string | "400";
  trigger: any;
  actions?: {
    label: string;
    onClick?: () => void;
    color?: any;
    closeDialog?: boolean | false;
  }[];
}

export function MyDialog({ props }: { props: MyDialogProp }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{props.trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth={props?.maxWidth}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {props.description}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {props.children}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          {props.actions &&
            props.actions.map((e) => (
              <>
                {!e.closeDialog ? (
                  <Button variant="soft" onClick={e.onClick} color={e.color}>
                    {e.label}
                  </Button>
                ) : (
                  <Dialog.Close key={e.label} onClick={e.onClick}>
                    <Button variant="soft" onClick={e.onClick} color={e.color}>
                      {e.label}
                    </Button>
                  </Dialog.Close>
                )}
              </>
            ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
