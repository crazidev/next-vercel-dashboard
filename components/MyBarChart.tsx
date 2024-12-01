'use client';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer, LabelList, CartesianGrid, YAxis } from 'recharts';


export function MyBarChart(props: {
  data: any[],
  layout?: 'vertical' | 'horizontal'
}) {

  const chartConfig = {
    spending: {
      label: "Spending",
      color: "var(--red-8)",
    },
    earning: {
      label: "Earning",
      color: "var(--green-8)",
    },
    label: {
      color: "white",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer className={'min-h-[200px] mobile:w-full min-w-[300px]'} config={chartConfig}>
      <BarChart layout={props.layout} className='' data={props.data}>
        {props.layout === 'vertical' ? <>
          <XAxis type="number" dataKey="spending" hide />
          <XAxis type="number" dataKey="earning" hide />
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        </> : <>
          <XAxis
            dataKey="label"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        </>}


        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='dashed' />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="earning" stackId={props.layout === 'vertical' ? 'a' : undefined} barSize={12} background={{ fill: 'var(--gray-3)', radius: 5 }} fill="var(--color-earning)" radius={5} />
        <Bar dataKey="spending" stackId={props.layout === 'vertical' ? 'a' : undefined} barSize={12} background={{ fill: 'var(--gray-3)', radius: 5 }} fill="var(--color-spending)" radius={5} />
      </BarChart>
    </ChartContainer>
    // </ResponsiveContainer>
  );
}



