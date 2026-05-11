import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import {
  locations,
  facilities,
  products,
  suppliers,
  supplierProducts,
  productFlows,
  periods,
} from "@/db/schema"

config({ path: ".env" })

const sql = neon(process.env.POSTGRES_URL!)
const db = drizzle(sql)

// ── Locations ───────────────────────────────────────────────────────
const LOCATIONS = [
  // Ferguson DCs
  { code: "FDC-01", name: "Ferguson DC - Newport News", city: "Newport News", region: "Virginia", country: "US", latitude: 37.0871, longitude: -76.473 },
  { code: "FDC-02", name: "Ferguson DC - Dallas", city: "Dallas", region: "Texas", country: "US", latitude: 32.7767, longitude: -96.797 },
  { code: "FDC-03", name: "Ferguson DC - Atlanta", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
  { code: "FDC-04", name: "Ferguson DC - Denver", city: "Denver", region: "Colorado", country: "US", latitude: 39.7392, longitude: -104.9903 },
  { code: "FDC-05", name: "Ferguson DC - Phoenix", city: "Phoenix", region: "Arizona", country: "US", latitude: 33.4484, longitude: -112.074 },
  { code: "FDC-06", name: "Ferguson DC - Chicago", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },
  { code: "FDC-07", name: "Ferguson DC - Sacramento", city: "Sacramento", region: "California", country: "US", latitude: 38.5816, longitude: -121.4944 },
  { code: "FDC-08", name: "Ferguson DC - Orlando", city: "Orlando", region: "Florida", country: "US", latitude: 28.5383, longitude: -81.3792 },
  { code: "FDC-09", name: "Ferguson DC - San Bernardino", city: "San Bernardino", region: "California", country: "US", latitude: 34.1083, longitude: -117.2898 },
  { code: "FDC-10", name: "Ferguson DC - Indianapolis", city: "Indianapolis", region: "Indiana", country: "US", latitude: 39.7684, longitude: -86.1581 },
  { code: "FDC-11", name: "Ferguson DC - Charlotte", city: "Charlotte", region: "North Carolina", country: "US", latitude: 35.2271, longitude: -80.8431 },
  { code: "FDC-12", name: "Ferguson DC - Portland", city: "Portland", region: "Oregon", country: "US", latitude: 45.5152, longitude: -122.6784 },
  // Supplier/Manufacturer HQs & Plants
  { code: "SUP-KOH", name: "Kohler HQ", city: "Kohler", region: "Wisconsin", country: "US", latitude: 43.7394, longitude: -87.7818 },
  { code: "MFG-KOH-SC", name: "Kohler Plant Spartanburg", city: "Spartanburg", region: "South Carolina", country: "US", latitude: 34.9496, longitude: -81.932 },
  { code: "MFG-KOH-CN", name: "Kohler Plant Foshan", city: "Foshan", region: "Guangdong", country: "CN", latitude: 23.0218, longitude: 113.1219 },
  { code: "SUP-MOE", name: "Moen HQ", city: "North Olmsted", region: "Ohio", country: "US", latitude: 41.4156, longitude: -81.9235 },
  { code: "MFG-MOE-NC", name: "Moen Plant New Bern", city: "New Bern", region: "North Carolina", country: "US", latitude: 35.1085, longitude: -77.0441 },
  { code: "MFG-MOE-CN", name: "Moen Plant Jiangmen", city: "Jiangmen", region: "Guangdong", country: "CN", latitude: 22.579, longitude: 113.0784 },
  { code: "SUP-DEL", name: "Delta Faucet HQ", city: "Indianapolis", region: "Indiana", country: "US", latitude: 39.7684, longitude: -86.1581 },
  { code: "MFG-DEL-IN", name: "Delta Faucet Plant Greensburg", city: "Greensburg", region: "Indiana", country: "US", latitude: 39.3373, longitude: -85.4836 },
  { code: "MFG-DEL-TN", name: "Delta Faucet Plant Jackson", city: "Jackson", region: "Tennessee", country: "US", latitude: 35.6145, longitude: -88.8139 },
  { code: "MFG-DEL-CN", name: "Delta Faucet Plant Zhuhai", city: "Zhuhai", region: "Guangdong", country: "CN", latitude: 22.271, longitude: 113.5767 },
  { code: "SUP-AMS", name: "American Standard HQ", city: "Piscataway", region: "New Jersey", country: "US", latitude: 40.5492, longitude: -74.4593 },
  { code: "MFG-AMS-MX", name: "American Standard Plant Monterrey", city: "Monterrey", region: "Nuevo Leon", country: "MX", latitude: 25.6866, longitude: -100.3161 },
  { code: "SUP-RHE", name: "Rheem Manufacturing HQ", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
  { code: "MFG-RHE-AL", name: "Rheem Plant Montgomery", city: "Montgomery", region: "Alabama", country: "US", latitude: 32.3668, longitude: -86.3 },
  { code: "MFG-RHE-AR", name: "Rheem Plant Fort Smith", city: "Fort Smith", region: "Arkansas", country: "US", latitude: 35.3859, longitude: -94.3985 },
  { code: "MFG-RHE-MX", name: "Rheem Plant Monterrey", city: "Monterrey", region: "Nuevo Leon", country: "MX", latitude: 25.6866, longitude: -100.3161 },
  { code: "SUP-TRA", name: "Trane Technologies HQ", city: "Davidson", region: "North Carolina", country: "US", latitude: 35.4993, longitude: -80.8487 },
  { code: "MFG-TRA-SC", name: "Trane Plant Columbia", city: "Columbia", region: "South Carolina", country: "US", latitude: 34.0007, longitude: -81.0348 },
  { code: "MFG-TRA-TX", name: "Trane Plant Tyler", city: "Tyler", region: "Texas", country: "US", latitude: 32.3513, longitude: -95.3011 },
  { code: "SUP-CAR", name: "Carrier Global HQ", city: "Palm Beach Gardens", region: "Florida", country: "US", latitude: 26.8234, longitude: -80.1387 },
  { code: "MFG-CAR-IN", name: "Carrier Plant Indianapolis", city: "Indianapolis", region: "Indiana", country: "US", latitude: 39.7684, longitude: -86.1581 },
  { code: "SUP-LEN", name: "Lennox International HQ", city: "Richardson", region: "Texas", country: "US", latitude: 32.9483, longitude: -96.7299 },
  { code: "MFG-LEN-IA", name: "Lennox Plant Marshalltown", city: "Marshalltown", region: "Iowa", country: "US", latitude: 42.0494, longitude: -92.908 },
  { code: "SUP-AOS", name: "A.O. Smith HQ", city: "Milwaukee", region: "Wisconsin", country: "US", latitude: 43.0389, longitude: -87.9065 },
  { code: "MFG-AOS-TN", name: "A.O. Smith Plant Ashland City", city: "Ashland City", region: "Tennessee", country: "US", latitude: 36.2742, longitude: -87.0644 },
  { code: "SUP-BRW", name: "Bradford White HQ", city: "Ambler", region: "Pennsylvania", country: "US", latitude: 40.1543, longitude: -75.2215 },
  { code: "MFG-BRW-MI", name: "Bradford White Plant Middleville", city: "Middleville", region: "Michigan", country: "US", latitude: 42.7131, longitude: -85.4617 },
  { code: "SUP-CHP", name: "Charlotte Pipe HQ", city: "Charlotte", region: "North Carolina", country: "US", latitude: 35.2271, longitude: -80.8431 },
  { code: "SUP-JME", name: "JM Eagle HQ", city: "Los Angeles", region: "California", country: "US", latitude: 34.0522, longitude: -118.2437 },
  { code: "MFG-JME-TX", name: "JM Eagle Plant Houston", city: "Houston", region: "Texas", country: "US", latitude: 29.7604, longitude: -95.3698 },
  { code: "SUP-MWP", name: "Mueller Water Products HQ", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
  { code: "MFG-MWP-AL", name: "Mueller Water Plant Albertville", city: "Albertville", region: "Alabama", country: "US", latitude: 34.2676, longitude: -86.2086 },
  { code: "SUP-INS", name: "InSinkErator HQ", city: "Racine", region: "Wisconsin", country: "US", latitude: 42.7261, longitude: -87.7829 },
  { code: "SUP-WAT", name: "Watts Water Technologies HQ", city: "North Andover", region: "Massachusetts", country: "US", latitude: 42.6987, longitude: -71.1323 },
  { code: "SUP-NOR", name: "Noritz HQ", city: "Anaheim", region: "California", country: "US", latitude: 33.8366, longitude: -117.9143 },
  { code: "MFG-NOR-JP", name: "Noritz Plant Akashi", city: "Akashi", region: "Hyogo", country: "JP", latitude: 34.6432, longitude: 134.9973 },
  { code: "SUP-RIN", name: "Rinnai America HQ", city: "Peachtree City", region: "Georgia", country: "US", latitude: 33.3968, longitude: -84.5958 },
  { code: "MFG-RIN-GA", name: "Rinnai Plant Griffin", city: "Griffin", region: "Georgia", country: "US", latitude: 33.2468, longitude: -84.2641 },
  { code: "SUP-GRO", name: "Grohe HQ", city: "Hemer", region: "North Rhine-Westphalia", country: "DE", latitude: 51.3867, longitude: 7.7706 },
  { code: "MFG-GRO-TH", name: "Grohe Plant Klaeng", city: "Klaeng", region: "Rayong", country: "TH", latitude: 12.7783, longitude: 101.6489 },
  { code: "SUP-TOT", name: "TOTO USA HQ", city: "Morrow", region: "Georgia", country: "US", latitude: 33.5832, longitude: -84.3393 },
  { code: "MFG-TOT-JP", name: "TOTO Plant Kitakyushu", city: "Kitakyushu", region: "Fukuoka", country: "JP", latitude: 33.8835, longitude: 130.8753 },
  { code: "SUP-UPO", name: "Uponor HQ", city: "Apple Valley", region: "Minnesota", country: "US", latitude: 44.7319, longitude: -93.2177 },
  { code: "MFG-UPO-FI", name: "Uponor Plant Nastola", city: "Nastola", region: "Paijat-Hame", country: "FI", latitude: 60.949, longitude: 25.9323 },
  { code: "SUP-VIE", name: "Viega LLC HQ", city: "Wichita", region: "Kansas", country: "US", latitude: 37.6872, longitude: -97.3301 },
  { code: "MFG-VIE-DE", name: "Viega Plant Attendorn", city: "Attendorn", region: "North Rhine-Westphalia", country: "DE", latitude: 51.1267, longitude: 7.9033 },
  { code: "SUP-GEN", name: "Generac Power Systems HQ", city: "Waukesha", region: "Wisconsin", country: "US", latitude: 43.0117, longitude: -88.2315 },
  { code: "SUP-HON", name: "Resideo HQ", city: "Scottsdale", region: "Arizona", country: "US", latitude: 33.4942, longitude: -111.9261 },
  { code: "SUP-NAV", name: "Navien Inc HQ", city: "Irvine", region: "California", country: "US", latitude: 33.6846, longitude: -117.8265 },
  { code: "MFG-NAV-KR", name: "Navien Plant Sejong", city: "Sejong", region: "Sejong", country: "KR", latitude: 36.48, longitude: 127.0 },
]

// ── Products ────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "Residential Faucets - Kitchen", unit: "pcs", sellingPrice: "285.00", cost: "142.50", currency: "USD" },
  { name: "Residential Faucets - Bathroom", unit: "pcs", sellingPrice: "195.00", cost: "97.50", currency: "USD" },
  { name: "Commercial Faucets", unit: "pcs", sellingPrice: "425.00", cost: "212.50", currency: "USD" },
  { name: "Toilets - Residential", unit: "pcs", sellingPrice: "350.00", cost: "175.00", currency: "USD" },
  { name: "Toilets - Commercial", unit: "pcs", sellingPrice: "520.00", cost: "260.00", currency: "USD" },
  { name: "Bathtubs and Showers", unit: "pcs", sellingPrice: "1200.00", cost: "600.00", currency: "USD" },
  { name: "Vanities and Sinks", unit: "pcs", sellingPrice: "480.00", cost: "240.00", currency: "USD" },
  { name: "Tank Water Heaters - Residential", unit: "pcs", sellingPrice: "650.00", cost: "325.00", currency: "USD" },
  { name: "Tank Water Heaters - Commercial", unit: "pcs", sellingPrice: "2800.00", cost: "1400.00", currency: "USD" },
  { name: "Tankless Water Heaters", unit: "pcs", sellingPrice: "1150.00", cost: "575.00", currency: "USD" },
  { name: "PVC Pipe - Schedule 40", unit: "ft", sellingPrice: "4.50", cost: "2.25", currency: "USD" },
  { name: "PVC Pipe - Schedule 80", unit: "ft", sellingPrice: "7.80", cost: "3.90", currency: "USD" },
  { name: "Copper Pipe - Type L", unit: "ft", sellingPrice: "12.50", cost: "6.25", currency: "USD" },
  { name: "Cast Iron Pipe", unit: "ft", sellingPrice: "15.00", cost: "7.50", currency: "USD" },
  { name: "HDPE Pipe - Waterworks", unit: "ft", sellingPrice: "9.20", cost: "4.60", currency: "USD" },
  { name: "PEX Tubing", unit: "ft", sellingPrice: "2.80", cost: "1.40", currency: "USD" },
  { name: "Residential HVAC Systems", unit: "pcs", sellingPrice: "4500.00", cost: "2250.00", currency: "USD" },
  { name: "Commercial HVAC Systems", unit: "pcs", sellingPrice: "18500.00", cost: "9250.00", currency: "USD" },
  { name: "HVAC Condensers", unit: "pcs", sellingPrice: "2200.00", cost: "1100.00", currency: "USD" },
  { name: "HVAC Air Handlers", unit: "pcs", sellingPrice: "1800.00", cost: "900.00", currency: "USD" },
  { name: "Fire Hydrants", unit: "pcs", sellingPrice: "2800.00", cost: "1400.00", currency: "USD" },
  { name: "Gate Valves - Waterworks", unit: "pcs", sellingPrice: "850.00", cost: "425.00", currency: "USD" },
  { name: "Brass Fittings", unit: "pcs", sellingPrice: "18.00", cost: "9.00", currency: "USD" },
  { name: "Copper Fittings", unit: "pcs", sellingPrice: "12.50", cost: "6.25", currency: "USD" },
  { name: "PVC Fittings", unit: "pcs", sellingPrice: "5.50", cost: "2.75", currency: "USD" },
  { name: "Garbage Disposals", unit: "pcs", sellingPrice: "280.00", cost: "140.00", currency: "USD" },
  { name: "Thermostats - Smart", unit: "pcs", sellingPrice: "195.00", cost: "97.50", currency: "USD" },
  { name: "Water Filtration Systems", unit: "pcs", sellingPrice: "650.00", cost: "325.00", currency: "USD" },
  { name: "Flush Valves - Commercial", unit: "pcs", sellingPrice: "180.00", cost: "90.00", currency: "USD" },
  { name: "Backflow Preventers", unit: "pcs", sellingPrice: "420.00", cost: "210.00", currency: "USD" },
  { name: "Generators - Residential", unit: "pcs", sellingPrice: "3500.00", cost: "1750.00", currency: "USD" },
  { name: "Pumps - Sump", unit: "pcs", sellingPrice: "350.00", cost: "175.00", currency: "USD" },
]

// ── Suppliers with their product mappings ────────────────────────────
const SUPPLIERS_DATA = [
  { name: "Kohler Co.", locCode: "SUP-KOH", products: ["Residential Faucets - Kitchen", "Residential Faucets - Bathroom", "Toilets - Residential", "Toilets - Commercial", "Bathtubs and Showers", "Vanities and Sinks"] },
  { name: "Moen Inc.", locCode: "SUP-MOE", products: ["Residential Faucets - Kitchen", "Residential Faucets - Bathroom", "Commercial Faucets", "Garbage Disposals"] },
  { name: "Delta Faucet Company", locCode: "SUP-DEL", products: ["Residential Faucets - Kitchen", "Residential Faucets - Bathroom", "Commercial Faucets"] },
  { name: "American Standard (LIXIL)", locCode: "SUP-AMS", products: ["Toilets - Residential", "Toilets - Commercial", "Bathtubs and Showers", "Flush Valves - Commercial"] },
  { name: "Rheem Manufacturing", locCode: "SUP-RHE", products: ["Tank Water Heaters - Residential", "Tank Water Heaters - Commercial", "Tankless Water Heaters", "Residential HVAC Systems", "HVAC Condensers"] },
  { name: "Trane Technologies", locCode: "SUP-TRA", products: ["Residential HVAC Systems", "Commercial HVAC Systems", "HVAC Condensers", "HVAC Air Handlers", "Thermostats - Smart"] },
  { name: "Carrier Global", locCode: "SUP-CAR", products: ["Residential HVAC Systems", "Commercial HVAC Systems", "HVAC Condensers", "HVAC Air Handlers"] },
  { name: "Lennox International", locCode: "SUP-LEN", products: ["Residential HVAC Systems", "Commercial HVAC Systems", "HVAC Condensers", "HVAC Air Handlers"] },
  { name: "A.O. Smith Corporation", locCode: "SUP-AOS", products: ["Tank Water Heaters - Residential", "Tank Water Heaters - Commercial", "Tankless Water Heaters", "Water Filtration Systems"] },
  { name: "Bradford White Corporation", locCode: "SUP-BRW", products: ["Tank Water Heaters - Residential", "Tank Water Heaters - Commercial"] },
  { name: "Charlotte Pipe and Foundry", locCode: "SUP-CHP", products: ["Cast Iron Pipe", "PVC Pipe - Schedule 40", "PVC Pipe - Schedule 80", "PVC Fittings", "Copper Fittings"] },
  { name: "JM Eagle", locCode: "SUP-JME", products: ["PVC Pipe - Schedule 40", "PVC Pipe - Schedule 80", "HDPE Pipe - Waterworks"] },
  { name: "Mueller Water Products", locCode: "SUP-MWP", products: ["Fire Hydrants", "Gate Valves - Waterworks", "Brass Fittings", "Backflow Preventers"] },
  { name: "InSinkErator (Whirlpool)", locCode: "SUP-INS", products: ["Garbage Disposals"] },
  { name: "Watts Water Technologies", locCode: "SUP-WAT", products: ["Backflow Preventers", "Brass Fittings", "Water Filtration Systems"] },
  { name: "Noritz America", locCode: "SUP-NOR", products: ["Tankless Water Heaters"] },
  { name: "Rinnai America", locCode: "SUP-RIN", products: ["Tankless Water Heaters", "Tank Water Heaters - Residential"] },
  { name: "Grohe (LIXIL)", locCode: "SUP-GRO", products: ["Residential Faucets - Kitchen", "Residential Faucets - Bathroom", "Commercial Faucets"] },
  { name: "TOTO USA", locCode: "SUP-TOT", products: ["Toilets - Residential", "Toilets - Commercial", "Bathtubs and Showers"] },
  { name: "Uponor", locCode: "SUP-UPO", products: ["PEX Tubing", "Brass Fittings"] },
  { name: "Viega LLC", locCode: "SUP-VIE", products: ["PEX Tubing", "Copper Fittings", "Brass Fittings"] },
  { name: "Generac Power Systems", locCode: "SUP-GEN", products: ["Generators - Residential"] },
  { name: "Resideo (Honeywell Home)", locCode: "SUP-HON", products: ["Thermostats - Smart"] },
  { name: "Navien Inc.", locCode: "SUP-NAV", products: ["Tankless Water Heaters"] },
]

// ── Facilities ──────────────────────────────────────────────────────
// Format: { name, type, locCode, capacity, capacityUnit }
const FACILITIES_DATA = [
  // Ferguson DCs
  { name: "Ferguson Master DC - Newport News", type: "DC", locCode: "FDC-01", capacity: 850000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Dallas", type: "DC", locCode: "FDC-02", capacity: 425000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Atlanta", type: "DC", locCode: "FDC-03", capacity: 380000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Denver", type: "DC", locCode: "FDC-04", capacity: 310000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Phoenix", type: "DC", locCode: "FDC-05", capacity: 295000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Chicago", type: "DC", locCode: "FDC-06", capacity: 400000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Sacramento", type: "DC", locCode: "FDC-07", capacity: 275000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Orlando", type: "DC", locCode: "FDC-08", capacity: 320000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - San Bernardino", type: "DC", locCode: "FDC-09", capacity: 350000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Indianapolis", type: "DC", locCode: "FDC-10", capacity: 290000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Charlotte", type: "DC", locCode: "FDC-11", capacity: 265000, capacityUnit: "sqft" },
  { name: "Ferguson Regional DC - Portland", type: "DC", locCode: "FDC-12", capacity: 240000, capacityUnit: "sqft" },
  // Manufacturing Plants
  { name: "Kohler Plant - Kohler WI", type: "Plant", locCode: "SUP-KOH", capacity: 15000, capacityUnit: "units/day" },
  { name: "Kohler Plant - Spartanburg SC", type: "Plant", locCode: "MFG-KOH-SC", capacity: 8000, capacityUnit: "units/day" },
  { name: "Kohler Plant - Foshan CN", type: "Plant", locCode: "MFG-KOH-CN", capacity: 20000, capacityUnit: "units/day" },
  { name: "Moen Plant - New Bern NC", type: "Plant", locCode: "MFG-MOE-NC", capacity: 12000, capacityUnit: "units/day" },
  { name: "Moen Plant - Jiangmen CN", type: "Plant", locCode: "MFG-MOE-CN", capacity: 18000, capacityUnit: "units/day" },
  { name: "Delta Faucet Plant - Greensburg IN", type: "Plant", locCode: "MFG-DEL-IN", capacity: 10000, capacityUnit: "units/day" },
  { name: "Delta Faucet Plant - Jackson TN", type: "Plant", locCode: "MFG-DEL-TN", capacity: 8500, capacityUnit: "units/day" },
  { name: "Delta Faucet Plant - Zhuhai CN", type: "Plant", locCode: "MFG-DEL-CN", capacity: 15000, capacityUnit: "units/day" },
  { name: "American Standard Plant - Monterrey MX", type: "Plant", locCode: "MFG-AMS-MX", capacity: 10000, capacityUnit: "units/day" },
  { name: "A.O. Smith Plant - Ashland City TN", type: "Plant", locCode: "MFG-AOS-TN", capacity: 6000, capacityUnit: "units/day" },
  { name: "Bradford White Plant - Middleville MI", type: "Plant", locCode: "MFG-BRW-MI", capacity: 4500, capacityUnit: "units/day" },
  { name: "Charlotte Pipe Plant - Charlotte NC", type: "Plant", locCode: "SUP-CHP", capacity: 20000, capacityUnit: "ft/day" },
  { name: "JM Eagle Plant - Los Angeles CA", type: "Plant", locCode: "SUP-JME", capacity: 30000, capacityUnit: "ft/day" },
  { name: "JM Eagle Plant - Houston TX", type: "Plant", locCode: "MFG-JME-TX", capacity: 25000, capacityUnit: "ft/day" },
  { name: "Mueller Water Plant - Albertville AL", type: "Plant", locCode: "MFG-MWP-AL", capacity: 3000, capacityUnit: "units/day" },
  { name: "Rheem Plant - Montgomery AL", type: "Plant", locCode: "MFG-RHE-AL", capacity: 5500, capacityUnit: "units/day" },
  { name: "Rheem Plant - Fort Smith AR", type: "Plant", locCode: "MFG-RHE-AR", capacity: 4000, capacityUnit: "units/day" },
  { name: "Rheem Plant - Monterrey MX", type: "Plant", locCode: "MFG-RHE-MX", capacity: 4000, capacityUnit: "units/day" },
  { name: "Trane Plant - Columbia SC", type: "Plant", locCode: "MFG-TRA-SC", capacity: 4000, capacityUnit: "units/day" },
  { name: "Trane Plant - Tyler TX", type: "Plant", locCode: "MFG-TRA-TX", capacity: 3500, capacityUnit: "units/day" },
  { name: "Carrier Plant - Indianapolis IN", type: "Plant", locCode: "MFG-CAR-IN", capacity: 3500, capacityUnit: "units/day" },
  { name: "Lennox Plant - Marshalltown IA", type: "Plant", locCode: "MFG-LEN-IA", capacity: 3200, capacityUnit: "units/day" },
  { name: "InSinkErator Plant - Racine WI", type: "Plant", locCode: "SUP-INS", capacity: 8000, capacityUnit: "units/day" },
  { name: "Rinnai Plant - Griffin GA", type: "Plant", locCode: "MFG-RIN-GA", capacity: 2500, capacityUnit: "units/day" },
  { name: "TOTO Plant - Kitakyushu JP", type: "Plant", locCode: "MFG-TOT-JP", capacity: 12000, capacityUnit: "units/day" },
  { name: "Grohe Plant - Hemer DE", type: "Plant", locCode: "SUP-GRO", capacity: 8000, capacityUnit: "units/day" },
  { name: "Grohe Plant - Klaeng TH", type: "Plant", locCode: "MFG-GRO-TH", capacity: 10000, capacityUnit: "units/day" },
  { name: "Navien Plant - Sejong KR", type: "Plant", locCode: "MFG-NAV-KR", capacity: 6000, capacityUnit: "units/day" },
  { name: "Noritz Plant - Akashi JP", type: "Plant", locCode: "MFG-NOR-JP", capacity: 4500, capacityUnit: "units/day" },
  { name: "Uponor Plant - Nastola FI", type: "Plant", locCode: "MFG-UPO-FI", capacity: 50000, capacityUnit: "ft/day" },
  { name: "Viega Plant - Attendorn DE", type: "Plant", locCode: "MFG-VIE-DE", capacity: 25000, capacityUnit: "units/day" },
  { name: "Generac Plant - Waukesha WI", type: "Plant", locCode: "SUP-GEN", capacity: 2000, capacityUnit: "units/day" },
]

// ── Product Flows (key routes) ──────────────────────────────────────
// { label, sourceFacility, destFacility, product, minThroughput, maxThroughput }
const FLOWS_DATA = [
  { label: "Kohler WI to Newport News", src: "Kohler Plant - Kohler WI", dest: "Ferguson Master DC - Newport News", product: "Residential Faucets - Kitchen", min: "5000", max: "12000" },
  { label: "Kohler WI to Chicago", src: "Kohler Plant - Kohler WI", dest: "Ferguson Regional DC - Chicago", product: "Toilets - Residential", min: "3000", max: "8000" },
  { label: "Kohler SC to Atlanta", src: "Kohler Plant - Spartanburg SC", dest: "Ferguson Regional DC - Atlanta", product: "Toilets - Residential", min: "3000", max: "7000" },
  { label: "Kohler SC to Charlotte", src: "Kohler Plant - Spartanburg SC", dest: "Ferguson Regional DC - Charlotte", product: "Vanities and Sinks", min: "2000", max: "6000" },
  { label: "Kohler Foshan to San Bernardino", src: "Kohler Plant - Foshan CN", dest: "Ferguson Regional DC - San Bernardino", product: "Residential Faucets - Kitchen", min: "8000", max: "18000" },
  { label: "Moen New Bern to Newport News", src: "Moen Plant - New Bern NC", dest: "Ferguson Master DC - Newport News", product: "Residential Faucets - Kitchen", min: "5000", max: "12000" },
  { label: "Moen New Bern to Charlotte", src: "Moen Plant - New Bern NC", dest: "Ferguson Regional DC - Charlotte", product: "Commercial Faucets", min: "3000", max: "7000" },
  { label: "Moen Jiangmen to San Bernardino", src: "Moen Plant - Jiangmen CN", dest: "Ferguson Regional DC - San Bernardino", product: "Residential Faucets - Bathroom", min: "8000", max: "20000" },
  { label: "Delta Greensburg to Indianapolis", src: "Delta Faucet Plant - Greensburg IN", dest: "Ferguson Regional DC - Indianapolis", product: "Residential Faucets - Kitchen", min: "4000", max: "10000" },
  { label: "Delta Greensburg to Chicago", src: "Delta Faucet Plant - Greensburg IN", dest: "Ferguson Regional DC - Chicago", product: "Commercial Faucets", min: "3000", max: "7000" },
  { label: "Delta Jackson to Atlanta", src: "Delta Faucet Plant - Jackson TN", dest: "Ferguson Regional DC - Atlanta", product: "Residential Faucets - Bathroom", min: "3000", max: "8000" },
  { label: "Delta Zhuhai to San Bernardino", src: "Delta Faucet Plant - Zhuhai CN", dest: "Ferguson Regional DC - San Bernardino", product: "Residential Faucets - Kitchen", min: "10000", max: "22000" },
  { label: "AO Smith to Atlanta", src: "A.O. Smith Plant - Ashland City TN", dest: "Ferguson Regional DC - Atlanta", product: "Tank Water Heaters - Residential", min: "2500", max: "6000" },
  { label: "AO Smith to Dallas", src: "A.O. Smith Plant - Ashland City TN", dest: "Ferguson Regional DC - Dallas", product: "Tank Water Heaters - Residential", min: "2000", max: "5000" },
  { label: "AO Smith to Newport News", src: "A.O. Smith Plant - Ashland City TN", dest: "Ferguson Master DC - Newport News", product: "Tankless Water Heaters", min: "1200", max: "3500" },
  { label: "Bradford White to Chicago", src: "Bradford White Plant - Middleville MI", dest: "Ferguson Regional DC - Chicago", product: "Tank Water Heaters - Residential", min: "2000", max: "5000" },
  { label: "Charlotte Pipe to Atlanta", src: "Charlotte Pipe Plant - Charlotte NC", dest: "Ferguson Regional DC - Atlanta", product: "Cast Iron Pipe", min: "25000", max: "60000" },
  { label: "Charlotte Pipe to Charlotte", src: "Charlotte Pipe Plant - Charlotte NC", dest: "Ferguson Regional DC - Charlotte", product: "PVC Pipe - Schedule 40", min: "40000", max: "90000" },
  { label: "JM Eagle LA to San Bernardino", src: "JM Eagle Plant - Los Angeles CA", dest: "Ferguson Regional DC - San Bernardino", product: "PVC Pipe - Schedule 40", min: "50000", max: "120000" },
  { label: "JM Eagle LA to Phoenix", src: "JM Eagle Plant - Los Angeles CA", dest: "Ferguson Regional DC - Phoenix", product: "HDPE Pipe - Waterworks", min: "30000", max: "70000" },
  { label: "JM Eagle Houston to Dallas", src: "JM Eagle Plant - Houston TX", dest: "Ferguson Regional DC - Dallas", product: "PVC Pipe - Schedule 40", min: "40000", max: "100000" },
  { label: "Mueller to Atlanta", src: "Mueller Water Plant - Albertville AL", dest: "Ferguson Regional DC - Atlanta", product: "Fire Hydrants", min: "1000", max: "3000" },
  { label: "Rheem Montgomery to Atlanta", src: "Rheem Plant - Montgomery AL", dest: "Ferguson Regional DC - Atlanta", product: "Residential HVAC Systems", min: "1200", max: "3000" },
  { label: "Rheem Montgomery to Dallas", src: "Rheem Plant - Montgomery AL", dest: "Ferguson Regional DC - Dallas", product: "Tank Water Heaters - Residential", min: "2000", max: "5000" },
  { label: "Rheem Monterrey to Phoenix", src: "Rheem Plant - Monterrey MX", dest: "Ferguson Regional DC - Phoenix", product: "Tank Water Heaters - Residential", min: "1500", max: "4000" },
  { label: "Trane Columbia to Charlotte", src: "Trane Plant - Columbia SC", dest: "Ferguson Regional DC - Charlotte", product: "Residential HVAC Systems", min: "1000", max: "2500" },
  { label: "Trane Columbia to Atlanta", src: "Trane Plant - Columbia SC", dest: "Ferguson Regional DC - Atlanta", product: "Commercial HVAC Systems", min: "300", max: "900" },
  { label: "Carrier Indy to Chicago", src: "Carrier Plant - Indianapolis IN", dest: "Ferguson Regional DC - Chicago", product: "Residential HVAC Systems", min: "800", max: "2200" },
  { label: "Lennox Marshalltown to Chicago", src: "Lennox Plant - Marshalltown IA", dest: "Ferguson Regional DC - Chicago", product: "Residential HVAC Systems", min: "800", max: "2000" },
  { label: "Lennox Marshalltown to Denver", src: "Lennox Plant - Marshalltown IA", dest: "Ferguson Regional DC - Denver", product: "HVAC Air Handlers", min: "600", max: "1500" },
  { label: "American Std Monterrey to Dallas", src: "American Standard Plant - Monterrey MX", dest: "Ferguson Regional DC - Dallas", product: "Toilets - Residential", min: "3000", max: "7000" },
  { label: "TOTO Kitakyushu to San Bernardino", src: "TOTO Plant - Kitakyushu JP", dest: "Ferguson Regional DC - San Bernardino", product: "Toilets - Residential", min: "2000", max: "5000" },
  { label: "Grohe Hemer to Newport News", src: "Grohe Plant - Hemer DE", dest: "Ferguson Master DC - Newport News", product: "Commercial Faucets", min: "2500", max: "6000" },
  { label: "Navien Sejong to Sacramento", src: "Navien Plant - Sejong KR", dest: "Ferguson Regional DC - Sacramento", product: "Tankless Water Heaters", min: "1800", max: "4500" },
  { label: "Rinnai Griffin to Atlanta", src: "Rinnai Plant - Griffin GA", dest: "Ferguson Regional DC - Atlanta", product: "Tankless Water Heaters", min: "1500", max: "3500" },
  { label: "InSinkErator to Chicago", src: "InSinkErator Plant - Racine WI", dest: "Ferguson Regional DC - Chicago", product: "Garbage Disposals", min: "5000", max: "12000" },
  { label: "InSinkErator to Newport News", src: "InSinkErator Plant - Racine WI", dest: "Ferguson Master DC - Newport News", product: "Garbage Disposals", min: "3000", max: "8000" },
  { label: "Generac to Chicago", src: "Generac Plant - Waukesha WI", dest: "Ferguson Regional DC - Chicago", product: "Generators - Residential", min: "600", max: "1800" },
  { label: "Uponor to Chicago", src: "Uponor Plant - Nastola FI", dest: "Ferguson Regional DC - Chicago", product: "PEX Tubing", min: "60000", max: "150000" },
  { label: "Viega Attendorn to Newport News", src: "Viega Plant - Attendorn DE", dest: "Ferguson Master DC - Newport News", product: "Copper Fittings", min: "20000", max: "50000" },
]

const PERIODS_DATA = [
  { name: "Q1 2026", start: "2026-01-01", end: "2026-03-31", demandCoefficient: "1.0" },
  { name: "Q2 2026", start: "2026-04-01", end: "2026-06-30", demandCoefficient: "1.15" },
  { name: "Q3 2026", start: "2026-07-01", end: "2026-09-30", demandCoefficient: "1.25" },
  { name: "Q4 2026", start: "2026-10-01", end: "2026-12-31", demandCoefficient: "0.90" },
]

async function main() {
  console.log("Seeding Ferguson supply chain data...")

  try {
    // 1. Clear existing data (in dependency order)
    console.log("Clearing existing data...")
    await db.delete(productFlows).execute()
    await db.delete(supplierProducts).execute()
    await db.delete(suppliers).execute()
    await db.delete(facilities).execute()
    await db.delete(products).execute()
    await db.delete(periods).execute()
    await db.delete(locations).execute()

    // 2. Insert locations
    console.log("Inserting locations...")
    const insertedLocations = await db
      .insert(locations)
      .values(LOCATIONS)
      .returning({ id: locations.id, code: locations.code, name: locations.name })
      .execute()

    const locByCode = new Map<string, number>()
    insertedLocations.forEach((loc) => {
      if (loc.code) locByCode.set(loc.code, loc.id)
    })
    console.log(`  Inserted ${insertedLocations.length} locations`)

    // 3. Insert periods
    console.log("Inserting periods...")
    const insertedPeriods = await db
      .insert(periods)
      .values(PERIODS_DATA)
      .returning({ id: periods.id, name: periods.name })
      .execute()
    console.log(`  Inserted ${insertedPeriods.length} periods`)

    // 4. Insert products
    console.log("Inserting products...")
    const insertedProducts = await db
      .insert(products)
      .values(PRODUCTS)
      .returning({ id: products.id, name: products.name })
      .execute()

    const prodByName = new Map<string, number>()
    insertedProducts.forEach((p) => prodByName.set(p.name, p.id))
    console.log(`  Inserted ${insertedProducts.length} products`)

    // 5. Insert facilities
    console.log("Inserting facilities...")
    const facilityValues = FACILITIES_DATA.map((f) => ({
      name: f.name,
      type: f.type,
      locationId: locByCode.get(f.locCode)!,
      initiallyOpen: true,
      inclusionType: "Include",
      capacity: f.capacity,
      capacityUnit: f.capacityUnit,
    }))

    const insertedFacilities = await db
      .insert(facilities)
      .values(facilityValues)
      .returning({ id: facilities.id, name: facilities.name })
      .execute()

    const facByName = new Map<string, number>()
    insertedFacilities.forEach((f) => facByName.set(f.name, f.id))
    console.log(`  Inserted ${insertedFacilities.length} facilities`)

    // 6. Insert suppliers
    console.log("Inserting suppliers...")
    const supplierValues = SUPPLIERS_DATA.map((s) => ({
      name: s.name,
      type: "Manufacturer",
      locationId: locByCode.get(s.locCode)!,
      inclusionType: "Include",
    }))

    const insertedSuppliers = await db
      .insert(suppliers)
      .values(supplierValues)
      .returning({ id: suppliers.id, name: suppliers.name })
      .execute()

    const supByName = new Map<string, number>()
    insertedSuppliers.forEach((s) => supByName.set(s.name, s.id))
    console.log(`  Inserted ${insertedSuppliers.length} suppliers`)

    // 7. Insert supplier-product mappings
    console.log("Inserting supplier-product mappings...")
    const spValues: { supplierId: number; productId: number }[] = []
    for (const s of SUPPLIERS_DATA) {
      const supplierId = supByName.get(s.name)
      if (!supplierId) continue
      for (const pName of s.products) {
        const productId = prodByName.get(pName)
        if (productId) {
          spValues.push({ supplierId, productId })
        }
      }
    }

    if (spValues.length > 0) {
      await db.insert(supplierProducts).values(spValues).execute()
    }
    console.log(`  Inserted ${spValues.length} supplier-product mappings`)

    // 8. Insert product flows
    console.log("Inserting product flows...")
    const flowValues = FLOWS_DATA.map((f) => ({
      label: f.label,
      sourceId: facByName.get(f.src)!,
      destinationId: facByName.get(f.dest)!,
      productId: prodByName.get(f.product)!,
      timePeriodId: insertedPeriods[0].id, // Q1 2026
      minThroughput: f.min,
      maxThroughput: f.max,
      inclusionType: "Include",
      currency: "USD",
    })).filter((f) => f.sourceId && f.destinationId && f.productId)

    if (flowValues.length > 0) {
      await db.insert(productFlows).values(flowValues).execute()
    }
    console.log(`  Inserted ${flowValues.length} product flows`)

    console.log("\nFerguson supply chain seed complete!")
  } catch (error) {
    console.error("Error during seed:", error)
    process.exit(1)
  }
}

main()
