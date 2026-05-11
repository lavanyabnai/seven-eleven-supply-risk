import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TRANSPORT_PARAMS } from "@/lib/transport-params"

interface AnalyticsTabProps {
  calculations: any
  selectedTruck: string
  annualTrips: number
  utilization: number
  backhaul: number
}

export default function AnalyticsTab({
  calculations,
  selectedTruck,
  annualTrips,
  utilization,
  backhaul,
}: AnalyticsTabProps) {
  const routeComparisonData = Object.entries(TRANSPORT_PARAMS.routes).map(([, route]) => ({
    route: `${route.city} → ${route.port}`,
    distance: route.distance,
    time: route.time,
    cost:
      route.distance * 2 * TRANSPORT_PARAMS.costs.tollRate +
      ((route.distance * 2 * TRANSPORT_PARAMS.trucks[selectedTruck as keyof typeof TRANSPORT_PARAMS.trucks].fuelEconomy) / 100) *
        TRANSPORT_PARAMS.costs.fuelPrice,
  }))

  const efficiencyRadarData = [
    { metric: "Utilization", value: utilization, max: 100 },
    { metric: "Backhaul", value: backhaul, max: 100 },
    { metric: "Load Factor", value: (1000 / calculations.container.vrCapacity) * 100, max: 100 },
    { metric: "Time Efficiency", value: ((calculations.route.time * 2) / calculations.totalTripTime) * 100, max: 100 },
    {
      metric: "Cost Efficiency",
      value: 100 - (calculations.emptyMiles / (calculations.totalDistance * annualTrips)) * 100,
      max: 100,
    },
  ]

  const monthlyTrendData = Array.from({ length: 12 }, (_, i) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]
    const seasonalFactor = i >= 9 ? 1.3 : 0.9 // Q4 peak season
    return {
      month,
      trips: Math.round((annualTrips / 12) * seasonalFactor),
      cost: Math.round((calculations.totalAnnualCost / 12) * seasonalFactor),
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Route Cost Comparison</CardTitle>
            <CardDescription>Cost analysis across all major routes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={routeComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value: any) => `¥${value.toFixed(0)}`} />
                <Bar dataKey="cost" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Analysis</CardTitle>
            <CardDescription>Multi-dimensional performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={efficiencyRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Seasonal Demand Pattern</CardTitle>
            <CardDescription>Monthly trips and costs throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="trips" stroke="#3b82f6" name="Trips" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#f59e0b" name="Cost (¥)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Alert>
              <AlertDescription>
                <strong>Cost Efficiency:</strong> Your cost per unit of ¥{calculations.costPerUnit.toFixed(2)} is
                {calculations.costPerUnit < 10 ? " excellent" : calculations.costPerUnit < 20 ? " good" : " high"}
                for the {calculations.route.city} to {calculations.route.port} route.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertDescription>
                <strong>Utilization:</strong> At {utilization}% fleet utilization, you have
                {utilization < 70 ? " significant room for improvement" : " good operational efficiency"}.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertDescription>
                <strong>Backhaul:</strong> {backhaul}% backhaul rate means {100 - backhaul}% of return trips are empty,
                costing ¥
                {((calculations.emptyMiles / calculations.totalDistance) * calculations.totalAnnualCost).toFixed(0)}{" "}
                annually.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
