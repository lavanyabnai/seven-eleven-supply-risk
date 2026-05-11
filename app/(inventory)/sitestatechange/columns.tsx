"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { siteStateChanges } from "@/db/schema"

import { Actions } from './actions'

// Define the type for a sitestatechange based on the schema
type Sitestatechange = typeof siteStateChanges.$inferSelect

export const columns: ColumnDef<Sitestatechange>[] = [
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
    accessorKey: 'siteId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Site
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    }
    },
    {
      accessorKey: 'timePeriodId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Time Period
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        )
      }
      },{
        accessorKey: 'newSiteState',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              New Site State
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        }
        },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Created At
  //         <ArrowUpDown className="ml-2 size-4" />
  //       </Button>
  //     )
  //   },
  //    cell: ({ row }) => {
  //     const createdAt = row.original.createdAt;
  //     if (createdAt instanceof Date) {
  //       return createdAt.toLocaleDateString();
  //     } else if (typeof createdAt === 'string') {
  //       return new Date(createdAt).toLocaleDateString();
  //     } else {
  //       return 'Invalid Date';
  //     }
  //   }
  // },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
]
