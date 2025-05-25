import { ChartLine, BarChart3, CreditCard } from 'lucide-react';
import { Bar, BarChart, Area, AreaChart, Pie, PieChart, Cell } from 'recharts';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

// Emerald color palette
const EMERALD_COLORS = [
  'hsl(152 60% 52%)', // emerald-500
  'hsl(149 60% 42%)', // emerald-600
  'hsl(159 64% 32%)', // emerald-700
  'hsl(151 50% 25%)', // emerald-800
  'hsl(150 60% 16%)', // emerald-900
];

const PiechartData = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 287 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 190 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: EMERALD_COLORS[0],
  },
  mobile: {
    label: 'Mobile',
    color: EMERALD_COLORS[1],
  },
} satisfies ChartConfig;

// Pie chart config using Emerald colors
const pieChartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: EMERALD_COLORS[0], // emerald-500
  },
  safari: {
    label: 'Safari',
    color: EMERALD_COLORS[1], // emerald-600
  },
  firefox: {
    label: 'Firefox',
    color: EMERALD_COLORS[2], // emerald-700
  },
  edge: {
    label: 'Edge',
    color: EMERALD_COLORS[3], // emerald-800
  },
  other: {
    label: 'Other',
    color: EMERALD_COLORS[4], // emerald-900
  },
} satisfies ChartConfig;

function ChartCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
      <div className="cosmic-card rounded-2xl overflow-hidden p-4 animate-float bg-opacity-70">
        <ChartLine className="w-10 h-10 text-white mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Expense Tracking</h3>
        <div className="h-32 bg-gradient-to-br from-white/10 to-white/5  rounded-lg flex items-center justify-center">
          <ChartContainer config={chartConfig} className=" w-[90%] h-[90%] ">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <Area
                dataKey="desktop"
                type="natural"
                fill={EMERALD_COLORS[0]}
                fillOpacity={0.4}
                stroke={EMERALD_COLORS[0]}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      <div className="cosmic-card rounded-2xl overflow-hidden p-4 animate-float bg-opacity-70 animation-delay-200">
        <BarChart3 className="w-10 h-10 text-white mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Budget Analysis</h3>
        <div className="h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
          <ChartContainer config={chartConfig} className=" w-[90%]  h-[90%]">
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill={EMERALD_COLORS[0]} radius={4} />
              <Bar dataKey="mobile" fill={EMERALD_COLORS[1]} radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="cosmic-card rounded-2xl overflow-hidden p-4 animate-float bg-opacity-70 animation-delay-400">
        <CreditCard className="w-10 h-10 text-white mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Smart Insights</h3>
        <div className="h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square h-[90%] w-[90%]"
          >
            <PieChart>
              <Pie
                data={PiechartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={30}
                outerRadius={45}
                strokeWidth={2}
              >
                {PiechartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={EMERALD_COLORS[index % EMERALD_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartCard;
