'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { processingCosts as processingcosts } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a processingcost based on the schema
type Processingcost = typeof processingcosts.$inferSelect;

export const columns: ColumnDef<Processingcost>[] = [
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
      const processingcostType = row.original.type;
      return processingcostType.toString();
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
      const processingcostType = row.original.units;
      return processingcostType.toString();
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
      const processingcostType = row.original.cost;
      return processingcostType.toString();
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
      const processingcostType = row.original.currency;
      return processingcostType.toString();
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
