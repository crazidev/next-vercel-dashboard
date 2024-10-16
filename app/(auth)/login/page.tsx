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
import { AuthContainerLogo } from "@/components/auth-container-logo";
import { MdLock, MdOutlineMailLock, MdRemoveRedEye } from "react-icons/md";
import { CTextField } from "@/components/text-field";

export default function LoginPage() {
  return (
    <Box maxWidth="300px" width={"300px"} className="m-auto sm:my-auto my-[30px]">
      <Card variant={"surface"} className="py-4">
        <Flex gap="" direction={"column"} justify={"center"}>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <AuthContainerLogo />
            <Box height={"20px"} />
            <Text weight={"bold"}>Login to your account</Text>
            <Text color={"gray"} size={"1"}>
              Enter your details to login.
            </Text>
          </Flex>
          <Box height={"20px"} />
          <CTextField
            label="Email"
            placeholder="Enter your email"
            leftIcon={<MdOutlineMailLock />}
          />
          <Box height={"10px"} />
          <CTextField
            label="Password"
            placeholder="Enter your password"
            leftIcon={<MdLock />}
            rightIcon={<MdRemoveRedEye />}
          />
          <Box height={"10px"} />
          <Flex justify={"end"}>
            <Link size={"2"} href="" weight={'medium'} underline={"always"}>
              Forgot Password?
            </Link>
          </Flex>
          <Box height={"20px"} />
          <Button size="3" variant="solid">
            Sign in
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
