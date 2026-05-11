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
      TransportationMode: "TL",
      WeeekNumber: "23",
      ShipmentCreationDate: "06/01/2015 14:06",
      LoadTenderDate: "06/01/2015 14:06",
      Internal: <FaXmark />,
      External: <FaXmark />,

    },
    {
        LoadID: "0001047714",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/01/2015 20:35",
        LoadTenderDate: "06/01/2015 20:35",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001047716",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/01/2015 20:55",
        LoadTenderDate: "06/01/2015 20:55",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001047735",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 05:36",
        LoadTenderDate: "06/02/2015 05:36",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001047736",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 06:05",
        LoadTenderDate: "06/02/2015 06:05",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001047779",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 09:56",
        LoadTenderDate: "06/02/2015 09:56",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001048034",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 17:15",
        LoadTenderDate: "06/02/2015 17:15",
        Internal: <FaXmark />,
        External: <FaXmark />,
        },
    {
        LoadID: "0001048050",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 20:56",
        LoadTenderDate: "06/02/2015 20:56",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },  
    {
        LoadID: "0001048057",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/02/2015 23:06",
        LoadTenderDate: "06/02/2015 23:06",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },
    {
        LoadID: "0001048071",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/03/2015 07:16",
        LoadTenderDate: "06/03/2015 07:16",
        Internal: <FaXmark />,
        External: <FaXmark />,
        },
    {
        LoadID: "0001048190",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/03/2015 11:56",
        LoadTenderDate: "06/03/2015 11:56",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },  
    {
        LoadID: "0001048194",
        TransportationMode: "TL",
        WeeekNumber: "23",
        ShipmentCreationDate: "06/03/2015 12:06",
        LoadTenderDate: "06/03/2015 12:06",
        Internal: <FaXmark />,
        External: <FaXmark />,
    },      
  ]
  
  export default function DeepDrive() {

    return (
    <Card className="p-4">

<CardHeader className="flex">
<CardTitle className="text-3xl font-bold text-black">
Prime Tender Acceptance - Deep Drive</CardTitle>
<CardDescription className="text-md text-black-500">
            Based on carrier pick up time 
      </CardDescription>
      </CardHeader>
        <CardContent>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">PickUp Location City</TableHead>
            <TableHead>Delivery Location City</TableHead>
            <TableHead>Carrier Name</TableHead>
            <TableHead className="text-center">Load ID</TableHead>
            <TableHead className="text-center">Transportation Mode</TableHead>
            <TableHead className="text-center">Week Number</TableHead>
            <TableHead className="text-center">Shipment Creation Date</TableHead>
            <TableHead className="text-center">Load Tender Date</TableHead>
            <TableHead className="text-center">Internal - Routing Guide Compliance(Carrier pick up time 48 hours)</TableHead>
            <TableHead className="text-center">External - Routing Guide Compliance(Carrier pick up time 48 hours)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.LoadID}>
                 <TableCell className="font-medium">{invoice.PickUp}</TableCell>
                 <TableCell className="font-medium">{invoice.Delivery}</TableCell>
                 <TableCell className="font-medium">{invoice.Carrier}</TableCell>
              <TableCell className="font-medium">{invoice.LoadID}</TableCell>
              <TableCell className="text-center"    >{invoice.TransportationMode}</TableCell>
              <TableCell className="text-center">{invoice.WeeekNumber}</TableCell>
              <TableCell className="text-center">{invoice.ShipmentCreationDate}</TableCell>
              <TableCell className="text-center">{invoice.LoadTenderDate}</TableCell>
              <TableCell className="text-center text-green-700 text-2xl">{invoice.Internal}</TableCell>
              <TableCell className="text-center text-green-200 text-2xl">{invoice.External}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
      </Card>
    )
  }
  