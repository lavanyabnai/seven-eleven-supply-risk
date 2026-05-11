import React from "react";

import { HeaderBlue } from "@/components/HeaderBlue";

interface InventoryLayoutProps {
  children: React.ReactNode;
}

export default function InventoryLayout({ children }: InventoryLayoutProps) {
  return (
    <div className="h-screen">
      <HeaderBlue />
      <div className="pt-[59px] w-full h-full overflow-y-auto">
      {children}
      </div>
    </div>
  );
}