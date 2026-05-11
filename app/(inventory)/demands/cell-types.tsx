"use client"

import { useState } from "react"
import type { CellContext } from "@tanstack/react-table"
import { JsonEditor } from "./json-editor"
import { DatePicker } from "@/components/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserCircle2 } from "lucide-react"
import { ParameterDialog, type ParameterData } from "./parameter-dialog"
import { Button } from "@/components/ui/button"

// Text Cell
export function TextCell<TData>({ getValue, row, column, table }: CellContext<TData, any>) {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)
  const onBlur = () => {
    if (table.options.meta) {
      ;(table.options.meta as any).updateData(row.index, column.id, value)
    }
  }

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="h-8 border-0 bg-transparent focus-visible:ring-1"
    />
  )
}

// Select Cell
export function SelectCell<TData>({
  getValue,
  row,
  column,
  table,
  options,
}: CellContext<TData, any> & { options: string[] }) {
  const initialValue = getValue()
  const onChange = (value: string) => {
    if (table.options.meta) {
      ;(table.options.meta as any).updateData(row.index, column.id, value)
    }
  }

  return (
    <Select defaultValue={initialValue} onValueChange={onChange}>
      <SelectTrigger className="h-8 border-0 bg-transparent focus:ring-1">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// JSON Cell
export function JsonCell<TData>({ getValue, row, column, table }: CellContext<TData, any>) {
  const value = getValue() || {}

  const onChange = (newValue: Record<string, any>) => {
    if (table.options.meta) {
      ;(table.options.meta as any).updateData(row.index, column.id, newValue)
    }
  }

  return <JsonEditor value={value} onChange={onChange} label={column.id} />
}

// Date Cell
export function DateCell<TData>({ getValue, row, column, table }: CellContext<TData, any>) {
  const value = getValue() ? new Date(getValue()) : undefined

  const onChange = (newValue: Date | undefined) => {
    if (table.options.meta) {
      ;(table.options.meta as any).updateData(row.index, column.id, newValue ? newValue.toISOString() : "")
    }
  }

  return <DatePicker value={value} onChange={onChange} />
}

// Icon Cell
export function IconCell() {
  return (
    <div className="flex justify-center">
      <UserCircle2 className="h-6 w-6 text-blue-500" />
    </div>
  )
}

// Badge Cell
export function BadgeCell<TData>({ getValue }: CellContext<TData, any>) {
  const value = getValue()

  let badgeClass = "bg-blue-50 text-blue-700 hover:bg-blue-50"

  if (value === "Active") {
    badgeClass = "bg-green-50 text-green-700 hover:bg-green-50"
  } else if (value === "Inactive") {
    badgeClass = "bg-gray-50 text-gray-700 hover:bg-gray-50"
  } else if (value === "Pending") {
    badgeClass = "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
  }

  return (
    <Badge variant="outline" className={badgeClass}>
      {value}
    </Badge>
  )
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "Invalid Date"

  if (date instanceof Date) {
    return date.toLocaleDateString()
  } else if (typeof date === "string") {
    const parsedDate = new Date(date)
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleDateString()
  }

  return "Invalid Date"
}

// Parameter Cell Component
export function ParameterCell<TData>({ getValue, row, column, table }: CellContext<TData, unknown>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const value = getValue() as string

  const handleSave = (data: ParameterData) => {
    // Format the data for display in the cell
    const formattedValue = `Order interval: ${data.orderInterval}, Qty: ${data.quantity}`
    if (table.options.meta) {
      ;(table.options.meta as any).updateData(row.index, column.id, formattedValue)
    }
    setDialogOpen(false)
  }

  return (
    <>
      <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setDialogOpen(true)}>
        {value || "Click to edit parameters"}
      </Button>

      <ParameterDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={{
          firstOccurrence: new Date(),
          orderInterval: 5,
          quantity: 10,
        }}
      />
    </>
  )
}