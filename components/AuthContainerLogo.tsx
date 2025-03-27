import { Logo } from "@/components/shapes/logo";
import Link from "next/link";
import React from "react";

export const AuthContainerLogo = (): JSX.Element => {
  return (
    <Link href={"/"}>
      <Logo className="w-[40px] h-[40px] fill-primary-500" />
    </Link>
  );
};
