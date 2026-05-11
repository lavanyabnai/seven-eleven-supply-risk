"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Actions } from './actions';
// Define the type for a inventory based on the schema
type Inventory = {
  id: number;
  facilityId: number;
  productId: number;
  policyType: string;
  policyParameters: number | null;
  initialStock: string;
  periodicCheck: boolean;
  period: number | null;
  firstPeriodicCheck: string | null;
  policyBasis: string | null;
  stockCalculationWindow: number | null;
  timeUnit: string;
  minSplitRatio: string | null;
  timePeriodId: number;
  inclusionType: string;
  facilityName: string;
  productName: string;
  timePeriodName: string
};

export const columns: ColumnDef<Inventory>[] = [
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
    accessorKey: 'facilityName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Facility Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'productName',
    header: 'Product Name'
  },
  {
    accessorKey: 'initialStock',
    header: 'Initial Stock'
  },
  {
    accessorKey: 'timePeriodName',
    header: 'Time Period Name'
  },
  {
    accessorKey: 'inclusionType',
    header: 'Inclusion Type'
  },

  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
