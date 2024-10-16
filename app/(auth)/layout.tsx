"use client";

import Image from "next/image";
import bg from "../../public/auth-background.png";
import { Flex, Link, Select, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Shape1 } from "./shapes/shape_1";
import { Shape2 } from "./shapes/shape_2";
import { Logo } from "./shapes/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var path = usePathname();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (path == "/register") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [path]);
  return (
    <div className="max-w-[100vw] max-h-[100vh]">
      <Shape1 className={" right-[-100px] bottom-0 w-[300px] fixed" } />
      <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v] "} />
      <div className="h-screen flex flex-col px-[20px] md:px-[30px] pb-[20px] pt-[30px] md:pt-[40px] container mx-auto">
        <Flex className="flex flex-none z-10" justify={"end"} direction={"row"}>
         {/* <Logo className="w-[40px] h-[40px] fill-primary-500"/> */}
          <Flex gap={"1"} align={"baseline"}>
            <Text weight={"medium"} size={"2"} color={"gray"}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Link href={isSignUp ? "/login" : "/register"} underline={"always"}>
              <Text size={"2"} weight={"medium"}>
                {isSignUp ? "Login" : "Register"}
              </Text>
            </Link>
          </Flex>
        </Flex>
        <div className="flex grow justify-center items-center">{children}</div>
        <Flex
          className="flex-none z-10"
          justify={"between"}
          direction={"row"}
          align={"start"}
        >
          <Flex gap={"1"} align={"baseline"}>
            <Text weight={"medium"} size={"2"} color={"gray"}>
              2024 Copyright Dashboard
            </Text>
          </Flex>
          <Select.Root defaultValue="en">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Language</Select.Label>
                <Select.Item value="en">English</Select.Item>
                <Select.Item value="sp">Spanish</Select.Item>
                <Select.Item value="ea">German</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </div>
    </div>
  );
}
