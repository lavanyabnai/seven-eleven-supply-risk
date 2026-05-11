"use client"
import { useState } from "react"
import { Download, Plus, MoreHorizontal, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Import the transportation routes data
import routesData from "@/components/risk-data/transportation-routes.json"

export default function TransportationRoutesPage() {
  const [showParametersDialog, setShowParametersDialog] = useState(false)
  const [showTimeDialog, setShowTimeDialog] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [selectedTimeField, setSelectedTimeField] = useState<"startTime" | "endTime" | null>(null)
  const [routes, setRoutes] = useState(routesData)
  const [filterValues, setFilterValues] = useState({
    sources: "",
    destinations: "",
    product: "",
    vehicleType: "",
    type: "",
    parameters: "",
    priority: "",
    daysOfWeek: "",
    startTime: "",
    endTime: "",
    timePeriod: "",
    inclusionType: "",
  })
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({})
  const [forbidPartialDelivery, setForbidPartialDelivery] = useState(false)
  const [timeEditForm, setTimeEditForm] = useState({
    hours: "12",
    minutes: "00",
    period: "AM",
  })
  const [showDaysOfWeekPopover, setShowDaysOfWeekPopover] = useState(false)
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  })
  const rowsPerPage = 10

  // Filter routes based on search inputs
  const filteredRoutes = routes.filter((route) => {
    return (
      route.sources.toLowerCase().includes(filterValues.sources.toLowerCase()) &&
      route.destinations.toLowerCase().includes(filterValues.destinations.toLowerCase()) &&
      route.product.toLowerCase().includes(filterValues.product.toLowerCase()) &&
      route.vehicleType.toLowerCase().includes(filterValues.vehicleType.toLowerCase()) &&
      route.type.toLowerCase().includes(filterValues.type.toLowerCase()) &&
      route.parameters.toLowerCase().includes(filterValues.parameters.toLowerCase()) &&
      route.priority.toLowerCase().includes(filterValues.priority.toLowerCase()) &&
      route.daysOfWeek.toLowerCase().includes(filterValues.daysOfWeek.toLowerCase()) &&
      route.startTime.toLowerCase().includes(filterValues.startTime.toLowerCase()) &&
      route.endTime.toLowerCase().includes(filterValues.endTime.toLowerCase()) &&
      route.timePeriod.toLowerCase().includes(filterValues.timePeriod.toLowerCase()) &&
      route.inclusionType.toLowerCase().includes(filterValues.inclusionType.toLowerCase())
    )
  })

  // Get current page of routes
  const paginatedRoutes = filteredRoutes.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)

  const totalPages = Math.ceil(filteredRoutes.length / rowsPerPage)

  // Toggle row selection
  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Toggle all rows selection
  const toggleAllRows = () => {
    const newSelectedRows: Record<number, boolean> = {}

    if (Object.values(selectedRows).every((value) => value)) {
      // If all are selected, unselect all
      paginatedRoutes.forEach((_, index) => {
        newSelectedRows[index] = false
      })
    } else {
      // Otherwise, select all
      paginatedRoutes.forEach((_, index) => {
        newSelectedRows[index] = true
      })
    }

    setSelectedRows(newSelectedRows)
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(routes, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "transportation-routes-data.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleSaveParameters = () => {
    if (selectedRowIndex !== null) {
      const updatedRoutes = [...routes]
      const actualIndex = routes.findIndex((route) => route.id === paginatedRoutes[selectedRowIndex].id)

      updatedRoutes[actualIndex] = {
        ...updatedRoutes[actualIndex],
        parameters: forbidPartialDelivery ? "Forbid partial delivery" : "Partial delivery",
      }

      setRoutes(updatedRoutes)
      setShowParametersDialog(false)
    }
  }

  const handleSaveTime = () => {
    if (selectedRowIndex !== null && selectedTimeField) {
      const updatedRoutes = [...routes]
      const actualIndex = routes.findIndex((route) => route.id === paginatedRoutes[selectedRowIndex].id)
      const formattedTime = `${timeEditForm.hours}:${timeEditForm.minutes} ${timeEditForm.period}`

      updatedRoutes[actualIndex] = {
        ...updatedRoutes[actualIndex],
        [selectedTimeField]: formattedTime,
      }

      setRoutes(updatedRoutes)
      setShowTimeDialog(false)
    }
  }

  const handleDaysOfWeekChange = (day: string, checked: boolean) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: checked,
    }))
  }

  const saveDaysOfWeek = (index: number) => {
    const selectedDaysList = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day)

    const daysText = selectedDaysList.length > 0 ? selectedDaysList.join(", ") : "None"

    const updatedRoutes = [...routes]
    const actualIndex = routes.findIndex((route) => route.id === paginatedRoutes[index].id)

    updatedRoutes[actualIndex] = {
      ...updatedRoutes[actualIndex],
      daysOfWeek: daysText,
    }

    setRoutes(updatedRoutes)
    setShowDaysOfWeekPopover(false)
  }

  const openTimeDialog = (rowIndex: number, field: "startTime" | "endTime") => {
    setSelectedRowIndex(rowIndex)
    setSelectedTimeField(field)

    // Parse the current time value
    const timeValue = field === "startTime" ? paginatedRoutes[rowIndex].startTime : paginatedRoutes[rowIndex].endTime
    const [time, period] = timeValue.split(" ")
    const [hours, minutes] = time.split(":")

    setTimeEditForm({
      hours,
      minutes,
      period,
    })

    setShowTimeDialog(true)
  }

  const incrementHours = () => {
    const currentHours = Number.parseInt(timeEditForm.hours)
    const newHours = currentHours === 12 ? 1 : currentHours + 1
    setTimeEditForm({
      ...timeEditForm,
      hours: newHours.toString().padStart(2, "0"),
    })
  }

  const decrementHours = () => {
    const currentHours = Number.parseInt(timeEditForm.hours)
    const newHours = currentHours === 1 ? 12 : currentHours - 1
    setTimeEditForm({
      ...timeEditForm,
      hours: newHours.toString().padStart(2, "0"),
    })
  }

  const incrementMinutes = () => {
    const currentMinutes = Number.parseInt(timeEditForm.minutes)
    const newMinutes = (currentMinutes + 1) % 60
    setTimeEditForm({
      ...timeEditForm,
      minutes: newMinutes.toString().padStart(2, "0"),
    })
  }

  const decrementMinutes = () => {
    const currentMinutes = Number.parseInt(timeEditForm.minutes)
    const newMinutes = (currentMinutes - 1 + 60) % 60
    setTimeEditForm({
      ...timeEditForm,
      minutes: newMinutes.toString().padStart(2, "0"),
    })
  }

  const togglePeriod = () => {
    setTimeEditForm({
      ...timeEditForm,
      period: timeEditForm.period === "AM" ? "PM" : "AM",
    })
  }

  return (
    <div className="ml-4 mt-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700">Shipping Table</h2>
          </div>

          {/* Search */}

          <div className="flex gap-2">
            <div className="">
              <input
                type="text"
                placeholder="Filter by name..."
                className="px-3 py-2 border rounded-md w-[400px]"
                value={filterValues.sources}
                onChange={(e) => handleFilterChange("sources", e.target.value)}
              />
            </div>
            <button
              className="px-3 py-1 text-sm border bg-white border-gray-300 rounded-md flex items-center gap-1 hover:bg-gray-50"
              onClick={downloadJson}
            >
              <Download className="h-4 w-4" />
              <span>Download JSON</span>
            </button>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md flex items-center gap-1 hover:bg-blue-600">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={Object.values(selectedRows).every(Boolean) && Object.keys(selectedRows).length > 0}
                    onChange={toggleAllRows}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Sources</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.sources}
                      onChange={(e) => handleFilterChange("sources", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Destinations</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.destinations}
                      onChange={(e) => handleFilterChange("destinations", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Product</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.product}
                      onChange={(e) => handleFilterChange("product", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Vehicle Type</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.vehicleType}
                      onChange={(e) => handleFilterChange("vehicleType", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Type</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Parameters</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.parameters}
                      onChange={(e) => handleFilterChange("parameters", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Priority</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.priority}
                      onChange={(e) => handleFilterChange("priority", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Days of Week</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.daysOfWeek}
                      onChange={(e) => handleFilterChange("daysOfWeek", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Start Time</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.startTime}
                      onChange={(e) => handleFilterChange("startTime", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>End Time</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.endTime}
                      onChange={(e) => handleFilterChange("endTime", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Time Period</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.timePeriod}
                      onChange={(e) => handleFilterChange("timePeriod", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Inclusion Type</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.inclusionType}
                      onChange={(e) => handleFilterChange("inclusionType", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoutes.map((route, index) => (
                <tr key={route.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selectedRows[index]}
                      onChange={() => toggleRowSelection(index)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.sources}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Factory Qui Nhon">Factory Qui Nhon</SelectItem>
                        <SelectItem value="Port Vung Tau">Port Vung Tau</SelectItem>
                        <SelectItem value="Port Kobe">Port Kobe</SelectItem>
                        <SelectItem value="[Japan Sites]">[Japan Sites]</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.destinations}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Port Vung Tau">Port Vung Tau</SelectItem>
                        <SelectItem value="Port Kobe">Port Kobe</SelectItem>
                        <SelectItem value="[Japan Sites]">[Japan Sites]</SelectItem>
                        <SelectItem value="[Customers]">[Customers]</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.product}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="(All products)">(All products)</SelectItem>
                        <SelectItem value="Shoes">Shoes</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.vehicleType}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Container">Container</SelectItem>
                        <SelectItem value="Ship">Ship</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.type}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LTL">LTL</SelectItem>
                        <SelectItem value="FTL">FTL</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => {
                        setSelectedRowIndex(index)
                        setForbidPartialDelivery(route.parameters === "Forbid partial delivery")
                        setShowParametersDialog(true)
                      }}
                    >
                      {route.parameters}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.priority}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIFO">FIFO</SelectItem>
                        <SelectItem value="LIFO">LIFO</SelectItem>
                        <SelectItem value="Priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Popover
                      open={showDaysOfWeekPopover && selectedRowIndex === index}
                      onOpenChange={(open) => {
                        if (open) {
                          setSelectedRowIndex(index)
                          // Parse the current days of week
                          const currentDays = route.daysOfWeek.split(", ")
                          const newSelectedDays: Record<string, boolean> = {
                            Monday: false,
                            Tuesday: false,
                            Wednesday: false,
                            Thursday: false,
                            Friday: false,
                            Saturday: false,
                            Sunday: false,
                          }

                          currentDays.forEach((day) => {
                            if (day !== "None" && newSelectedDays.hasOwnProperty(day)) {
                              newSelectedDays[day] = true
                            }
                          })

                          setSelectedDays(newSelectedDays)
                        }
                        setShowDaysOfWeekPopover(open)
                      }}
                    >
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                          <span>{route.daysOfWeek}</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-2">
                          <div className="font-medium">Days of Week</div>
                          <div className="border-t pt-2">
                            <div className="mb-2">
                              <div className="flex items-center">
                                <Label className="text-sm text-gray-500">Search</Label>
                                <ChevronDown className="h-4 w-4 ml-auto" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              {Object.entries(selectedDays).map(([day, isSelected]) => (
                                <div key={day} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`day-${day}`}
                                    checked={isSelected}
                                    onCheckedChange={(checked) => handleDaysOfWeekChange(day, checked === true)}
                                  />
                                  <Label htmlFor={`day-${day}`} className="text-sm">
                                    {day}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button size="sm" onClick={() => saveDaysOfWeek(index)}>
                                Apply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{route.startTime}</span>
                      <button
                        onClick={() => openTimeDialog(index, "startTime")}
                        className="hover:bg-gray-100 p-1 rounded"
                      >
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{route.endTime}</span>
                      <button
                        onClick={() => openTimeDialog(index, "endTime")}
                        className="hover:bg-gray-100 p-1 rounded"
                      >
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.timePeriod}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="(All periods)">(All periods)</SelectItem>
                        <SelectItem value="Q1">Q1</SelectItem>
                        <SelectItem value="Q2">Q2</SelectItem>
                        <SelectItem value="Q3">Q3</SelectItem>
                        <SelectItem value="Q4">Q4</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select defaultValue={route.inclusionType}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select inclusion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Include">Include</SelectItem>
                        <SelectItem value="Exclude">Exclude</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button className="h-8 w-8 rounded-full hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {Object.values(selectedRows).filter(Boolean).length} of {filteredRoutes.length} row(s) selected.
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Parameters Dialog */}
      <Dialog open={showParametersDialog} onOpenChange={setShowParametersDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Please edit selected cell(s)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="forbid-partial-delivery">Forbid partial delivery</Label>
              <Switch
                id="forbid-partial-delivery"
                checked={forbidPartialDelivery}
                onCheckedChange={setForbidPartialDelivery}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowParametersDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSaveParameters}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Picker Dialog */}
      <Dialog open={showTimeDialog} onOpenChange={setShowTimeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Please edit selected cell(s)</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="flex items-center space-x-2">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <button className="p-1 hover:bg-gray-100 rounded" onClick={incrementHours}>
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-12 h-10 border rounded flex items-center justify-center">{timeEditForm.hours}</div>
                <button className="p-1 hover:bg-gray-100 rounded" onClick={decrementHours}>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="text-xl font-bold">:</div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <button className="p-1 hover:bg-gray-100 rounded" onClick={incrementMinutes}>
                  <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-12 h-10 border rounded flex items-center justify-center">{timeEditForm.minutes}</div>
                <button className="p-1 hover:bg-gray-100 rounded" onClick={decrementMinutes}>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* AM/PM */}
              <button
                className="w-12 h-10 border rounded flex items-center justify-center hover:bg-gray-100"
                onClick={togglePeriod}
              >
                {timeEditForm.period}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTimeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSaveTime}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
