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
  customers,
  demand,
} from "@/db/schema"

config({ path: ".env" })

const sql = neon(process.env.POSTGRES_URL!)
const db = drizzle(sql)

// ── Locations ───────────────────────────────────────────────────────
const LOCATIONS = [
  // 7-Eleven Distribution Centers
  { code: "7E-DC-01", name: "7-Eleven Master DC - Newport News", city: "Newport News", region: "Virginia", country: "US", latitude: 37.0871, longitude: -76.473 },
  { code: "7E-DC-02", name: "7-Eleven Regional DC - Dallas", city: "Dallas", region: "Texas", country: "US", latitude: 32.7767, longitude: -96.797 },
  { code: "7E-DC-03", name: "7-Eleven Regional DC - Atlanta", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
  { code: "7E-DC-04", name: "7-Eleven Regional DC - Denver", city: "Denver", region: "Colorado", country: "US", latitude: 39.7392, longitude: -104.9903 },
  { code: "7E-DC-05", name: "7-Eleven Regional DC - Phoenix", city: "Phoenix", region: "Arizona", country: "US", latitude: 33.4484, longitude: -112.074 },
  { code: "7E-DC-06", name: "7-Eleven Regional DC - Chicago", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },
  { code: "7E-DC-07", name: "7-Eleven Regional DC - Sacramento", city: "Sacramento", region: "California", country: "US", latitude: 38.5816, longitude: -121.4944 },
  { code: "7E-DC-08", name: "7-Eleven Regional DC - Orlando", city: "Orlando", region: "Florida", country: "US", latitude: 28.5383, longitude: -81.3792 },
  { code: "7E-DC-09", name: "7-Eleven Regional DC - San Bernardino", city: "San Bernardino", region: "California", country: "US", latitude: 34.1083, longitude: -117.2898 },
  { code: "7E-DC-10", name: "7-Eleven Regional DC - Indianapolis", city: "Indianapolis", region: "Indiana", country: "US", latitude: 39.7684, longitude: -86.1581 },
  { code: "7E-DC-11", name: "7-Eleven Regional DC - Charlotte", city: "Charlotte", region: "North Carolina", country: "US", latitude: 35.2271, longitude: -80.8431 },
  { code: "7E-DC-12", name: "7-Eleven Regional DC - Portland", city: "Portland", region: "Oregon", country: "US", latitude: 45.5152, longitude: -122.6784 },

  // Core-Mark International Distribution Centers
  { code: "CM-HQ", name: "Core-Mark International HQ", city: "Westlake", region: "Texas", country: "US", latitude: 32.9804, longitude: -97.2025 },
  { code: "CM-DC-01", name: "Core-Mark RDC - Visalia", city: "Visalia", region: "California", country: "US", latitude: 36.3302, longitude: -119.2921 },
  { code: "CM-DC-02", name: "Core-Mark RDC - Denver", city: "Aurora", region: "Colorado", country: "US", latitude: 39.7294, longitude: -104.8319 },
  { code: "CM-DC-03", name: "Core-Mark RDC - Dallas", city: "Garland", region: "Texas", country: "US", latitude: 32.9126, longitude: -96.6389 },
  { code: "CM-DC-04", name: "Core-Mark RDC - Atlanta", city: "Norcross", region: "Georgia", country: "US", latitude: 33.9412, longitude: -84.2135 },
  { code: "CM-DC-05", name: "Core-Mark RDC - Chicago", city: "Joliet", region: "Illinois", country: "US", latitude: 41.525, longitude: -88.0817 },
  { code: "CM-DC-06", name: "Core-Mark RDC - New Jersey", city: "South Plainfield", region: "New Jersey", country: "US", latitude: 40.5773, longitude: -74.4185 },

  // McLane Company Distribution Centers
  { code: "ML-HQ", name: "McLane Company HQ", city: "Temple", region: "Texas", country: "US", latitude: 31.098, longitude: -97.3428 },
  { code: "ML-DC-01", name: "McLane DC - Temple TX", city: "Temple", region: "Texas", country: "US", latitude: 31.098, longitude: -97.3428 },
  { code: "ML-DC-02", name: "McLane DC - Ocala FL", city: "Ocala", region: "Florida", country: "US", latitude: 29.1872, longitude: -82.1401 },
  { code: "ML-DC-03", name: "McLane DC - Northfield OH", city: "Northfield", region: "Ohio", country: "US", latitude: 41.3512, longitude: -81.5282 },
  { code: "ML-DC-04", name: "McLane DC - Modesto CA", city: "Modesto", region: "California", country: "US", latitude: 37.6391, longitude: -120.9969 },

  // Supplier HQ / Plant Locations
  { code: "SUP-COKE", name: "Coca-Cola NA HQ", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.7897, longitude: -84.3856 },
  { code: "MFG-COKE-TX", name: "Coca-Cola Bottling Plant - Dallas", city: "Irving", region: "Texas", country: "US", latitude: 32.814, longitude: -96.9489 },
  { code: "MFG-COKE-CA", name: "Coca-Cola Bottling Plant - Los Angeles", city: "Los Angeles", region: "California", country: "US", latitude: 34.0195, longitude: -118.4912 },
  { code: "MFG-COKE-IL", name: "Coca-Cola Bottling Plant - Chicago", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },

  { code: "SUP-PEPSI", name: "PepsiCo Beverages NA HQ", city: "Purchase", region: "New York", country: "US", latitude: 41.0534, longitude: -73.7262 },
  { code: "MFG-PEPSI-TX", name: "PepsiCo Bottling Plant - Fort Worth", city: "Fort Worth", region: "Texas", country: "US", latitude: 32.7555, longitude: -97.3308 },
  { code: "MFG-PEPSI-CA", name: "PepsiCo Bottling Plant - Fresno", city: "Fresno", region: "California", country: "US", latitude: 36.7378, longitude: -119.7871 },

  { code: "SUP-MDLZ", name: "Mondelez International HQ", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },
  { code: "MFG-MDLZ-VA", name: "Mondelez Plant - Richmond VA", city: "Richmond", region: "Virginia", country: "US", latitude: 37.5407, longitude: -77.436 },

  { code: "SUP-HSY", name: "Hershey Company HQ", city: "Hershey", region: "Pennsylvania", country: "US", latitude: 40.2868, longitude: -76.6502 },
  { code: "MFG-HSY-PA", name: "Hershey Plant - Hershey PA", city: "Hershey", region: "Pennsylvania", country: "US", latitude: 40.2868, longitude: -76.6502 },

  { code: "SUP-ABINBEV", name: "Anheuser-Busch InBev HQ", city: "St. Louis", region: "Missouri", country: "US", latitude: 38.6270, longitude: -90.1994 },
  { code: "MFG-AB-GA", name: "Anheuser-Busch Brewery - Cartersville", city: "Cartersville", region: "Georgia", country: "US", latitude: 34.1651, longitude: -84.7999 },
  { code: "MFG-AB-TX", name: "Anheuser-Busch Brewery - Houston", city: "Houston", region: "Texas", country: "US", latitude: 29.7604, longitude: -95.3698 },

  { code: "SUP-ALTRIA", name: "Altria Group HQ", city: "Richmond", region: "Virginia", country: "US", latitude: 37.5407, longitude: -77.436 },
  { code: "MFG-PM-VA", name: "Philip Morris Plant - Richmond VA", city: "Richmond", region: "Virginia", country: "US", latitude: 37.5407, longitude: -77.436 },

  { code: "SUP-MARS", name: "Mars Inc. HQ", city: "McLean", region: "Virginia", country: "US", latitude: 38.9339, longitude: -77.1773 },
  { code: "MFG-MARS-NJ", name: "Mars Plant - Hackettstown NJ", city: "Hackettstown", region: "New Jersey", country: "US", latitude: 40.8526, longitude: -74.829 },

  { code: "SUP-WARAB", name: "Warabeya Nichiyo HQ", city: "Tokyo", region: "Tokyo", country: "JP", latitude: 35.6762, longitude: 139.6503 },

  // Customer Zone Locations (major metro 7-Eleven markets)
  { code: "CZ-NE", name: "7-Eleven Northeast Zone - New York", city: "New York", region: "New York", country: "US", latitude: 40.7128, longitude: -74.006 },
  { code: "CZ-SE", name: "7-Eleven Southeast Zone - Atlanta", city: "Atlanta", region: "Georgia", country: "US", latitude: 33.749, longitude: -84.388 },
  { code: "CZ-FL", name: "7-Eleven Florida Zone - Miami", city: "Miami", region: "Florida", country: "US", latitude: 25.7617, longitude: -80.1918 },
  { code: "CZ-MW", name: "7-Eleven Midwest Zone - Chicago", city: "Chicago", region: "Illinois", country: "US", latitude: 41.8781, longitude: -87.6298 },
  { code: "CZ-SC", name: "7-Eleven South Central Zone - Dallas", city: "Dallas", region: "Texas", country: "US", latitude: 32.7767, longitude: -96.797 },
  { code: "CZ-TX", name: "7-Eleven Texas Zone - Houston", city: "Houston", region: "Texas", country: "US", latitude: 29.7604, longitude: -95.3698 },
  { code: "CZ-SW", name: "7-Eleven Southwest Zone - Phoenix", city: "Phoenix", region: "Arizona", country: "US", latitude: 33.4484, longitude: -112.074 },
  { code: "CZ-RM", name: "7-Eleven Rocky Mountain Zone - Denver", city: "Denver", region: "Colorado", country: "US", latitude: 39.7392, longitude: -104.9903 },
  { code: "CZ-SC2", name: "7-Eleven SoCal Zone - Los Angeles", city: "Los Angeles", region: "California", country: "US", latitude: 34.0522, longitude: -118.2437 },
  { code: "CZ-NC", name: "7-Eleven NorCal Zone - San Jose", city: "San Jose", region: "California", country: "US", latitude: 37.3382, longitude: -121.8863 },
  { code: "CZ-PNW", name: "7-Eleven Pacific NW Zone - Seattle", city: "Seattle", region: "Washington", country: "US", latitude: 47.6062, longitude: -122.3321 },
  { code: "CZ-MID", name: "7-Eleven Mid-Atlantic Zone - DC", city: "Washington", region: "District of Columbia", country: "US", latitude: 38.9072, longitude: -77.0369 },
]

// ── Products ────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "Slurpee Frozen Beverages", unit: "oz", sellingPrice: "2.49", cost: "0.62", currency: "USD" },
  { name: "7-Select Energy Drink 16oz", unit: "pcs", sellingPrice: "2.99", cost: "0.89", currency: "USD" },
  { name: "7-Select Hot Coffee", unit: "oz", sellingPrice: "1.49", cost: "0.22", currency: "USD" },
  { name: "Packaged Soft Drinks - Cola", unit: "pcs", sellingPrice: "2.29", cost: "0.68", currency: "USD" },
  { name: "Packaged Sports Drinks", unit: "pcs", sellingPrice: "2.49", cost: "0.74", currency: "USD" },
  { name: "Packaged Water & Sparkling", unit: "pcs", sellingPrice: "1.99", cost: "0.35", currency: "USD" },
  { name: "Hot Foods - Roller Grill Items", unit: "pcs", sellingPrice: "2.79", cost: "0.95", currency: "USD" },
  { name: "Fresh Sandwiches & Wraps", unit: "pcs", sellingPrice: "4.49", cost: "1.85", currency: "USD" },
  { name: "Chips & Salty Snacks", unit: "pcs", sellingPrice: "1.89", cost: "0.62", currency: "USD" },
  { name: "Chocolate & Candy", unit: "pcs", sellingPrice: "1.79", cost: "0.65", currency: "USD" },
  { name: "Tobacco - Cigarettes", unit: "pks", sellingPrice: "9.99", cost: "7.25", currency: "USD" },
  { name: "Tobacco - Vaping & Alternative", unit: "pcs", sellingPrice: "14.99", cost: "8.50", currency: "USD" },
  { name: "Beer & Malt Beverages", unit: "pcs", sellingPrice: "3.49", cost: "1.45", currency: "USD" },
  { name: "Ice Cream & Frozen Treats", unit: "pcs", sellingPrice: "2.29", cost: "0.78", currency: "USD" },
  { name: "Fresh Baked Goods", unit: "pcs", sellingPrice: "2.99", cost: "1.10", currency: "USD" },
  { name: "7-Select Private Label Snacks", unit: "pcs", sellingPrice: "1.49", cost: "0.45", currency: "USD" },
  { name: "Energy Shots & Supplements", unit: "pcs", sellingPrice: "3.49", cost: "1.05", currency: "USD" },
  { name: "Juice & Smoothies", unit: "pcs", sellingPrice: "3.29", cost: "1.15", currency: "USD" },
  { name: "Packaged Lunch Meals", unit: "pcs", sellingPrice: "5.99", cost: "2.45", currency: "USD" },
  { name: "Household & General Merchandise", unit: "pcs", sellingPrice: "3.99", cost: "1.55", currency: "USD" },
]

// ── Suppliers with product mappings ─────────────────────────────────
const SUPPLIERS_DATA = [
  {
    name: "Core-Mark International",
    locCode: "CM-HQ",
    products: ["Slurpee Frozen Beverages", "7-Select Private Label Snacks", "Fresh Baked Goods", "Hot Foods - Roller Grill Items", "Household & General Merchandise"],
  },
  {
    name: "McLane Company",
    locCode: "ML-HQ",
    products: ["Packaged Soft Drinks - Cola", "Chips & Salty Snacks", "Chocolate & Candy", "Tobacco - Cigarettes", "Beer & Malt Beverages", "Packaged Water & Sparkling"],
  },
  {
    name: "The Coca-Cola Company",
    locCode: "SUP-COKE",
    products: ["Packaged Soft Drinks - Cola", "Packaged Water & Sparkling", "Juice & Smoothies", "Packaged Sports Drinks"],
  },
  {
    name: "PepsiCo Beverages North America",
    locCode: "SUP-PEPSI",
    products: ["Packaged Soft Drinks - Cola", "Packaged Sports Drinks", "Packaged Water & Sparkling", "7-Select Energy Drink 16oz"],
  },
  {
    name: "Mondelez International",
    locCode: "SUP-MDLZ",
    products: ["Chips & Salty Snacks", "Chocolate & Candy", "7-Select Private Label Snacks"],
  },
  {
    name: "The Hershey Company",
    locCode: "SUP-HSY",
    products: ["Chocolate & Candy", "7-Select Private Label Snacks"],
  },
  {
    name: "Anheuser-Busch InBev",
    locCode: "SUP-ABINBEV",
    products: ["Beer & Malt Beverages"],
  },
  {
    name: "Altria Group",
    locCode: "SUP-ALTRIA",
    products: ["Tobacco - Cigarettes", "Tobacco - Vaping & Alternative"],
  },
  {
    name: "Mars Inc.",
    locCode: "SUP-MARS",
    products: ["Chocolate & Candy", "Chips & Salty Snacks"],
  },
  {
    name: "Warabeya Nichiyo",
    locCode: "SUP-WARAB",
    products: ["Fresh Sandwiches & Wraps", "Packaged Lunch Meals", "Fresh Baked Goods"],
  },
  {
    name: "7-Eleven Private Label Division",
    locCode: "7E-DC-01",
    products: ["7-Select Energy Drink 16oz", "7-Select Hot Coffee", "7-Select Private Label Snacks", "Slurpee Frozen Beverages"],
  },
]

// ── Facilities ──────────────────────────────────────────────────────
const FACILITIES_DATA = [
  // 7-Eleven Distribution Centers
  { name: "7-Eleven Master DC - Newport News VA", type: "DC", locCode: "7E-DC-01", capacity: 850000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Dallas TX", type: "DC", locCode: "7E-DC-02", capacity: 425000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Atlanta GA", type: "DC", locCode: "7E-DC-03", capacity: 380000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Denver CO", type: "DC", locCode: "7E-DC-04", capacity: 310000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Phoenix AZ", type: "DC", locCode: "7E-DC-05", capacity: 295000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Chicago IL", type: "DC", locCode: "7E-DC-06", capacity: 400000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Sacramento CA", type: "DC", locCode: "7E-DC-07", capacity: 275000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Orlando FL", type: "DC", locCode: "7E-DC-08", capacity: 320000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - San Bernardino CA", type: "DC", locCode: "7E-DC-09", capacity: 350000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Indianapolis IN", type: "DC", locCode: "7E-DC-10", capacity: 290000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Charlotte NC", type: "DC", locCode: "7E-DC-11", capacity: 265000, capacityUnit: "sqft" },
  { name: "7-Eleven Regional DC - Portland OR", type: "DC", locCode: "7E-DC-12", capacity: 240000, capacityUnit: "sqft" },
  // Core-Mark Distribution Centers
  { name: "Core-Mark RDC - Visalia CA", type: "Plant", locCode: "CM-DC-01", capacity: 180000, capacityUnit: "sqft" },
  { name: "Core-Mark RDC - Denver CO", type: "Plant", locCode: "CM-DC-02", capacity: 145000, capacityUnit: "sqft" },
  { name: "Core-Mark RDC - Dallas TX", type: "Plant", locCode: "CM-DC-03", capacity: 160000, capacityUnit: "sqft" },
  { name: "Core-Mark RDC - Atlanta GA", type: "Plant", locCode: "CM-DC-04", capacity: 155000, capacityUnit: "sqft" },
  { name: "Core-Mark RDC - Chicago IL", type: "Plant", locCode: "CM-DC-05", capacity: 170000, capacityUnit: "sqft" },
  { name: "Core-Mark RDC - New Jersey", type: "Plant", locCode: "CM-DC-06", capacity: 140000, capacityUnit: "sqft" },
  // McLane Distribution Centers
  { name: "McLane DC - Temple TX", type: "Plant", locCode: "ML-DC-01", capacity: 500000, capacityUnit: "sqft" },
  { name: "McLane DC - Ocala FL", type: "Plant", locCode: "ML-DC-02", capacity: 380000, capacityUnit: "sqft" },
  { name: "McLane DC - Northfield OH", type: "Plant", locCode: "ML-DC-03", capacity: 350000, capacityUnit: "sqft" },
  { name: "McLane DC - Modesto CA", type: "Plant", locCode: "ML-DC-04", capacity: 320000, capacityUnit: "sqft" },
  // Bottling / Manufacturing Plants
  { name: "Coca-Cola Bottling Plant - Dallas TX", type: "Plant", locCode: "MFG-COKE-TX", capacity: 120000, capacityUnit: "cases/day" },
  { name: "Coca-Cola Bottling Plant - Los Angeles CA", type: "Plant", locCode: "MFG-COKE-CA", capacity: 150000, capacityUnit: "cases/day" },
  { name: "Coca-Cola Bottling Plant - Chicago IL", type: "Plant", locCode: "MFG-COKE-IL", capacity: 110000, capacityUnit: "cases/day" },
  { name: "PepsiCo Bottling Plant - Fort Worth TX", type: "Plant", locCode: "MFG-PEPSI-TX", capacity: 115000, capacityUnit: "cases/day" },
  { name: "PepsiCo Bottling Plant - Fresno CA", type: "Plant", locCode: "MFG-PEPSI-CA", capacity: 95000, capacityUnit: "cases/day" },
  { name: "Anheuser-Busch Brewery - Cartersville GA", type: "Plant", locCode: "MFG-AB-GA", capacity: 80000, capacityUnit: "cases/day" },
  { name: "Anheuser-Busch Brewery - Houston TX", type: "Plant", locCode: "MFG-AB-TX", capacity: 90000, capacityUnit: "cases/day" },
  { name: "Hershey Plant - Hershey PA", type: "Plant", locCode: "MFG-HSY-PA", capacity: 45000, capacityUnit: "cases/day" },
  { name: "Mondelez Plant - Richmond VA", type: "Plant", locCode: "MFG-MDLZ-VA", capacity: 38000, capacityUnit: "cases/day" },
  { name: "Philip Morris Plant - Richmond VA", type: "Plant", locCode: "MFG-PM-VA", capacity: 200000, capacityUnit: "cases/day" },
  { name: "Mars Plant - Hackettstown NJ", type: "Plant", locCode: "MFG-MARS-NJ", capacity: 35000, capacityUnit: "cases/day" },
]

// ── Customers (7-Eleven Store Zones) ────────────────────────────────
const CUSTOMERS_DATA = [
  { name: "7-Eleven Northeast Stores - New York", locCode: "CZ-NE" },
  { name: "7-Eleven Southeast Stores - Atlanta", locCode: "CZ-SE" },
  { name: "7-Eleven Florida Stores - Miami", locCode: "CZ-FL" },
  { name: "7-Eleven Midwest Stores - Chicago", locCode: "CZ-MW" },
  { name: "7-Eleven South Central Stores - Dallas", locCode: "CZ-SC" },
  { name: "7-Eleven Texas Stores - Houston", locCode: "CZ-TX" },
  { name: "7-Eleven Southwest Stores - Phoenix", locCode: "CZ-SW" },
  { name: "7-Eleven Rocky Mountain Stores - Denver", locCode: "CZ-RM" },
  { name: "7-Eleven SoCal Stores - Los Angeles", locCode: "CZ-SC2" },
  { name: "7-Eleven NorCal Stores - San Jose", locCode: "CZ-NC" },
  { name: "7-Eleven Pacific NW Stores - Seattle", locCode: "CZ-PNW" },
  { name: "7-Eleven Mid-Atlantic Stores - DC", locCode: "CZ-MID" },
]

// ── Product Flows ────────────────────────────────────────────────────
const FLOWS_DATA = [
  // Core-Mark RDCs → 7-Eleven DCs
  { label: "Core-Mark NJ to Newport News", src: "Core-Mark RDC - New Jersey", dest: "7-Eleven Master DC - Newport News VA", product: "Slurpee Frozen Beverages", min: "50000", max: "120000" },
  { label: "Core-Mark NJ to Charlotte", src: "Core-Mark RDC - New Jersey", dest: "7-Eleven Regional DC - Charlotte NC", product: "7-Select Private Label Snacks", min: "30000", max: "75000" },
  { label: "Core-Mark Atlanta to Atlanta DC", src: "Core-Mark RDC - Atlanta GA", dest: "7-Eleven Regional DC - Atlanta GA", product: "Hot Foods - Roller Grill Items", min: "40000", max: "100000" },
  { label: "Core-Mark Atlanta to Orlando", src: "Core-Mark RDC - Atlanta GA", dest: "7-Eleven Regional DC - Orlando FL", product: "Fresh Baked Goods", min: "25000", max: "60000" },
  { label: "Core-Mark Dallas to Dallas DC", src: "Core-Mark RDC - Dallas TX", dest: "7-Eleven Regional DC - Dallas TX", product: "Hot Foods - Roller Grill Items", min: "45000", max: "110000" },
  { label: "Core-Mark Dallas to Phoenix", src: "Core-Mark RDC - Dallas TX", dest: "7-Eleven Regional DC - Phoenix AZ", product: "7-Select Private Label Snacks", min: "20000", max: "55000" },
  { label: "Core-Mark Chicago to Chicago DC", src: "Core-Mark RDC - Chicago IL", dest: "7-Eleven Regional DC - Chicago IL", product: "Slurpee Frozen Beverages", min: "55000", max: "130000" },
  { label: "Core-Mark Chicago to Indy", src: "Core-Mark RDC - Chicago IL", dest: "7-Eleven Regional DC - Indianapolis IN", product: "Household & General Merchandise", min: "15000", max: "40000" },
  { label: "Core-Mark Denver to Denver DC", src: "Core-Mark RDC - Denver CO", dest: "7-Eleven Regional DC - Denver CO", product: "Hot Foods - Roller Grill Items", min: "18000", max: "48000" },
  { label: "Core-Mark Visalia to Sacramento", src: "Core-Mark RDC - Visalia CA", dest: "7-Eleven Regional DC - Sacramento CA", product: "Fresh Baked Goods", min: "22000", max: "58000" },
  { label: "Core-Mark Visalia to San Bernardino", src: "Core-Mark RDC - Visalia CA", dest: "7-Eleven Regional DC - San Bernardino CA", product: "Hot Foods - Roller Grill Items", min: "28000", max: "72000" },

  // McLane DCs → 7-Eleven DCs
  { label: "McLane Temple to Dallas DC", src: "McLane DC - Temple TX", dest: "7-Eleven Regional DC - Dallas TX", product: "Tobacco - Cigarettes", min: "80000", max: "200000" },
  { label: "McLane Temple to Phoenix", src: "McLane DC - Temple TX", dest: "7-Eleven Regional DC - Phoenix AZ", product: "Beer & Malt Beverages", min: "35000", max: "90000" },
  { label: "McLane Ocala to Orlando", src: "McLane DC - Ocala FL", dest: "7-Eleven Regional DC - Orlando FL", product: "Tobacco - Cigarettes", min: "60000", max: "160000" },
  { label: "McLane Ocala to Charlotte", src: "McLane DC - Ocala FL", dest: "7-Eleven Regional DC - Charlotte NC", product: "Packaged Soft Drinks - Cola", min: "45000", max: "115000" },
  { label: "McLane Ohio to Indianapolis", src: "McLane DC - Northfield OH", dest: "7-Eleven Regional DC - Indianapolis IN", product: "Chips & Salty Snacks", min: "40000", max: "100000" },
  { label: "McLane Ohio to Chicago", src: "McLane DC - Northfield OH", dest: "7-Eleven Regional DC - Chicago IL", product: "Tobacco - Cigarettes", min: "70000", max: "180000" },
  { label: "McLane Modesto to Sacramento", src: "McLane DC - Modesto CA", dest: "7-Eleven Regional DC - Sacramento CA", product: "Packaged Soft Drinks - Cola", min: "50000", max: "130000" },
  { label: "McLane Modesto to San Bernardino", src: "McLane DC - Modesto CA", dest: "7-Eleven Regional DC - San Bernardino CA", product: "Beer & Malt Beverages", min: "40000", max: "100000" },

  // Coca-Cola Bottling → 7-Eleven DCs
  { label: "Coke Dallas to Dallas DC", src: "Coca-Cola Bottling Plant - Dallas TX", dest: "7-Eleven Regional DC - Dallas TX", product: "Packaged Soft Drinks - Cola", min: "60000", max: "150000" },
  { label: "Coke Dallas to Newport News", src: "Coca-Cola Bottling Plant - Dallas TX", dest: "7-Eleven Master DC - Newport News VA", product: "Packaged Water & Sparkling", min: "30000", max: "80000" },
  { label: "Coke LA to San Bernardino", src: "Coca-Cola Bottling Plant - Los Angeles CA", dest: "7-Eleven Regional DC - San Bernardino CA", product: "Packaged Soft Drinks - Cola", min: "70000", max: "175000" },
  { label: "Coke Chicago to Chicago DC", src: "Coca-Cola Bottling Plant - Chicago IL", dest: "7-Eleven Regional DC - Chicago IL", product: "Packaged Soft Drinks - Cola", min: "55000", max: "140000" },

  // PepsiCo → 7-Eleven DCs
  { label: "Pepsi FW to Dallas DC", src: "PepsiCo Bottling Plant - Fort Worth TX", dest: "7-Eleven Regional DC - Dallas TX", product: "Packaged Sports Drinks", min: "40000", max: "100000" },
  { label: "Pepsi Fresno to Sacramento", src: "PepsiCo Bottling Plant - Fresno CA", dest: "7-Eleven Regional DC - Sacramento CA", product: "Packaged Sports Drinks", min: "35000", max: "90000" },
  { label: "Pepsi Fresno to Portland", src: "PepsiCo Bottling Plant - Fresno CA", dest: "7-Eleven Regional DC - Portland OR", product: "Packaged Soft Drinks - Cola", min: "25000", max: "65000" },

  // AB InBev Breweries → 7-Eleven DCs
  { label: "AB InBev GA to Atlanta DC", src: "Anheuser-Busch Brewery - Cartersville GA", dest: "7-Eleven Regional DC - Atlanta GA", product: "Beer & Malt Beverages", min: "50000", max: "125000" },
  { label: "AB InBev GA to Orlando", src: "Anheuser-Busch Brewery - Cartersville GA", dest: "7-Eleven Regional DC - Orlando FL", product: "Beer & Malt Beverages", min: "40000", max: "100000" },
  { label: "AB InBev TX to Dallas DC", src: "Anheuser-Busch Brewery - Houston TX", dest: "7-Eleven Regional DC - Dallas TX", product: "Beer & Malt Beverages", min: "55000", max: "140000" },
  { label: "AB InBev TX to Phoenix", src: "Anheuser-Busch Brewery - Houston TX", dest: "7-Eleven Regional DC - Phoenix AZ", product: "Beer & Malt Beverages", min: "30000", max: "75000" },

  // Tobacco → 7-Eleven DCs
  { label: "Philip Morris to Newport News", src: "Philip Morris Plant - Richmond VA", dest: "7-Eleven Master DC - Newport News VA", product: "Tobacco - Cigarettes", min: "100000", max: "250000" },
  { label: "Philip Morris to Charlotte", src: "Philip Morris Plant - Richmond VA", dest: "7-Eleven Regional DC - Charlotte NC", product: "Tobacco - Cigarettes", min: "80000", max: "200000" },

  // Candy/Snacks → 7-Eleven DCs
  { label: "Hershey to Newport News", src: "Hershey Plant - Hershey PA", dest: "7-Eleven Master DC - Newport News VA", product: "Chocolate & Candy", min: "25000", max: "65000" },
  { label: "Hershey to Chicago", src: "Hershey Plant - Hershey PA", dest: "7-Eleven Regional DC - Chicago IL", product: "Chocolate & Candy", min: "20000", max: "55000" },
  { label: "Mondelez to Newport News", src: "Mondelez Plant - Richmond VA", dest: "7-Eleven Master DC - Newport News VA", product: "Chips & Salty Snacks", min: "30000", max: "80000" },
  { label: "Mondelez to Charlotte", src: "Mondelez Plant - Richmond VA", dest: "7-Eleven Regional DC - Charlotte NC", product: "Chips & Salty Snacks", min: "22000", max: "58000" },
  { label: "Mars to Newport News", src: "Mars Plant - Hackettstown NJ", dest: "7-Eleven Master DC - Newport News VA", product: "Chocolate & Candy", min: "18000", max: "48000" },
  { label: "Mars to Chicago", src: "Mars Plant - Hackettstown NJ", dest: "7-Eleven Regional DC - Chicago IL", product: "Chips & Salty Snacks", min: "15000", max: "40000" },
]

// ── Periods ──────────────────────────────────────────────────────────
const PERIODS_DATA = [
  { name: "Q1 2026", start: "2026-01-01", end: "2026-03-31", demandCoefficient: "1.0" },
  { name: "Q2 2026", start: "2026-04-01", end: "2026-06-30", demandCoefficient: "1.15" },
  { name: "Q3 2026", start: "2026-07-01", end: "2026-09-30", demandCoefficient: "1.30" },
  { name: "Q4 2026", start: "2026-10-01", end: "2026-12-31", demandCoefficient: "1.10" },
]

// ── Demand (customer zone × product × period) ────────────────────────
// Maps: customer zone → DC → products with annual demand volumes (split by zone)
const DEMAND_MAP: Record<string, Record<string, number>> = {
  "7-Eleven Northeast Stores - New York": {
    "Slurpee Frozen Beverages": 85000,
    "Packaged Soft Drinks - Cola": 120000,
    "Tobacco - Cigarettes": 95000,
    "Chips & Salty Snacks": 75000,
    "Beer & Malt Beverages": 55000,
    "Chocolate & Candy": 50000,
    "Hot Foods - Roller Grill Items": 65000,
    "Fresh Sandwiches & Wraps": 45000,
    "7-Select Energy Drink 16oz": 40000,
    "Packaged Sports Drinks": 35000,
  },
  "7-Eleven Southeast Stores - Atlanta": {
    "Slurpee Frozen Beverages": 70000,
    "Packaged Soft Drinks - Cola": 95000,
    "Tobacco - Cigarettes": 80000,
    "Chips & Salty Snacks": 60000,
    "Beer & Malt Beverages": 48000,
    "Hot Foods - Roller Grill Items": 55000,
    "Chocolate & Candy": 42000,
    "Fresh Sandwiches & Wraps": 38000,
    "7-Select Energy Drink 16oz": 35000,
  },
  "7-Eleven Florida Stores - Miami": {
    "Slurpee Frozen Beverages": 90000,
    "Packaged Soft Drinks - Cola": 110000,
    "Tobacco - Cigarettes": 72000,
    "Beer & Malt Beverages": 62000,
    "Chips & Salty Snacks": 55000,
    "Hot Foods - Roller Grill Items": 60000,
    "Chocolate & Candy": 45000,
    "Packaged Sports Drinks": 40000,
  },
  "7-Eleven Midwest Stores - Chicago": {
    "Slurpee Frozen Beverages": 80000,
    "Packaged Soft Drinks - Cola": 105000,
    "Tobacco - Cigarettes": 88000,
    "Chips & Salty Snacks": 68000,
    "Beer & Malt Beverages": 58000,
    "Chocolate & Candy": 48000,
    "Hot Foods - Roller Grill Items": 58000,
    "Fresh Sandwiches & Wraps": 42000,
    "7-Select Energy Drink 16oz": 38000,
  },
  "7-Eleven South Central Stores - Dallas": {
    "Slurpee Frozen Beverages": 95000,
    "Packaged Soft Drinks - Cola": 115000,
    "Tobacco - Cigarettes": 90000,
    "Beer & Malt Beverages": 65000,
    "Chips & Salty Snacks": 72000,
    "Hot Foods - Roller Grill Items": 70000,
    "Chocolate & Candy": 52000,
    "Packaged Sports Drinks": 42000,
  },
  "7-Eleven Texas Stores - Houston": {
    "Slurpee Frozen Beverages": 88000,
    "Packaged Soft Drinks - Cola": 108000,
    "Tobacco - Cigarettes": 85000,
    "Beer & Malt Beverages": 62000,
    "Hot Foods - Roller Grill Items": 65000,
    "Chips & Salty Snacks": 68000,
    "Chocolate & Candy": 48000,
    "Packaged Sports Drinks": 38000,
  },
  "7-Eleven Southwest Stores - Phoenix": {
    "Slurpee Frozen Beverages": 78000,
    "Packaged Soft Drinks - Cola": 92000,
    "Tobacco - Cigarettes": 68000,
    "Beer & Malt Beverages": 52000,
    "Chips & Salty Snacks": 58000,
    "Hot Foods - Roller Grill Items": 52000,
    "Packaged Water & Sparkling": 62000,
  },
  "7-Eleven Rocky Mountain Stores - Denver": {
    "Slurpee Frozen Beverages": 58000,
    "Packaged Soft Drinks - Cola": 75000,
    "Tobacco - Cigarettes": 55000,
    "Beer & Malt Beverages": 48000,
    "Chips & Salty Snacks": 45000,
    "Hot Foods - Roller Grill Items": 42000,
  },
  "7-Eleven SoCal Stores - Los Angeles": {
    "Slurpee Frozen Beverages": 105000,
    "Packaged Soft Drinks - Cola": 130000,
    "Tobacco - Cigarettes": 85000,
    "Beer & Malt Beverages": 72000,
    "Chips & Salty Snacks": 80000,
    "Hot Foods - Roller Grill Items": 75000,
    "Chocolate & Candy": 60000,
    "Fresh Sandwiches & Wraps": 52000,
    "7-Select Energy Drink 16oz": 48000,
    "Packaged Sports Drinks": 52000,
  },
  "7-Eleven NorCal Stores - San Jose": {
    "Slurpee Frozen Beverages": 65000,
    "Packaged Soft Drinks - Cola": 85000,
    "Tobacco - Cigarettes": 55000,
    "Beer & Malt Beverages": 48000,
    "Chips & Salty Snacks": 52000,
    "Hot Foods - Roller Grill Items": 48000,
    "Packaged Sports Drinks": 40000,
  },
  "7-Eleven Pacific NW Stores - Seattle": {
    "Slurpee Frozen Beverages": 55000,
    "Packaged Soft Drinks - Cola": 72000,
    "Tobacco - Cigarettes": 50000,
    "Beer & Malt Beverages": 45000,
    "Chips & Salty Snacks": 42000,
    "Hot Foods - Roller Grill Items": 40000,
    "7-Select Hot Coffee": 58000,
  },
  "7-Eleven Mid-Atlantic Stores - DC": {
    "Slurpee Frozen Beverages": 72000,
    "Packaged Soft Drinks - Cola": 95000,
    "Tobacco - Cigarettes": 78000,
    "Beer & Malt Beverages": 52000,
    "Chips & Salty Snacks": 62000,
    "Hot Foods - Roller Grill Items": 58000,
    "Chocolate & Candy": 48000,
    "Fresh Sandwiches & Wraps": 40000,
  },
}

async function main() {
  console.log("Seeding 7-Eleven supply chain data into Neon DB...")

  try {
    // 1. Clear existing data (dependency order)
    console.log("Clearing existing data...")
    await db.delete(demand).execute()
    await db.delete(productFlows).execute()
    await db.delete(supplierProducts).execute()
    await db.delete(customers).execute()
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
        if (productId) spValues.push({ supplierId, productId })
      }
    }
    if (spValues.length > 0) {
      await db.insert(supplierProducts).values(spValues).execute()
    }
    console.log(`  Inserted ${spValues.length} supplier-product mappings`)

    // 8. Insert customers
    console.log("Inserting customers...")
    const customerValues = CUSTOMERS_DATA.map((c) => ({
      name: c.name,
      type: "Customer",
      locationId: locByCode.get(c.locCode)!,
      inclusionType: "Include" as const,
    }))

    const insertedCustomers = await db
      .insert(customers)
      .values(customerValues)
      .returning({ id: customers.id, name: customers.name })
      .execute()

    const custByName = new Map<string, number>()
    insertedCustomers.forEach((c) => custByName.set(c.name, c.id))
    console.log(`  Inserted ${insertedCustomers.length} customers`)

    // 9. Insert demand records (customer × product × period Q1 2026)
    console.log("Inserting demand records...")
    const q1Period = insertedPeriods.find((p) => p.name === "Q1 2026")!
    const demandValues: {
      customerId: number
      productId: number
      timePeriodId: number
      demandType: string
      revenue: string
      currency: string
      inclusionType: string
    }[] = []

    for (const [custName, productDemands] of Object.entries(DEMAND_MAP)) {
      const customerId = custByName.get(custName)
      if (!customerId) continue
      for (const [prodName, qty] of Object.entries(productDemands)) {
        const productId = prodByName.get(prodName)
        if (!productId) continue
        const prod = PRODUCTS.find((p) => p.name === prodName)
        const revenue = prod ? (qty * parseFloat(prod.sellingPrice)).toFixed(2) : "0.00"
        demandValues.push({
          customerId,
          productId,
          timePeriodId: q1Period.id,
          demandType: "Periodic demand",
          revenue,
          currency: "USD",
          inclusionType: "Include",
        })
      }
    }

    if (demandValues.length > 0) {
      await db.insert(demand).values(demandValues).execute()
    }
    console.log(`  Inserted ${demandValues.length} demand records`)

    // 10. Insert product flows
    console.log("Inserting product flows...")
    const flowValues = FLOWS_DATA.map((f) => ({
      label: f.label,
      sourceId: facByName.get(f.src)!,
      destinationId: facByName.get(f.dest)!,
      productId: prodByName.get(f.product)!,
      timePeriodId: q1Period.id,
      minThroughput: f.min,
      maxThroughput: f.max,
      inclusionType: "Include",
      currency: "USD",
    })).filter((f) => f.sourceId && f.destinationId && f.productId)

    if (flowValues.length > 0) {
      await db.insert(productFlows).values(flowValues).execute()
    }
    console.log(`  Inserted ${flowValues.length} product flows`)

    console.log("\n7-Eleven supply chain seed complete!")
    console.log(`  ${insertedLocations.length} locations`)
    console.log(`  ${insertedProducts.length} products`)
    console.log(`  ${insertedFacilities.length} facilities`)
    console.log(`  ${insertedSuppliers.length} suppliers`)
    console.log(`  ${insertedCustomers.length} customer zones`)
    console.log(`  ${demandValues.length} demand records`)
    console.log(`  ${flowValues.length} product flows`)
  } catch (error) {
    console.error("Error during seed:", error)
    process.exit(1)
  }
}

main()
