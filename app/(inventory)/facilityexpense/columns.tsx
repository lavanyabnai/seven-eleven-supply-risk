'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { facilityExpenses } from '@/db/schema';

import { Actions } from './actions';

// Define the type for a facility based on the schema
type Facilityexpense = typeof facilityExpenses.$inferSelect;

export const columns: ColumnDef<Facilityexpense>[] = [
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
    accessorKey: 'facilityId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Facility
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'facilityName',
    header: 'Facility Name'
  },

  {
    accessorKey: 'expenseType',
    header: 'Expense Type'
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'currency',
    header: 'Currency'
  },
  {
    accessorKey: 'timeUnit',
    header: 'Time Unit'
  },
  {
    accessorKey: 'productUnit',
    header: 'Product Unit'
  },
  {
    accessorKey: 'timePeriodId',
    header: 'Time Period ID'
  },
  {
    accessorKey: 'timePeriod',
    header: 'Time Period'
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
