import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const invoices = [
  {
    Carrier: "Carrier 5",
    Compliance: "6%",
    color: "bg-green-500",
  },
  {
    Carrier: "Carrier 2",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 50",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 53",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 33",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 26",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 14",
    Compliance: "8%",
    color: "bg-green-700",
  },
  {
    Carrier: "Carrier 8",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 29",
    Compliance: "1%",
    color: "bg-red-600",
  },
  {
    Carrier: "Carrier 13",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 12",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 55",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 38",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 35",
    Compliance: "1%",
    color: "bg-red-600",
  },
  {
    Carrier: "Carrier 3",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 27",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 47",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "Carrier 51",
    Compliance: "0%",
    color: "bg-red-800",
  },
  {
    Carrier: "OTHERS",
    Compliance: "2%",
    color: "bg-red-500",
  },
];

export default function PrimeTender() {
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle className="text-3xl font-bold text-black">Prime Tender Acceptance Heatmap</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Carriers</TableHead>
              <TableHead className="text-right w-1/2">Compliance%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.Carrier}>
                <TableCell className="font-medium">{invoice.Carrier}</TableCell>
                <TableCell className={`text-right text-white ${invoice.color}`}>
                  {invoice.Compliance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Grand Total</TableCell>
              <TableCell className="text-right">2%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
