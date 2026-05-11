"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { customers } from "@/db/schema"
import { JsonCell, DateCell, SelectCell } from "./cell-types"

import { Actions } from "./actions"
// Define the type for a customer based on the schema
type Customer = typeof customers.$inferSelect

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row, getValue, column, table }) => {
      // Enhanced editable cell
      return (
        <input
          value={getValue() as string}
          onChange={(e) => {
            if (table.options.meta && 'updateData' in table.options.meta) {
              (table.options.meta.updateData as Function)(row.index, column.id, e.target.value)
            }
          }}
          className="w-[120px] bg-transparent border-0 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none px-2 py-1 rounded"
        />
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => <SelectCell {...props} options={["Customer", "Supplier", "Partner", "Distributor"]} />,
  },
  {
    accessorKey: "inclusionType",
    header: "Inclusion Type",
    cell: (props) => <SelectCell {...props} options={["Include", "Exclude", "Partial"]} />,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const icon = row.original.icon || "Default"
      return (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            {icon.charAt(0).toUpperCase()}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: (props) => <DateCell {...props} />,
  },
  {
    accessorKey: "locationId",
    header: "Location ID",
    cell: ({ row, getValue, column, table }) => {
      // Enhanced editable cell
      return (
        <input
          value={getValue() as string}
          onChange={(e) => {
            if (table.options.meta && 'updateData' in table.options.meta) {
              (table.options.meta.updateData as Function)(row.index, column.id, e.target.value)
            }
          }}
          className="w-full bg-transparent border-0 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none px-2 py-1 rounded"
        />
      )
    },
  },
  {
    accessorKey: "additionalParams",
    header: "Additional Parameters",
    cell: (props) => <JsonCell {...props} />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Updated At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: (props) => <DateCell {...props} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id.toString()} />,
  },
]
