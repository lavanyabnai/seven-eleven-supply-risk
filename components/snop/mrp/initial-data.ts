import type { MrpState } from "./types"

export const initialMrpState: MrpState = {
  // Periods
  periods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

  // Total system cost
  totalSystemCost: 91000,

  // End Item - Residential Kitchen Faucet (sourced from Kohler to Ferguson DC)
  endItem: {
    leadTime: 3,
    setupCost: 4500,
    holdingCost: 5.0,
    capacity: 1000,
    grossRequirements: [0, 0, 0, 0, 0, 2400, 3800, 6200, 2800, 4200, 5600, 3200],
    beginningInventory: [0, 0, 0, 0, 0, 0, 3800, 0, 0, 4200, 0, 3200],
    dueIn: [0, 0, 0, 0, 0, 6200, 0, 6200, 7000, 0, 8800, 0],
    endingInventory: [0, 0, 0, 0, 0, 3800, 0, 0, 4200, 0, 3200, 0],
    plannedOrderRelease: [0, 0, 6200, 0, 6200, 7000, 0, 8800, 0, 0, 0, 0],
    totalCost: 74000,
  },

  // Component - Ceramic Cartridge Valve (imported from Guangdong, China)
  component: {
    leadTime: 5,
    qtyPerEndItem: 1,
    setupCost: 8500,
    holdingCost: 1.0,
    capacity: 300,
    grossRequirements: [0, 0, 6200, 0, 6200, 7000, 0, 8800, 0, 0, 0, 0],
    beginningInventory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dueIn: [0, 0, 6200, 0, 6200, 7000, 0, 8800, 0, 0, 0, 0],
    endingInventory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    plannedOrderRelease: [7000, 0, 8800, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalCost: 17000,
  },
}
