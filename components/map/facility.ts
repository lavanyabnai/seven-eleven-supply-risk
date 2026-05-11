export interface Facility {
  id: string
  name: string
  type: string
  status: string
  lat: number
  lng: number
  country: string
  address: string
  capacity: string
  efficiency: number
  // Extended fields
  riskScore?: number
  revenue?: string
  leadTime?: string
  onTimeDelivery?: number
  inventory?: number
  connections?: number
  lastIncident?: string
  contactEmail?: string
  contactPhone?: string
}
