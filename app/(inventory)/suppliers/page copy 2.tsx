"use client"
import { useState } from "react"
import { Download, Plus, X, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Import the suppliers data
import suppliersData from "@/components/risk-data/suppliers.json"

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(suppliersData)
  const [filterValues, setFilterValues] = useState({
    name: "",
    type: "",
    location: "",
    inclusionType: "",
    additionalParameters: "",
    icon: "",
  })
  const [currentPage, setCurrentPage] = useState(0)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [showIconDialog, setShowIconDialog] = useState(false)
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState<number | null>(null)
  const [selectedIcon, setSelectedIcon] = useState("plus-circle")
  const rowsPerPage = 10

  // Available icons
  const availableIcons = [
    { id: "plus-circle", name: "Plus Circle", color: "text-green-500" },
    { id: "plus-circle-gray", name: "Plus Circle Gray", color: "text-gray-400" },
  ]

  // Filter suppliers based on search inputs
  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
      supplier.type.toLowerCase().includes(filterValues.type.toLowerCase()) &&
      supplier.location.toLowerCase().includes(filterValues.location.toLowerCase()) &&
      supplier.inclusionType.toLowerCase().includes(filterValues.inclusionType.toLowerCase()) &&
      supplier.additionalParameters.toLowerCase().includes(filterValues.additionalParameters.toLowerCase())
    )
  })

  // Get current page of suppliers
  const paginatedSuppliers = filteredSuppliers.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)

  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage)

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(suppliers, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "suppliers-data.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const updateSupplierField = (index: number, field: string, value: string) => {
    const updatedSuppliers = [...suppliers]
    const actualIndex = suppliers.findIndex((supplier) => supplier.id === paginatedSuppliers[index].id)

    updatedSuppliers[actualIndex] = {
      ...updatedSuppliers[actualIndex],
      [field]: value,
    }

    setSuppliers(updatedSuppliers)
  }

  const handleAdditionalParametersClick = () => {
    setShowWarningDialog(true)
  }

  const handleIconClick = (index: number) => {
    setSelectedSupplierIndex(index)
    setSelectedIcon(paginatedSuppliers[index].icon)
    setShowIconDialog(true)
  }

  const handleIconSave = () => {
    if (selectedSupplierIndex !== null) {
      updateSupplierField(selectedSupplierIndex, "icon", selectedIcon)
    }
    setShowIconDialog(false)
    setSelectedSupplierIndex(null)
  }

  const renderIcon = (iconId: string) => {
    const iconClass = iconId === "plus-circle-gray" ? "text-gray-400" : "text-green-500"
    return (
      <div className={`w-6 h-6 rounded-full border-2 border-current ${iconClass} flex items-center justify-center`}>
        <Plus className="w-4 h-4" />
      </div>
    )
  }

  return (
    <div className="ml-4 mt-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-blue-700">Suppliers Table</h2>
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
                <th className="w-12 px-4 py-3 text-left font-medium text-gray-600">#</th>
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
                    <div>Location</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Additional Parameters</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.additionalParameters}
                      onChange={(e) => handleFilterChange("additionalParameters", e.target.value)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <div className="w-full">
                    <div>Icon</div>
                    <Input
                      placeholder="Filter"
                      className="mt-1 h-8"
                      value={filterValues.icon}
                      onChange={(e) => handleFilterChange("icon", e.target.value)}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedSuppliers.map((supplier, index) => (
                <tr key={supplier.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{supplier.id}</td>
                  <td className="px-4 py-3">
                    <Input
                      value={supplier.name}
                      onChange={(e) => updateSupplierField(index, "name", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={supplier.type}
                      onValueChange={(value) => updateSupplierField(index, "type", value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Supplier">Supplier</SelectItem>
                        <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                        <SelectItem value="Distributor">Distributor</SelectItem>
                        <SelectItem value="Vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={supplier.location}
                      onValueChange={(value) => updateSupplierField(index, "location", value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Factory Qui Nhon location">Factory Qui Nhon location</SelectItem>
                        <SelectItem value="Tokyo location">Tokyo location</SelectItem>
                        <SelectItem value="Osaka location">Osaka location</SelectItem>
                        <SelectItem value="Port Kobe location">Port Kobe location</SelectItem>
                        <SelectItem value="DC Itami location">DC Itami location</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={supplier.inclusionType}
                      onValueChange={(value) => updateSupplierField(index, "inclusionType", value)}
                    >
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
                    <div
                      className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm"
                      onClick={handleAdditionalParametersClick}
                    >
                      {supplier.additionalParameters}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleIconClick(index)}
                      className="hover:bg-gray-100 p-1 rounded cursor-pointer"
                    >
                      {renderIcon(supplier.icon)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">{filteredSuppliers.length} supplier(s) found.</div>
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

      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Warning</span>
            </div>
            <button onClick={() => setShowWarningDialog(false)} className="text-white hover:text-gray-200">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              You have either selected cells with different types of data or the selected cells do not support editing.
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowWarningDialog(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Icon Selection Dialog */}
      <Dialog open={showIconDialog} onOpenChange={setShowIconDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center justify-between text-lg">
              Define The New Icon
              <button onClick={() => setShowIconDialog(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Available icons</p>
              <div className="flex gap-3">
                {availableIcons.map((icon) => (
                  <button
                    key={icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`p-2 rounded border-2 ${
                      selectedIcon === icon.id ? "border-orange-400 bg-orange-50" : "border-gray-200"
                    }`}
                  >
                    {renderIcon(icon.id)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowIconDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleIconSave} className="bg-blue-500 hover:bg-blue-600 text-white">
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
