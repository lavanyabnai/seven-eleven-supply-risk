"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { GripVertical, Search, Pencil, Trash2, Plus, Building2, PackageOpen, Link2, MapPin, Users, ShoppingCart, Store, Truck, Route, FolderKanban, Calendar, Network, ArrowRightLeft, Car, CalendarClock, DollarSign } from "lucide-react"
import { contentItems } from "./mailData"
import { TableActionsProvider, useTableActions } from "./table-actions-context"

function AlltablesMailInner() {
  const [selectedItem, setSelectedItem] = useState<typeof contentItems[number]>(contentItems[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("tableFields")
  const tableActions = useTableActions()

  // Resizable sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(240)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const minSidebarWidth = 200
  const maxSidebarWidth = 400

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return
      let newWidth = e.clientX - containerRect.left
      newWidth = Math.max(minSidebarWidth, Math.min(newWidth, maxSidebarWidth))
      setSidebarWidth(newWidth)
    }

    const stopResizing = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      window.addEventListener("mousemove", handleResize)
      window.addEventListener("mouseup", stopResizing)
    }

    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing])

  const filteredItems = contentItems.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Color mapping for each table
  const colorMap: Record<string, { bg: string; text: string }> = {
    "Customers": { bg: "bg-blue-500", text: "text-blue-500" },
    "Demand": { bg: "bg-orange-500", text: "text-orange-500" },
    "DCs and Factories": { bg: "bg-emerald-500", text: "text-emerald-500" },
    "Events": { bg: "bg-purple-500", text: "text-purple-500" },
    "Facility Expenses": { bg: "bg-yellow-500", text: "text-yellow-500" },
    "Groups": { bg: "bg-pink-500", text: "text-pink-500" },
    "Inventory": { bg: "bg-teal-500", text: "text-teal-500" },
    "Locations": { bg: "bg-red-500", text: "text-red-500" },
    "Paths": { bg: "bg-indigo-500", text: "text-indigo-500" },
    "Periods": { bg: "bg-cyan-500", text: "text-cyan-500" },
    "Products": { bg: "bg-blue-600", text: "text-blue-600" },
    "Shipping": { bg: "bg-amber-600", text: "text-amber-600" },
    "Sourcing": { bg: "bg-violet-500", text: "text-violet-500" },
    "Suppliers": { bg: "bg-rose-500", text: "text-rose-500" },
    "Unit Conversions": { bg: "bg-lime-600", text: "text-lime-600" },
    "Vehicle Types": { bg: "bg-sky-500", text: "text-sky-500" },
  }

  const getItemColor = (name: string) => colorMap[name]?.bg || "bg-blue-500"
  const getItemTextColor = (name: string) => colorMap[name]?.text || "text-blue-500"

  // Table field schema definitions
  const getTableFields = (name: string) => {
    const fieldMap: Record<string, Array<{ name: string; type: string; required: boolean }>> = {
      "Customers": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "type", type: "string", required: false },
        { name: "location_id", type: "number", required: true },
        { name: "inclusion_type", type: "string", required: true },
        { name: "additional_params", type: "number", required: false },
        { name: "icon", type: "string", required: false },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Demand": [
        { name: "id", type: "number", required: true },
        { name: "customer_id", type: "number", required: true },
        { name: "product_id", type: "number", required: true },
        { name: "time_period_id", type: "number", required: true },
        { name: "demand_type", type: "string", required: true },
        { name: "parameters", type: "number", required: false },
        { name: "revenue", type: "number", required: false },
        { name: "down_penalty", type: "number", required: false },
        { name: "up_penalty", type: "number", required: false },
        { name: "currency", type: "string", required: true },
        { name: "expected_lead_time", type: "number", required: false },
        { name: "time_unit", type: "string", required: false },
        { name: "min_split_ratio", type: "number", required: false },
        { name: "backorder_policy", type: "string", required: false },
        { name: "inclusion_type", type: "string", required: true },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "DCs and Factories": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "type", type: "string", required: false },
        { name: "location_id", type: "number", required: true },
        { name: "initially_open", type: "boolean", required: false },
        { name: "inclusion_type", type: "string", required: true },
        { name: "capacity", type: "number", required: false },
        { name: "capacity_unit", type: "string", required: false },
        { name: "aggregate_orders_by_location", type: "boolean", required: false },
        { name: "additional_params", type: "number", required: false },
        { name: "icon", type: "string", required: false },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Events": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "event_type", type: "string", required: true },
        { name: "parameters", type: "number", required: false },
        { name: "occurrence_type", type: "string", required: true },
        { name: "occurrence_time", type: "string", required: true },
        { name: "trigger_event_name", type: "string", required: false },
        { name: "probability", type: "number", required: true },
      ],
      "Facility Expenses": [
        { name: "id", type: "number", required: true },
        { name: "facility_id", type: "number", required: true },
        { name: "expense_type", type: "string", required: true },
        { name: "value", type: "number", required: false },
        { name: "currency", type: "string", required: true },
        { name: "time_unit", type: "string", required: false },
        { name: "product_unit", type: "string", required: false },
        { name: "time_period_id", type: "number", required: false },
      ],
      "Groups": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "description", type: "string", required: false },
        { name: "created_at", type: "date", required: false },
      ],
      "Inventory": [
        { name: "id", type: "number", required: true },
        { name: "facility_id", type: "number", required: true },
        { name: "product_id", type: "number", required: true },
        { name: "policy_type", type: "string", required: true },
        { name: "policy_parameters", type: "number", required: false },
        { name: "initial_stock", type: "number", required: true },
        { name: "periodic_check", type: "boolean", required: true },
        { name: "period", type: "number", required: false },
        { name: "time_unit", type: "string", required: true },
        { name: "min_split_ratio", type: "number", required: false },
        { name: "time_period_id", type: "number", required: true },
        { name: "inclusion_type", type: "string", required: true },
      ],
      "Locations": [
        { name: "id", type: "number", required: true },
        { name: "code", type: "string", required: false },
        { name: "name", type: "string", required: true },
        { name: "city", type: "string", required: false },
        { name: "region", type: "string", required: false },
        { name: "country", type: "string", required: true },
        { name: "address", type: "string", required: false },
        { name: "latitude", type: "number", required: false },
        { name: "longitude", type: "number", required: false },
        { name: "autofill_coordinates", type: "boolean", required: false },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Paths": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "from_location", type: "string", required: true },
        { name: "to_location", type: "string", required: true },
        { name: "cost_calculation_policy", type: "string", required: true },
        { name: "cost_pu_pk", type: "number", required: false },
        { name: "currency", type: "string", required: false },
        { name: "distance", type: "number", required: false },
        { name: "distance_unit", type: "string", required: false },
        { name: "transportation_time", type: "number", required: false },
        { name: "time_unit", type: "string", required: false },
        { name: "straight", type: "boolean", required: false },
        { name: "vehicle_type_id", type: "number", required: false },
        { name: "transportation_policy", type: "string", required: false },
        { name: "min_load_ratio", type: "number", required: false },
        { name: "inclusion_type", type: "string", required: false },
      ],
      "Periods": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "start", type: "date", required: true },
        { name: "end", type: "date", required: true },
        { name: "demand_coefficient", type: "number", required: true },
      ],
      "Products": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "unit", type: "string", required: true },
        { name: "selling_price", type: "number", required: true },
        { name: "cost", type: "number", required: true },
        { name: "currency", type: "string", required: true },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Shipping": [
        { name: "id", type: "number", required: true },
        { name: "source_id", type: "number", required: true },
        { name: "destination_id", type: "number", required: true },
        { name: "product_id", type: "number", required: true },
        { name: "vehicle_type_id", type: "number", required: true },
        { name: "type", type: "string", required: true },
        { name: "parameters", type: "number", required: false },
        { name: "priority", type: "string", required: true },
        { name: "days_of_week", type: "number", required: false },
        { name: "start_time", type: "date", required: false },
        { name: "end_time", type: "date", required: false },
        { name: "time_period_id", type: "number", required: true },
        { name: "inclusion_type", type: "string", required: true },
      ],
      "Sourcing": [
        { name: "id", type: "number", required: true },
        { name: "delivery_destination", type: "string", required: true },
        { name: "sources", type: "string", required: false },
        { name: "product_id", type: "number", required: false },
        { name: "type", type: "string", required: false },
        { name: "parameters", type: "number", required: false },
        { name: "time_period_id", type: "number", required: false },
        { name: "inclusion_type", type: "string", required: false },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Suppliers": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "type", type: "string", required: false },
        { name: "location_id", type: "number", required: false },
        { name: "products", type: "number", required: false },
        { name: "inclusion_type", type: "string", required: false },
        { name: "additional_parameters", type: "number", required: false },
        { name: "icon", type: "string", required: false },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Unit Conversions": [
        { name: "id", type: "number", required: true },
        { name: "product_id", type: "number", required: false },
        { name: "amount_from", type: "number", required: true },
        { name: "unit_from", type: "string", required: true },
        { name: "amount_to", type: "number", required: true },
        { name: "unit_to", type: "string", required: true },
        { name: "created_at", type: "date", required: false },
        { name: "updated_at", type: "date", required: false },
      ],
      "Vehicle Types": [
        { name: "id", type: "number", required: true },
        { name: "name", type: "string", required: true },
        { name: "capacity", type: "number", required: false },
        { name: "capacity_unit", type: "string", required: false },
        { name: "speed", type: "number", required: false },
        { name: "speed_unit", type: "string", required: false },
      ],
    }
    return fieldMap[name] || [
      { name: "id", type: "number", required: true },
      { name: "name", type: "string", required: true },
    ]
  }

  const getFieldTypeBadgeColor = (type: string) => {
    switch (type) {
      case "string":
        return "bg-blue-100 text-blue-800"
      case "number":
        return "bg-purple-100 text-purple-800"
      case "boolean":
        return "bg-amber-100 text-amber-800"
      case "date":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // Relationship icon map
  const relationIconMap: Record<string, React.ReactNode> = {
    "Customers": <Users size={14} />,
    "Demand": <ShoppingCart size={14} />,
    "DCs and Factories": <Building2 size={14} />,
    "Events": <CalendarClock size={14} />,
    "Facility Expenses": <DollarSign size={14} />,
    "Groups": <FolderKanban size={14} />,
    "Inventory": <PackageOpen size={14} />,
    "Locations": <MapPin size={14} />,
    "Paths": <Route size={14} />,
    "Periods": <Calendar size={14} />,
    "Products": <PackageOpen size={14} />,
    "Shipping": <Truck size={14} />,
    "Sourcing": <Network size={14} />,
    "Suppliers": <Store size={14} />,
    "Unit Conversions": <ArrowRightLeft size={14} />,
    "Vehicle Types": <Car size={14} />,
  }

  // Table relationship definitions
  const getTableRelationships = (name: string) => {
    const relMap: Record<string, Array<{ name: string; target: string; cardinality: string; required: boolean }>> = {
      "Customers": [
        { name: "Located At", target: "Locations", cardinality: "many-to-one", required: true },
        { name: "Orders", target: "Demand", cardinality: "one-to-many", required: false },
        { name: "Grouped In", target: "Groups", cardinality: "many-to-many", required: false },
      ],
      "Demand": [
        { name: "Ordered By", target: "Customers", cardinality: "many-to-one", required: true },
        { name: "For Product", target: "Products", cardinality: "many-to-one", required: true },
        { name: "In Period", target: "Periods", cardinality: "many-to-one", required: true },
      ],
      "DCs and Factories": [
        { name: "Located At", target: "Locations", cardinality: "many-to-one", required: true },
        { name: "Stores", target: "Inventory", cardinality: "one-to-many", required: false },
        { name: "Expenses", target: "Facility Expenses", cardinality: "one-to-many", required: false },
        { name: "Ships Via", target: "Shipping", cardinality: "one-to-many", required: false },
      ],
      "Events": [
        { name: "Triggers", target: "Events", cardinality: "one-to-many", required: false },
      ],
      "Facility Expenses": [
        { name: "For Facility", target: "DCs and Factories", cardinality: "many-to-one", required: true },
        { name: "In Period", target: "Periods", cardinality: "many-to-one", required: false },
      ],
      "Groups": [
        { name: "Contains", target: "Customers", cardinality: "many-to-many", required: false },
        { name: "Contains", target: "Suppliers", cardinality: "many-to-many", required: false },
        { name: "Contains", target: "DCs and Factories", cardinality: "many-to-many", required: false },
      ],
      "Inventory": [
        { name: "At Facility", target: "DCs and Factories", cardinality: "many-to-one", required: true },
        { name: "For Product", target: "Products", cardinality: "many-to-one", required: true },
        { name: "In Period", target: "Periods", cardinality: "many-to-one", required: true },
      ],
      "Locations": [
        { name: "Has Customers", target: "Customers", cardinality: "one-to-many", required: false },
        { name: "Has Facilities", target: "DCs and Factories", cardinality: "one-to-many", required: false },
        { name: "Has Suppliers", target: "Suppliers", cardinality: "one-to-many", required: false },
      ],
      "Paths": [
        { name: "Uses Vehicle", target: "Vehicle Types", cardinality: "many-to-one", required: false },
      ],
      "Periods": [
        { name: "Has Demand", target: "Demand", cardinality: "one-to-many", required: false },
        { name: "Has Inventory", target: "Inventory", cardinality: "one-to-many", required: false },
        { name: "Has Shipping", target: "Shipping", cardinality: "one-to-many", required: false },
      ],
      "Products": [
        { name: "Supplied By", target: "Suppliers", cardinality: "many-to-many", required: false },
        { name: "Stocked As", target: "Inventory", cardinality: "one-to-many", required: false },
        { name: "Has Demand", target: "Demand", cardinality: "one-to-many", required: false },
        { name: "Converted Via", target: "Unit Conversions", cardinality: "one-to-many", required: false },
      ],
      "Shipping": [
        { name: "From Facility", target: "DCs and Factories", cardinality: "many-to-one", required: true },
        { name: "To Facility", target: "DCs and Factories", cardinality: "many-to-one", required: true },
        { name: "For Product", target: "Products", cardinality: "many-to-one", required: true },
        { name: "Uses Vehicle", target: "Vehicle Types", cardinality: "many-to-one", required: true },
        { name: "In Period", target: "Periods", cardinality: "many-to-one", required: true },
      ],
      "Sourcing": [
        { name: "For Product", target: "Products", cardinality: "many-to-one", required: false },
        { name: "In Period", target: "Periods", cardinality: "many-to-one", required: false },
      ],
      "Suppliers": [
        { name: "Located At", target: "Locations", cardinality: "many-to-one", required: false },
        { name: "Supplies", target: "Products", cardinality: "many-to-many", required: false },
        { name: "Grouped In", target: "Groups", cardinality: "many-to-many", required: false },
      ],
      "Unit Conversions": [
        { name: "For Product", target: "Products", cardinality: "many-to-one", required: false },
      ],
      "Vehicle Types": [
        { name: "Used In Paths", target: "Paths", cardinality: "one-to-many", required: false },
        { name: "Used In Shipping", target: "Shipping", cardinality: "one-to-many", required: false },
      ],
    }
    return relMap[name] || []
  }

  const getCardinalityBadgeColor = (cardinality: string) => {
    switch (cardinality) {
      case "one-to-one":
        return "bg-blue-100 text-blue-800"
      case "one-to-many":
        return "bg-purple-100 text-purple-800"
      case "many-to-one":
        return "bg-indigo-100 text-indigo-800"
      case "many-to-many":
        return "bg-gray-200 text-gray-800"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // Mock index/field data per table
  const getTableIndexes = (name: string) => {
    const indexMap: Record<string, Array<{ name: string; type: string; fields: string; unique: boolean }>> = {
      "Customers": [
        { name: "customer_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "customer_name_idx", type: "UNIQUE", fields: "name", unique: true },
        { name: "customer_location_idx", type: "INDEX", fields: "location_id", unique: false },
        { name: "customer_type_idx", type: "INDEX", fields: "type", unique: false },
      ],
      "Products": [
        { name: "product_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "product_sku_idx", type: "UNIQUE", fields: "sku", unique: true },
        { name: "product_name_idx", type: "INDEX", fields: "name", unique: false },
        { name: "product_category_idx", type: "INDEX", fields: "category", unique: false },
      ],
      "Demand": [
        { name: "demand_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "demand_customer_idx", type: "INDEX", fields: "customer_id", unique: false },
        { name: "demand_product_idx", type: "INDEX", fields: "product_id", unique: false },
        { name: "demand_period_idx", type: "INDEX", fields: "period", unique: false },
      ],
      "DCs and Factories": [
        { name: "facility_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "facility_name_idx", type: "UNIQUE", fields: "name", unique: true },
        { name: "facility_location_idx", type: "INDEX", fields: "location_id", unique: false },
      ],
      "Events": [
        { name: "event_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "event_type_idx", type: "INDEX", fields: "type", unique: false },
        { name: "event_trigger_idx", type: "INDEX", fields: "trigger_date", unique: false },
      ],
      "Facility Expenses": [
        { name: "expense_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "expense_facility_idx", type: "INDEX", fields: "facility_id", unique: false },
        { name: "expense_type_idx", type: "INDEX", fields: "expense_type", unique: false },
      ],
      "Groups": [
        { name: "group_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "group_name_idx", type: "UNIQUE", fields: "name", unique: true },
      ],
      "Inventory": [
        { name: "inventory_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "inventory_facility_idx", type: "INDEX", fields: "facility_id", unique: false },
        { name: "inventory_product_idx", type: "INDEX", fields: "product_id", unique: false },
      ],
      "Locations": [
        { name: "location_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "location_name_idx", type: "UNIQUE", fields: "name", unique: true },
        { name: "location_coords_idx", type: "INDEX", fields: "latitude, longitude", unique: false },
      ],
      "Paths": [
        { name: "path_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "path_source_idx", type: "INDEX", fields: "source_id", unique: false },
        { name: "path_dest_idx", type: "INDEX", fields: "destination_id", unique: false },
      ],
      "Periods": [
        { name: "period_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "period_name_idx", type: "UNIQUE", fields: "name", unique: true },
      ],
      "Shipping": [
        { name: "shipping_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "shipping_source_idx", type: "INDEX", fields: "source_id", unique: false },
        { name: "shipping_dest_idx", type: "INDEX", fields: "destination_id", unique: false },
      ],
      "Sourcing": [
        { name: "sourcing_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "sourcing_product_idx", type: "INDEX", fields: "product_id", unique: false },
        { name: "sourcing_source_idx", type: "INDEX", fields: "source_id", unique: false },
      ],
      "Suppliers": [
        { name: "supplier_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "supplier_name_idx", type: "UNIQUE", fields: "name", unique: true },
        { name: "supplier_location_idx", type: "INDEX", fields: "location_id", unique: false },
      ],
      "Unit Conversions": [
        { name: "conversion_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "conversion_product_idx", type: "INDEX", fields: "product_id", unique: false },
      ],
      "Vehicle Types": [
        { name: "vehicle_pkey", type: "PRIMARY KEY", fields: "id", unique: true },
        { name: "vehicle_name_idx", type: "UNIQUE", fields: "name", unique: true },
      ],
    }
    return indexMap[name] || [
      { name: `${name.toLowerCase()}_pkey`, type: "PRIMARY KEY", fields: "id", unique: true },
    ]
  }

  const getPerformanceData = (name: string) => {
    const perfMap: Record<string, { query: number; write: number; storage: number }> = {
      "Customers": { query: 85, write: 65, storage: 30 },
      "Products": { query: 85, write: 65, storage: 30 },
      "Demand": { query: 70, write: 80, storage: 55 },
      "DCs and Factories": { query: 90, write: 50, storage: 25 },
      "Events": { query: 60, write: 70, storage: 40 },
      "Facility Expenses": { query: 75, write: 60, storage: 35 },
      "Groups": { query: 80, write: 45, storage: 20 },
      "Inventory": { query: 72, write: 78, storage: 50 },
      "Locations": { query: 88, write: 55, storage: 28 },
      "Paths": { query: 65, write: 75, storage: 45 },
      "Periods": { query: 92, write: 40, storage: 15 },
      "Shipping": { query: 68, write: 82, storage: 48 },
      "Sourcing": { query: 78, write: 62, storage: 38 },
      "Suppliers": { query: 82, write: 58, storage: 32 },
      "Unit Conversions": { query: 90, write: 42, storage: 18 },
      "Vehicle Types": { query: 88, write: 48, storage: 22 },
    }
    return perfMap[name] || { query: 75, write: 60, storage: 35 }
  }

  const getQueryLabel = (val: number) => val >= 80 ? "Optimized" : val >= 60 ? "Good" : "Needs Improvement"
  const getWriteLabel = (val: number) => val >= 75 ? "High Impact" : val >= 50 ? "Moderate Impact" : "Low Impact"
  const getStorageLabel = (val: number) => val >= 50 ? "High Impact" : val >= 30 ? "Moderate Impact" : "Low Impact"

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "PRIMARY KEY":
        return "bg-blue-600 text-white"
      case "UNIQUE":
        return "bg-blue-100 text-blue-800"
      case "INDEX":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const indexes = getTableIndexes(selectedItem.name)
  const perf = getPerformanceData(selectedItem.name)

  return (
    <div ref={containerRef} className="flex h-screen bg-white relative select-none font-sans">
      {/* Left sidebar */}
      <div
        className="border-r border-gray-200 flex flex-col bg-white"
        style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
      >


        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search object types"
              className="h-8 pl-8 text-xs bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table list */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm ${
                selectedItem.id === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedItem(item)
                setActiveTab("tableFields")
              }}
            >
              <span className={`flex-shrink-0 ${getItemTextColor(item.name)}`}>
                {item.icon}
              </span>
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resizer handle */}
      <div
        className={`absolute h-full w-1 bg-transparent hover:bg-blue-200 cursor-col-resize z-10 ${
          isResizing ? "bg-blue-200" : ""
        }`}
        style={{ left: `${sidebarWidth}px` }}
        onMouseDown={startResizing}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-400">
          <GripVertical size={14} />
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Combined header: name + tabs + actions */}
        <div className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`flex-shrink-0 ${getItemTextColor(selectedItem.name)}`}>
                    {selectedItem.icon}
                  </span>
                  <h1 className="text-base font-semibold text-gray-900 font-sans">{selectedItem.name}</h1>
                </div>
                <TabsList className="bg-transparent rounded-none h-auto p-0 justify-center gap-0 border-0">
                  <TabsTrigger
                    value="tableFields"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 px-4 py-2.5 text-sm font-sans"
                  >
                    Fields
                  </TabsTrigger>
                  <TabsTrigger
                    value="relationships"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 px-4 py-2.5 text-sm font-sans"
                  >
                    Relationships
                  </TabsTrigger>
                  <TabsTrigger
                    value="indexes"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 px-4 py-2.5 text-sm font-sans"
                  >
                    Indexes
                  </TabsTrigger>
                  <TabsTrigger
                    value="data"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 px-4 py-2.5 text-sm font-sans"
                  >
                    Data
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-4 gap-1" onClick={() => tableActions?.triggerAdd()}>
                    <Plus size={14} />
                    Add new
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8 px-4" onClick={() => tableActions?.triggerImport()}>
                    Import
                  </Button>
                </div>
              </div>

              {/* Table Fields tab - shows schema/field definitions */}
              <TabsContent value="tableFields" className="mt-0">
                <div className="py-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Name</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Type</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Required</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getTableFields(selectedItem.name).map((field, i) => (
                          <TableRow key={i} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-sm text-gray-900 font-sans">{field.name}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-sans ${getFieldTypeBadgeColor(field.type)}`}>
                                {field.type}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-sans ${
                                field.required ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                              }`}>
                                {field.required ? "Yes" : "No"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-1">
                                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors">
                                  <Pencil size={14} />
                                </button>
                                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Data tab - shows the data table */}
              <TabsContent value="data" className="mt-0">
                <div className="py-4 font-sans">{selectedItem.dataTable}</div>
              </TabsContent>

              {/* Relationships tab */}
              <TabsContent value="relationships" className="mt-0">
                <div className="py-4">
                  {getTableRelationships(selectedItem.name).length > 0 ? (
                    <>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Name</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Target</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Cardinality</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Required</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getTableRelationships(selectedItem.name).map((rel, i) => (
                              <TableRow key={i} className="hover:bg-gray-50">
                                <TableCell className="font-medium text-sm text-gray-900 font-sans">{rel.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2 text-sm text-gray-700 font-sans">
                                    <span className="text-blue-600">{relationIconMap[rel.target] || <Link2 size={14} />}</span>
                                    {rel.target}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-sans ${getCardinalityBadgeColor(rel.cardinality)}`}>
                                    {rel.cardinality}
                                  </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-sans ${
                                    rel.required ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {rel.required ? "Yes" : "No"}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center justify-center gap-1">
                                    <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors">
                                      <Pencil size={14} />
                                    </button>
                                    <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Relationship Diagram */}
                      <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 font-sans mb-4">Relationship Diagram</h2>
                        <div className="border border-gray-200 rounded-lg p-8 bg-gray-50/50">
                          <div className="flex flex-col items-center gap-6">
                            {/* Current table node */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-200 rounded-lg shadow-sm">
                              <span className="text-blue-600">{relationIconMap[selectedItem.name] || <Link2 size={14} />}</span>
                              <span className="text-sm font-semibold text-gray-900 font-sans">{selectedItem.name}</span>
                            </div>

                            {/* Connection lines and related nodes */}
                            <div className="flex flex-wrap justify-center gap-8">
                              {getTableRelationships(selectedItem.name).map((rel, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                  <div className="w-px h-6 bg-gray-300" />
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium font-sans ${getCardinalityBadgeColor(rel.cardinality)}`}>
                                    {rel.cardinality}
                                  </span>
                                  <div className="w-px h-6 bg-gray-300" />
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <span className="text-blue-600">{relationIconMap[rel.target] || <Link2 size={14} />}</span>
                                    <span className="text-xs font-medium text-gray-700 font-sans">{rel.target}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center text-gray-500 text-sm font-sans">
                      No relationships configured for this table.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Indexes tab */}
              <TabsContent value="indexes" className="mt-0">
                <div className="py-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Name</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Type</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-sans">Fields</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Unique</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center font-sans">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {indexes.map((idx, i) => (
                          <TableRow key={i} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-sm text-gray-900 font-sans">{idx.name}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getTypeBadgeColor(idx.type)}`}>
                                {idx.type}
                              </span>
                            </TableCell>
                            <TableCell>
                              <code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-mono">
                                {idx.fields}
                              </code>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                                idx.unique ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                              }`}>
                                {idx.unique ? "Yes" : "No"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-1">
                                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors">
                                  <Pencil size={14} />
                                </button>
                                <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Performance Impact section */}
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Performance Impact</h2>
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700 font-sans">Query Performance</span>
                          <span className="text-sm text-gray-500">{perf.query}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: `${perf.query}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{getQueryLabel(perf.query)}</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700 font-sans">Write Performance</span>
                          <span className="text-sm text-gray-500">{perf.write}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: `${perf.write}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{getWriteLabel(perf.write)}</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700 font-sans">Storage Impact</span>
                          <span className="text-sm text-gray-500">{perf.storage}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${perf.storage}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{getStorageLabel(perf.storage)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AlltablesMail() {
  return (
    <TableActionsProvider>
      <AlltablesMailInner />
    </TableActionsProvider>
  )
}
