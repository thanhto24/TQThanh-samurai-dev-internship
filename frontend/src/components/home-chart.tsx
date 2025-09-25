"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const chartConfig = {
    contact: {
        label: "Contacts",
        theme: {
            light: "#2563eb",
            dark: "#dc2626",
        },
    },
} satisfies ChartConfig

export function HomeChart({ chartData }: { chartData: { time_: string; contact: number }[] }) {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="time_"
                    tickLine={false}
                    tickMargin={10}
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
