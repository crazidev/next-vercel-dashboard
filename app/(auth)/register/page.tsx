import {
  Flex,
  Button,
  Text,
  Card,
  Avatar,
  Box,
  TextField,
  Link,
  RadioCards,
} from "@radix-ui/themes";
import Image from "next/image";
import { AuthContainerLogo } from "@/components/auth-container-logo";
import {
  MdLock,
  MdOutlineMailLock,
  MdPerson,
  MdPhone,
  MdRemoveRedEye,
} from "react-icons/md";
import { CTextField } from "@/components/text-field";

export default function RegisterPage() {
  return (
    <Box className="m-auto sm:my-auto my-[30px] max-w-[400px] w-full md:w-[350px]">
      <Card variant={"surface"} className="py-4">
        <Flex gap="" direction={"column"} justify={"center"}>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <AuthContainerLogo />
            <Box height={"20px"} />
            <Text weight={"bold"}>Create a new account</Text>
            <Text color={"gray"} size={"1"}>
              Enter your details to register.
            </Text>
          </Flex>
          <Box height={"20px"} />
          <CTextField
            label="Fullname"
            placeholder="EX: John Doe"
            leftIcon={<MdPerson />}
          />
          <Box height={"10px"} />
          <CTextField
            label="Email"
            placeholder="Enter your email"
            leftIcon={<MdOutlineMailLock />}
          />
          <Box height={"10px"} />
          <CTextField
            label="Phone Number"
            placeholder="+1 000 000 000"
            leftIcon={<MdPhone />}
          />
          <Box height={"20px"} />
          <Box>
            <RadioCards.Root
              size="1"
              defaultValue="1"
              columns={{ initial: "2", sm: "2" }}
            >
              <RadioCards.Item value="1" className="h-[35px]">
                <Text weight="bold">Male</Text>
              </RadioCards.Item>
              <RadioCards.Item value="2" className="h-[35px]">
                <Text weight="bold">Female</Text>
              </RadioCards.Item>
            </RadioCards.Root>
          </Box>
          <Box height={"10px"} />
          <CTextField
            label="Password"
            placeholder="Enter your password"
            leftIcon={<MdLock />}
            rightIcon={<MdRemoveRedEye />}
          />

          <Box height={"20px"} />
          <Button size="3" variant="solid">
            Sign Up
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
