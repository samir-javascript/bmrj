"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-04-01", users: 222 + 150 },
  { date: "2024-04-02", users: 97 + 180 },
  { date: "2024-04-03", users: 167 + 120 },
  { date: "2024-04-04", users: 242 + 260 },
  { date: "2024-04-05", users: 373 + 290 },
  { date: "2024-04-06", users: 301 + 340 },
  { date: "2024-04-07", users: 245 + 180 },
  { date: "2024-04-08", users: 409 + 320 },
  { date: "2024-04-09", users: 59 + 110 },
  { date: "2024-04-10", users: 261 + 190 },
  { date: "2024-04-11", users: 327 + 350 },
  { date: "2024-04-12", users: 292 + 210 },
  { date: "2024-04-13", users: 342 + 380 },
  { date: "2024-04-14", users: 137 + 220 },
  { date: "2024-04-15", users: 120 + 170 },
  { date: "2024-04-16", users: 138 + 190 },
  { date: "2024-04-17", users: 446 + 360 },
  { date: "2024-04-18", users: 364 + 410 },
  { date: "2024-04-19", users: 243 + 180 },
  { date: "2024-04-20", users: 89 + 150 },
  { date: "2024-04-21", users: 137 + 200 },
  { date: "2024-04-22", users: 224 + 170 },
  { date: "2024-04-23", users: 138 + 230 },
  { date: "2024-04-24", users: 387 + 290 },
  { date: "2024-04-25", users: 215 + 250 },
  { date: "2024-04-26", users: 75 + 130 },
  { date: "2024-04-27", users: 383 + 420 },
  { date: "2024-04-28", users: 122 + 180 },
  { date: "2024-04-29", users: 315 + 240 },
  { date: "2024-04-30", users: 454 + 380 },
  { date: "2024-05-01", users: 165 + 220 },
  { date: "2024-05-02", users: 293 + 310 },
  { date: "2024-05-03", users: 247 + 190 },
  { date: "2024-05-04", users: 385 + 420 },
  { date: "2024-05-05", users: 481 + 390 },
  { date: "2024-05-06", users: 498 + 520 },
  { date: "2024-05-07", users: 388 + 300 },
  { date: "2024-05-08", users: 149 + 210 },
  { date: "2024-05-09", users: 227 + 180 },
  { date: "2024-05-10", users: 293 + 330 },
  { date: "2024-05-11", users: 335 + 270 },
  { date: "2024-05-12", users: 197 + 240 },
  { date: "2024-05-13", users: 197 + 160 },
  { date: "2024-05-14", users: 448 + 490 },
  { date: "2024-05-15", users: 473 + 380 },
  { date: "2024-05-16", users: 338 + 400 },
  { date: "2024-05-17", users: 499 + 420 },
  { date: "2024-05-18", users: 315 + 350 },
  { date: "2024-05-19", users: 235 + 180 },
  { date: "2024-05-20", users: 177 + 230 },
  { date: "2024-05-21", users: 82 + 140 },
  { date: "2024-05-22", users: 81 + 120 },
  { date: "2024-05-23", users: 252 + 290 },
  { date: "2024-05-24", users: 294 + 220 },
  { date: "2024-05-25", users: 201 + 250 },
  { date: "2024-05-26", users: 213 + 170 },
  { date: "2024-05-27", users: 420 + 460 },
  { date: "2024-05-28", users: 233 + 190 },
  { date: "2024-05-29", users: 78 + 130 },
  { date: "2024-05-30", users: 340 + 280 },
  { date: "2024-05-31", users: 178 + 230 },
  { date: "2024-06-01", users: 178 + 200 },
  { date: "2024-06-02", users: 470 + 410 },
  { date: "2024-06-03", users: 103 + 160 },
  { date: "2024-06-04", users: 439 + 380 },
  { date: "2024-06-05", users: 88 + 140 },
  { date: "2024-06-06", users: 294 + 250 },
  { date: "2024-06-07", users: 323 + 370 },
  { date: "2024-06-08", users: 385 + 320 },
  { date: "2024-06-09", users: 438 + 480 },
  { date: "2024-06-10", users: 155 + 200 },
  { date: "2024-06-11", users: 92 + 150 },
  { date: "2024-06-12", users: 492 + 420 },
  { date: "2024-06-13", users: 81 + 130 },
  { date: "2024-06-14", users: 426 + 380 },
  { date: "2024-06-15", users: 307 + 350 },
  { date: "2024-06-16", users: 371 + 310 },
  { date: "2024-06-17", users: 475 + 520 },
  { date: "2024-06-18", users: 107 + 170 },
  { date: "2024-06-19", users: 341 + 290 },
  { date: "2024-06-20", users: 408 + 450 },
  { date: "2024-06-21", users: 169 + 210 },
  { date: "2024-06-22", users: 317 + 270 },
  { date: "2024-06-23", users: 480 + 530 },
  { date: "2024-06-24", users: 132 + 180 },
  { date: "2024-06-25", users: 141 + 190 },
  { date: "2024-06-26", users: 434 + 380 },
  { date: "2024-06-27", users: 448 + 490 },
  { date: "2024-06-28", users: 149 + 200 },
  { date: "2024-06-29", users: 103 + 160 },
  { date: "2024-06-30", users: 446 + 400 },
]

const chartConfig = {
  users: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Chart() {
  const totalUsers = chartData.reduce((acc, curr) => acc + curr.users, 0)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Users Overview</CardTitle>
          <CardDescription>Showing total users over the last 3 months</CardDescription>
        </div>
        <div className="flex items-center px-6 py-4 sm:px-8 sm:py-6">
          <div className="text-right">
            <span className="text-xs text-muted-foreground">{chartConfig.users.label}</span>
            <div className="text-lg font-bold leading-none sm:text-3xl">
              {totalUsers.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="users"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="users"
              type="monotone"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
