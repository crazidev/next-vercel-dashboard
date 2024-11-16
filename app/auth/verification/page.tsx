import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Text,
} from "@radix-ui/themes";
import { CTextField } from "@/components/CTextField";
import { register } from "module";
import { MdLocationCity, MdLocationPin } from "react-icons/md";
import { CountrySelectComponent } from "../components/CountrySelectComponent";
import { MyDialog } from "@/components/MyDialog";
import { VerificationComponent } from "./VerificationComponent";
import { authUser } from "@/actions/authUser";
import { fetchUser, revalidateUserTag } from "@/fetch/fetch_user";
import { triggerEsc } from "@/lib/triggerEsc";
import { TbInfoCircle } from "react-icons/tb";

export default async function VerificationPage() {
  var user_id = authUser().user_id;
  var user = await fetchUser(user_id);

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

        <Callout.Root variant="surface" color="yellow" mt={"5"} size={"1"}>
          <Callout.Icon>
            <TbInfoCircle />
          </Callout.Icon>
          <Callout.Text size={'1'}>
            Please wait a little longer while our Team is verifying your KYC
            information. You'll receive an email soon.
          </Callout.Text>
        </Callout.Root>

        <VerificationComponent
          props={{

            list: [
              {
                title: "Address",
                type: "address",
                content: `${user?.address}, ${user?.state}, ${user?.country}`,
                status: user?.address != null ? "verified" : "not_uploaded",
              },
              {
                title: "Social Security Number",
                type: "ssn",
                content: user?.ssn,
                status: user?.ssnStatus ?? "not_uploaded",
                desc: "Let's quickly verify your identity, Input your Social Security Number (SSN) below",
              },
              {
                title: "Identity Card",
                type: "id_card",
                content: {
                  type: user?.idDocType,
                  link: user?.idDoc,
                },
                status: user?.idDocStatus ?? "not_uploaded",
                desc: "Let's quickly verify your identity, Select an ID type below",
              },
            ],
          }}
        />
      </Card>
    </>
  );
}
