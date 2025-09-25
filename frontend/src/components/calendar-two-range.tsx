"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

export default function HomeCalendar() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    // 30 days ago
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
    />
  )
}
