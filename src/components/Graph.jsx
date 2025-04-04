"use client";

import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

// Chart description
export const description = "A Wpm line chart";

// Define the chart data
const chartData = [
  { time: "1", wpm: 20 },
  { time: "5", wpm: 30 },
  { time: "10", wpm: 65 },
  { time: "15", wpm: 73 },
  { time: "30", wpm: 60 },
];

// Define the chart configuration
const chartConfig = {
  wpm: {
    label: "wpm",
    color: "hsl(var(--chart-1))",
  },
};

const Graph = ({ performanceData }) => {
  return (
    <div className="w-full h-[200px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={performanceData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            label={{ 
              value: 'WPM', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#9CA3AF'
            }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.375rem',
              color: '#F3F4F6'
            }}
          />
          <Line
            type="monotone"
            dataKey="wpm"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', r: 4 }}
            activeDot={{ r: 6, fill: '#A78BFA' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
