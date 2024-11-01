import { Box, BoxProps } from "@radix-ui/themes";
import React from "react";

export const MyCard = React.forwardRef<HTMLElement, any>(({ className, radius, children, ...props }, ref) => {
  return (
    <div
      className={`p-[15px] w-full h-full z-10 backdrop-blur-sm bg-card-background ${className} !rounded-[${radius}]`}
      {...props}
    >
      {children}
    </div>
  );
});
