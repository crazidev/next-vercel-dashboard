import Image from "next/image";
import bg from "../../public/auth-background.png";
import { Box, Flex, Link, Select, Spinner, Text } from "@radix-ui/themes";
import { Shape1 } from "@/components/shapes/shape_1";
import { Shape2 } from "@/components/shapes/shape_2";
import { Logo } from "@/components/shapes/logo";
import { Suspense } from "react";
import { AuthFooter } from "./AuthFooter";
import { HeaderLink } from "@/components/HeaderLink";
import { UserContainer } from "@/components/UserContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-[100vh] max-w-[100vw]">
      {/* <Shape1 className={"fixed bottom-0 right-[-100px] w-[300px]"} /> */}
      {/* <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v]"} /> */}
      <div className="container mx-auto flex h-screen flex-col px-[20px] pb-[20px] md:px-[30px]">
        <Flex
          className="z-10 flex flex-none lg:sticky top-0 pt-[30px] md:pt-[40px]"
          justify={"between"}
          direction={"row"}
        >
          <Suspense fallback={"Loading .."}>
            <HeaderLink />
          </Suspense>

          <Suspense>
            <UserContainer />
          </Suspense>
        </Flex>

        <div className="flex grow items-center justify-center">
          <Box
            maxWidth="500px"
            width={"300px"}
            className="m-auto my-[30px] sm:my-auto"
          >
            <Suspense fallback={<Spinner />}>
              {children}
            </Suspense>
          </Box>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}
