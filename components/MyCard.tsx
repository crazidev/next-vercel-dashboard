'use client';

import { Box, BoxProps, Card } from "@radix-ui/themes";
import React from "react";

export const MyCard = React.forwardRef<HTMLElement, any>(({ className, radius, children, ...props }, ref) => {
  return (

    <div
      className={`p-[15px] w-full h-full z-10 backdrop-blur-sm dark:bg-card-background-dark bg-card-background-light border-card-background-light dark:border-card-background-dark border-[2px] ${className} !rounded-[${radius}]`}
      {...props}
    >
      {children}
    </div>
  );
});
