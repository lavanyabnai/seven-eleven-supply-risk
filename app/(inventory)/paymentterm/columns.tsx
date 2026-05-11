'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { paymentTerms  } from '@/db/schema';

import { Actions } from './actions';
// Define the type for a paymentterms based on the schema
type Paymentterms = typeof paymentTerms.$inferSelect;

export const columns: ColumnDef<Paymentterms>[] = [
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
    accessorKey: 'sellerId',
    header: 'Seller'
  },
  {
    accessorKey: 'buyerId',
    header: 'Buyer'
  },
  {
    accessorKey: 'productId',
    header: 'Product'
  },
  {
    accessorKey: 'defermentPeriod',
    header: 'Deferment Period'
  },
  {
    accessorKey: 'timeUnit',
    header: 'Time Unit'
  },
  {
    accessorKey: 'downPaymentRatio',
    header: 'Down Payment Ratio'
  },
  {
    accessorKey: 'timePeriodId',
    header: 'Time Period'
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id.toString()} />
  }
];
