"use client"

import {
  Sparkles,
  Map,
  DollarSign,
  BarChart3,
  ShieldCheck,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const sidebarMenu = [
  {
    id: 1,
    name: "AI",
    icon: Sparkles,
    to: "/net-optimize/ai",
  },
  {
    id: 2,
    name: "Network View",
    icon: Map,
    to: "/net-optimize/map",
  },
  {
    id: 3,
    name: "Cost to Serve",
    icon: DollarSign,
    to: "/net-optimize/cost-to-serve",
  },
  {
    id: 4,
    name: "Sensitivity Analysis",
    icon: BarChart3,
    to: "/net-optimize/sensitivity-analysis",
  },
  {
    id: 5,
    name: "Risk Mitigation",
    icon: ShieldCheck,
    to: "/net-optimize/risk-mitigation",
  },
  {
    id: 6,
    name: "Transport",
    icon: Truck,
    to: "/net-optimize/transportation",
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div>
      <div className="fixed top-[59px] left-0 bottom-0 w-[90px] bg-white border-r overflow-y-auto">
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
                    isActive ? "text-[#00e682]" : "text-black hover:text-black",
                    "group flex flex-col items-center rounded-md p-2 overflow-x-hidden"
                  )}
                >
                  <div
                    className={classNames(
                      "flex h-12 w-12 items-center justify-center rounded-md",
                      isActive ? "bg-black text-[#00e682]" : "text-black"
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

      <div className="pl-[90px] mx-4">
        {children}
      </div>
    </div>
  )
}
