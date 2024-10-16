"use client";

import React from "react";
import { TbUserShield } from "react-icons/tb";

export const AuthContainerLogo = (): JSX.Element => {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 p-2 relative rounded-full border border-solid w-[50px] h-[50px]">
     <TbUserShield width={30} height={30}/>
    </div>
  );
};
