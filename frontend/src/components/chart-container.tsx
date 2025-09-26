import { HomeChart } from "@/components/home-chart"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useAppSelector } from "@/lib/hooks"

export default function ChartContainerHome() {
  const [type, setType] = useState("people")
  const { totalPeople, totalCompany } = useAppSelector(state => state.chart)
  
  return (
    <div className="border rounded-lg shadow-sm w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center border-b border-border">
        <div className="flex flex-col justify-center basis-full sm:basis-4/5 p-4 sm:p-12">
          <h2 className="text-base sm:text-lg font-semibold">Lead generation</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            New contacts added to the pool.
          </p>
        </div>

        <div className="flex justify-end max-[630px]:justify-center items-center basis-full md:basis-1/5 h-full">
          <ToggleGroup
            type="single"
            value={type}
            onValueChange={(val) => val && setType(val)}
            className="h-full w-full max-w-xs"
          >
            <ToggleGroupItem value="people" className="h-full text-xs sm:text-sm cursor-pointer">
              <div className="flex flex-col items-center gap-1">
                <span>People</span>
                <span>{totalPeople}</span>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem value="company" className="h-full text-xs sm:text-sm cursor-pointer">
              <div className="flex flex-col items-center gap-1">
                <span>Company</span>
                <span>{totalCompany}</span>
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <HomeChart chart_type={type} />
      </div>
    </div>
  )
}
