// import { cookies } from 'next/headers';


import AlltablesMail from '@/components/risk/AlltablesMail';

export default async function Page() {
  // const layout = (await cookies()).get('react-resizable-panels:layout:mail');
  // const collapsed = (await cookies()).get('react-resizable-panels:collapsed');


  return (
    <div>
      {/* <Mail
        accounts={accounts}
        allTables={allTables}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        cogTables={[]}
      /> */}
      <AlltablesMail />
    </div>
  );
}