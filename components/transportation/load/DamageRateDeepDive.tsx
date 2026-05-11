import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const invoices = [
    {
      loadId: "0001047600",
      weekNumber: "23",
      loadDropEnd: "6/4/2015",
      loadDropArrival: "6/4/2015",
      difference: "-2",
      onTimeDelivery: "On Time",
    },
    {
        loadId: "0001047714",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047716",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047735",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047736",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047779",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047734",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047750",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047757",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
      {
        loadId: "0001047771",
        weekNumber: "23",
        loadDropEnd: "6/4/2015",
        loadDropArrival: "6/4/2015",
        difference: "-2",
        onTimeDelivery: "On Time",
      },
  ]


export default function OnTimeDeepDive() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>On Time Delivery Deep Dive</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>

      <TableHeader>
        <TableRow>
          <TableHead >Load ID</TableHead>
          <TableHead>Week Number</TableHead>
          <TableHead>Load Drop End</TableHead>
          <TableHead>Load Drop Arrival</TableHead>
          <TableHead>Difference</TableHead>
          <TableHead>On Time Delivery</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.loadId}>
            <TableCell className="font-medium">{invoice.loadId}</TableCell>
            <TableCell>{invoice.weekNumber}</TableCell>
            <TableCell>{invoice.loadDropEnd}</TableCell>
            <TableCell>{invoice.loadDropArrival}</TableCell>
            <TableCell>{invoice.difference}</TableCell>
            <TableCell className="text-center text-green-600">{invoice.onTimeDelivery}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
            </CardContent>
        </Card>
    )
}
