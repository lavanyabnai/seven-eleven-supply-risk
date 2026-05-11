'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { demandForecast as demandforecasts } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a demandforecast based on the schema
type Demandforecast = typeof demandforecasts.$inferSelect;

export const columns: ColumnDef<Demandforecast>[] = [
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
          Facility
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue('facilityName')
  },

  {
    accessorKey: 'productName',
    header: ({ column }) => {
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
    cell: ({ row }) => row.getValue('productName')
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const demandforecastType = row.original.type;
      return demandforecastType.toString();
    }
  },
  {
    accessorKey: 'units',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          units
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const units = row.getValue('units');
      return units?.toString() ?? '';
    }
  },
  {
    accessorKey: 'cost',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          cost
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cost = row.getValue('cost');
      return cost?.toString() ?? '';
    }
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          currency
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const currency = row.getValue('currency');
      return currency?.toString() ?? '';
    }
  },
  
  {
    accessorKey: 'timePeriodName',
    header: ({ column }) => {
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
    cell: ({ row }) => row.getValue('timePeriodName')
  },
  // ,
  // {
  //   accessorKey: 'revenue',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Revenue
  //         <ArrowUpDown className="ml-2 size-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const revenue = row.original.revenue;
  //     return revenue?.toString();
  //   }
  // },
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
  //     );
  //   },
  //   cell: ({ row }) => {
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

  // {
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Updated At
  //         <ArrowUpDown className="ml-2 size-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const updatedAt = row.original.updatedAt;
  //     if (updatedAt instanceof Date) {
  //       return updatedAt.toLocaleDateString();
  //     } else if (typeof updatedAt === 'string') {
  //       return new Date(updatedAt).toLocaleDateString();
  //     } else {
  //       return 'Invalid Date';
  //     }
  //   }
  // },

  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
