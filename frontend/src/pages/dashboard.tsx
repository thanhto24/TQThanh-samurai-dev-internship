import { HomeChart } from "@/components/home-chart";
import { Button } from "@/components/ui/button"
import { useState } from "react"


const data1 = [
  { time_: "2025-09-19", contact: 120 },
  { time_: "2025-09-20", contact: 200 },
  { time_: "2025-09-21", contact: 150 },
  { time_: "2025-09-22", contact: 80 },
  { time_: "2025-09-23", contact: 190 },
  { time_: "2025-09-24", contact: 240 },
  { time_: "2025-09-25", contact: 300 },
]

const data2 = [
  { time_: "January", contact: 100 },
  { time_: "February", contact: 160 },
  { time_: "March", contact: 90 },
  { time_: "April", contact: 220 },
  { time_: "May", contact: 130 },
  { time_: "June", contact: 180 },
  { time_: "July", contact: 250 },
]
export default function DashboardPage() {
    const [data, setData] = useState(data1)
    const [is1, setIs1] = useState(true)

    const toggleData = () => {
        setData(is1 ? data2 : data1)
        setIs1(!is1)
    }
    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
            <Button onClick={toggleData}>
                Show {is1 ? "Data 1" : "Data 2"}
            </Button>
            <div className="w-full max-w-3xl">
                <HomeChart chartData={data} />
            </div>
        </div>
    )
}