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
  { month: "Mon", earning: 186, spending: 80 },
  { month: "Tues", earning: 305, spending: 200 },
  { month: "Wed", earning: 237, spending: 120 },
  { month: "Thu", earning: 73, spending: 190 },
  { month: "Fri", earning: 209, spending: 130 },
  { month: "Sat", earning: 21, spending: 140 },
  { month: "Sun", earning: 21, spending: 140 },
];

const chartConfig = {
  earning: {
    label: "Earning",
    color: "var(--accent-8)",
  },
  spending: {
    label: "Spending",
    color: "var(--red-9)",
  },
} satisfies ChartConfig;

export function MyBarChart() {
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
        <Bar dataKey="earning" fill="var(--color-earning)" radius={4} />
        <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
