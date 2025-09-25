"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ChartContainerHome from "@/components/chart-container"
import DateRangeToolbar from "@/components/date-picker"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ListContact } from "@/components/list-contact"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PanelLeftIcon } from "lucide-react"
export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <Provider store={store}>
            <div className="flex min-h-screen bg-background text-foreground">
                {/* Sidebar */}
                <div className="flex flex-col h-full p-4">
                    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <AppSidebar />
                    </SidebarProvider>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <Button
                        variant="ghost"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-12 h-12 max-[770px]:hidden">
                        <PanelLeftIcon size={24} />
                    </Button>

                    {/* Date Range Toolbar */}
                    <DateRangeToolbar />
                    <div className="flex-1 flex flex-col px-4 md:px-16 lg:px-40 py-4 gap-4">
                        <ChartContainerHome />
                        <ListContact />
                    </div>
                </div>
            </div>
        </Provider>
    )
}
