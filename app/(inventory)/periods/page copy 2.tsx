"use client"
import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Download, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Import the demand periods data
import demandPeriodsData from "@/components/risk-data/demand-periods.json"

export default function DemandPeriodsPage() {
  const [showCalendarDialog, setShowCalendarDialog] = useState(false)
  const [selectedDateField, setSelectedDateField] = useState<"start" | "end" | null>(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [demandPeriods, setDemandPeriods] = useState(demandPeriodsData)
  const [filterValues, setFilterValues] = useState({
    name: "",
    start: "",
    end: "",
    demandCoefficient: "",
  })
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({})
  const [currentDate, setCurrentDate] = useState(new Date(2023, 0, 1)) // January 1, 2023
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 0, 1))
  const rowsPerPage = 10

  // Filter demand periods based on search inputs
  const filteredPeriods = demandPeriods.filter((period) => {
    return (
      period.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
      period.start.toLowerCase().includes(filterValues.start.toLowerCase()) &&
      period.end.toLowerCase().includes(filterValues.end.toLowerCase()) &&
      period.demandCoefficient.toString().includes(filterValues.demandCoefficient)
    )
  })

  // Get current page of demand periods
  const paginatedPeriods = filteredPeriods.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)

  const totalPages = Math.ceil(filteredPeriods.length / rowsPerPage)

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
      paginatedPeriods.forEach((_, index) => {
        newSelectedRows[index] = false
      })
    } else {
      // Otherwise, select all
      paginatedPeriods.forEach((_, index) => {
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(demandPeriods, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "demand-periods-data.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Calendar functions
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    // Add empty cells for days after the last day of the month to complete the grid
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    for (let i = days.length; i < totalCells; i++) {
      days.push(null)
    }

    return days
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const selectDay = (day: number) => {
    if (day) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }
  }

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
  }

  const applySelectedDate = () => {
    if (selectedRowIndex !== null && selectedDateField) {
      const updatedPeriods = [...demandPeriods]
      const actualIndex = demandPeriods.findIndex((period) => period.id === paginatedPeriods[selectedRowIndex].id)

      updatedPeriods[actualIndex] = {
        ...updatedPeriods[actualIndex],
        [selectedDateField]: formatDate(selectedDate),
      }

      setDemandPeriods(updatedPeriods)
      setShowCalendarDialog(false)
    }
  }

  const openCalendarDialog = (rowIndex: number, field: "start" | "end") => {
    setSelectedRowIndex(rowIndex)
    setSelectedDateField(field)

    // Set the current date based on the selected field's value
    const period = paginatedPeriods[rowIndex]
    const dateParts = field === "start" ? period.start.split("/") : period.end.split("/")

    if (dateParts.length === 3) {
      const month = Number.parseInt(dateParts[0]) - 1
      const day = Number.parseInt(dateParts[1])
      const year = Number.parseInt(`20${dateParts[2]}`)

      const date = new Date(year, month, day)
      setCurrentDate(new Date(year, month, 1))
      setSelectedDate(date)
    }

    setShowCalendarDialog(true)
  }

  return (
    <div className="ml-4 mt-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700"> Periods Table</h2>
          </div>

          {/* Search */}

          <div className="flex gap-2">
            <div className="">
              <input
                type="text"
                placeholder="Filter by name..."
                className="px-3 py-2 border rounded-md w-[400px]"
                value={filterValues.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
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
                    <div>Name</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.name}
                      onChange={(e) => handleFilterChange("name", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Start</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.start}
                      onChange={(e) => handleFilterChange("start", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>End</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.end}
                      onChange={(e) => handleFilterChange("end", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Demand Coefficient</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.demandCoefficient}
                      onChange={(e) => handleFilterChange("demandCoefficient", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedPeriods.map((period, index) => (
                <tr key={period.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selectedRows[index]}
                      onChange={() => toggleRowSelection(index)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      value={period.name}
                      onChange={(e) => {
                        const updatedPeriods = [...demandPeriods]
                        const actualIndex = demandPeriods.findIndex((p) => p.id === period.id)
                        updatedPeriods[actualIndex] = {
                          ...updatedPeriods[actualIndex],
                          name: e.target.value,
                        }
                        setDemandPeriods(updatedPeriods)
                      }}
                      className="w-full"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{period.start}</span>
                      <button
                        onClick={() => openCalendarDialog(index, "start")}
                        className="hover:bg-gray-100 p-1 rounded"
                      >
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{period.end}</span>
                      <button
                        onClick={() => openCalendarDialog(index, "end")}
                        className="hover:bg-gray-100 p-1 rounded"
                      >
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={period.demandCoefficient}
                      onChange={(e) => {
                        const updatedPeriods = [...demandPeriods]
                        const actualIndex = demandPeriods.findIndex((p) => p.id === period.id)
                        updatedPeriods[actualIndex] = {
                          ...updatedPeriods[actualIndex],
                          demandCoefficient: Number.parseFloat(e.target.value) || 0,
                        }
                        setDemandPeriods(updatedPeriods)
                      }}
                      className="w-full"
                    />
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
            {Object.values(selectedRows).filter(Boolean).length} of {filteredPeriods.length} row(s) selected.
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

      {/* Calendar Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Date</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h3 className="text-lg font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-xs text-gray-500 text-center py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && selectDay(day)}
                  disabled={!day}
                  className={`h-8 w-8 text-sm rounded flex items-center justify-center ${
                    day === 1 && currentDate.getMonth() === 0
                      ? "bg-orange-500 text-white"
                      : day && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth()
                        ? "bg-blue-100 text-blue-700"
                        : day
                          ? "hover:bg-gray-100 text-gray-700"
                          : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalendarDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={applySelectedDate}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
