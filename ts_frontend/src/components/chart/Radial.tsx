"use client"

import { Clock } from "lucide-react"
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

export const description = "A line chart with dots"

const chartData = [
  { hour: "9h", acess: 186 },
  { hour: "10h", acess: 305 },
  { hour: "11h", acess: 237 },
  { hour: "12h", acess: 73 },
  { hour: "13h", acess: 209 },
  { hour: "14h", acess: 214 },
  { hour: "15h", acess: 186 },
  { hour: "16h", acess: 305 },
  { hour: "17h", acess: 237 },
  { hour: "18h", acess: 73 },
  { hour: "19h", acess: 209 },
  { hour: "20h", acess: 214 },
  { hour: "21h", acess: 214 },
  { hour: "22h", acess: 214 },
  { hour: "23h", acess: 214 },
]

const chartConfig = {
  acess: {
    label: "Acessos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Radial() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle>Por hora</CardTitle>
          <Clock className="ml-auto w-6 h-6" />
        </div>
        <CardDescription>Registro de acessos por tag no período de 24h</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="acess"
              type="natural"
              stroke="var(--color-acess)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-acess)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
