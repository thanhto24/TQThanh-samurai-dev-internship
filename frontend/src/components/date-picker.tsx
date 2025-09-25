"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/hooks"
import { setRange } from "@/lib/features/chartSlice"
import type { DateRange } from "react-day-picker"

const presets = [
    { label: "1d", days: 1 },
    { label: "7d", days: 7 },
    { label: "30d", days: 30 },
]

export default function DateRangeToolbar() {
    const dispatch = useAppDispatch()
    const [range, setLocalRange] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
    })
    const [active, setActive] = useState<string>("30d")

    const setPreset = (label: string, days: number) => {
        const today = new Date()
        const from = new Date(today)
        from.setDate(today.getDate() - (days - 1))
        const newRange = { from, to: today }
        setLocalRange(newRange)
        dispatch(setRange({ from: from.toISOString(), to: today.toISOString() }))
        setActive(label)
    }

    const handleSelect = (selected: DateRange | undefined) => {
        setLocalRange(selected)
        if (selected?.from && selected?.to) {
            dispatch(setRange({ from: selected.from.toISOString(), to: selected.to.toISOString() }))
        }
    }

    
    return (
        <div className="flex items-center gap-2 border-b border-border p-2">
            {/* Preset buttons */}
            {presets.map((p) => (
                <Button
                    key={p.label}
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "rounded-none border-b-2 border-transparent",
                        active === p.label && "border-primary font-semibold"
                    )}
                    onClick={() => setPreset(p.label, p.days)}
                >
                    {p.label}
                </Button>
            ))}
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "rounded-none border-b-2 border-transparent",
                    active === "Custom_only_display" && "border-primary font-semibold"
                )}
                onClick={() => setActive("Custom_only_display")}
            >
                Custom
            </Button>
            {/* Custom calendar */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "rounded-none border-b-2 border-transparent",
                            active === "Custom" && "border-primary font-semibold"
                        )}
                        onClick={() => setActive("Custom")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {range?.from ? (
                            range.to ? (
                                <>
                                    {format(range.from, "MMM dd, yyyy")} -{" "}
                                    {format(range.to, "MMM dd, yyyy")}
                                </>
                            ) : (
                                format(range.from, "MMM dd, yyyy")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={range?.from}
                        selected={range}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
