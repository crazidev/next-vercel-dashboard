import Image from "next/image";
import bg from "../../public/auth-background.png";
import { Box, Flex, Link, Select, Text } from "@radix-ui/themes";
import { Shape1 } from "./components/shapes/shape_1";
import { Shape2 } from "./components/shapes/shape_2";
import { Logo } from "./components/shapes/logo";
import { UserContainer } from "./components/UserContainer";
import { HeaderLink } from "./components/HeaderLink";
import { Suspense } from "react";
import { AuthFooter } from "./AuthFooter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[100vw] max-h-[100vh]">
      <Shape1 className={"right-[-100px] bottom-0 w-[300px] fixed"} />
      <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v] "} />
      <div className="flex flex-col mx-auto px-[20px] md:px-[30px] pt-[30px] md:pt-[40px] pb-[20px] h-screen container">
        <Flex
          className="z-10 flex flex-none"
          justify={"between"}
          direction={"row"}
        >
          <Suspense fallback={"Loading .."}>
            <HeaderLink />
          </Suspense>

          <UserContainer />
        </Flex>

        <div className="flex justify-center items-center grow">
          <Box
            maxWidth="500px"
            width={"300px"}
            className="m-auto my-[30px] sm:my-auto"
          >
            <Suspense>
              {children}</Suspense>
          </Box>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
