"use client"

import { usePathname } from "next/navigation"
import SidebarDemo from '@/components/SidebarDemo';
import {
  MdOutlineInventory2,     // Production Planning
  MdSettings,              // Material Planning
  MdLocalShipping,         // Distribution Planning
  MdOutlineStoreMallDirectory, // Omni-Channel Planning
  MdOutlineReplayCircleFilled  // Reverse Logistics
} from 'react-icons/md';
const sidebarMenu = [
 
  {
    id: 9,
    name: 'Production Planning',
    to: "/planning/prodPlan",
   icon: <MdOutlineInventory2 className="size-7" />,
  },
  {
    id: 10,
    name: 'Material Planning',
    to: "/planning/mrp",
    icon: <MdSettings className="size-7" />,
  },
  {
    id: 11,
    name: 'Distribution Planning',
    to: "/planning/drp",
    icon: <MdLocalShipping className="size-7" />,
  },
  {
    id: 12,
    name: 'Omni-Channel Planning',
    to: "/planning/omni",
    icon: <MdOutlineStoreMallDirectory className="size-7" />,
  },
  {
    id: 13,
    name: 'Reverse Logistics',
    to: "/planning/reverse",
    icon: <MdOutlineReplayCircleFilled className="size-7" />,
  },


];

export default function Layout({children}:{children:React.ReactNode}) {
  const pathname = usePathname()

  return (
    <div>


        <SidebarDemo
          sidebarMenu={sidebarMenu}
        />

        <div className="pl-[90px] mx-4">
          {children}
        </div>
      </div>
 
  );
}
