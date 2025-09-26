"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useAppSelector } from "@/lib/hooks"

// Cấu hình chart
const chartConfigs: Record<"people" | "company", ChartConfig> = {
    people: {
        contact: {
            label: "Contacts",
            theme: { light: "#dc2626", dark: "#2563eb" },
        },
    },
    company: {
        contact: {
            label: "Contacts",
            theme: { light: "#27d1a6ff", dark: "#16a34a" },
        },
    },
}

export function HomeChart({ chart_type }: { chart_type: string }) {
    // Lấy data từ store
    const { peopleData, companyData } = useAppSelector(state => state.chart)
    const chartData = chart_type === "people" ? peopleData : companyData
    const config = chart_type === "people" ? chartConfigs.people : chartConfigs.company
    // console.log("Chart data:", chartData)
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
                        const date = new Date(value)
                        const month = date.toLocaleString("en-US", { month: "short" })
                        return `${month} ${date.getDate()}`
                    }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="contact" fill="var(--color-contact)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
