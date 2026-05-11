// China Transport Parameters Data
export const TRANSPORT_PARAMS = {
  routes: {
    "Qingdao-QingdaoPort": { distance: 40, city: "Qingdao", port: "Qingdao Port", time: 0.75 },
    "Shenzhen-Yantian": { distance: 26, city: "Shenzhen", port: "Yantian Port", time: 0.5 },
    "Suzhou-Shanghai": { distance: 201, city: "Suzhou", port: "Shanghai Port", time: 2.5 },
    "Dongguan-Shenzhen": { distance: 50, city: "Dongguan", port: "Shenzhen Ports", time: 1 },
    "Chengdu-Shanghai": { distance: 1650, city: "Chengdu", port: "Shanghai Port", time: 24 },
  },

  trucks: {
    light: {
      name: "Light Truck (1.8-8 tons)",
      capacity: 8,
      volume: 35,
      pallets: 12,
      price: 150000,
      fuelEconomy: 12, // L/100km
    },
    medium: {
      name: "Medium Truck (8-15 tons)",
      capacity: 15,
      volume: 55,
      pallets: 24,
      price: 250000,
      fuelEconomy: 25, // L/100km
    },
    heavy: {
      name: "Heavy Truck (15-40 tons)",
      capacity: 40,
      volume: 85,
      pallets: 36,
      price: 350000,
      fuelEconomy: 35, // L/100km
    },
  },

  containers: {
    "20ft": { name: "20ft Container", volume: 33.2, weight: 21.7, vrCapacity: 500, pallets: 11 },
    "40ft": { name: "40ft Container", volume: 67.7, weight: 26.8, vrCapacity: 1000, pallets: 25 },
    "40hc": { name: "40ft HC Container", volume: 76.0, weight: 28.7, vrCapacity: 1200, pallets: 32 },
  },

  costs: {
    fuelPrice: 7.5, // RMB per liter
    driverSalary: 150000, // Annual RMB
    insurance: 25000, // Annual RMB
    maintenance: 85000, // Annual RMB
    financing: 35000, // Annual RMB
    administrative: 20000, // Annual RMB
    tollRate: 0.6, // RMB per km
    securityTracking: 100, // Per container
    cargoInsuranceRate: 0.003, // 0.3% of cargo value
    loadingTime: 3, // hours
    unloadingTime: 2, // hours
  },

  vrHeadset: {
    unitPrice: 2000, // RMB per unit
    weight: 0.5, // kg per unit
    volume: 0.01, // cubic meters per unit
    unitsPerPallet: 60,
  },
}
export const USA_TRANSPORT_PARAMS = {
  routes: {
    "LA-NY": { distance: 2800, city: "Los Angeles", port: "New York", time: 48 },
    "Chicago-Miami": { distance: 1400, city: "Chicago", port: "Miami", time: 24 },
    "Seattle-Denver": { distance: 1300, city: "Seattle", port: "Denver", time: 22 },
  },
  trucks: {
    semi: { name: "Semi Truck", fuelEconomy: 6.5, price: 150000, capacity: 44 },
    box: { name: "Box Truck", fuelEconomy: 8.0, price: 80000, capacity: 26 },
  },
  containers: {
    dry: { name: "Dry Container" },
    reefer: { name: "Reefer Container" },
  },
  costs: {
    fuelPricePerGallon: 3.50,
    fuelPriceGulfCoast: 0.87, // $/liter (converted to $/gal via * 3.78541 in analytics)
    fuelPriceMidwest: 0.90,
    fuelPriceCalifornia: 1.32,
    driverSalaryLow: 45000,
    driverSalaryAverage: 55000,
    driverSalaryHigh: 65000,
    insurance: 12000,
    maintenancePerMile: 0.15,
    overheadPerMile: 0.25,
    financing: 0.08,
    tollRate: 0.05,
    loadingTimeStandard: 2,
    unloadingTimeStandard: 2,
    maintenanceAnnual: 15000,
    dailyOverhead: 50,
    emptyMilesPercentage: 25,
    emptyMileCost: 0.30,
    totalOperatingCostPerMile: 1.85,
  },
  cargo: {
    consumer_goods: { unitPrice: 100, insuranceRate: 0.02 },
    electronics: { unitPrice: 500, insuranceRate: 0.03 },
    perishables: { unitPrice: 50, insuranceRate: 0.04 },
  },
}