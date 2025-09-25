"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ChartContainerHome from "@/components/chart-container"
import DateRangeToolbar from "@/components/date-picker"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ListContact } from "@/components/list-contact"
import { HiMenu, HiX } from "react-icons/hi"

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <Provider store={store}>
            <div className="flex min-h-screen bg-background text-foreground">
                {/* Sidebar */}
                <div
                    className={`
                        fixed top-0 left-0 h-screen bg-muted z-50
                        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        transition-transform duration-300 ease-in-out
                        w-64 md:relative md:h-auto md:translate-x-0
                    `}>
                    <div className="flex flex-col h-full p-4">
                        <div className="flex justify-between md:hidden mb-4">
                            <h2 className="text-lg font-bold">Menu</h2>
                            <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
                                <HiX size={20} />
                            </Button>
                        </div>
                        <nav className="mt-4 space-y-2 flex-1">
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
                </div>



                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <DateRangeToolbar />
                    <div className="md:hidden absolute right-4 z-50">
                        <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
                            <HiMenu size={24} />
                        </Button>
                    </div>
                    <div className="flex-1 flex flex-col px-4 md:px-16 lg:px-40 py-4 gap-4">
                        <ChartContainerHome />
                        <ListContact />
                    </div>
                </div>
            </div>
        </Provider>
    )
}
