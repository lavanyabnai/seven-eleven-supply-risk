import type { ReverseLogisticsModel, OptimizationScenario } from "./types"

export const initialReverseLogisticsModel: ReverseLogisticsModel = {
  costBreakdown: {
    totalCost: 2295000,
    recyclingFixedCost: 8400,
    recyclingVariableCost: 1412400,
    storageSortingFixedCost: 2100,
    storageSortingVariableCost: 72900,
    cpRecyclingTransportCost: 799200,
  },
  facilities: [
    {
      id: "recycling-1",
      name: "Ferguson Returns Center - Newport News",
      type: "recycling",
      varCost: 74.8,
      fixedCost: 4500,
      isOpen: true,
      capacity: 10500,
      collected: 10500,
    },
    {
      id: "recycling-2",
      name: "Ferguson Returns Center - Dallas",
      type: "recycling",
      varCost: 83.6,
      fixedCost: 3900,
      isOpen: true,
      capacity: 9000,
      collected: 7500,
    },
    {
      id: "regional-sorting",
      name: "Ferguson Inspection & Sort Hub",
      type: "sorting",
      varCost: 5.4,
      fixedCost: 2100,
      isOpen: true,
      capacity: 18000,
      collected: 13500,
    },
    {
      id: "cp-1",
      name: "Ferguson Branch Returns - Southeast",
      type: "sorting",
      varCost: 0,
      fixedCost: 0,
      isOpen: true,
      capacity: 6000,
      collected: 6000,
    },
    {
      id: "cp-2",
      name: "Ferguson Branch Returns - Southwest",
      type: "sorting",
      varCost: 0,
      fixedCost: 0,
      isOpen: true,
      capacity: 4500,
      collected: 4500,
    },
    {
      id: "cp-3",
      name: "Ferguson Branch Returns - Midwest",
      type: "sorting",
      varCost: 0,
      fixedCost: 0,
      isOpen: true,
      capacity: 7500,
      collected: 7500,
    },
  ],
  flows: [
    // From Ferguson Inspection & Sort Hub to Returns Centers
    { from: "regional-sorting", to: "recycling-1", quantity: 10500 },
    { from: "regional-sorting", to: "recycling-2", quantity: 3000 },

    // From Branch Returns to Inspection & Sort Hub
    { from: "cp-1", to: "regional-sorting", quantity: 6000 },
    { from: "cp-3", to: "regional-sorting", quantity: 7500 },

    // Direct from Branch Returns to Returns Centers
    { from: "cp-2", to: "recycling-2", quantity: 4500 },
  ],
  totalSupply: 18000,
  recyclingFacilitiesToOpen: {
    number: 2,
    min: 1,
    max: 2,
  },
  transportCosts: [
    { from: "regional-sorting", to: "recycling-1", cost: 17.6 },
    { from: "regional-sorting", to: "recycling-2", cost: 19.2 },
    { from: "cp-1", to: "regional-sorting", cost: 28.4 },
    { from: "cp-1", to: "recycling-1", cost: 66.4 },
    { from: "cp-1", to: "recycling-2", cost: 56.2 },
    { from: "cp-2", to: "regional-sorting", cost: 26.1 },
    { from: "cp-2", to: "recycling-1", cost: 62.4 },
    { from: "cp-2", to: "recycling-2", cost: 46.2 },
    { from: "cp-3", to: "regional-sorting", cost: 23.8 },
    { from: "cp-3", to: "recycling-1", cost: 73.9 },
    { from: "cp-3", to: "recycling-2", cost: 53.6 },
  ],
  constraints: [
    {
      name: "Ferguson Returns Center - Newport News Capacity",
      value: 10500,
      operator: "<=",
      limit: 10500,
    },
    {
      name: "Ferguson Returns Center - Dallas Capacity",
      value: 7500,
      operator: "<=",
      limit: 9000,
    },
    {
      name: "Ferguson Inspection & Sort Hub Capacity",
      value: 13500,
      operator: "<=",
      limit: 18000,
    },
    {
      name: "Ferguson Inspection & Sort Hub Balance",
      value: 0,
      operator: "=",
      limit: 0,
    },
  ],
}

export const initialScenarios: OptimizationScenario[] = [
  {
    id: "scenario-1",
    name: "Base Case",
    description: "Current Ferguson reverse logistics network for defective faucets, damaged water heaters, and warranty HVAC returns",
    createdAt: new Date(2025, 4, 20),
    totalCost: 2295000,
    model: initialReverseLogisticsModel,
  },
  {
    id: "scenario-2",
    name: "Direct Transport",
    description: "More direct transport from branch returns to Ferguson returns centers",
    createdAt: new Date(2025, 4, 21),
    totalCost: 2227500,
    model: {
      ...initialReverseLogisticsModel,
      costBreakdown: {
        ...initialReverseLogisticsModel.costBreakdown,
        totalCost: 2227500,
        storageSortingVariableCost: 48600,
        cpRecyclingTransportCost: 758100,
      },
      flows: [
        // From Ferguson Inspection & Sort Hub to Returns Centers
        { from: "regional-sorting", to: "recycling-1", quantity: 9000 },
        { from: "regional-sorting", to: "recycling-2", quantity: 0 },

        // From Branch Returns to Inspection & Sort Hub
        { from: "cp-1", to: "regional-sorting", quantity: 3000 },
        { from: "cp-3", to: "regional-sorting", quantity: 6000 },

        // Direct from Branch Returns to Returns Centers
        { from: "cp-1", to: "recycling-2", quantity: 3000 },
        { from: "cp-2", to: "recycling-2", quantity: 4500 },
        { from: "cp-3", to: "recycling-1", quantity: 1500 },
      ],
    },
  },
  {
    id: "scenario-3",
    name: "Centralized Sorting",
    description: "All branch returns route through Ferguson Inspection & Sort Hub",
    createdAt: new Date(2025, 4, 22),
    totalCost: 2340000,
    model: {
      ...initialReverseLogisticsModel,
      costBreakdown: {
        ...initialReverseLogisticsModel.costBreakdown,
        totalCost: 2340000,
        storageSortingVariableCost: 97200,
        cpRecyclingTransportCost: 822000,
      },
      flows: [
        // From Ferguson Inspection & Sort Hub to Returns Centers
        { from: "regional-sorting", to: "recycling-1", quantity: 10500 },
        { from: "regional-sorting", to: "recycling-2", quantity: 7500 },

        // From Branch Returns to Inspection & Sort Hub
        { from: "cp-1", to: "regional-sorting", quantity: 6000 },
        { from: "cp-2", to: "regional-sorting", quantity: 4500 },
        { from: "cp-3", to: "regional-sorting", quantity: 7500 },

        // No direct flows from Branch Returns to Returns Centers
      ],
    },
  },
]
