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
  import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
  import { FaXmark } from "react-icons/fa6";
  const invoices = [
    {
      PickUp: "Location 1021",
      Delivery: "Location 2",
      Carrier: "Carrier 12",
      LoadID: "0001047600",
      WeeekNumber: "23",
      Volume: "2,787",
      weight: "25,145",
      utilization: "65%",

    },
    {
        LoadID: "0001047714",
        WeeekNumber: "23",
      Volume: "2,857",
      weight: "25,623",
      utilization: "66%",
    },
    {
        LoadID: "0001047716",
        WeeekNumber: "23",
        Volume: "2,291",
        weight: "33,454",
        utilization: "86%",
    },
    {
        LoadID: "0001047735",
        WeeekNumber: "23",
        Volume: "2,876",
        weight: "25,881",
        utilization: "67%",
    },
    {
        LoadID: "0001047736",
        WeeekNumber: "23",
        Volume: "2,180",
        weight: "33,358",
        utilization: "86%",
    },
    {
        LoadID: "0001047779",
        WeeekNumber: "23",
        Volume: "2,857",
        weight: "25,623",
        utilization: "66%",
    },
    {
        LoadID: "0001048034",
        WeeekNumber: "23",
        Volume: "2,591",
        weight: "24,708",
        utilization: "64%",
        },
    {
        LoadID: "0001048050",
        WeeekNumber: "23",
        Volume: "2,180",
        weight: "33,358",
        utilization: "86%",
    },  
    {
        LoadID: "0001048057",
        WeeekNumber: "23",
        Volume: "2,429",
        weight: "24,471",
        utilization: "63%",
    },
    {
        LoadID: "0001048071",
        WeeekNumber: "23",
        Volume: "2,789",
        weight: "26,664",
        utilization: "69%",
        },
    {
        LoadID: "0001048190",
        WeeekNumber: "23",
        Volume: "2,180",
        weight: "33,358",
        utilization: "86%",
    },  
    {
        LoadID: "0001048194",
        WeeekNumber: "23",
        Volume: "2,375",
        weight: "20,926",
        utilization: "54%",
    },      
  ]
  
  export function UtilizationDeep() {

    return (
    <Card className="p-4">

<CardHeader className="flex">
        <CardTitle >Utilization - Deep Drive</CardTitle>
        <CardDescription>
            Based on carrier pick up time 
      </CardDescription>
      </CardHeader>
        <CardContent>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">PickUp Location City</TableHead>
            <TableHead className="">Delivery Location City</TableHead>
            <TableHead className="">Carrier Name</TableHead>
            <TableHead className="">Load ID</TableHead>
            <TableHead className="">Volume</TableHead>
            <TableHead className="">Weight</TableHead>
            <TableHead className="">Utilization</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.LoadID}>
                 <TableCell className="">{invoice.PickUp}</TableCell>
                 <TableCell className="">{invoice.Delivery}</TableCell>
                 <TableCell className="">{invoice.Carrier}</TableCell>
              <TableCell className="">{invoice.LoadID}</TableCell>
              <TableCell className="">{invoice.Volume}</TableCell>
              <TableCell className="">{invoice.weight}</TableCell>
              <TableCell className="">{invoice.utilization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
      </Card>
    )
  }
  