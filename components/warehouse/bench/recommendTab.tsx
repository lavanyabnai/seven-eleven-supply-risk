"use client"
import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'


// Ferguson Distribution Centers and Market Distribution Centers — benchmark comparison
const action = [
    {
        title: 'Front Royal VA (Regional DC)',
        slottingAccuracy: 97,
        overtimeHours: 82,
        overtimeHoursPerFTE: 7.5,
        linesProcessedPerFTE: 235,
        otifFulfillmentRate: 97.2,
        ordersShipped: 4800,
        hourlyTruckArrivals: 12,
    },
    {
        title: 'Stockton CA (Regional DC)',
        slottingAccuracy: 96,
        overtimeHours: 88,
        overtimeHoursPerFTE: 8.0,
        linesProcessedPerFTE: 220,
        otifFulfillmentRate: 96.5,
        ordersShipped: 4200,
        hourlyTruckArrivals: 11,
    },
    {
        title: 'Fort Payne AL (Regional DC)',
        slottingAccuracy: 95,
        overtimeHours: 78,
        overtimeHoursPerFTE: 7.8,
        linesProcessedPerFTE: 215,
        otifFulfillmentRate: 96.1,
        ordersShipped: 3900,
        hourlyTruckArrivals: 10,
    },
    {
        title: 'McGregor TX (Regional DC)',
        slottingAccuracy: 94,
        overtimeHours: 95,
        overtimeHoursPerFTE: 8.5,
        linesProcessedPerFTE: 210,
        otifFulfillmentRate: 95.8,
        ordersShipped: 4100,
        hourlyTruckArrivals: 11.5,
    },
    {
        title: 'Richland WA (Regional DC)',
        slottingAccuracy: 93,
        overtimeHours: 72,
        overtimeHoursPerFTE: 7.2,
        linesProcessedPerFTE: 195,
        otifFulfillmentRate: 95.3,
        ordersShipped: 2800,
        hourlyTruckArrivals: 8,
    },
    {
        title: 'Frostproof FL (Regional DC)',
        slottingAccuracy: 94,
        overtimeHours: 90,
        overtimeHoursPerFTE: 8.2,
        linesProcessedPerFTE: 205,
        otifFulfillmentRate: 95.0,
        ordersShipped: 3600,
        hourlyTruckArrivals: 9.5,
    },
    {
        title: 'Houston MDC',
        slottingAccuracy: 96,
        overtimeHours: 105,
        overtimeHoursPerFTE: 9.0,
        linesProcessedPerFTE: 240,
        otifFulfillmentRate: 97.5,
        ordersShipped: 5200,
        hourlyTruckArrivals: 14,
    },
    {
        title: 'Dallas MDC',
        slottingAccuracy: 95,
        overtimeHours: 98,
        overtimeHoursPerFTE: 8.8,
        linesProcessedPerFTE: 230,
        otifFulfillmentRate: 96.8,
        ordersShipped: 4900,
        hourlyTruckArrivals: 13,
    },
    {
        title: 'Aurora CO (Denver MDC)',
        slottingAccuracy: 95,
        overtimeHours: 68,
        overtimeHoursPerFTE: 7.0,
        linesProcessedPerFTE: 225,
        otifFulfillmentRate: 97.0,
        ordersShipped: 3400,
        hourlyTruckArrivals: 9,
    },
    {
        title: 'Phoenix MDC',
        slottingAccuracy: 94,
        overtimeHours: 92,
        overtimeHoursPerFTE: 8.3,
        linesProcessedPerFTE: 218,
        otifFulfillmentRate: 96.2,
        ordersShipped: 3800,
        hourlyTruckArrivals: 10.5,
    },
    {
        title: 'Nashville MDC',
        slottingAccuracy: 96,
        overtimeHours: 85,
        overtimeHoursPerFTE: 7.8,
        linesProcessedPerFTE: 228,
        otifFulfillmentRate: 97.1,
        ordersShipped: 4500,
        hourlyTruckArrivals: 12.5,
    },
    {
        title: 'Brampton ON (Canada MDC)',
        slottingAccuracy: 93,
        overtimeHours: 75,
        overtimeHoursPerFTE: 7.5,
        linesProcessedPerFTE: 190,
        otifFulfillmentRate: 95.5,
        ordersShipped: 2400,
        hourlyTruckArrivals: 7.5,
    },
]




export default function Recommendations() {
    return (
        <>

            <div className="">
                <div className=" text-blue-900 rounded-lg border">


                    <div className="overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                   
                                    <TableHead className='bg-gray-100'>Region</TableHead>
                                    <TableHead className='text-center bg-blue-100'>Slotting Accuracy (%)</TableHead>
                                    <TableHead className='text-center bg-green-100'>Overtime Hours (# of hours)</TableHead>
                                    <TableHead className='text-center bg-yellow-100'>Overtime Hours per FTE (# hours)</TableHead>
                                    <TableHead className='text-center bg-orange-100'>Lines Processed per FTE (#)</TableHead>
                                    <TableHead className='text-center bg-pink-100'>OTIF (%)</TableHead>
                                    <TableHead className='text-center bg-sky-100'>Orders Shipped (#)</TableHead>
                                    <TableHead className='text-center bg-purple-100'>Hourly Truck Arrivals (per hour)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {action.map((invoice) => (
                                    <TableRow key={invoice.title}>
                                        <TableCell className="font-medium text-xs bg-gray-100">
                                            {invoice.title}
                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-blue-100'>
                                            <h1 className='text-blue-500 font-bold '>
                                                {invoice.slottingAccuracy}
                                            </h1>


                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-green-100'>
                                            <h1 className='text-green-500 font-bold'>
                                                {invoice.overtimeHours}
                                            </h1>

                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-yellow-100'>
                                            <h1 className='text-yellow-500 font-bold'>
                                                {invoice.overtimeHoursPerFTE}
                                            </h1>


                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-orange-100'>
                                            <h1 className='text-orange-500 font-bold'>
                                                {invoice.linesProcessedPerFTE}
                                            </h1>



                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-pink-100'>
                                            <h1 className='text-pink-500 font-bold'>
                                                {invoice.otifFulfillmentRate}
                                            </h1>



                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-sky-100'>
                                            <h1 className='text-sky-500 font-bold'>
                                                {invoice.ordersShipped}
                                            </h1>




                                        </TableCell>
                                        <TableCell className='text-center p-1 bg-purple-100'>
                                            <h1 className='text-purple-500 font-bold'>
                                                {invoice.hourlyTruckArrivals}
                                            </h1>




                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        </>
    )
}
