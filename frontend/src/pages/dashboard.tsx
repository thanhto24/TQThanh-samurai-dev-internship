"use client"

import { Button } from "@/components/ui/button"
import ChartContainerHome from "@/components/chart-container"
import DateRangeToolbar from "@/components/date-picker"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

export default function DashboardPage() {

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
            {/* Chi co Content can data trong redux */}
            <Provider store={store}>

                <div className="flex-1 p-8">
                    <DateRangeToolbar />

                    <div className="flex flex-col gap-8 w-full">
                        <div className="w-full p-6">
                            <ChartContainerHome />
                        </div>
                    </div>
                </div>
            </Provider>
        </div>

    )
}
