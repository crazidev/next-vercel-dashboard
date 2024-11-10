'use client';

import { Box, BoxProps } from "@radix-ui/themes";
import React from "react";

export const MyCard = React.forwardRef<HTMLElement, any>(({ className, radius, children, ...props }, ref) => {
  return (
    <div
      className={`p-[15px] w-full h-full z-10 backdrop-blur-sm dark:bg-card-background bg-[var(--accent-a3)] ${className} !rounded-[${radius}]`}
      {...props}
    >
      {children}
    </div>
  );
});
