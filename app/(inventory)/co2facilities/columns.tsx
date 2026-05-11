'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { co2Emissions } from '@/db/schema';

import { Actions } from './actions';

// Define the type for a facility based on the schema
type Co2facilitie = typeof co2Emissions.$inferSelect;

export const columns: ColumnDef<Co2facilitie>[] = [
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
    accessorKey: 'co2EmissionSource',
    header: 'CO2 Emission Source'
  },
  {
    accessorKey: 'co2Produced',
    header: 'CO2 Produced'
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
