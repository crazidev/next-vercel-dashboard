"use client";

import { useState, useEffect } from "react";
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

// More distinct patterns for each line
const generateDesktopValue = (day: string): number => {
  switch (day) {
    case "Sunday":
      return 0; // Always zero
    case "Monday":
      return 2 + Math.random() * 3; // 6-9
    case "Tuesday":
      return 1 + Math.random() * 3; // 1-4
    case "Wednesday":
      return 7 + Math.random() * 8; // 7-9
    case "Thursday":
      return 2 + Math.random() * 2; // 2-4
    case "Friday":
      return 6 + Math.random() * 3; // 6-9
    case "Saturday":
      return 3 + Math.random() * 2; // 3-5
    default:
      return 0;
  }
};

const generateMobileValue = (day: string): number => {
  switch (day) {
    case "Sunday":
      return 0; // Always zero
    case "Monday":
      return 8 + Math.random() * 3; // 8-11 (higher than desktop)
    case "Tuesday":
      return 3 + Math.random() * 4; // 3-7 (different pattern)
    case "Wednesday":
      return 4 + Math.random() * 3; // 4-7 (lower than desktop Wed)
    case "Thursday":
      return 1 + Math.random() * 2; // 1-3 (lower than desktop)
    case "Friday":
      return 9 + Math.random() * 2; // 9-11 (peak day for mobile)
    case "Saturday":
      return 5 + Math.random() * 3; // 5-8 (higher than desktop Sat)
    default:
      return 0;
  }
};

// Function to generate chart data with Sunday first
const generateChartData = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days.map((day) => ({
    month: day,
    desktop: Math.round(generateDesktopValue(day) * 10) / 10,
    mobile: Math.round(generateMobileValue(day) * 10) / 10,
  }));
};

export function MyLineChart() {
  const [chartData, setChartData] = useState(() => generateChartData());
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setChartData(generateChartData());
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative">
      <ChartContainer
        config={chartConfig}
        className="w-[350px] md:w-[300px] absolute left-0 ml-[-14px] bottom-[0px] h-[60px]"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          {/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
