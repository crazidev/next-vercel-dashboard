import Image from "next/image";
import bg from "../../public/auth-background.png";
import { Box, Flex, Link, Select, Text } from "@radix-ui/themes";
import { Shape1 } from "./shapes/shape_1";
import { Shape2 } from "./shapes/shape_2";
import { Logo } from "./shapes/logo";
import { UserContainer } from "./components/user_container";
import { HeaderLink } from "./components/header_link";
import { Suspense } from "react";
import { AuthFooter } from "./footer";
import { MobileSideBarButton } from "app/dashboard/components/mobile_nav_button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[100vw] max-h-[100vh]">
      <Shape1 className={"right-[-100px] bottom-0 w-[300px] fixed"} />
      <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v] "} />
      <div className="h-screen flex flex-col px-[20px] md:px-[30px] pb-[20px] pt-[30px] md:pt-[40px] container mx-auto">
        <Flex
          className="flex flex-none z-10"
          justify={"between"}
          direction={"row"}
        >
          <Suspense fallback={"Loading .."}>
            <HeaderLink />
          </Suspense>
         
          <UserContainer />
        </Flex>

        <div className="flex grow justify-center items-center">
          <Box
            maxWidth="500px"
            width={"300px"}
            className="m-auto sm:my-auto my-[30px]"
          >
            <Suspense>{children}</Suspense>
          </Box>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
