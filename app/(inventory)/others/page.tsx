"use client"

import Link from "next/link"
import {
  Map,
  BarChart3,
  Warehouse,
  Truck,
  Globe,
  Flag,
  LayoutDashboard,
  Package,
  ArrowRight,
} from "lucide-react"

const modules = [
  {
    name: "Distribution Network",
    description: "Ferguson DC-to-branch delivery analysis across 9 regional DCs, 5 MDCs, and 1,517 branches nationwide.",
    icon: Map,
    href: "/others/leadMap",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    tag: "Network",
  },
  {
    name: "Route Cost Analysis",
    description: "Transportation cost per ton-mile analysis for Ferguson's DC-to-branch distribution lanes.",
    icon: BarChart3,
    href: "/others/ptpk",
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
    tag: "Cost Analysis",
  },
  {
    name: "DC Costing",
    description: "Distribution center cost modeling for Ferguson's plumbing, HVAC, and waterworks warehouse operations.",
    icon: Warehouse,
    href: "/others/kpi",
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    tag: "Costing",
  },
  {
    name: "Logistics Dashboard",
    description: "Ferguson fleet operations dashboard — 5,900 vehicles, same-day/next-day delivery performance.",
    icon: LayoutDashboard,
    href: "/others/logi",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    tag: "Dashboard",
  },
  {
    name: "Domestic Freight",
    description: "Ferguson US freight cost calculator with ATRI benchmarks for DC-to-branch and jobsite delivery.",
    icon: Truck,
    href: "/others/transportCost",
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
    tag: "USA",
  },
  {
    name: "International Sourcing",
    description: "China import logistics for plumbing fixtures and PVF products — factory to Ferguson import centers.",
    icon: Globe,
    href: "/others/chinavr",
    color: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    tag: "China Import",
  },
  {
    name: "Fleet Analysis",
    description: "Ferguson fleet & transportation analytics — executive, operations, service, and cost dashboards.",
    icon: Flag,
    href: "/others/transAnalysis",
    color: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    tag: "Analysis",
  },
  {
    name: "DC Operations",
    description: "Ferguson distribution center operations — control tower, metrics, cost analysis, and benchmarking.",
    icon: Package,
    href: "/others/warehouseAnalysis",
    color: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    textColor: "text-teal-600",
    borderColor: "border-teal-200",
    tag: "DC Ops",
  },
]

export default function OthersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Ferguson Supply Chain Analytics
          </h1>
          <p className="mt-2 text-base text-slate-500 max-w-2xl">
            Distribution network, transportation costing, DC operations, and international sourcing analytics for Ferguson Enterprises ($31.3B revenue, 1,700+ locations).
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className={`group relative flex flex-col rounded-xl border ${mod.borderColor} bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-transparent`}
              >
                {/* Tag */}
                <span
                  className={`self-start text-[11px] font-semibold uppercase tracking-wider ${mod.textColor} ${mod.bgLight} px-2.5 py-0.5 rounded-full mb-4`}
                >
                  {mod.tag}
                </span>

                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${mod.color} text-white shadow-sm mb-4`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                  {mod.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {mod.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-slate-400 group-hover:text-slate-700 transition-colors">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
