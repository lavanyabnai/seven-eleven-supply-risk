"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileSidebar } from "@/components/mobile-sidebar";

import {
  ShieldAlert,
  Activity,
  Network,
  ClipboardList,
  Map,
  Radio,
} from "lucide-react"

import { MegaDropdownCategories } from "@/components/mega-dropdown-categories";


export const HeaderBlue = () => {
  const categories = [
    {
      category: "Digital Twin",
      items: [
        {
          name: "Digital Twin",
          description: "A end to end simulation model of your Network",
          to: "/risk/analysis",
          icon: ShieldAlert,
          highlight: true,
          iconBackground: "bg-blue-100",
          iconForeground: "text-blue-700",
        },
        {
          name: "Simulation",
          description: "Manage your simulation",
          to: "/simulation/supplyChain",
          icon: Activity,
          iconBackground: "bg-red-100",
          iconForeground: "text-red-700",
        },
        {
          name: "Network Optimization",
          description: "Manage your Network",
          to: "/net-optimize/map",
          icon: Network,
          iconBackground: "bg-yellow-100",
          iconForeground: "text-yellow-700",
        },
        {
          name: "Supply Chain Planning",
          description: "Manage your Supply Chain",
          to: "/planning/prodPlan",
          icon: ClipboardList,
          iconBackground: "bg-purple-100",
          iconForeground: "text-purple-700",
        },
        {
          name: "Logistics Analyzer",
          description: "Manage your Transportation and Warehousing costs",
          to: "/others/leadMap",
          icon: Map,
          iconBackground: "bg-emerald-100",
          iconForeground: "text-emerald-700",
        },
        {
          name: "Control Tower",
          description: "Monitor and manage your end-to-end supply chain",
          to: "/risk/controlTower",
          icon: Radio,
          iconBackground: "bg-orange-100",
          iconForeground: "text-orange-700",
        },
      ],
    },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="px-6 flex items-center justify-between bg-[#000000] h-[59px]">
        <div className="flex items-center gap-x-2">
          <MobileSidebar />
          <Link href="/" className="flex items-center gap-2">
            <Image className="block lg:hidden" src="/assets/7e-logo-color.svg" alt="logo" width={45} height={60} />
            <Image className="hidden lg:block" src="/assets/7e-logo-color.svg" alt="logo" width={30} height={40} />
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <MegaDropdownCategories categories={categories} />
        </div>
      </nav>
    </header>
  );
};
