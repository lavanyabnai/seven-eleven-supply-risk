import { cookies } from "next/headers"

import { Mail } from "@/app/(inventory)/mail/components/mail"
import {allTables, cogTables } from '@/app/(inventory)/mail/data';

export default async function MailPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail")
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      <div className=" bg-white">
        <Mail
          allTables={allTables}
          cogTables={cogTables}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed} accounts={[]}          // navCollapsedSize={2}
        />
      </div>
    </>
  );
}
