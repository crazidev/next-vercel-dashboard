"use client";

import {
  Flex,
  Button,
  Text,
  Card,
  Avatar,
  Box,
  TextField,
  Link,
} from "@radix-ui/themes";
import Image from "next/image";
import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import {
  MdBackHand,
  MdChevronLeft,
  MdCode,
  MdFlipToBack,
  MdLock,
  MdOutlineKeyboardAlt,
  MdOutlineMailLock,
  MdRemoveRedEye,
} from "react-icons/md";
import { CTextField } from "@/components/CTextField";
import { useState } from "react";

export default function LoginPage() {
  const [resetPregress, setResetProgress] = useState<
    "reset" | "verify" | "new_password"
  >("reset");

  return (
    <Box
      maxWidth="300px"
      width={"300px"}
      className="m-auto sm:my-auto my-[30px]"
    >
      <Card variant={"surface"} className="py-4">
        <Link size={"1"} href="/auth/login" className="flex flex-row gap-1 items-center">
          <MdChevronLeft /> Login
        </Link>
        <Flex gap="" direction={"column"} justify={"center"}>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <AuthContainerLogo />
            <Box height={"20px"} />
            <Text weight={"bold"}>
              {(() => {
                switch (resetPregress) {
                  case "reset":
                    return "Reset Password";

                  case "verify":
                    return "Verify Email";

                  case "new_password":
                    return "New Password";
                }
              })()}
            </Text>
            <Text color={"gray"} size={"1"} align={"center"}>
              {(() => {
                switch (resetPregress) {
                  case "reset":
                    return "A One-Time Password will be sent to your email address.";

                  case "verify":
                    return "Input the One-Time Password sent to your email.";

                  case "new_password":
                    return "Create a safe secure password you can remember.";
                }
              })()}
            </Text>
          </Flex>
          <Box height={"10px"} />
          {(() => {
            switch (resetPregress) {
              case "reset":
                return (
                  <CTextField
                    label="Email"
                    placeholder="Enter your email address"
                    type="email"
                    inputMode="email"
                    leftIcon={<MdOutlineMailLock />}
                  />
                );

              case "verify":
                return (
                  <CTextField
                    label="One-Time Password"
                    placeholder="******"
                    maxLength={6}
                    inputMode={"numeric"}
                    type="number"
                    leftIcon={<MdOutlineKeyboardAlt />}
                  />
                );

              case "new_password":
                return (
                  <Flex direction={"column"} gap={"3"}>
                    <CTextField
                      label="New Password"
                      placeholder="******"
                      type="password"
                      inputMode={"text"}
                      leftIcon={<MdLock />}
                    />
                    <CTextField
                      label="Confirm Password"
                      placeholder="******"
                      type="password"
                      inputMode={"text"}
                      leftIcon={<MdLock />}
                    />
                  </Flex>
                );
            }
          })()}

          <Box height={"10px"} />

          <Box height={"20px"} />
          <Button size="3" variant="solid">
            {(() => {
              switch (resetPregress) {
                case "reset":
                  return "Reset Password";

                case "verify":
                  return "Verify Email";

                case "new_password":
                  return "Submit";
              }
            })()}
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
