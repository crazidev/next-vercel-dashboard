import { AuthContainerLogo } from "@/components/auth-container-logo";
import { Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { CTextField } from "@/components/text-field";
import { register } from "module";
import { MdLocationCity, MdLocationPin } from "react-icons/md";
import { CountrySelectComponent } from "../components/country_select_button";
import { MyDialog } from "@/components/my_dialog";
import { VerificationComponent } from "./verification_component";

export default function VerificationPage() {
  return (
    <>
      <Card variant={"surface"} className="py-4">
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <AuthContainerLogo />
          <Box height={"20px"} />
          <Text weight={"bold"}>Verification</Text>
          {/* <Text color={"gray"} size={"1"}>
            Enter your details to register. */}
          {/* </Text> */}
        </Flex>

        {/* {errors.root && (
          <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
            <Callout.Icon>
              <TbInfoCircle />
            </Callout.Icon>
            <Callout.Text>{errors.root.message}</Callout.Text>
          </Callout.Root>
        )} */}

        <VerificationComponent
          props={{
            list: [
              {
                title: "Address",
                type: "address",
                status: "not_uploaded",
              },
              {
                title: "SSN Verification",
                type: "ssn",
                status: "not_uploaded",
              },
              {
                title: "ID Card",
                type: "id_card",
                status: "not_uploaded",
              },
            ],
          }}
        />
      </Card>
    </>
  );
}

