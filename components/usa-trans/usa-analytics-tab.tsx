import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  ComposedChart,
  Area,
  LabelList,
} from "recharts"
import { USA_TRANSPORT_PARAMS } from "@/lib/transport-params"

interface USAAnalyticsTabProps {
  calculations: any
  selectedTruck: string
  annualTrips: number
  utilization: number
  backhaul: number
}

export default function USAAnalyticsTab({
  calculations,
  selectedTruck,
  annualTrips,
  utilization,
  backhaul,
}: USAAnalyticsTabProps) {
  // Route comparison data
  const routeComparisonData = Object.entries(USA_TRANSPORT_PARAMS.routes).map(([key, route]) => {
    const truck = USA_TRANSPORT_PARAMS.trucks[selectedTruck as keyof typeof USA_TRANSPORT_PARAMS.trucks]
    const fuelCost = ((route.distance * 2) / truck.fuelEconomy) * USA_TRANSPORT_PARAMS.costs.fuelPricePerGallon
    const tollCost = route.distance * 2 * USA_TRANSPORT_PARAMS.costs.tollRate * 0.23
    const maintenanceCost = route.distance * 2 * USA_TRANSPORT_PARAMS.costs.maintenancePerMile

    return {
      route: `${route.city} → ${route.port}`,
      distance: route.distance * 2,
      time: route.time * 2,
      fuelCost: fuelCost,
      tollCost: tollCost,
      maintenanceCost: maintenanceCost,
      totalCost: fuelCost + tollCost + maintenanceCost,
    }
  })

  // Efficiency radar data
  const efficiencyRadarData = [
    { metric: "Fleet Utilization", value: utilization, max: 100 },
    { metric: "Backhaul Rate", value: backhaul, max: 100 },
    {
      metric: "Fuel Efficiency",
      value: calculations.truck.fuelEconomy >= 7 ? 90 : calculations.truck.fuelEconomy >= 6.5 ? 75 : 60,
      max: 100,
    },
    { metric: "Cost Efficiency", value: calculations.costEfficiencyRatio < 1 ? 85 : 60, max: 100 },
    {
      metric: "Load Factor",
      value: Math.min(
        ((calculations.cargo.weight * calculations.cargoQuantity) / calculations.truck.capacity) * 100,
        100,
      ),
      max: 100,
    },
  ]

  // Seasonal trend data (Q4 peak season effect)
  const seasonalTrendData = Array.from({ length: 12 }, (_, i) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]
    const seasonalFactor = i >= 9 ? 1.4 : i >= 6 ? 1.1 : i >= 3 ? 0.9 : 0.8 // Q4 peak, summer moderate, spring low, winter lowest
    const demandFactor = i >= 9 ? 1.2 : 1.0 // Higher rates in Q4

    return {
      month,
      trips: Math.round((annualTrips / 12) * seasonalFactor),
      cost: Math.round(((calculations.totalCostPerTrip * annualTrips) / 12) * seasonalFactor),
      rate: Math.round(calculations.totalCostPerTrip * demandFactor),
      demand: Math.round(seasonalFactor * 100),
    }
  })

  // Fuel price regional comparison
  const fuelPriceData = [
    { region: "Gulf Coast", price: USA_TRANSPORT_PARAMS.costs.fuelPriceGulfCoast * 3.78541, savings: 0 },
    { region: "Midwest", price: USA_TRANSPORT_PARAMS.costs.fuelPriceMidwest * 3.78541, savings: 0 },
    { region: "National Avg", price: USA_TRANSPORT_PARAMS.costs.fuelPricePerGallon, savings: 0 },
    { region: "California", price: USA_TRANSPORT_PARAMS.costs.fuelPriceCalifornia * 3.78541, savings: 0 },
  ].map((item) => ({
    ...item,
    savings: (USA_TRANSPORT_PARAMS.costs.fuelPricePerGallon - item.price) * calculations.fuelConsumption * annualTrips,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Route Cost Comparison</CardTitle>
            <CardDescription>Total operational cost analysis across major US routes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                fuelCost: { label: "Fuel", color: "#3b82f6" },
                tollCost: { label: "Tolls", color: "#10b981" },
                maintenanceCost: { label: "Maintenance", color: "#f59e0b" },
              }}
            >
              <BarChart data={routeComparisonData} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
                <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => `$${Number(value).toFixed(0)}`} />
                <Bar dataKey="fuelCost" stackId="a" fill="var(--color-fuelCost)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="tollCost" stackId="a" fill="var(--color-tollCost)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="maintenanceCost" stackId="a" fill="var(--color-maintenanceCost)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="totalCost" position="top" fill="#374151" fontSize={12} fontWeight={600} formatter={(v: number) => `$${v.toFixed(0)}`} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Efficiency Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Efficiency Analysis</CardTitle>
            <CardDescription>Multi-dimensional performance metrics vs industry standards</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                value: { label: "Your Performance", color: "#10b981" },
              }}
            >
              <RadarChart data={efficiencyRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <Radar name="Your Performance" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Seasonal Demand Pattern */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Seasonal Demand & Pricing Pattern</CardTitle>
            <CardDescription>Monthly variations in trips, costs, and market rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                demand: { label: "Demand %", color: "#6366f1" },
                trips: { label: "Trips", color: "#3b82f6" },
                rate: { label: "Rate ($)", color: "#f59e0b" },
              }}
            >
              <ComposedChart data={seasonalTrendData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area yAxisId="left" type="monotone" dataKey="demand" fill="#e0e7ff" stroke="#6366f1" name="Demand %" />
                <Bar yAxisId="left" dataKey="trips" fill="var(--color-trips)" name="Trips" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="trips" position="inside" fill="#fff" fontSize={11} fontWeight={600} />
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#f59e0b" strokeWidth={3} name="Rate ($)" />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Regional Fuel Price Impact */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Regional Fuel Price Impact</CardTitle>
            <CardDescription>Annual fuel cost savings/penalties by operating region</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-80 w-full"
              config={{
                price: { label: "Fuel Price ($/gal)", color: "#3b82f6" },
                savings: { label: "Annual Savings ($)", color: "#10b981" },
              }}
            >
              <BarChart data={fuelPriceData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [
                    name === "price" ? `$${Number(value).toFixed(3)}/gal` : `$${Number(value).toFixed(0)}`,
                    name === "price" ? "Fuel Price" : "Annual Savings",
                  ]}
                />
                <Bar yAxisId="left" dataKey="price" fill="var(--color-price)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="price" position="inside" fill="#fff" fontSize={12} fontWeight={600} formatter={(v: number) => `$${v.toFixed(2)}`} />
                </Bar>
                <Bar yAxisId="right" dataKey="savings" fill="var(--color-savings)" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="savings" position="inside" fill="#fff" fontSize={12} fontWeight={600} formatter={(v: number) => `$${v.toFixed(0)}`} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Alert>
              <AlertDescription>
                <strong>Cost Efficiency:</strong> Your cost per mile of ${calculations.costPerMile.toFixed(2)} is{" "}
                {calculations.costEfficiencyRatio < 1
                  ? `${((1 - calculations.costEfficiencyRatio) * 100).toFixed(0)}% better than`
                  : `${((calculations.costEfficiencyRatio - 1) * 100).toFixed(0)}% above`}
                the industry benchmark of ${calculations.industryBenchmarkCostPerMile}.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Fuel Efficiency:</strong> Your {calculations.truck.fuelEconomy} MPG is rated as{" "}
                <strong>{calculations.fuelEfficiencyRating}</strong>.
                {calculations.fuelEfficiencyRating === "Average" && " Consider driver training or newer equipment."}
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Empty Miles:</strong> At {backhaul}% backhaul rate, you're losing $
                {calculations.emptyMileCost.toLocaleString()}
                annually to empty miles. Industry average is 79.3% backhaul.
              </AlertDescription>
            </Alert>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <AlertDescription>
                <strong>Regional Opportunity:</strong> Operating in the Gulf Coast region could save you $
                {Math.abs(fuelPriceData[0].savings).toLocaleString()} annually in fuel costs compared to national
                average.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Seasonal Strategy:</strong> Q4 demand increases by 40% with 20% higher rates. Plan capacity and
                pricing accordingly for peak season.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
