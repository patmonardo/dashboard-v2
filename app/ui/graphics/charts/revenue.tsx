'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

type RevenueChartProps = {
  revenue: Array<{
    month: string;
    revenue: number;
  }>;
};

export function RevenueChart({ revenue }: RevenueChartProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm h-full">
      <h3 className="mb-4 text-sm font-medium">Recent Revenue</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenue}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, 'Revenue']}
              cursor={{ fill: 'rgba(236, 237, 238, 0.4)' }}
            />
            <Bar
              dataKey="revenue"
              fill="#0ea5e9"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
