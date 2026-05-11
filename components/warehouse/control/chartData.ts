export interface KPIData {
  title: string
  value: number
  status: "Above Target" | "Below Target" | "On Target"
  type: "monotone" | "linear" | "step"| "natural"
  chartType: "bar" | "line" | "area" | "pie"
  chartData: Array<{
    category: string
    data: number
    data2?: number
  }>
}

// Ferguson DC performance KPIs — daily operational metrics across regional DCs and MDCs
export const kpiDataArray: KPIData[] = [
  {
    title: "Pallets Received",
    value: 3200,
    status: "Above Target",
    chartType: "bar",
    type: "monotone",
    chartData: [
      { category: "Mon", data: 580, data2: 520 },
      { category: "Tue", data: 540, data2: 490 },
      { category: "Wed", data: 620, data2: 550 },
      { category: "Thu", data: 510, data2: 480 },
      { category: "Fri", data: 490, data2: 460 },
      { category: "Sat", data: 460, data2: 420 },
    ],
  },
  {
    title: "Pick-to-Ship Time (min)",
    value: 42,
    status: "Below Target",
    chartType: "line",
    type: "linear",
    chartData: [
      { category: "Mon", data: 38, data2: 35 },
      { category: "Tue", data: 45, data2: 35 },
      { category: "Wed", data: 52, data2: 35 },
      { category: "Thu", data: 41, data2: 35 },
      { category: "Fri", data: 48, data2: 35 },
      { category: "Sat", data: 36, data2: 35 },
    ],
  },
  {
    title: "Order Fill Rate (%)",
    value: 96,
    status: "On Target",
    chartType: "area",
    type: "monotone",
    chartData: [
      { category: "Mon", data: 97, data2: 95 },
      { category: "Tue", data: 95, data2: 95 },
      { category: "Wed", data: 96, data2: 95 },
      { category: "Thu", data: 94, data2: 95 },
      { category: "Fri", data: 97, data2: 95 },
      { category: "Sat", data: 98, data2: 95 },
    ],
  },
  {
    title: "Branch Replenishment",
    value: 8500,
    status: "Above Target",
    chartType: "pie",
   type: "monotone",
    chartData: [
      { category: "Plumbing", data: 3400 },
      { category: "HVAC", data: 2100 },
      { category: "Waterworks", data: 1200 },
      { category: "PVF", data: 950 },
      { category: "Appliances", data: 550 },
      { category: "Lighting", data: 300 },
    ],
  },
]

export const chartConfig = {
  data: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
    },
    data2: {
    label: "Target",
    color: "hsl(var(--chart-2))",
        },
}
