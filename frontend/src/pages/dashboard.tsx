"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ChartContainerHome from "@/components/chart-container"
import DateRangeToolbar from "@/components/date-picker"
import { ListContact } from "@/components/list-contact"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PanelLeftIcon } from "lucide-react"
export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    return (
        // <Provider store={store}>
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <div className="flex flex-col h-full p-4">
                <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <AppSidebar />
                </SidebarProvider>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center max-[770px]:hidden">
                    <Button
                        variant="ghost"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-12 h-12 ">
                        <PanelLeftIcon size={24} />
                    </Button>
                    <span className="font-bold mb-1 ml-2">Overview</span>
                </div>

                {/* Date Range Toolbar */}
                <DateRangeToolbar />
                <div className="flex-1 flex flex-col px-4 md:px-16 lg:px-40 py-4 gap-4">
                    <ChartContainerHome />
                    <ListContact />
                </div>
            </div>
        </div>
        // </Provider>
    )
}
