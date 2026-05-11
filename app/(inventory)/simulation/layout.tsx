"use client"

import {
  Workflow,
  Link2,
  Globe,
  PackageCheck,
  Building2,
  Warehouse,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const sidebarMenu = [
  // {
  //   id: 1,
  //   name: "Workflow Builder",
  //   icon: Workflow,
  //   to: "/simulation/work-bulider",
  // },
  {
    id: 2,
    name: "Supply Chain Simulation",
    icon: Link2,
    to: "/simulation/supplyChain",
  },
  {
    id: 3,
    name: "International Supply Chain",
    icon: Globe,
    to: "/simulation/international",
  },
  {
    id: 4,
    name: "Inventory Policy",
    icon: PackageCheck,
    to: "/simulation/invPolicy",
  },
  {
    id: 5,
    name: "Distribution Center",
    icon: Building2,
    to: "/simulation/dc",
  },
  {
    id: 6,
    name: "Warehouse",
    icon: Warehouse,
    to: "/simulation/warehouse",
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
  )
}
