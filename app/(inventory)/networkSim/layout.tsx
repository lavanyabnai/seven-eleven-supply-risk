import {
  ChartBarIcon,
  TableCellsIcon,
  BuildingLibraryIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"

import SidebarDemo from '@/components/SidebarDemo';

const sidebarMenu = [
  {
    id: 1,
    name: "Map",
    icon: <BuildingLibraryIcon className="size-5" />,
    to: "/risk/map",
  },
  {
    id: 1,
    name: "Map 2",
    icon: <BuildingLibraryIcon className="size-5" />,
    to: "/risk/map2",
  },
  {
    id: 2,
    name: "Input Data",
    icon: <CubeIcon className="size-5" />,
    to: "/risk/analysis",
  },
  {
    id: 3,
    name: "Run Scenario",
    icon: <ClipboardDocumentListIcon className="size-5" />,
    to: "/risk/runScenario",
  },
  {
    id: 4,
    name: "Results Dashboard",
    icon: <ChartBarIcon className="size-5" />,
    to: "/risk/resultDashboard",
  },
  {
    id: 6,
    name: "Visualization",
    icon: <TableCellsIcon className="size-5" />,
    to: "/risk/visualization",
  },
]

export default async function Layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <SidebarDemo
        sidebarMenu={sidebarMenu}
      />
      <main className="mt-10 pl-[56px] mx-4">
        {children}
      </main>
    </div>
  );
}
