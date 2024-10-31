"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  AreaChart,
  Area,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Monday", desktop: 0, mobile: 1 },
  { month: "Tuesday", desktop: 4, mobile: 7 },
  { month: "Wed", desktop: 8, mobile: 2 },
  { month: "Thusday", desktop: 0, mobile: 2 },
  { month: "Friday", desktop: 5, mobile: 3 },
  { month: "Saturday", desktop: 7, mobile: 0 },
  { month: "Sunday", desktop: 10, mobile: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--accent-4)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--accent-7)",
  },
} satisfies ChartConfig;

export function MyLineChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-[4/1] absolute left-0 ml-[-10px] bottom-0 h-[60px] w-[50%]"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false} 
        />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
      {/* <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >

        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="mobile"
          type="linear"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="linear"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart> */}
    </ChartContainer>
  );
}
