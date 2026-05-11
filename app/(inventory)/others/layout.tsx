"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Map,
  BarChart3,
  Warehouse,
  Truck,
  Globe,
  Flag,
  LayoutDashboard,
  Package
} from "lucide-react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const sidebarMenu = [
  {
    id: 1,
    name: "Distribution Network",
    icon: Map,
    to: "/others/leadMap",
  },
  {
    id: 2,
    name: "Route Costs",
    icon: BarChart3,
    to: "/others/ptpk",
  },
  {
    id: 3,
    name: "DC Costing",
    icon: Warehouse,
    to: "/others/kpi",
  },
  {
    id: 4,
    name: "Logistics Dashboard",
    icon: LayoutDashboard,
    to: "/others/logi",
  },
  {
    id: 5,
    name: "Domestic Freight",
    icon: Truck,
    to: "/others/transportCost",
  },
  {
    id: 6,
    name: "China Import",
    icon: Globe,
    to: "/others/chinavr",
  },
  {
    id: 7,
    name: "Fleet Analysis",
    icon: Flag,
    to: "/others/transAnalysis",
  },
  {
    id: 8,
    name: "DC Operations",
    icon: Package,
    to: "/others/warehouseAnalysis",
  }
]

export default function Layout({children}:{children:React.ReactNode}) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/others"

  if (isLandingPage) {
    return <>{children}</>
  }

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

      <div className="pl-[90px] mx-4">
        {children}
      </div>
    </div>
  );
}
