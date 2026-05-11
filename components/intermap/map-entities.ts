export type EntityType = "customer" | "distribution" | "factory" | "supplier"

export interface MapEntity {
  connectedTo: number[]
  id: number
  name: string
  type: EntityType
  locationId: number
  inclusionType?: "Include" | "Exclude" | "Consider"
  additionalParams?: Record<string, unknown>
  icon?: string
  createdAt?: string
  updatedAt?: string
  parentId?: number
  // Location data
  locationName: string
  lat: number
  lng: number
  country: string
  city: string
  address: string
  phone?: string
  email?: string
  website?: string
  // Facility-specific fields (optional for non-facility entities)
  capacity?: number
  capacityUnit?: string
  facilityType?: string
}

export interface ConnectionLine {
  from: MapEntity
  to: MapEntity
  type: "supply" | "distribution" | "customer"
  color: string
  weight: number
}

export interface CreateEntityData {
  name: string
  type: EntityType
  locationId: number
  inclusionType: "Include" | "Exclude" | "Consider"
  additionalParams?: Record<string, unknown>
  icon?: string
}

export interface MapClickEvent {
  lat: number
  lng: number
}
