"use client"

import { useState } from "react"
import { Bar, BarChart } from "recharts"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Top20CarriersTab() {
  const [activeTab, setActiveTab] = useState("overview")

  // Data from the image
  const carriers = [
    {
      id: 1,
      name: "Carrier5",
      totalSpend: 8747000,
      tenderAcceptRate: 6,
      valueLost: 1189000,
      spendPerMile: 2.08,
      shipments: 1632,
      weightPerShipment: 32975,
      volumePerShipment: 1627,
      isHighCost: false,
    },
    {
      id: 2,
      name: "Carrier2",
      totalSpend: 3146000,
      tenderAcceptRate: 0,
      valueLost: 712000,
      spendPerMile: 2.78,
      shipments: 509,
      weightPerShipment: 32975,
      volumePerShipment: 1574,
      isHighCost: false,
    },
    {
      id: 3,
      name: "Carrier50",
      totalSpend: 1471000,
      tenderAcceptRate: 0,
      valueLost: 514000,
      spendPerMile: 1.69,
      shipments: 417,
      weightPerShipment: 29071,
      volumePerShipment: 1479,
      isHighCost: false,
    },
    {
      id: 4,
      name: "Carrier53",
      totalSpend: 1042000,
      tenderAcceptRate: 0,
      valueLost: 244000,
      spendPerMile: 2.32,
      shipments: 291,
      weightPerShipment: 33553,
      volumePerShipment: 1613,
      isHighCost: false,
    },
    {
      id: 5,
      name: "Carrier33",
      totalSpend: 818000,
      tenderAcceptRate: 0,
      valueLost: 210000,
      spendPerMile: 2.62,
      shipments: 234,
      weightPerShipment: 36647,
      volumePerShipment: 1918,
      isHighCost: false,
    },
    {
      id: 6,
      name: "Carrier26",
      totalSpend: 665000,
      tenderAcceptRate: 0,
      valueLost: 33000,
      spendPerMile: 2.77,
      shipments: 246,
      weightPerShipment: 39094,
      volumePerShipment: 1773,
      isHighCost: false,
    },
    {
      id: 7,
      name: "Carrier14",
      totalSpend: 624000,
      tenderAcceptRate: 8,
      valueLost: 36000,
      spendPerMile: 1.63,
      shipments: 342,
      weightPerShipment: 37804,
      volumePerShipment: 1992,
      isHighCost: false,
    },
    {
      id: 8,
      name: "Carrier8",
      totalSpend: 568000,
      tenderAcceptRate: 0,
      valueLost: 0,
      spendPerMile: 13.16,
      shipments: 2272,
      weightPerShipment: 29314,
      volumePerShipment: 2112,
      isHighCost: true,
    },
    {
      id: 9,
      name: "Carrier29",
      totalSpend: 527000,
      tenderAcceptRate: 1,
      valueLost: 18000,
      spendPerMile: 1.66,
      shipments: 330,
      weightPerShipment: 38520,
      volumePerShipment: 2018,
      isHighCost: false,
    },
    {
      id: 10,
      name: "Carrier13",
      totalSpend: 367000,
      tenderAcceptRate: 0,
      valueLost: 50000,
      spendPerMile: 3.94,
      shipments: 198,
      weightPerShipment: 40015,
      volumePerShipment: 1812,
      isHighCost: true,
    },
    {
      id: 11,
      name: "Carrier12",
      totalSpend: 359000,
      tenderAcceptRate: 0,
      valueLost: 0,
      spendPerMile: 2.04,
      shipments: 339,
      weightPerShipment: 26764,
      volumePerShipment: 2526,
      isHighCost: false,
    },
    {
      id: 12,
      name: "Carrier55",
      totalSpend: 339000,
      tenderAcceptRate: 0,
      valueLost: 69000,
      spendPerMile: 2.36,
      shipments: 78,
      weightPerShipment: 34966,
      volumePerShipment: 1747,
      isHighCost: false,
    },
    {
      id: 13,
      name: "Carrier38",
      totalSpend: 206000,
      tenderAcceptRate: 0,
      valueLost: 44000,
      spendPerMile: 2.79,
      shipments: 111,
      weightPerShipment: 34351,
      volumePerShipment: 1674,
      isHighCost: false,
    },
    {
      id: 14,
      name: "Carrier35",
      totalSpend: 202000,
      tenderAcceptRate: 1,
      valueLost: 55000,
      spendPerMile: 2.17,
      shipments: 64,
      weightPerShipment: 32929,
      volumePerShipment: 1354,
      isHighCost: false,
    },
    {
      id: 15,
      name: "Carrier3",
      totalSpend: 146000,
      tenderAcceptRate: 0,
      valueLost: 17000,
      spendPerMile: 3.05,
      shipments: 70,
      weightPerShipment: 34460,
      volumePerShipment: 1774,
      isHighCost: false,
    },
    {
      id: 16,
      name: "Carrier27",
      totalSpend: 137000,
      tenderAcceptRate: 0,
      valueLost: 20000,
      spendPerMile: 2.35,
      shipments: 151,
      weightPerShipment: 31386,
      volumePerShipment: 2405,
      isHighCost: false,
    },
    {
      id: 17,
      name: "Carrier47",
      totalSpend: 3000,
      tenderAcceptRate: 0,
      valueLost: 0,
      spendPerMile: 1.42,
      shipments: 2,
      weightPerShipment: 40996,
      volumePerShipment: 2235,
      isHighCost: false,
    },
    {
      id: 18,
      name: "Carrier51",
      totalSpend: 77000,
      tenderAcceptRate: 0,
      valueLost: 10000,
      spendPerMile: 2.68,
      shipments: 55,
      weightPerShipment: 39845,
      volumePerShipment: 2318,
      isHighCost: false,
    },
    {
      id: 19,
      name: "OTHERS",
      totalSpend: 9540000,
      tenderAcceptRate: 2,
      valueLost: 103000,
      spendPerMile: 0.64,
      shipments: 1476,
      weightPerShipment: 28954,
      volumePerShipment: 4028,
      isHighCost: false,
    },
    {
      id: 20,
      name: "Grand Total",
      totalSpend: 19997000,
      tenderAcceptRate: 2,
      valueLost: 3321000,
      spendPerMile: 2.1,
      shipments: 8717,
      weightPerShipment: 32101,
      volumePerShipment: 2257,
      isHighCost: false,
    },
  ]

  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    } else if (value === 0) {
      return "$0K"
    }
    return `$${value.toFixed(2)}`
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  // Format decimal values
  const formatDecimal = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  // Get max values for scaling charts
  const maxTotalSpend = Math.max(...carriers.map((c) => c.totalSpend))
  const maxValueLost = Math.max(...carriers.map((c) => c.valueLost))
  const maxSpendPerMile = Math.max(...carriers.map((c) => c.spendPerMile))
  const maxShipments = Math.max(...carriers.map((c) => c.shipments))
  const maxWeight = Math.max(...carriers.map((c) => c.weightPerShipment))
  const maxVolume = Math.max(...carriers.map((c) => c.volumePerShipment))

  return (
  <div>
      <div className="my-2 p-4 rounded-lg border bg-white">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display ">
                      Overview of Top 20 Carriers
                    </h2>
                </div>
    <Card className="">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Carriers</TableHead>
                <TableHead className="font-semibold">Total Spend</TableHead>
                <TableHead className="font-semibold">Prime Tender Acceptance Rate</TableHead>
                <TableHead className="font-semibold">Value Lost</TableHead>
                <TableHead className="font-semibold">Total Spend/mile</TableHead>
                <TableHead className="font-semibold"># of Shipments</TableHead>
                <TableHead className="font-semibold">Weight per Shipment (lb)</TableHead>
                <TableHead className="font-semibold">Volume per Shipment (cu ft)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carriers.map((carrier) => (
                <TableRow
                  key={carrier.id}
                  className={
                    carrier.name === "Grand Total"
                      ? "font-medium border-t-2"
                      : carrier.name === "OTHERS"
                        ? "font-medium"
                        : ""
                  }
                >
                  <TableCell>{carrier.name}</TableCell>

                  {/* Total Spend */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          totalSpend: {
                            label: "Total Spend",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ totalSpend: carrier.totalSpend / maxTotalSpend }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="totalSpend" fill="var(--color-totalSpend)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{formatCurrency(carrier.totalSpend)}</span>
                    </div>
                  </TableCell>

                  {/* Prime Tender Acceptance Rate */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          tenderRate: {
                            label: "Tender Rate",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ tenderRate: carrier.tenderAcceptRate / 100 }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="tenderRate" fill="var(--color-tenderRate)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{formatPercentage(carrier.tenderAcceptRate)}</span>
                    </div>
                  </TableCell>

                  {/* Value Lost */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          valueLost: {
                            label: "Value Lost",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ valueLost: carrier.valueLost / maxValueLost }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="valueLost" fill="var(--color-valueLost)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{formatCurrency(carrier.valueLost)}</span>
                    </div>
                  </TableCell>

                  {/* Total Spend/mile */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          spendPerMile: {
                            label: "Spend Per Mile",
                            color: carrier.isHighCost ? "hsl(0, 84%, 60%)" : "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ spendPerMile: carrier.spendPerMile / maxSpendPerMile }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="spendPerMile" fill="var(--color-spendPerMile)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{formatDecimal(carrier.spendPerMile)}</span>
                    </div>
                  </TableCell>

                  {/* # of Shipments */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          shipments: {
                            label: "Shipments",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ shipments: carrier.shipments / maxShipments }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="shipments" fill="var(--color-shipments)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{carrier.shipments.toLocaleString()}</span>
                    </div>
                  </TableCell>

                  {/* Weight per Shipment */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          weight: {
                            label: "Weight",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ weight: carrier.weightPerShipment / maxWeight }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="weight" fill="var(--color-weight)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{carrier.weightPerShipment.toLocaleString()}</span>
                    </div>
                  </TableCell>

                  {/* Volume per Shipment */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <ChartContainer
                        config={{
                          volume: {
                            label: "Volume",
                            color: "hsl(210, 79%, 65%)",
                          },
                        }}
                        className="w-24 h-6"
                      >
                        <BarChart
                          data={[{ volume: carrier.volumePerShipment / maxVolume }]}
                          layout="horizontal"
                          barSize={12}
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <Bar dataKey="volume" fill="var(--color-volume)" radius={2} />
                        </BarChart>
                      </ChartContainer>
                      <span>{carrier.volumePerShipment.toLocaleString()}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      
      </CardContent>
    </Card>
    </div>
  )
}

