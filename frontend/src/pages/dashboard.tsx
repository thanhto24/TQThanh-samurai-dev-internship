"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HomeChart } from "@/components/home-chart"
import DateRangeToolbar from "@/components/date-picker"
import { addDays, format } from "date-fns"

// Lưu data đã random theo ngày
const generatedData: Record<string, number> = {}

function getRandomDataForDate(date: Date): number {
  const key = format(date, "yyyy-MM-dd")
  if (!(key in generatedData)) {
    generatedData[key] = Math.floor(Math.random() * 10)
  }
  return generatedData[key]
}

function generateRangeData(from: Date, to: Date) {
  const days: { time_: string; contact: number }[] = []
  let current = new Date(from)

  while (current <= to) {
    const key = format(current, "yyyy-MM-dd")
    days.push({
      time_: key,
      contact: getRandomDataForDate(current),
    })
    current = addDays(current, 1)
  }

  return days
}

export default function DashboardPage() {
  const [data, setData] = useState<{ time_: string; contact: number }[]>([])

  // callback nhận range từ DateRangeToolbar
  const handleRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      const newData = generateRangeData(range.from, range.to)
      setData(newData)
      console.log("Generated data:", newData)
      console.log("Range:", range.from, "to", range.to)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-muted w-64 p-4 flex flex-col">
        <nav className="mt-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <DateRangeToolbar onRangeChange={handleRangeChange} />
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>

        <div className="flex flex-col gap-8 w-full max-w-4xl">
          <div className="w-full">
            <HomeChart chartData={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
