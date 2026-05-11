"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'

// 7-Eleven product catalog — beverages, snacks, tobacco, fresh food, coffee
const product = [
  {
    ProductId: 'CC-001',
    ProductName: 'Coca-Cola 12pk Variety Pack',
    Price: 289.99,
    Cost: 162.00,
    Segment: 'Packaged Beverages',
    NumOfSuppliers: 3,
  },
  {
    ProductId: 'PC-001',
    ProductName: 'PepsiCo Variety Pack',
    Price: 319.50,
    Cost: 178.00,
    Segment: 'Packaged Beverages',
    NumOfSuppliers: 2,
  },
  {
    ProductId: '7S-COF-001',
    ProductName: '7-Select Hot Coffee Blend',
    Price: 649.99,
    Cost: 385.00,
    Segment: 'Coffee & Hot Beverages',
    NumOfSuppliers: 4,
  },
  {
    ProductId: 'ED-001',
    ProductName: 'Monster / Red Bull Energy Drinks',
    Price: 89.95,
    Cost: 48.50,
    Segment: 'Packaged Beverages',
    NumOfSuppliers: 2,
  },
  {
    ProductId: 'TC-001',
    ProductName: 'Marlboro Cigarettes Carton',
    Price: 142.00,
    Cost: 85.00,
    Segment: 'Tobacco Products',
    NumOfSuppliers: 5,
  },
  {
    ProductId: 'HS-001',
    ProductName: 'Hershey Snack Assortment',
    Price: 2499.99,
    Cost: 1450.00,
    Segment: 'Packaged Snacks & Candy',
    NumOfSuppliers: 3,
  },
  {
    ProductId: 'MDZ-001',
    ProductName: 'Mondelēz Snack Variety',
    Price: 24.99,
    Cost: 12.50,
    Segment: 'Packaged Snacks & Candy',
    NumOfSuppliers: 6,
  },
  {
    ProductId: 'BV-001',
    ProductName: 'Beverage Concentrate Syrup',
    Price: 67.50,
    Cost: 38.00,
    Segment: 'Beverage Concentrate',
    NumOfSuppliers: 4,
  },
  {
    ProductId: 'FZ-001',
    ProductName: 'Frozen Treats Variety Pack',
    Price: 399.99,
    Cost: 225.00,
    Segment: 'Frozen Treats / Ice Cream',
    NumOfSuppliers: 1,
  },
  {
    ProductId: 'BW-BUD-001',
    ProductName: 'Budweiser Beer 24pk',
    Price: 345.00,
    Cost: 195.00,
    Segment: 'Beer & Wine',
    NumOfSuppliers: 2,
  },
]

// 7-Eleven franchise operator customers
const customer = [
  {
    Customer: 'Store Manager - Richmond Area',
    Product: 'Coca-Cola 12pk Variety Pack',
    PurchaseDate: '2025-11-05',
    Price: 289.99,
    Segment: 'Store Manager Account',
    LifetimeValue: 185000.00,
  },
  {
    Customer: 'Franchise Operator - DC Metro',
    Product: '7-Select Hot Coffee Blend',
    PurchaseDate: '2025-11-12',
    Price: 649.99,
    Segment: 'Franchise Operator Account',
    LifetimeValue: 420000.00,
  },
  {
    Customer: 'Core-Mark Distribution - Arlington',
    Product: 'Marlboro Cigarettes Carton',
    PurchaseDate: '2025-10-28',
    Price: 142.00,
    Segment: 'Core-Mark Distribution',
    LifetimeValue: 1250000.00,
  },
  {
    Customer: 'Franchise Operator - Norfolk',
    Product: 'Monster / Red Bull Energy Drinks',
    PurchaseDate: '2025-11-18',
    Price: 89.95,
    Segment: 'Franchise Operator Account',
    LifetimeValue: 310000.00,
  },
  {
    Customer: 'Store Associate - Charlotte',
    Product: 'Hershey Snack Assortment',
    PurchaseDate: '2025-12-02',
    Price: 2499.99,
    Segment: 'Store Associate Account',
    LifetimeValue: 890000.00,
  },
  {
    Customer: 'Franchise Operator - Atlanta',
    Product: 'PepsiCo Variety Pack',
    PurchaseDate: '2025-12-10',
    Price: 319.50,
    Segment: 'Franchise Operator Account',
    LifetimeValue: 95000.00,
  },
  {
    Customer: 'Store Manager - Chicago',
    Product: 'Beverage Concentrate Syrup',
    PurchaseDate: '2025-12-15',
    Price: 67.50,
    Segment: 'Store Manager Account',
    LifetimeValue: 540000.00,
  },
  {
    Customer: 'Franchise Operator - Denver',
    Product: 'Mondelēz Snack Variety',
    PurchaseDate: '2026-01-05',
    Price: 24.99,
    Segment: 'Franchise Operator Account',
    LifetimeValue: 72000.00,
  },
  {
    Customer: 'Store Manager - Sacramento',
    Product: 'Frozen Treats Variety Pack',
    PurchaseDate: '2026-01-12',
    Price: 399.99,
    Segment: 'Store Manager Account',
    LifetimeValue: 155000.00,
  },
  {
    Customer: 'Franchise Operator - Dallas',
    Product: 'Budweiser Beer 24pk',
    PurchaseDate: '2026-02-01',
    Price: 345.00,
    Segment: 'Franchise Operator Account',
    LifetimeValue: 680000.00,
  },
]

// 7-Eleven DC inventory — excess and deficit positions
const inventory = [
  {
    title: '7S-COF-001 (7-Select Hot Coffee)',
    location: 'Front Royal VA DC',
    deficit: '$1.9M',
    percent: 9,
  },
  {
    title: 'TC-001 (Marlboro Cigarettes)',
    location: 'Houston MDC',
    deficit: '$0.6M',
    percent: 20,
  },
  {
    title: 'CC-001 (Coca-Cola 12pk)',
    location: 'Stockton CA DC',
    deficit: '$1.8M',
    percent: 58,
  },
  {
    title: 'MDZ-001 (Mondelēz Snacks)',
    location: 'Nashville MDC',
    deficit: '$0.4M',
    percent: 76,
  },
]

const deficit = [
  {
    title: 'HS-001 (Hershey Snacks)',
    location: 'Dallas MDC',
    deficit: '$2.1M',
    percent: 12,
  },
  {
    title: 'PC-001 (PepsiCo Variety)',
    location: 'Aurora CO MDC',
    deficit: '$0.8M',
    percent: 25,
  },
  {
    title: 'ED-001 (Energy Drinks)',
    location: 'Fort Payne AL DC',
    deficit: '$1.5M',
    percent: 45,
  },
  {
    title: 'BV-001 (Beverage Concentrate)',
    location: 'Frostproof FL DC',
    deficit: '$0.3M',
    percent: 82,
  },
]

export function ProductTable() {
  return (
    <div className="bg-white rounded-b-lg border w-100">
      <div className="flex justify-between space-x-4">
        <div className="w-full bg-white rounded-b-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Cost ($)</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Suppliers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.map((item) => (
                <TableRow key={item.ProductId}>
                  <TableCell className="font-medium">{item.ProductId}</TableCell>
                  <TableCell className="font-medium">{item.ProductName}</TableCell>
                  <TableCell className="font-medium">{item.Price}</TableCell>
                  <TableCell className="font-medium">{item.Cost}</TableCell>
                  <TableCell className="font-medium">{item.Segment}</TableCell>
                  <TableCell className="font-medium">{item.NumOfSuppliers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export function CustomerTable() {
  return (
    <div className="bg-white rounded-b-lg border w-100">
      <div className="flex justify-between space-x-4">
        <div className="w-full bg-white rounded-b-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Lifetime Value ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.map((item) => (
                <TableRow key={item.Customer}>
                  <TableCell className="font-medium">{item.Customer}</TableCell>
                  <TableCell className="font-medium">{item.Product}</TableCell>
                  <TableCell className="font-medium">{item.PurchaseDate}</TableCell>
                  <TableCell className="font-medium">{item.Price}</TableCell>
                  <TableCell className="font-medium">{item.Segment}</TableCell>
                  <TableCell className="font-medium">{item.LifetimeValue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export function InventoryTable() {
  return (
    <div className="bg-white rounded-b-lg border w-100">
      <div className="flex justify-between space-x-4">
        <div className="w-full bg-white rounded-b-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>DC Location</TableHead>
                <TableHead>Excess Value</TableHead>
                <TableHead>Fill Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.title}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="font-medium">{item.location}</TableCell>
                  <TableCell className="font-medium">{item.deficit}</TableCell>
                  <TableCell>
                    <Progress indicatorColor="bg-green-400" value={item.percent} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export function ExcessTable() {
  return (
    <div className="bg-white rounded-b-lg border w-100">
      <div className="flex justify-between space-x-4">
        <div className="w-full bg-white rounded-b-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>DC Location</TableHead>
                <TableHead>Deficit Value</TableHead>
                <TableHead>Coverage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deficit.map((item) => (
                <TableRow key={item.title}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="font-medium">{item.location}</TableCell>
                  <TableCell className="font-medium">{item.deficit}</TableCell>
                  <TableCell>
                    <Progress indicatorColor="bg-red-400" value={item.percent} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
