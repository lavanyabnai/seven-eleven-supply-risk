'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { events as events } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a event based on the schema
type Event = typeof events.$inferSelect;

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue('name')
  },

  {
    accessorKey: 'eventType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Event Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue('eventType')
  },
  {
    accessorKey: 'parameters',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
         parameters
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventType = row.original.parameters;
      return eventType?.toString() || '';
    }
  },
  {
    accessorKey: 'occurrenceType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Occurrence Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventType = row.original.occurrenceType;
      return eventType?.toString() || '';
    }
  },
  {
    accessorKey: 'occurrenceTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          OccurrenceTime
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventType = row.original.occurrenceTime;
      return eventType?.toString() || '';
    }
  },
  {
    accessorKey: 'triggerEventName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Trigger Event Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventType = row.original.triggerEventName;
      return eventType?.toString() || '';
    }
  },
  
  {
    accessorKey: 'probability',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Probability
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue('probability')
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
