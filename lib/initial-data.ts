import type { ModelState } from "./types"

export const initialModelState: ModelState = {
  // Parameters - Kohler Faucet production at Kohler, WI plant
  leadTime: 0,
  setupCostPerRun: 2800,
  holdingCostPerItemMonth: 4.5,
  capacity: 15000,

  // Period data
  periods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  demand: [8400, 9200, 11500, 13800, 14200, 12800, 11600, 10400, 9800, 8600, 7200, 6400],
  beginningInventory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6400],

  // Decision variables (will be calculated by optimization)
  quantityToMake: [8400, 9200, 11500, 13800, 14200, 12800, 11600, 10400, 9800, 8600, 13600, 0],
  orderSetup: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],

  // Calculated values (will be calculated based on decisions)
  endingInventory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6400, 0],
  setupCost: [2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 0],
  holdingCost: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28800, 0],
  totalCost: [2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 31600, 0],
}
