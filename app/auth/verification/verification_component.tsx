"use client";

import { MyDialog } from "@/components/my_dialog";
import { Card, Flex, Badge, Button, Text } from "@radix-ui/themes";

interface VerificationComponentProp {
    list: {
      title: string;
      type: "ssn" | "id_card" | "address";
      status: "not_uploaded" | "uploaded" | "verified";
    }[];
  }
  

export function VerificationComponent({
    props,
  }: {
    props: VerificationComponentProp;
  }) {
    return (
      <>
        {props.list.map((d) => (
          <Card key={d.title} variant={"surface"} className="mt-[10px] py-22">
            <Flex direction={"column"}>
              <Text weight={"bold"} size={"1"}>
                {d.title}
              </Text>
              <Text size={"1"} className=" capitalize ">
                Status: <Badge color={"gray"}>{d.status.replace("_", " ")}</Badge>
              </Text>
              <MyDialog
                props={{
                  title: "Resident Address",
                  description: "",
                  actions: [{
                    label: "Cancel",
                    color: "red",
                    onClick: ()=> {}
                  }],
                  trigger: (
                    <Button
                      variant="ghost"
                      className="mt-1 text-primary-600"
                      size={"1"}
                    >
                      Start Verification
                    </Button>
                  ),
                  // children: <VerificationDialog type={"address"} />,
                }}
              />
            </Flex>
          </Card>
        ))}
      </>
    );
  }
  