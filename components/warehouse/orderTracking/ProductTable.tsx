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

// Ferguson product catalog — plumbing, HVAC, waterworks, PVF, appliances
const product = [
  {
    ProductId: 'FRG-1001',
    ProductName: 'Kohler Highline Toilet',
    Price: 289.99,
    Cost: 162.00,
    Segment: 'Plumbing Fixtures',
    NumOfSuppliers: 3,
  },
  {
    ProductId: 'FRG-1002',
    ProductName: 'Moen Align Pull-Down Faucet',
    Price: 319.50,
    Cost: 178.00,
    Segment: 'Plumbing Fixtures',
    NumOfSuppliers: 2,
  },
  {
    ProductId: 'FRG-1003',
    ProductName: 'Rheem 50-Gal Water Heater',
    Price: 649.99,
    Cost: 385.00,
    Segment: 'HVAC/Water Heating',
    NumOfSuppliers: 4,
  },
  {
    ProductId: 'FRG-1004',
    ProductName: 'Delta Monitor 17 Shower Valve',
    Price: 89.95,
    Cost: 48.50,
    Segment: 'Plumbing Fixtures',
    NumOfSuppliers: 2,
  },
  {
    ProductId: 'FRG-1005',
    ProductName: '4" Ductile Iron Pipe 20ft',
    Price: 142.00,
    Cost: 85.00,
    Segment: 'Waterworks',
    NumOfSuppliers: 5,
  },
  {
    ProductId: 'FRG-1006',
    ProductName: 'AO Smith 80-Gal Commercial Heater',
    Price: 2499.99,
    Cost: 1450.00,
    Segment: 'HVAC/Water Heating',
    NumOfSuppliers: 3,
  },
  {
    ProductId: 'FRG-1007',
    ProductName: 'PROFLO 1/2" Copper Fitting Kit',
    Price: 24.99,
    Cost: 12.50,
    Segment: 'PVF',
    NumOfSuppliers: 6,
  },
  {
    ProductId: 'FRG-1008',
    ProductName: 'Watts 3/4" PRV Valve',
    Price: 67.50,
    Cost: 38.00,
    Segment: 'PVF',
    NumOfSuppliers: 4,
  },
  {
    ProductId: 'FRG-1009',
    ProductName: 'InSinkErator Evolution Excel',
    Price: 399.99,
    Cost: 225.00,
    Segment: 'Appliances',
    NumOfSuppliers: 1,
  },
  {
    ProductId: 'FRG-1010',
    ProductName: 'Toto Drake II Elongated Toilet',
    Price: 345.00,
    Cost: 195.00,
    Segment: 'Plumbing Fixtures',
    NumOfSuppliers: 2,
  },
]

// Ferguson contractor customers
const customer = [
  {
    Customer: 'Summit Plumbing Co.',
    Product: 'Kohler Highline Toilet',
    PurchaseDate: '2025-11-05',
    Price: 289.99,
    Segment: 'Residential Contractor',
    LifetimeValue: 185000.00,
  },
  {
    Customer: 'Metro HVAC Services',
    Product: 'Rheem 50-Gal Water Heater',
    PurchaseDate: '2025-11-12',
    Price: 649.99,
    Segment: 'HVAC Contractor',
    LifetimeValue: 420000.00,
  },
  {
    Customer: 'City of Arlington Utilities',
    Product: '4" Ductile Iron Pipe 20ft',
    PurchaseDate: '2025-10-28',
    Price: 142.00,
    Segment: 'Municipal/Waterworks',
    LifetimeValue: 1250000.00,
  },
  {
    Customer: 'Precision Build Inc.',
    Product: 'Delta Monitor 17 Shower Valve',
    PurchaseDate: '2025-11-18',
    Price: 89.95,
    Segment: 'Commercial Contractor',
    LifetimeValue: 310000.00,
  },
  {
    Customer: 'Coastal Mechanical',
    Product: 'AO Smith 80-Gal Commercial Heater',
    PurchaseDate: '2025-12-02',
    Price: 2499.99,
    Segment: 'Commercial Contractor',
    LifetimeValue: 890000.00,
  },
  {
    Customer: 'HomeSpec Renovations',
    Product: 'Moen Align Pull-Down Faucet',
    PurchaseDate: '2025-12-10',
    Price: 319.50,
    Segment: 'Residential Contractor',
    LifetimeValue: 95000.00,
  },
  {
    Customer: 'Atlas Fire Protection',
    Product: 'Watts 3/4" PRV Valve',
    PurchaseDate: '2025-12-15',
    Price: 67.50,
    Segment: 'Fire & Fabrication',
    LifetimeValue: 540000.00,
  },
  {
    Customer: 'Greenfield Developments',
    Product: 'PROFLO 1/2" Copper Fitting Kit',
    PurchaseDate: '2026-01-05',
    Price: 24.99,
    Segment: 'Residential Contractor',
    LifetimeValue: 72000.00,
  },
  {
    Customer: 'Pacific Kitchen & Bath',
    Product: 'InSinkErator Evolution Excel',
    PurchaseDate: '2026-01-12',
    Price: 399.99,
    Segment: 'Showroom/Retail',
    LifetimeValue: 155000.00,
  },
  {
    Customer: 'Southeast Water District',
    Product: 'Toto Drake II Elongated Toilet',
    PurchaseDate: '2026-02-01',
    Price: 345.00,
    Segment: 'Municipal/Waterworks',
    LifetimeValue: 680000.00,
  },
]

// Ferguson DC inventory — excess and deficit positions
const inventory = [
  {
    title: 'FRG-1003 (Rheem Water Heater)',
    location: 'Front Royal VA DC',
    deficit: '$1.9M',
    percent: 9,
  },
  {
    title: 'FRG-1005 (Ductile Iron Pipe)',
    location: 'Houston MDC',
    deficit: '$0.6M',
    percent: 20,
  },
  {
    title: 'FRG-1001 (Kohler Toilet)',
    location: 'Stockton CA DC',
    deficit: '$1.8M',
    percent: 58,
  },
  {
    title: 'FRG-1007 (Copper Fitting Kit)',
    location: 'Nashville MDC',
    deficit: '$0.4M',
    percent: 76,
  },
]

const deficit = [
  {
    title: 'FRG-1006 (AO Smith Commercial)',
    location: 'Dallas MDC',
    deficit: '$2.1M',
    percent: 12,
  },
  {
    title: 'FRG-1002 (Moen Faucet)',
    location: 'Aurora CO MDC',
    deficit: '$0.8M',
    percent: 25,
  },
  {
    title: 'FRG-1004 (Delta Shower Valve)',
    location: 'Fort Payne AL DC',
    deficit: '$1.5M',
    percent: 45,
  },
  {
    title: 'FRG-1008 (Watts PRV Valve)',
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
