"use client"
import { useState } from "react"
import { Download, Plus, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the expenses data
import expensesData from "@/components/risk-data/expenses.json"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(expensesData)
  const [filterValues, setFilterValues] = useState({
    facility: "",
    expenseType: "",
    value: "",
    currency: "",
    timeUnit: "",
    productUnit: "",
    timePeriod: "",
  })
  const [currentPage, setCurrentPage] = useState(0)
  // const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({})
  const rowsPerPage = 10

  // Filter expenses based on search inputs
  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.facility.toLowerCase().includes(filterValues.facility.toLowerCase()) &&
      expense.expenseType.toLowerCase().includes(filterValues.expenseType.toLowerCase()) &&
      expense.value.toString().includes(filterValues.value) &&
      expense.currency.toLowerCase().includes(filterValues.currency.toLowerCase()) &&
      expense.timeUnit.toLowerCase().includes(filterValues.timeUnit.toLowerCase()) &&
      expense.productUnit.toLowerCase().includes(filterValues.productUnit.toLowerCase()) &&
      expense.timePeriod.toLowerCase().includes(filterValues.timePeriod.toLowerCase())
    )
  })

  // Get current page of expenses
  const paginatedExpenses = filteredExpenses.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)

  const totalPages = Math.ceil(filteredExpenses.length / rowsPerPage)

  // Toggle row selection
  // const toggleRowSelection = (index: number) => {
  //   setSelectedRows((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }))
  // }

  // Toggle all rows selection
  // const toggleAllRows = () => {
  //   const newSelectedRows: Record<number, boolean> = {}

  //   if (Object.values(selectedRows).every((value) => value)) {
  //     // If all are selected, unselect all
  //     paginatedExpenses.forEach((_, index) => {
  //       newSelectedRows[index] = false
  //     })
  //   } else {
  //     // Otherwise, select all
  //     paginatedExpenses.forEach((_, index) => {
  //       newSelectedRows[index] = true
  //     })
  //   }

  //   setSelectedRows(newSelectedRows)
  // }

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expenses, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "expenses-data.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const updateExpenseField = (index: number, field: string, value: string | number) => {
    const updatedExpenses = [...expenses]
    const actualIndex = expenses.findIndex((expense) => expense.id === paginatedExpenses[index].id)

    updatedExpenses[actualIndex] = {
      ...updatedExpenses[actualIndex],
      [field]: field === "value" ? Number(value) : value,
    }

    setExpenses(updatedExpenses)
  }

  return (
    <div className="ml-4 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700">Facility Expenses Table</h2>
          </div>

          {/* Search */}

          <div className="flex gap-2">
            <div className="">
              <input
                type="text"
                placeholder="Filter by name..."
                className="px-3 py-2 border rounded-md w-[400px]"
                value={filterValues.facility}
                onChange={(e) => handleFilterChange("facility", e.target.value)}
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
                <th className="w-12 px-4 py-3 text-left font-medium text-gray-600">#</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Facility</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.facility}
                      onChange={(e) => handleFilterChange("facility", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Expense Type</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.expenseType}
                      onChange={(e) => handleFilterChange("expenseType", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Value</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.value}
                      onChange={(e) => handleFilterChange("value", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Currency</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.currency}
                      onChange={(e) => handleFilterChange("currency", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Time Unit</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.timeUnit}
                      onChange={(e) => handleFilterChange("timeUnit", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Product Unit</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.productUnit}
                      onChange={(e) => handleFilterChange("productUnit", e.target.value)}
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
                <th className="px-4 py-3 text-left font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.map((expense, index) => (
                <tr key={expense.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{expense.id}</td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.facility}
                      onValueChange={(value) => updateExpenseField(index, "facility", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select facility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="[Japan Sites]">[Japan Sites]</SelectItem>
                        <SelectItem value="Port Kobe">Port Kobe</SelectItem>
                        <SelectItem value="Port Vung Tau">Port Vung Tau</SelectItem>
                        <SelectItem value="DC Itami">DC Itami</SelectItem>
                        <SelectItem value="DC Tokyo">DC Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.expenseType}
                      onValueChange={(value) => updateExpenseField(index, "expenseType", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select expense type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Other costs">Other costs</SelectItem>
                        <SelectItem value="Carrying cost">Carrying cost</SelectItem>
                        <SelectItem value="Facility cost">Facility cost</SelectItem>
                        <SelectItem value="Maintenance cost">Maintenance cost</SelectItem>
                        <SelectItem value="Labor cost">Labor cost</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      value={expense.value}
                      onChange={(e) => updateExpenseField(index, "value", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.currency}
                      onValueChange={(value) => updateExpenseField(index, "currency", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.timeUnit}
                      onValueChange={(value) => updateExpenseField(index, "timeUnit", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select time unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">day</SelectItem>
                        <SelectItem value="week">week</SelectItem>
                        <SelectItem value="month">month</SelectItem>
                        <SelectItem value="year">year</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.productUnit}
                      onValueChange={(value) => updateExpenseField(index, "productUnit", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="m³">m³</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="pcs">pcs</SelectItem>
                        <SelectItem value="ton">ton</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={expense.timePeriod}
                      onValueChange={(value) => updateExpenseField(index, "timePeriod", value)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select time period" />
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
          <div className="text-sm text-gray-500">{filteredExpenses.length} expense(s) found.</div>
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
  )
}
