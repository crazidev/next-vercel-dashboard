import { Box, BoxProps } from "@radix-ui/themes";

export function MyCard({
  children,
  className,
  style,
  radius = "20px",
}: {
  children: React.ReactNode;
  style: any;
  radius?: string;
  className?: string;
}) {
  return (
    <div
      className={`p-[15px] backdrop-blur-2xl w-full h-full ${className} after:absolute after:content-[''] after:inset-0 after:bg-[var(--accent-3)] dark:after:bg-[var(--accent-2)] after:opacity-90 dark:after:opacity-90 after:-z-10 after:rounded-[${radius}] !rounded-[${radius}]`}
      style={style}
    >
      {children}
    </div>
  );
}
