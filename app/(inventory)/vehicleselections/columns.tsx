"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { vehicleSelectionMode } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a vehicleselection based on the schema
type vehicleselection = typeof vehicleSelectionMode.$inferSelect;

export const columns: ColumnDef<vehicleselection>[] = [
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
    accessorKey: 'fromId',
    header: 'From Id'
  },
  {
    accessorKey: 'toId',
    header: 'To Id'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
