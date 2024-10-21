"use client";

import { Flex, Text, Link } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function HeaderLink() {
  var path = usePathname();
  const [isSignUp, setIsSignUp] = useState(false);
  useEffect(() => {
    if (path == "/auth/register") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [path]);

  return (
    <>
      {!(path.includes("/auth/register") || path.includes("/auth/login")) ? (
        <Flex></Flex>
      ) : (
        <Flex gap={"1"} align={"baseline"}>
          <Text weight={"medium"} size={"2"} color={"gray"}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Link href={isSignUp ? "login" : "register"} underline={"always"}>
            <Text size={"2"} weight={"medium"}>
              {isSignUp ? "Login" : "Register"}
            </Text>
          </Link>
        </Flex>
      )}
    </>
  );
}
