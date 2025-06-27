import { BoxProps } from "@radix-ui/themes";
import React from "react";
import { twMerge } from "tailwind-merge";

export const MyCard = React.forwardRef<HTMLElement, any>(
  ({ className, radius, children, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "py-[15px] w-full h-full z-10 backdrop-blur-sm dark:bg-card-background-dark bg-card-background-light border-card-background-light dark:border-card-background-dark border-[0px]!rounded-[${radius}]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
