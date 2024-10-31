"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";


import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "Mon", desktop: 186, mobile: 80 },
  { month: "Tues", desktop: 305, mobile: 200 },
  { month: "Wed", desktop: 237, mobile: 120 },
  { month: "Thu", desktop: 73, mobile: 190 },
  { month: "Fri", desktop: 209, mobile: 130 },
  { month: "Sat", desktop: 21, mobile: 140 },
  { month: "Sun", desktop: 21, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Earning",
    color: "var(--accent-8)",
  },
  mobile: {
    label: "Spending",
    color: "var(--red-9)",
  },
} satisfies ChartConfig;

export function Component() {
  return (
    <ChartContainer className="h-[200px]" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        {/* <CartesianGrid vertical={false} /> */}
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />

        <ChartLegend  content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
