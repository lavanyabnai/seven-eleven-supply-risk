import WrapperWaterfallChart from "@/app/kendo/charts/waterfall/WrapperWaterfallChart";
 
export const tripData = [
  {
    category: 'Southeast',
    field: 245800
  },
  {
    category: 'West Coast',
    field: 198400
  },
  {
    category: 'Midwest',
    field: 164200
  },
  {
    category: 'Northeast',
    field: 112600
  },
  {
    category: 'Total',
    summary: 'total'
  }
];

export const bikeData = [
  {
    category: 'Plumbing Fixtures',
    field: 184500
  },
  {
    category: 'HVAC Systems',
    field: 142800
  },
  {
    category: 'Pipe & Fittings',
    field: 268400
  },
  {
    category: 'Water Heaters',
    field: 125300
  },
  {
    category: 'Total',
    summary: 'total'
  }
];
 export const stats = [
   { name: 'Optimal Safety Stock', stat: '284,500' },
   { name: 'Current On Hand - Faucets', value: '145,000' },
   { name: 'Current On Hand - Pipe', value: '482,000' },
   { name: 'Current On Hand - HVAC', value: '38,200' },
   { name: 'Current On Hand - Water Heaters', value: '62,400' }
 ];
 
export const reviewTabs = [
  { name: "Month", href: "#", current: true },
  { name: "Quarter", href: "#", current: false },
  { name: "Year", href: "#", current: false },
];

export const meetingTabs = [
  { name: "Daily", href: "#", current: true },
  { name: "Weekly", href: "#", current: false },
];

export const kpiService_m = [
  {
    Name: 'On Hand Inventory by Product Category',
    container: <WrapperWaterfallChart data={bikeData} />,
    stats: stats
  },
  {
    Name: 'On Hand Inventory by Region',
    container: <WrapperWaterfallChart data={tripData} />,
    stats: stats
  },
]
