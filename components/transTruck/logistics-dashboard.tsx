"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, Truck, Route, ClipboardList, Ship, TruckIcon } from "lucide-react"
import DetailedWorldMap from "@/components/transTruck/detailed-world-map"
import { useState } from "react"

// const countryNames = {
//   afghanistan: "Afghanistan",
//   china: "China",
//   india: "India",
//   usa: "United States",
// }
export default function LogisticsDashboard() {
  const [originCountry, setOriginCountry] = useState("afghanistan")
  const [destinationCountry, setDestinationCountry] = useState("india")
  return (
      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="">
          <TabsTrigger
            value="overall"
            className=""
          >
            Overall
          </TabsTrigger>
          <TabsTrigger
            value="parameters"
            className=""
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger
            value="ocean"
            className=""
          >
            Ocean
          </TabsTrigger>
          <TabsTrigger
            value="lastMile"
            className=""
          >
            Last Mile
          </TabsTrigger>
          <TabsTrigger
            value="cleansheet"
            className=""
          >
            Cleansheet Parameters
          </TabsTrigger>
        </TabsList>

        {/* Overall Tab Content */}
        <TabsContent value="overall" className="">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Origin</h3>
                  <div className="flex space-x-2">
                    <div className="w-full">
                      <Select value={originCountry} onValueChange={setOriginCountry}>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <div className="flex items-center">
                            <div className="w-6 h-4 mr-2 overflow-hidden rounded">
                              <Flag className="w-4 h-4 text-green-600" />
                            </div>
                            <SelectValue placeholder="Select country" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="afghanistan">Afghanistan</SelectItem>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kabul">Kabul</SelectItem>
                          <SelectItem value="beijing">Beijing</SelectItem>
                          <SelectItem value="shanghai">Shanghai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <SelectValue placeholder="Port" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="port1">Port 1</SelectItem>
                          <SelectItem value="port2">Port 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Destination Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Destination</h3>
                  <div className="flex space-x-2">
                    <div className="w-full">
                      <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <div className="flex items-center">
                            <div className="w-6 h-4 mr-2 overflow-hidden rounded">
                              <Flag className="w-4 h-4 text-orange-600" />
                            </div>
                            <SelectValue placeholder="Select country" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="afghanistan">Afghanistan</SelectItem>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                          <SelectValue placeholder="Port" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="port1">Port 1</SelectItem>
                          <SelectItem value="port2">Port 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Types of Goods */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Types of Goods</h3>
                <div className="flex space-x-2">
                  <div className="w-full">
                    <Select defaultValue="container">
                      <SelectTrigger className="w-full bg-gray-50 border border-gray-300">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="container">Container / Teus Shipment</SelectItem>
                        <SelectItem value="bulk">Bulk Shipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Parameters</h3>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fcl" className="border-gray-400" />
                    <Label htmlFor="fcl" className="text-sm">
                      FCL
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lcl" className="border-gray-400" />
                    <Label htmlFor="lcl" className="text-sm">
                      LCL
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="soc" defaultChecked className="border-gray-400" />
                    <Label htmlFor="soc" className="text-sm">
                      SOC
                    </Label>
                  </div>
                  <div className="ml-8 text-sm text-gray-600">% of Truck / Container load</div>
                </div>
              </div>

              {/* Cost Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                  <div className="text-sm text-gray-500">Logistics Cost</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800">$2.2B</div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2 border border-gray-300">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                  <div className="text-sm text-gray-500">Loading Cost</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800">75%</div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2 border border-gray-300">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                  <div className="text-sm text-gray-500">Unloading Cost</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800">80%</div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2 border border-gray-300">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>

              {/* Detailed World Map with Real Routes */}
              <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <DetailedWorldMap
                  selectedOrigin={originCountry}
                  selectedDestination={destinationCountry}
                  className="h-[400px] w-full"
                />
              </div>

              {/* Cleansheet Summary */}
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <ClipboardList className="mr-2 h-5 w-5 text-gray-700" />
                  <h2 className="text-lg font-medium text-gray-800">Cleansheet Summary</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">2,279</div>
                    <div className="text-xs text-gray-500">Cost per ton ($/tGSGW)</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">136,744</div>
                    <div className="text-xs text-gray-500">Cost per Ton-Merge</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">41</div>
                    <div className="text-xs text-gray-500">Cost per trip</div>
                  </div>
                </div>

                {/* Charts */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700">Cost per Trip</h4>
                    <div className="h-[150px] w-full bg-gray-100 relative border border-gray-300 rounded">
                      <div className="absolute bottom-0 left-0 w-1/5 h-[70%] bg-blue-400"></div>
                      <div className="absolute bottom-0 left-[20%] w-1/5 h-[40%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[40%] w-1/5 h-[50%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[60%] w-1/5 h-[10%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[80%] w-1/5 h-[90%] bg-red-400"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div>Variable Cost per Trip</div>
                      <div>Fixed Cost per Trip</div>
                      <div>Admin Cost per Trip</div>
                      <div>Return of Load Cost per Trip</div>
                      <div>Total</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700">Cost per Unit</h4>
                    <div className="h-[150px] w-full bg-gray-100 relative border border-gray-300 rounded">
                      <div className="absolute bottom-0 left-0 w-1/5 h-[70%] bg-blue-400"></div>
                      <div className="absolute bottom-0 left-[20%] w-1/5 h-[40%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[40%] w-1/5 h-[50%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[60%] w-1/5 h-[30%] bg-blue-300"></div>
                      <div className="absolute bottom-0 left-[80%] w-1/5 h-[90%] bg-red-400"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div>Variable Cost</div>
                      <div>Fixed Cost</div>
                      <div>Admin Cost</div>
                      <div>Profit per Unit</div>
                      <div>Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

        {/* Parameters Tab Content */}
        <TabsContent value="parameters" className="mt-4 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-medium text-gray-800">Truck Parameters</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truck-type" className="text-gray-700">
                  Truck Type
                </Label>
                <Select defaultValue="multi-axle">
                  <SelectTrigger id="truck-type" className="bg-gray-50 border border-gray-300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="multi-axle">Multi-Axle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase-cost" className="text-gray-700">
                  Purchase Cost
                </Label>
                <div className="flex items-center">
                  <Input
                    id="purchase-cost"
                    type="text"
                    defaultValue="2300000"
                    className="bg-gray-50 border border-gray-300"
                  />
                  <span className="text-xs text-gray-500 ml-2">including fabrication</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage-with-load" className="text-gray-700">
                  Mileage with Load
                </Label>
                <Input
                  id="mileage-with-load"
                  type="text"
                  defaultValue="4"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage-without-load" className="text-gray-700">
                  Mileage without Load
                </Label>
                <Input
                  id="mileage-without-load"
                  type="text"
                  defaultValue="5"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance" className="text-gray-700">
                  Maintenance
                </Label>
                <Input
                  id="maintenance"
                  type="text"
                  defaultValue="168000"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-gray-700">
                  Capacity
                </Label>
                <Input id="capacity" type="text" defaultValue="60" className="bg-gray-50 border border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annual-distance" className="text-gray-700">
                  Annual Distance
                </Label>
                <Input
                  id="annual-distance"
                  type="text"
                  defaultValue="84000"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Route className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-medium text-gray-800">Route Admin Expenses</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="life" className="text-gray-700">
                  Life
                </Label>
                <Input id="life" type="text" defaultValue="8" className="bg-gray-50 border border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diesel-price" className="text-gray-700">
                  Diesel Price
                </Label>
                <Input id="diesel-price" type="text" defaultValue="76" className="bg-gray-50 border border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loading-unloading" className="text-gray-700">
                  Loading/ Unloading
                </Label>
                <Input
                  id="loading-unloading"
                  type="text"
                  defaultValue="800"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toll" className="text-gray-700">
                  Toll
                </Label>
                <Input id="toll" type="text" defaultValue="3" className="bg-gray-50 border border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="route-expenses" className="text-gray-700">
                  Route Expenses
                </Label>
                <Input
                  id="route-expenses"
                  type="text"
                  defaultValue="10056"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver-expenses" className="text-gray-700">
                  Driver & Cleaner Expenses
                </Label>
                <Input
                  id="driver-expenses"
                  type="text"
                  defaultValue="300000"
                  className="bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tyres" className="text-gray-700">
                  Tyres
                </Label>
                <Input id="tyres" type="text" defaultValue="10" className="bg-gray-50 border border-gray-300" />
              </div>

              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 border border-blue-700 shadow-sm">
                Submit
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-medium text-gray-800">Cleansheet Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">2,279</div>
                  <div className="text-xs text-gray-500">Cost per ton ($/tGSGW)</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">136,744</div>
                  <div className="text-xs text-gray-500">Cost per Ton-Merge</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">41</div>
                  <div className="text-xs text-gray-500">Cost per trip</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-700">Cost per Trip</h4>
                <div className="h-[100px] w-full bg-gray-100 relative border border-gray-300 rounded">
                  {/* Chart placeholder */}
                  <div className="absolute bottom-0 left-0 w-1/5 h-[70%] bg-blue-400"></div>
                  <div className="absolute bottom-0 left-[20%] w-1/5 h-[40%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[40%] w-1/5 h-[50%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[60%] w-1/5 h-[10%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[80%] w-1/5 h-[90%] bg-red-400"></div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-700">Cost per Unit</h4>
                <div className="h-[100px] w-full bg-gray-100 relative border border-gray-300 rounded">
                  {/* Chart placeholder */}
                  <div className="absolute bottom-0 left-0 w-1/5 h-[70%] bg-blue-400"></div>
                  <div className="absolute bottom-0 left-[20%] w-1/5 h-[40%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[40%] w-1/5 h-[50%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[60%] w-1/5 h-[30%] bg-blue-300"></div>
                  <div className="absolute bottom-0 left-[80%] w-1/5 h-[90%] bg-red-400"></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Ocean Tab Content */}
        <TabsContent value="ocean" className="mt-4 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Ship className="mr-2 h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Ocean Freight Parameters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vessel-type" className="text-gray-700">
                    Vessel Type
                  </Label>
                  <Select>
                    <SelectTrigger id="vessel-type" className="bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select vessel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="container">Container Ship</SelectItem>
                      <SelectItem value="bulk">Bulk Carrier</SelectItem>
                      <SelectItem value="tanker">Tanker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container-size" className="text-gray-700">
                    Container Size
                  </Label>
                  <Select defaultValue="40ft">
                    <SelectTrigger id="container-size" className="bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select container size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20ft">20ft Standard</SelectItem>
                      <SelectItem value="40ft">40ft Standard</SelectItem>
                      <SelectItem value="40hc">40ft High Cube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping-line" className="text-gray-700">
                    Shipping Line
                  </Label>
                  <Select>
                    <SelectTrigger id="shipping-line" className="bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select shipping line" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maersk">Maersk</SelectItem>
                      <SelectItem value="msc">MSC</SelectItem>
                      <SelectItem value="cosco">COSCO</SelectItem>
                      <SelectItem value="cma">CMA CGM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transit-time" className="text-gray-700">
                    Transit Time (days)
                  </Label>
                  <Input
                    id="transit-time"
                    type="number"
                    defaultValue="14"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ocean-freight" className="text-gray-700">
                    Ocean Freight Cost
                  </Label>
                  <Input
                    id="ocean-freight"
                    type="text"
                    defaultValue="1200"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terminal-handling" className="text-gray-700">
                    Terminal Handling Charges
                  </Label>
                  <Input
                    id="terminal-handling"
                    type="text"
                    defaultValue="250"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentation" className="text-gray-700">
                    Documentation Fee
                  </Label>
                  <Input
                    id="documentation"
                    type="text"
                    defaultValue="100"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customs-clearance" className="text-gray-700">
                    Customs Clearance
                  </Label>
                  <Input
                    id="customs-clearance"
                    type="text"
                    defaultValue="150"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 border border-blue-700 shadow-sm">
                  Calculate Ocean Costs
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <h3 className="text-md font-medium text-gray-800 mb-4">Ocean Freight Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">$1,700</div>
                  <div className="text-xs text-gray-500">Total Ocean Freight Cost</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">14 days</div>
                  <div className="text-xs text-gray-500">Transit Time</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">$42.50</div>
                  <div className="text-xs text-gray-500">Cost per Ton</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Last Mile Tab Content */}
        <TabsContent value="lastMile" className="mt-4 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="mr-2 h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Last Mile Delivery</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-zone" className="text-gray-700">
                    Delivery Zone
                  </Label>
                  <Select>
                    <SelectTrigger id="delivery-zone" className="bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urban</SelectItem>
                      <SelectItem value="suburban">Suburban</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-distance" className="text-gray-700">
                    Delivery Distance (km)
                  </Label>
                  <Input
                    id="delivery-distance"
                    type="number"
                    defaultValue="25"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-vehicle" className="text-gray-700">
                    Delivery Vehicle
                  </Label>
                  <Select defaultValue="truck">
                    <SelectTrigger id="delivery-vehicle" className="bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="van">Delivery Van</SelectItem>
                      <SelectItem value="truck">Light Truck</SelectItem>
                      <SelectItem value="heavy">Heavy Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-time" className="text-gray-700">
                    Delivery Time (hours)
                  </Label>
                  <Input
                    id="delivery-time"
                    type="number"
                    defaultValue="2"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fuel-cost" className="text-gray-700">
                    Fuel Cost
                  </Label>
                  <Input id="fuel-cost" type="text" defaultValue="45" className="bg-gray-50 border border-gray-300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver-cost" className="text-gray-700">
                    Driver Cost
                  </Label>
                  <Input id="driver-cost" type="text" defaultValue="30" className="bg-gray-50 border border-gray-300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handling-cost" className="text-gray-700">
                    Handling Cost
                  </Label>
                  <Input
                    id="handling-cost"
                    type="text"
                    defaultValue="25"
                    className="bg-gray-50 border border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-cost" className="text-gray-700">
                    Administrative Cost
                  </Label>
                  <Input id="admin-cost" type="text" defaultValue="15" className="bg-gray-50 border border-gray-300" />
                </div>

                <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 border border-blue-700 shadow-sm">
                  Calculate Last Mile Costs
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <h3 className="text-md font-medium text-gray-800 mb-4">Last Mile Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">$115</div>
                  <div className="text-xs text-gray-500">Total Last Mile Cost</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">$4.60</div>
                  <div className="text-xs text-gray-500">Cost per Kilometer</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                  <div className="text-2xl font-bold text-gray-800">$57.50</div>
                  <div className="text-xs text-gray-500">Cost per Hour</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Cleansheet Tab Content */}
        <TabsContent value="cleansheet" className="mt-4 bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">Transport Cleansheet</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Country</span>
                  <Select defaultValue="china">
                    <SelectTrigger className="w-[120px] bg-gray-50 border border-gray-300">
                      <div className="flex items-center">
                        <div className="w-6 h-4 mr-2 overflow-hidden rounded">
                          <Flag className="w-4 h-4 text-red-600" />
                        </div>
                        <SelectValue placeholder="Select country" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Currency</span>
                  <Select defaultValue="usd">
                    <SelectTrigger className="w-[80px] bg-gray-50 border border-gray-300">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="cny">CNY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left text-gray-700">Region</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">9T</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">15T</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">20T</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">25T</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">30T</th>
                    <th className="border border-gray-300 p-2 text-center text-gray-700">45T</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Cost of Truck</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Insurance</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Fuel Efficiency</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Wages</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Max Distance</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Truck Mileage</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Life of Truck</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-50 text-gray-700">Maintenance Cost</td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input defaultValue="0.5" className="h-8 bg-gray-50 border border-gray-300" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 border border-blue-700 shadow-sm">
                Save Cleansheet
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

  )
}
