"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartData } from "@/types/chart"


export function HomeChart({ chartData, config }: { chartData: ChartData[], config: ChartConfig }) {
    return (
        <ChartContainer config={config} className="min-h-[200px] max-h-[400px] w-full px-2">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="time_"
                    tickLine={false}
                    tickMargin={16}
                    axisLine={false}
                    tickFormatter={(value) => {
                        const date = new Date(value) // value dạng "2025-09-25"
                        const month = date.toLocaleString("en-US", { month: "short" }) 
                        const day = date.getDate()
                        return `${month} ${day}`
                    }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="contact" fill="var(--color-contact)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}