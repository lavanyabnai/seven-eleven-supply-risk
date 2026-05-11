'use client';

import { ColumnDef } from '@tanstack/react-table';


import { Checkbox } from '@/components/ui/checkbox';
import { paths as paths } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a path based on the schema
type Path = typeof paths.$inferSelect;

export const columns: ColumnDef<Path>[] = [
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
 {accessorKey: 'name', 
  header: 'Name'
},
{accessorKey: 'fromLocation', 
  header: 'From Location'
},
{accessorKey: 'toLocation', 
  header: 'To Location'
},
{accessorKey: 'costCalculationPolicy', 
  header: 'Cost Calculation Policy'
},
// {accessorKey: 'costPuPk', 
//   header: 'Cost PU PK'
// },
// {accessorKey: 'currency', 
//   header: 'Currency'
// },
{
  accessorKey: 'vehicleTypeId', 
  header: 'Vehicle Type Id'
},
{
  accessorKey: 'vehicleTypeName', 
  header: 'Vehicle Type Name'
},
// {accessorKey: 'distance', 
//   header: 'Distance'
// },
// {accessorKey: 'distanceUnit', 
//   header: 'Distance Unit'
// },
// {accessorKey: 'transportationType', 
//   header: 'Transportation Type'
// },
// {accessorKey: 'timeUnit', 
//   header: 'Time Unit'
// },
// {accessorKey: 'inclusionType', 
//   header: 'Inclusion Type'
// },
// {accessorKey: 'straight', 
//   header: 'Straight'},

// {accessorKey: 'transportationPolicy', 
//   header: 'Transportation Policy'
// },
// {accessorKey: 'minLoadRatio', 
//   header: 'Min Load Ratio'
// },
// {accessorKey:'timePeriod', 
//   header: 'Time Period'
// },
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
