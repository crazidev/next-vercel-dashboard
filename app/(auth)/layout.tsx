"use client";

import Image from "next/image";
import bg from "../../public/auth-background.png";
import { Flex, Link, Select, Text } from "@radix-ui/themes";
import Logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var path = usePathname();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if(path == "/register"){
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }

  }, [path]);
  return (
    <div className="h-screen flex flex-col px-[20px] md:px-[30px] py-[20px] md:py-[30px]">
      <Flex className="flex-none" justify={"between"} direction={"row"}>
        <Image src={Logo} className="" alt="Logo" height={36} width={36} />
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
      <div className="flex grow">{children}</div>
      <Flex
        className="flex-none"
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
  );
}
