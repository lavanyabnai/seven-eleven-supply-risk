import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { eq } from "drizzle-orm"
import {
  locations,
  facilities,
  products,
  suppliers,
  customers,
  demand,
  periods,
  vehicleTypes,
  paths,
  shipping,
  sourcing,
  events,
  facilityExpenses,
  inventory,
  unitConversions,
  units,
  groups,
  groupCustomers,
  groupSites,
  groupSuppliers,
} from "@/db/schema"

config({ path: ".env" })

const sql = neon(process.env.POSTGRES_URL!)
const db = drizzle(sql)

async function main() {
  console.log("Seeding Ferguson analysis data (remaining tables)...")

  // ── Fetch existing IDs from previously seeded tables ────────────────
  const allLocations = await db.select({ id: locations.id, name: locations.name, code: locations.code }).from(locations).execute()
  const locByCode = new Map(allLocations.map((l) => [l.code, l.id]))
  const locByName = new Map(allLocations.map((l) => [l.name, l.id]))

  const allFacilities = await db.select({ id: facilities.id, name: facilities.name }).from(facilities).execute()
  const facByName = new Map(allFacilities.map((f) => [f.name, f.id]))

  const allProducts = await db.select({ id: products.id, name: products.name }).from(products).execute()
  const prodByName = new Map(allProducts.map((p) => [p.name, p.id]))

  const allPeriods = await db.select({ id: periods.id, name: periods.name }).from(periods).execute()
  const periodByName = new Map(allPeriods.map((p) => [p.name, p.id]))

  const allSuppliers = await db.select({ id: suppliers.id, name: suppliers.name }).from(suppliers).execute()
  const supByName = new Map(allSuppliers.map((s) => [s.name, s.id]))

  const q1Id = periodByName.get("Q1 2026")!

  // ── 1. Units ──────────────────────────────────────────────────────
  console.log("Inserting units...")
  await db.delete(units).execute()
  const UNITS = [
    { name: "pcs" }, { name: "ft" }, { name: "kg" }, { name: "lb" },
    { name: "m3" }, { name: "ft3" }, { name: "km/h" }, { name: "mph" },
    { name: "sqft" }, { name: "gal" },
  ]
  await db.insert(units).values(UNITS).execute()
  console.log(`  Inserted ${UNITS.length} units`)

  // ── 2. Vehicle Types ──────────────────────────────────────────────
  console.log("Inserting vehicle types...")
  await db.delete(vehicleTypes).execute()
  const VEHICLES = [
    { name: "53ft Dry Van", capacity: "2400", capacityUnit: "ft3", speed: "55", speedUnit: "mph" },
    { name: "48ft Flatbed", capacity: "2000", capacityUnit: "ft3", speed: "50", speedUnit: "mph" },
    { name: "26ft Box Truck", capacity: "1200", capacityUnit: "ft3", speed: "45", speedUnit: "mph" },
    { name: "Sprinter Van", capacity: "400", capacityUnit: "ft3", speed: "55", speedUnit: "mph" },
    { name: "Intermodal Container 40ft", capacity: "2350", capacityUnit: "ft3", speed: "35", speedUnit: "mph" },
    { name: "Ocean Container 40ft HC", capacity: "2694", capacityUnit: "ft3", speed: "25", speedUnit: "mph" },
    { name: "LTL Carrier", capacity: "800", capacityUnit: "ft3", speed: "45", speedUnit: "mph" },
  ]
  const insertedVehicles = await db.insert(vehicleTypes).values(VEHICLES).returning({ id: vehicleTypes.id, name: vehicleTypes.name }).execute()
  const vehByName = new Map(insertedVehicles.map((v) => [v.name, v.id]))
  console.log(`  Inserted ${VEHICLES.length} vehicle types`)

  // ── 3. Customers (Ferguson branch locations + major contractor accounts) ──
  console.log("Inserting customers...")
  await db.delete(customers).execute()

  // We need customer locations first
  const customerLocations = [
    { code: "CUST-NYC", name: "New York Metro Area", city: "New York", region: "New York", country: "US", latitude: 40.7128, longitude: -74.006 },
    { code: "CUST-LA", name: "Los Angeles Metro Area", city: "Los Angeles", region: "California", country: "US", latitude: 34.0522, longitude: -118.2437 },
    { code: "CUST-HOU", name: "Houston Metro Area", city: "Houston", region: "Texas", country: "US", latitude: 29.7604, longitude: -95.3698 },
    { code: "CUST-CHI", name: "Chicago Metro Area", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },
    { code: "CUST-PHX", name: "Phoenix Metro Area", city: "Phoenix", region: "Arizona", country: "US", latitude: 33.4484, longitude: -112.074 },
    { code: "CUST-PHI", name: "Philadelphia Metro Area", city: "Philadelphia", region: "Pennsylvania", country: "US", latitude: 39.9526, longitude: -75.1652 },
    { code: "CUST-DFW", name: "Dallas-Fort Worth Metro", city: "Dallas", region: "Texas", country: "US", latitude: 32.7767, longitude: -96.797 },
    { code: "CUST-ATL", name: "Atlanta Metro Area", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
    { code: "CUST-MIA", name: "Miami Metro Area", city: "Miami", region: "Florida", country: "US", latitude: 25.7617, longitude: -80.1918 },
    { code: "CUST-DEN", name: "Denver Metro Area", city: "Denver", region: "Colorado", country: "US", latitude: 39.7392, longitude: -104.9903 },
    { code: "CUST-SEA", name: "Seattle Metro Area", city: "Seattle", region: "Washington", country: "US", latitude: 47.6062, longitude: -122.3321 },
    { code: "CUST-CLT", name: "Charlotte Metro Area", city: "Charlotte", region: "North Carolina", country: "US", latitude: 35.2271, longitude: -80.8431 },
    { code: "CUST-SF", name: "San Francisco Bay Area", city: "San Francisco", region: "California", country: "US", latitude: 37.7749, longitude: -122.4194 },
    { code: "CUST-MSP", name: "Minneapolis Metro Area", city: "Minneapolis", region: "Minnesota", country: "US", latitude: 44.9778, longitude: -93.265 },
    { code: "CUST-TPA", name: "Tampa Bay Metro Area", city: "Tampa", region: "Florida", country: "US", latitude: 27.9506, longitude: -82.4572 },
    { code: "CUST-BOS", name: "Boston Metro Area", city: "Boston", region: "Massachusetts", country: "US", latitude: 42.3601, longitude: -71.0589 },
    { code: "CUST-IND", name: "Indianapolis Metro Area", city: "Indianapolis", region: "Indiana", country: "US", latitude: 39.7684, longitude: -86.1581 },
    { code: "CUST-PDX", name: "Portland Metro Area", city: "Portland", region: "Oregon", country: "US", latitude: 45.5152, longitude: -122.6784 },
    { code: "CUST-LV", name: "Las Vegas Metro Area", city: "Las Vegas", region: "Nevada", country: "US", latitude: 36.1699, longitude: -115.1398 },
    { code: "CUST-NSH", name: "Nashville Metro Area", city: "Nashville", region: "Tennessee", country: "US", latitude: 36.1627, longitude: -86.7816 },
  ]

  const insertedCustLocs = await db.insert(locations).values(customerLocations).returning({ id: locations.id, code: locations.code }).execute()
  const custLocByCode = new Map(insertedCustLocs.map((l) => [l.code, l.id]))

  const CUSTOMERS = [
    { name: "Ferguson Branch - New York", type: "Branch", locationId: custLocByCode.get("CUST-NYC")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Los Angeles", type: "Branch", locationId: custLocByCode.get("CUST-LA")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Houston", type: "Branch", locationId: custLocByCode.get("CUST-HOU")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Chicago", type: "Branch", locationId: custLocByCode.get("CUST-CHI")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Phoenix", type: "Branch", locationId: custLocByCode.get("CUST-PHX")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Philadelphia", type: "Branch", locationId: custLocByCode.get("CUST-PHI")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Dallas", type: "Branch", locationId: custLocByCode.get("CUST-DFW")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Atlanta", type: "Branch", locationId: custLocByCode.get("CUST-ATL")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Miami", type: "Branch", locationId: custLocByCode.get("CUST-MIA")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Denver", type: "Branch", locationId: custLocByCode.get("CUST-DEN")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Seattle", type: "Branch", locationId: custLocByCode.get("CUST-SEA")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Charlotte", type: "Branch", locationId: custLocByCode.get("CUST-CLT")!, inclusionType: "Include" },
    { name: "Ferguson Branch - San Francisco", type: "Branch", locationId: custLocByCode.get("CUST-SF")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Minneapolis", type: "Branch", locationId: custLocByCode.get("CUST-MSP")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Tampa", type: "Branch", locationId: custLocByCode.get("CUST-TPA")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Boston", type: "Branch", locationId: custLocByCode.get("CUST-BOS")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Indianapolis", type: "Branch", locationId: custLocByCode.get("CUST-IND")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Portland", type: "Branch", locationId: custLocByCode.get("CUST-PDX")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Las Vegas", type: "Branch", locationId: custLocByCode.get("CUST-LV")!, inclusionType: "Include" },
    { name: "Ferguson Branch - Nashville", type: "Branch", locationId: custLocByCode.get("CUST-NSH")!, inclusionType: "Include" },
  ]

  const insertedCustomers = await db.insert(customers).values(CUSTOMERS).returning({ id: customers.id, name: customers.name }).execute()
  const custByName = new Map(insertedCustomers.map((c) => [c.name, c.id]))
  console.log(`  Inserted ${CUSTOMERS.length} customers`)

  // ── 4. Demand ─────────────────────────────────────────────────────
  console.log("Inserting demand...")
  await db.delete(demand).execute()

  const demandProducts = [
    "Residential Faucets - Kitchen", "Toilets - Residential", "Tank Water Heaters - Residential",
    "PVC Pipe - Schedule 40", "Residential HVAC Systems", "PEX Tubing",
    "Garbage Disposals", "Copper Fittings", "Thermostats - Smart", "Generators - Residential",
  ]

  const demandValues: any[] = []
  for (const [custName, custId] of custByName) {
    for (const pName of demandProducts) {
      const pId = prodByName.get(pName)
      if (!pId) continue
      demandValues.push({
        customerId: custId,
        productId: pId,
        timePeriodId: q1Id,
        demandType: "Periodic demand",
        revenue: String(Math.floor(Math.random() * 500000 + 100000)),
        downPenalty: String(Math.floor(Math.random() * 5000 + 1000)),
        upPenalty: "0",
        currency: "USD",
        expectedLeadTime: String(Math.floor(Math.random() * 3 + 1)),
        timeUnit: "days",
        backorderPolicy: "Not Allowed",
        inclusionType: "Include",
      })
    }
  }

  // Insert in batches to avoid hitting limits
  for (let i = 0; i < demandValues.length; i += 50) {
    await db.insert(demand).values(demandValues.slice(i, i + 50)).execute()
  }
  console.log(`  Inserted ${demandValues.length} demand records`)

  // ── 5. Paths (transportation lanes) ───────────────────────────────
  console.log("Inserting paths...")
  await db.delete(paths).execute()

  const dryVanId = vehByName.get("53ft Dry Van")!
  const flatbedId = vehByName.get("48ft Flatbed")!
  const boxTruckId = vehByName.get("26ft Box Truck")!
  const oceanContId = vehByName.get("Ocean Container 40ft HC")!
  const intermodalId = vehByName.get("Intermodal Container 40ft")!
  const ltlId = vehByName.get("LTL Carrier")!

  const PATHS = [
    // Domestic manufacturer-to-DC lanes
    { name: "Kohler WI - Newport News", fromLocation: "Kohler HQ", toLocation: "Ferguson DC - Newport News", costCalculationPolicy: "Product&distance-based", distance: "1340", distanceUnit: "miles", transportationTime: "2.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Kohler WI - Chicago", fromLocation: "Kohler HQ", toLocation: "Ferguson DC - Chicago", costCalculationPolicy: "Product&distance-based", distance: "185", distanceUnit: "miles", transportationTime: "0.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Kohler SC - Atlanta", fromLocation: "Kohler Plant Spartanburg", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "260", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Moen NC - Newport News", fromLocation: "Moen Plant New Bern", toLocation: "Ferguson DC - Newport News", costCalculationPolicy: "Product&distance-based", distance: "310", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Moen NC - Charlotte", fromLocation: "Moen Plant New Bern", toLocation: "Ferguson DC - Charlotte", costCalculationPolicy: "Product&distance-based", distance: "340", distanceUnit: "miles", transportationTime: "1.0", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Delta IN - Indianapolis", fromLocation: "Delta Faucet Plant Greensburg", toLocation: "Ferguson DC - Indianapolis", costCalculationPolicy: "Product&distance-based", distance: "85", distanceUnit: "miles", transportationTime: "0.25", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Delta IN - Chicago", fromLocation: "Delta Faucet Plant Greensburg", toLocation: "Ferguson DC - Chicago", costCalculationPolicy: "Product&distance-based", distance: "290", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "AO Smith TN - Atlanta", fromLocation: "A.O. Smith Plant Ashland City", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "350", distanceUnit: "miles", transportationTime: "1.0", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "AO Smith TN - Dallas", fromLocation: "A.O. Smith Plant Ashland City", toLocation: "Ferguson DC - Dallas", costCalculationPolicy: "Product&distance-based", distance: "780", distanceUnit: "miles", transportationTime: "1.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Charlotte Pipe - Atlanta", fromLocation: "Charlotte Pipe HQ", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "245", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: flatbedId, transportationPolicy: "FTL" },
    { name: "Charlotte Pipe - Charlotte", fromLocation: "Charlotte Pipe HQ", toLocation: "Ferguson DC - Charlotte", costCalculationPolicy: "Product&distance-based", distance: "12", distanceUnit: "miles", transportationTime: "0.1", timeUnit: "days", vehicleTypeId: flatbedId, transportationPolicy: "FTL" },
    { name: "JM Eagle CA - San Bernardino", fromLocation: "JM Eagle HQ", toLocation: "Ferguson DC - San Bernardino", costCalculationPolicy: "Product&distance-based", distance: "65", distanceUnit: "miles", transportationTime: "0.2", timeUnit: "days", vehicleTypeId: flatbedId, transportationPolicy: "FTL" },
    { name: "JM Eagle TX - Dallas", fromLocation: "JM Eagle Plant Houston", toLocation: "Ferguson DC - Dallas", costCalculationPolicy: "Product&distance-based", distance: "240", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: flatbedId, transportationPolicy: "FTL" },
    { name: "Mueller AL - Atlanta", fromLocation: "Mueller Water Plant Albertville", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "180", distanceUnit: "miles", transportationTime: "0.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Rheem AL - Atlanta", fromLocation: "Rheem Plant Montgomery", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "260", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Trane SC - Charlotte", fromLocation: "Trane Plant Columbia", toLocation: "Ferguson DC - Charlotte", costCalculationPolicy: "Product&distance-based", distance: "95", distanceUnit: "miles", transportationTime: "0.25", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Carrier IN - Chicago", fromLocation: "Carrier Plant Indianapolis", toLocation: "Ferguson DC - Chicago", costCalculationPolicy: "Product&distance-based", distance: "185", distanceUnit: "miles", transportationTime: "0.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Lennox IA - Chicago", fromLocation: "Lennox Plant Marshalltown", toLocation: "Ferguson DC - Chicago", costCalculationPolicy: "Product&distance-based", distance: "310", distanceUnit: "miles", transportationTime: "0.75", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "InSinkErator WI - Chicago", fromLocation: "InSinkErator HQ", toLocation: "Ferguson DC - Chicago", costCalculationPolicy: "Product&distance-based", distance: "75", distanceUnit: "miles", transportationTime: "0.2", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Rinnai GA - Atlanta", fromLocation: "Rinnai Plant Griffin", toLocation: "Ferguson DC - Atlanta", costCalculationPolicy: "Product&distance-based", distance: "65", distanceUnit: "miles", transportationTime: "0.2", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    // International lanes
    { name: "Kohler CN - San Bernardino (Ocean)", fromLocation: "Kohler Plant Foshan", toLocation: "Ferguson DC - San Bernardino", costCalculationPolicy: "Product&distance-based", distance: "11200", distanceUnit: "miles", transportationTime: "35", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "Moen CN - San Bernardino (Ocean)", fromLocation: "Moen Plant Jiangmen", toLocation: "Ferguson DC - San Bernardino", costCalculationPolicy: "Product&distance-based", distance: "11300", distanceUnit: "miles", transportationTime: "35", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "Delta CN - San Bernardino (Ocean)", fromLocation: "Delta Faucet Plant Zhuhai", toLocation: "Ferguson DC - San Bernardino", costCalculationPolicy: "Product&distance-based", distance: "11100", distanceUnit: "miles", transportationTime: "35", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "TOTO JP - San Bernardino (Ocean)", fromLocation: "TOTO Plant Kitakyushu", toLocation: "Ferguson DC - San Bernardino", costCalculationPolicy: "Product&distance-based", distance: "8900", distanceUnit: "miles", transportationTime: "28", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "Grohe DE - Newport News (Ocean)", fromLocation: "Grohe HQ", toLocation: "Ferguson DC - Newport News", costCalculationPolicy: "Product&distance-based", distance: "6400", distanceUnit: "miles", transportationTime: "21", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "Navien KR - Sacramento (Ocean)", fromLocation: "Navien Plant Sejong", toLocation: "Ferguson DC - Sacramento", costCalculationPolicy: "Product&distance-based", distance: "9200", distanceUnit: "miles", transportationTime: "30", timeUnit: "days", vehicleTypeId: oceanContId, transportationPolicy: "FTL" },
    { name: "Am Std MX - Dallas", fromLocation: "American Standard Plant Monterrey", toLocation: "Ferguson DC - Dallas", costCalculationPolicy: "Product&distance-based", distance: "780", distanceUnit: "miles", transportationTime: "2.0", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
    { name: "Rheem MX - Phoenix", fromLocation: "Rheem Plant Monterrey", toLocation: "Ferguson DC - Phoenix", costCalculationPolicy: "Product&distance-based", distance: "1150", distanceUnit: "miles", transportationTime: "2.5", timeUnit: "days", vehicleTypeId: dryVanId, transportationPolicy: "FTL" },
  ]

  const pathValues = PATHS.map((p) => ({ ...p, costPuPk: "2.50", currency: "USD", inclusionType: "Include" }))
  await db.insert(paths).values(pathValues).execute()
  console.log(`  Inserted ${PATHS.length} paths`)

  // ── 6. Events (supply chain risk events) ──────────────────────────
  console.log("Inserting events...")
  await db.delete(events).execute()

  const EVENTS = [
    { name: "China Section 301 Tariff Increase", eventType: "Cost Increase", occurrenceType: "Scheduled", occurrenceTime: "Q2 2026", probability: "0.85" },
    { name: "Gulf Coast Hurricane Cat 3+", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q3 2026", probability: "0.35" },
    { name: "West Coast Port Congestion", eventType: "Delay", occurrenceType: "Probabilistic", occurrenceTime: "Q1 2026", probability: "0.45" },
    { name: "PVC Resin Shortage - Gulf Coast", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q3 2026", probability: "0.30" },
    { name: "Copper Price Spike >$5/lb", eventType: "Cost Increase", occurrenceType: "Probabilistic", occurrenceTime: "Q2 2026", probability: "0.40" },
    { name: "Guangdong Province Typhoon", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q3 2026", probability: "0.25" },
    { name: "Steel Tariff Increase Section 232", eventType: "Cost Increase", occurrenceType: "Scheduled", occurrenceTime: "Q1 2026", probability: "0.90" },
    { name: "Trucking Capacity Shortage", eventType: "Delay", occurrenceType: "Probabilistic", occurrenceTime: "Q2 2026", probability: "0.55" },
    { name: "Panama Canal Drought Restrictions", eventType: "Delay", occurrenceType: "Probabilistic", occurrenceTime: "Q1 2026", probability: "0.40" },
    { name: "Semiconductor Shortage - HVAC Controls", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q2 2026", probability: "0.30" },
    { name: "Southeast US Tornado Outbreak", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q2 2026", probability: "0.20" },
    { name: "California Earthquake >6.0", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q1 2026", probability: "0.10" },
    { name: "Midwest Winter Storm", eventType: "Delay", occurrenceType: "Probabilistic", occurrenceTime: "Q1 2026", probability: "0.60" },
    { name: "USMCA Renegotiation Tariff", eventType: "Cost Increase", occurrenceType: "Probabilistic", occurrenceTime: "Q4 2026", probability: "0.20" },
    { name: "Red Sea Shipping Disruption", eventType: "Delay", occurrenceType: "Probabilistic", occurrenceTime: "Q1 2026", probability: "0.35" },
    { name: "Cast Iron Scrap Shortage", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q2 2026", probability: "0.25" },
    { name: "InSinkErator Single-Source Failure", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q3 2026", probability: "0.08" },
    { name: "Newport News DC Flood Risk", eventType: "Supply Disruption", occurrenceType: "Probabilistic", occurrenceTime: "Q3 2026", probability: "0.15" },
  ]

  await db.insert(events).values(EVENTS).execute()
  console.log(`  Inserted ${EVENTS.length} events`)

  // ── 7. Facility Expenses ──────────────────────────────────────────
  console.log("Inserting facility expenses...")
  await db.delete(facilityExpenses).execute()

  const expenseValues: any[] = []
  // DCs get facility costs and carrying costs
  const dcNames = allFacilities.filter((f) => f.name.includes("Ferguson")).map((f) => f)
  for (const dc of dcNames) {
    expenseValues.push(
      { facilityId: dc.id, expenseType: "Facility", value: String(Math.floor(Math.random() * 2000000 + 500000)), currency: "USD", timeUnit: "Month", timePeriodId: q1Id },
      { facilityId: dc.id, expenseType: "Carrying cost", value: String((Math.random() * 2 + 0.5).toFixed(2)), currency: "USD", timeUnit: "Month", productUnit: "pcs", timePeriodId: q1Id },
    )
  }
  // Plants get facility + initial costs
  const plantNames = allFacilities.filter((f) => f.name.includes("Plant")).map((f) => f)
  for (const plant of plantNames) {
    expenseValues.push(
      { facilityId: plant.id, expenseType: "Facility", value: String(Math.floor(Math.random() * 3000000 + 1000000)), currency: "USD", timeUnit: "Month", timePeriodId: q1Id },
    )
  }

  for (let i = 0; i < expenseValues.length; i += 50) {
    await db.insert(facilityExpenses).values(expenseValues.slice(i, i + 50)).execute()
  }
  console.log(`  Inserted ${expenseValues.length} facility expenses`)

  // ── 8. Inventory policies ─────────────────────────────────────────
  console.log("Inserting inventory policies...")
  await db.delete(inventory).execute()

  const inventoryProducts = [
    "Residential Faucets - Kitchen", "Toilets - Residential", "Tank Water Heaters - Residential",
    "PVC Pipe - Schedule 40", "PEX Tubing", "Garbage Disposals", "Residential HVAC Systems",
  ]

  const invValues: any[] = []
  for (const dc of dcNames) {
    for (const pName of inventoryProducts) {
      const pId = prodByName.get(pName)
      if (!pId) continue
      invValues.push({
        facilityId: dc.id,
        productId: pId,
        policyType: "Min-Max",
        initialStock: String(Math.floor(Math.random() * 5000 + 1000)),
        periodicCheck: true,
        period: 7,
        timeUnit: "days",
        timePeriodId: q1Id,
        inclusionType: "Include",
      })
    }
  }

  for (let i = 0; i < invValues.length; i += 50) {
    await db.insert(inventory).values(invValues.slice(i, i + 50)).execute()
  }
  console.log(`  Inserted ${invValues.length} inventory policies`)

  // ── 9. Unit Conversions ───────────────────────────────────────────
  console.log("Inserting unit conversions...")
  await db.delete(unitConversions).execute()

  const UC = [
    { productName: "PVC Pipe - Schedule 40", amountFrom: "1", unitFrom: "ft", amountTo: "0.3048", unitTo: "m3" },
    { productName: "PEX Tubing", amountFrom: "1", unitFrom: "ft", amountTo: "0.3048", unitTo: "m3" },
    { productName: "Copper Pipe - Type L", amountFrom: "1", unitFrom: "ft", amountTo: "0.3048", unitTo: "m3" },
    { productName: "Cast Iron Pipe", amountFrom: "1", unitFrom: "ft", amountTo: "0.3048", unitTo: "m3" },
    { productName: "HDPE Pipe - Waterworks", amountFrom: "1", unitFrom: "ft", amountTo: "0.3048", unitTo: "m3" },
    { productName: "Residential Faucets - Kitchen", amountFrom: "1", unitFrom: "pcs", amountTo: "2.5", unitTo: "lb" },
    { productName: "Toilets - Residential", amountFrom: "1", unitFrom: "pcs", amountTo: "80", unitTo: "lb" },
    { productName: "Tank Water Heaters - Residential", amountFrom: "1", unitFrom: "pcs", amountTo: "150", unitTo: "lb" },
    { productName: "Residential HVAC Systems", amountFrom: "1", unitFrom: "pcs", amountTo: "250", unitTo: "lb" },
    { productName: "Garbage Disposals", amountFrom: "1", unitFrom: "pcs", amountTo: "15", unitTo: "lb" },
  ]

  const ucValues = UC.map((u) => ({
    productId: prodByName.get(u.productName)!,
    amountFrom: u.amountFrom,
    unitFrom: u.unitFrom,
    amountTo: u.amountTo,
    unitTo: u.unitTo,
  })).filter((u) => u.productId)

  await db.insert(unitConversions).values(ucValues).execute()
  console.log(`  Inserted ${ucValues.length} unit conversions`)

  // ── 10. Sourcing policies ─────────────────────────────────────────
  console.log("Inserting sourcing policies...")
  await db.delete(sourcing).execute()

  const sourcingValues = [
    { deliveryDestination: "Ferguson Master DC - Newport News", sources: ["Kohler Plant - Kohler WI", "Moen Plant - New Bern NC", "A.O. Smith Plant - Ashland City TN"], productId: prodByName.get("Residential Faucets - Kitchen")!, type: "Cheapest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Chicago", sources: ["Delta Faucet Plant - Greensburg IN", "Carrier Plant - Indianapolis IN", "Lennox Plant - Marshalltown IA"], productId: prodByName.get("Residential HVAC Systems")!, type: "Closest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Atlanta", sources: ["Rheem Plant - Montgomery AL", "Trane Plant - Columbia SC", "Rinnai Plant - Griffin GA"], productId: prodByName.get("Tankless Water Heaters")!, type: "Cheapest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - San Bernardino", sources: ["Kohler Plant - Foshan CN", "Moen Plant - Jiangmen CN", "Delta Faucet Plant - Zhuhai CN"], productId: prodByName.get("Residential Faucets - Kitchen")!, type: "Cheapest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Dallas", sources: ["JM Eagle Plant - Houston TX", "A.O. Smith Plant - Ashland City TN", "American Standard Plant - Monterrey MX"], productId: prodByName.get("PVC Pipe - Schedule 40")!, type: "Closest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Charlotte", sources: ["Charlotte Pipe Plant - Charlotte NC", "Trane Plant - Columbia SC", "Kohler Plant - Spartanburg SC"], productId: prodByName.get("Cast Iron Pipe")!, type: "Closest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Denver", sources: ["Lennox Plant - Marshalltown IA", "Carrier Plant - Indianapolis IN"], productId: prodByName.get("HVAC Air Handlers")!, type: "Cheapest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Sacramento", sources: ["Navien Plant - Sejong KR", "Noritz Plant - Akashi JP"], productId: prodByName.get("Tankless Water Heaters")!, type: "Fastest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Orlando", sources: ["Rheem Plant - Montgomery AL", "Charlotte Pipe Plant - Charlotte NC"], productId: prodByName.get("Tank Water Heaters - Residential")!, type: "Cheapest", timePeriodId: q1Id, inclusionType: "Include" },
    { deliveryDestination: "Ferguson Regional DC - Portland", sources: ["JM Eagle Plant - Los Angeles CA", "Uponor Plant - Nastola FI"], productId: prodByName.get("PEX Tubing")!, type: "Most Inventory", timePeriodId: q1Id, inclusionType: "Include" },
  ]

  await db.insert(sourcing).values(sourcingValues).execute()
  console.log(`  Inserted ${sourcingValues.length} sourcing policies`)

  // ── 11. Groups ────────────────────────────────────────────────────
  console.log("Inserting groups...")
  await db.delete(groupCustomers).execute()
  await db.delete(groupSites).execute()
  await db.delete(groupSuppliers).execute()
  await db.delete(groups).execute()

  const GROUPS = [
    { name: "Southeast Region", description: "Ferguson branches and DCs serving the Southeast US" },
    { name: "West Coast Region", description: "Ferguson branches and DCs serving the West Coast" },
    { name: "Midwest Region", description: "Ferguson branches and DCs serving the Midwest" },
    { name: "Northeast Region", description: "Ferguson branches and DCs serving the Northeast" },
    { name: "Plumbing Fixtures Suppliers", description: "All suppliers of faucets, toilets, and bathing products" },
    { name: "HVAC Suppliers", description: "All HVAC system and component suppliers" },
    { name: "Pipe & Fittings Suppliers", description: "All pipe, tubing, and fitting suppliers" },
    { name: "Water Heater Suppliers", description: "All tank and tankless water heater suppliers" },
    { name: "China Import Sources", description: "All manufacturing plants in China subject to Section 301 tariffs" },
    { name: "Gulf Coast Risk Zone", description: "Facilities and suppliers in hurricane-prone Gulf Coast region" },
  ]

  const insertedGroups = await db.insert(groups).values(GROUPS).returning({ id: groups.id, name: groups.name }).execute()
  const grpByName = new Map(insertedGroups.map((g) => [g.name, g.id]))
  console.log(`  Inserted ${GROUPS.length} groups`)

  // Group customers
  const gcValues: any[] = []
  const seCustomers = ["Atlanta", "Miami", "Charlotte", "Tampa", "Nashville"]
  const wcCustomers = ["Los Angeles", "San Francisco", "Seattle", "Portland", "Las Vegas", "Phoenix"]
  const mwCustomers = ["Chicago", "Indianapolis", "Minneapolis", "Denver"]
  const neCustomers = ["New York", "Philadelphia", "Boston"]

  for (const [name, id] of custByName) {
    if (seCustomers.some((c) => name.includes(c))) gcValues.push({ groupId: grpByName.get("Southeast Region")!, customerId: id })
    if (wcCustomers.some((c) => name.includes(c))) gcValues.push({ groupId: grpByName.get("West Coast Region")!, customerId: id })
    if (mwCustomers.some((c) => name.includes(c))) gcValues.push({ groupId: grpByName.get("Midwest Region")!, customerId: id })
    if (neCustomers.some((c) => name.includes(c))) gcValues.push({ groupId: grpByName.get("Northeast Region")!, customerId: id })
  }
  if (gcValues.length > 0) await db.insert(groupCustomers).values(gcValues).execute()

  // Group sites (DCs by region)
  const gsValues: any[] = []
  const seDCs = ["Atlanta", "Orlando", "Charlotte"]
  const wcDCs = ["San Bernardino", "Sacramento", "Portland", "Phoenix"]
  const mwDCs = ["Chicago", "Indianapolis", "Denver"]

  for (const fac of allFacilities) {
    if (seDCs.some((d) => fac.name.includes(d))) gsValues.push({ groupId: grpByName.get("Southeast Region")!, siteId: fac.id })
    if (wcDCs.some((d) => fac.name.includes(d))) gsValues.push({ groupId: grpByName.get("West Coast Region")!, siteId: fac.id })
    if (mwDCs.some((d) => fac.name.includes(d))) gsValues.push({ groupId: grpByName.get("Midwest Region")!, siteId: fac.id })
    // China plants
    if (fac.name.includes("CN") || fac.name.includes("Foshan") || fac.name.includes("Jiangmen") || fac.name.includes("Zhuhai")) gsValues.push({ groupId: grpByName.get("China Import Sources")!, siteId: fac.id })
    // Gulf coast
    if (fac.name.includes("Montgomery") || fac.name.includes("Houston") || fac.name.includes("Orlando") || fac.name.includes("Fort Smith")) gsValues.push({ groupId: grpByName.get("Gulf Coast Risk Zone")!, siteId: fac.id })
  }
  if (gsValues.length > 0) await db.insert(groupSites).values(gsValues).execute()

  // Group suppliers
  const gspValues: any[] = []
  const plumbSuppliers = ["Kohler", "Moen", "Delta Faucet", "American Standard", "TOTO", "Grohe", "Pfister"]
  const hvacSuppliers = ["Rheem", "Trane", "Carrier", "Lennox"]
  const pipeSuppliers = ["Charlotte Pipe", "JM Eagle", "Mueller Water", "Uponor", "Viega"]
  const whSuppliers = ["A.O. Smith", "Bradford White", "Rinnai", "Noritz", "Navien", "Rheem"]

  for (const [name, id] of supByName) {
    if (plumbSuppliers.some((s) => name.includes(s))) gspValues.push({ groupId: grpByName.get("Plumbing Fixtures Suppliers")!, supplierId: id })
    if (hvacSuppliers.some((s) => name.includes(s))) gspValues.push({ groupId: grpByName.get("HVAC Suppliers")!, supplierId: id })
    if (pipeSuppliers.some((s) => name.includes(s))) gspValues.push({ groupId: grpByName.get("Pipe & Fittings Suppliers")!, supplierId: id })
    if (whSuppliers.some((s) => name.includes(s))) gspValues.push({ groupId: grpByName.get("Water Heater Suppliers")!, supplierId: id })
  }
  if (gspValues.length > 0) await db.insert(groupSuppliers).values(gspValues).execute()

  console.log(`  Inserted group memberships: ${gcValues.length} customers, ${gsValues.length} sites, ${gspValues.length} suppliers`)

  console.log("\nFerguson analysis data seed complete!")
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
