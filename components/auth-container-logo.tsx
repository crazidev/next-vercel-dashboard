"use client";

import { Logo } from "app/auth/shapes/logo";
import React from "react";
import { TbUserShield } from "react-icons/tb";

export const AuthContainerLogo = (): JSX.Element => {
  return (
    <Logo className="w-[40px] h-[40px] fill-primary-500"/>
  );
};
