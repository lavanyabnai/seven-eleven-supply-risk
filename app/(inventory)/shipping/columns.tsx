'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { shipping as shippings } from '@/db/schema';

import { Actions } from './actions';


// Define the type for a shipping based on the schema
type Shipping = typeof shippings.$inferSelect & {
  sourceName: string;
  destinationName: string;
  vehicleTypeName: string;  
  timePeriodName: string;
};

export const columns: ColumnDef<Shipping>[] = [
  {
    id: 'select',
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
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
    accessorKey: 'sourceName',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            Source
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('sourceName')
  },

  {
    accessorKey: 'destinationName',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Destination
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('destinationName')
  },
  {
    accessorKey: 'productName',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('productName')
  },
  {
    accessorKey: 'vehicleTypeName',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Vehicle Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('vehicleTypeName')
  },
  // {
  //   accessorKey: 'parameters',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Parameters
  //         <ArrowUpDown className="ml-2 size-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return row.getValue('parameters')
  //   }
  // },
  {
    accessorKey: 'priority',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const shippingType = row.original.priority;
      return shippingType.toString();
    }
  },
  
  // {
  //   accessorKey: 'daysOfWeek',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Days of Week
  //         <ArrowUpDown className="ml-2 size-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => row.getValue('daysOfWeek')
  // },
  {
    accessorKey: 'type',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('type')
  },
  {
    accessorKey: 'inclusionType',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Inclusion Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('inclusionType')
  },  {
    accessorKey: 'timePeriodName',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Time Period
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => row.getValue('timePeriodName')
  },
  {
    accessorKey: 'startTime',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Time
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const startTime = row.original.startTime;
      if (startTime instanceof Date) {
        return startTime.toLocaleDateString();
      } else if (typeof startTime === 'string') {
        return new Date(startTime).toLocaleDateString();
      } else {
        return 'Invalid Date';
      }
    }
  },

  {
    accessorKey: 'endTime',
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End Time
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const endTime = row.original.endTime;
      if (endTime instanceof Date) {
        return endTime.toLocaleDateString();
      } else if (typeof endTime === 'string') {
        return new Date(endTime).toLocaleDateString();
      } else {
        return 'Invalid Date';
      }
    }
  },

  {
    id: 'actions',
    cell: ({ row }: { row: any }  ) => <Actions id={row.original.id.toString()} />
  }
];
