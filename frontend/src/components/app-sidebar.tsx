"use client"

import * as React from "react"
import {
  Home,
  Contact,
  Settings,
  Heart,
  GalleryVerticalEnd,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "To Quoc Thanh",
    email: "thanhtovntmk@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Full stack Intern",
      logo: GalleryVerticalEnd,
      plan: "Full stack Intern",
    },
    {
      name: "Full stack Intern 2",
      logo: GalleryVerticalEnd,
      plan: "Full stack Intern 2",
    },
  ],
  navMain: [
    {
      title: "Favorites",
      url: "#",
      icon: Heart,
      isActive: true,
      items: [
        {
          title: "Google",
          url: "#",
          img_url: "/google-icon.svg",
        },
        {
          title: "Microsoft",
          url: "#",
          img_url: "/microsoft-icon.svg",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "#",
      icon: Home,
    },
    {
      name: "Contacts",
      url: "#",
      icon: Contact,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
