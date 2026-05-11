"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { productFlows } from '@/db/schema';
import { Actions } from "./actions"

// Define the type for a coglocation based on the schema
type productFlows = typeof productFlows.$inferSelect;

export const columns: ColumnDef<productFlows>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
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
    enableHiding: false
  },
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'sourceName',
    header: 'Source Name'
  },
  {
    accessorKey: 'destinationName',
    header: 'Destination Name'
  },
  {
    accessorKey: 'productName',
    header: 'Product Name'
  },
  {
    accessorKey: 'vehicleTypeName',
    header: 'Vehicle Type Name'
  },
  {
    accessorKey: 'timePeriodName',
    header: 'Time Period Name'
  },
  {
    accessorKey: 'minThroughput',
    header: 'Min Throughput'
  },
  {
    accessorKey: 'maxThroughput',
    header: 'Max Throughput'
  },
  {
    accessorKey: 'fixed',
    header: 'Fixed'
  },
  {
    accessorKey: 'fixedValue',
    header: 'Fixed Value'
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
