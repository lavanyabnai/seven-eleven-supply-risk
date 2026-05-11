"use client"

import {
  BarChart3,
  Database,
  Map,
  GitBranch,
  Play,
  Bot,
  Settings,
  Activity,
  SearchCheck,
  Radio,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const sidebarMenu = [
  {
    id: 1,
    name: "Network View",
    icon: Map,
    to: "/risk/map",
  },
  {
    id: 2,
    name: "Product Flow",
    icon: GitBranch,
    to: "/risk/productFlow",
  },
  {
    id: 3,
    name: "Master Data",
    icon: Database,
    to: "/risk/analysis",
  },
  {
    id: 4,
    name: "Run Scenario",
    icon: Play,
    to: "/risk/runScenario",
  },
  {
    id: 5,
    name: "Results Dashboard",
    icon: BarChart3,
    to: "/risk/resultDashboard",
  },
  {
    id: 6,
    name: "Diagnostic",
    icon: Activity,
    to: "/risk/diagnostic",
  },
  {
    id: 7,
    name: "Root Cause",
    icon: SearchCheck,
    to: "/risk/rootcause",
  },
  {
    id: 8,
    name: "Control Tower",
    icon: Radio,
    to: "/risk/controlTower",
  },
  // {
  //   id: 7,
  //   name: "Command Center",
  //   icon: Bot,
  //   to: "/risk/command-center",
  // },
  // {
  //   id: 8,
  //   name: "Settings",
  //   icon: Settings,
  //   to: "/risk/settings",
  // },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="w-[90px] shrink-0 bg-white border-r overflow-y-auto">
        <nav aria-label="Sidebar" className="py-2">
          <div className="flex flex-col space-y-1 px-2">
            {sidebarMenu.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.to
              return (
                <Link
                  key={item.id}
                  href={item.to}
                  prefetch={true}
                  className={classNames(
                    isActive ? "text-[#198754]" : "text-black hover:text-black",
                    "group flex flex-col items-center rounded-md p-2 overflow-x-hidden"
                  )}
                >
                  <div
                    className={classNames(
                      "flex h-12 w-12 items-center justify-center rounded-md",
                      isActive ? "bg-black text-[#198754]" : "text-black"
                    )}
                  >
                    <Icon className="size-7" />
                  </div>
                  <span className="mt-1 text-center text-[12px] font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
