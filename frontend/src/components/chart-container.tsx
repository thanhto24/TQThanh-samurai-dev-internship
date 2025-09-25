import { HomeChart } from "@/components/home-chart"
import type { ChartData } from "@/types/chart"
import { useState } from "react"
import type { ChartConfig } from "./ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const peopleChartConfig = {
    contact: {
        label: "Contacts",
        theme: {
            light: "#dc2626",
            dark: "#2563eb",
        },
    },
} satisfies ChartConfig

const companyChartConfig = {
    contact: {
        label: "Contacts",
        theme: {
            light: "#22c55e",
            dark: "#16a34a",
        },
    },
} satisfies ChartConfig

export default function ChartContainerHome({ chartData }: { chartData: ChartData[] }) {
    const [type, setType] = useState("people")
    return (
        <div className="border rounded-lg shadow-sm">
            <div className="flex items-center justify-between h-16 border-b border-border">
                {/* Left 70% */}
                <div className="h-full flex flex-col justify-center px-4 basis-[80%]">
                    <h2 className="text-lg font-semibold">Contacts Over Time</h2>
                    <p className="text-sm text-muted-foreground">Number of contacts added over time</p>
                </div>

                {/* Right 30% - align right */}
                <div className="h-full flex items-center justify-end basis-[20%]">
                    <ToggleGroup
                        type="single"
                        value={type}
                        onValueChange={(val) => val && setType(val)}
                        className="h-full w-full max-w-xs"
                    >
                        <ToggleGroupItem value="people" className="h-full cursor-pointer">
                            People
                        </ToggleGroupItem>
                        <ToggleGroupItem value="company" className="h-full cursor-pointer">
                            Company
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            <div className="p-4">
                {type === "people" ? (
                    <HomeChart chartData={chartData} config={peopleChartConfig} />
                ) : (
                    <HomeChart chartData={chartData} config={companyChartConfig} />
                )}
            </div>
        </div>
    )
}
