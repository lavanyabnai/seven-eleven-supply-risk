"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function SidebarDemo({ sidebarMenu }: { sidebarMenu: any }) {
  const pathname = usePathname()

  return (
    <div className="fixed top-[59px] left-0 bottom-0 w-[90px] bg-white border-r overflow-y-auto">
      <nav aria-label="Sidebar" className="py-2">
        <div className="flex flex-col space-y-1 px-2">
          {sidebarMenu?.map((item: any, index: number) => (
            <Link
              href={item.to}
              key={index}
              className={classNames(
                pathname === item.to ? "text-[#00e682]" : "text-black hover:text-black",
                "group flex flex-col items-center rounded-md p-2",
                "overflow-x-hidden"
              )}
            >
              <div
                className={classNames(
                  "flex h-12 w-12 items-center justify-center rounded-md",
                  pathname === item.to ? "bg-black text-[#00e682]" : "text-black",
                )}
              >
                {item.icon}
              </div>
              <span className="mt-1 text-center text-[12px] font-medium">{item?.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
