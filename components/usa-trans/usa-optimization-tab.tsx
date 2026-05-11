import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, TrendingUp, Fuel, Route, Users, DollarSign } from "lucide-react"
import { USA_TRANSPORT_PARAMS } from "@/lib/transport-params"

interface USAOptimizationTabProps {
  calculations: any
  annualTrips: number
  backhaul: number
}

export default function USAOptimizationTab({ calculations, annualTrips, backhaul }: USAOptimizationTabProps) {
  // Calculate optimization scenarios
  const scenarios = [
    {
      title: "Improve Backhaul Rate to 85%",
      description: "Increase loaded return trips from current rate",
      currentValue: backhaul,
      targetValue: 85,
      icon: Route,
      color: "blue",
      savings: ((85 - backhaul) / 100) * calculations.emptyMileCost,
      implementation: "Digital load boards, freight matching platforms",
      timeframe: "2-3 months",
      difficulty: "Medium",
    },
    {
      title: "Upgrade to High-Efficiency Truck",
      description: "Improve fuel economy by 15%",
      currentValue: calculations.truck.fuelEconomy,
      targetValue: calculations.truck.fuelEconomy * 1.15,
      icon: Fuel,
      color: "green",
      savings: calculations.fuelCost * annualTrips * 0.15,
      implementation: "New truck purchase or engine upgrade",
      timeframe: "6-12 months",
      difficulty: "High",
    },
    {
      title: "Optimize Driver Compensation",
      description: "Balance cost with retention",
      currentValue: calculations.driverSalary,
      targetValue: USA_TRANSPORT_PARAMS.costs.driverSalaryAverage,
      icon: Users,
      color: "purple",
      savings: Math.abs(calculations.driverSalary - USA_TRANSPORT_PARAMS.costs.driverSalaryAverage),
      implementation: "Restructure pay package, benefits optimization",
      timeframe: "1-2 months",
      difficulty: "Low",
    },
    {
      title: "Reduce Empty Miles by 50%",
      description: "Strategic route planning and load consolidation",
      currentValue: calculations.emptyMiles,
      targetValue: calculations.emptyMiles * 0.5,
      icon: TrendingUp,
      color: "orange",
      savings: calculations.emptyMileCost * 0.5,
      implementation: "Route optimization software, hub consolidation",
      timeframe: "3-6 months",
      difficulty: "Medium",
    },
  ]

  const totalOptimizationSavings = scenarios.reduce((sum, scenario) => sum + scenario.savings, 0)
  const currentROI = (calculations.totalAnnualCost - totalOptimizationSavings) / calculations.totalAnnualCost

  return (
    <div className="space-y-6">
      {/* Optimization Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Optimization Potential Analysis
          </CardTitle>
          <CardDescription>Comprehensive cost reduction opportunities based on industry best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current Annual Cost</p>
              <p className="text-3xl font-bold text-gray-900">${calculations.totalAnnualCost.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Potential Savings</p>
              <p className="text-3xl font-bold text-green-600">${totalOptimizationSavings.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Optimized Cost</p>
              <p className="text-3xl font-bold text-blue-600">
                ${(calculations.totalAnnualCost - totalOptimizationSavings).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Cost Reduction Potential</span>
              <span className="text-sm text-gray-600">
                {((totalOptimizationSavings / calculations.totalAnnualCost) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(totalOptimizationSavings / calculations.totalAnnualCost) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Optimization Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => {
          const IconComponent = scenario.icon
          const improvementPercentage =
            scenario.currentValue < scenario.targetValue
              ? ((scenario.targetValue - scenario.currentValue) / scenario.currentValue) * 100
              : ((scenario.currentValue - scenario.targetValue) / scenario.currentValue) * 100

          return (
            <Card key={index} className={`border-l-4 border-l-${scenario.color}-500`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconComponent className="h-5 w-5" />
                  {scenario.title}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current</p>
                    <p className="text-xl font-semibold">
                      {typeof scenario.currentValue === "number" && scenario.currentValue > 1000
                        ? `$${scenario.currentValue.toLocaleString()}`
                        : scenario.currentValue.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target</p>
                    <p className="text-xl font-semibold text-green-600">
                      {typeof scenario.targetValue === "number" && scenario.targetValue > 1000
                        ? `$${scenario.targetValue.toLocaleString()}`
                        : scenario.targetValue.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Annual Savings</p>
                  <p className="text-2xl font-bold text-green-600">${scenario.savings.toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Implementation</span>
                    <Badge
                      variant={
                        scenario.difficulty === "Low"
                          ? "default"
                          : scenario.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm">{scenario.implementation}</p>
                  <p className="text-xs text-gray-500">Timeframe: {scenario.timeframe}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Implementation Roadmap</CardTitle>
          <CardDescription>Prioritized action plan for maximum ROI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Phase 1: Quick Wins */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Phase 1</span>
                Quick Wins (0-3 months)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Driver Compensation Optimization</h4>
                  <p className="text-sm text-gray-600 mt-1">Restructure pay to industry average, improve retention</p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    Savings: $
                    {Math.abs(
                      calculations.driverSalary - USA_TRANSPORT_PARAMS.costs.driverSalaryAverage,
                    ).toLocaleString()}
                    /year
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Digital Load Matching</h4>
                  <p className="text-sm text-gray-600 mt-1">Implement freight matching platforms for backhaul</p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    Savings: ${(((85 - backhaul) / 100) * calculations.emptyMileCost).toLocaleString()}/year
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 2: Medium-term Improvements */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Phase 2</span>
                Medium-term Improvements (3-6 months)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Route Optimization Software</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Implement AI-powered route planning and load consolidation
                  </p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    Savings: ${(calculations.emptyMileCost * 0.5).toLocaleString()}/year
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Fuel Efficiency Program</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Driver training, maintenance optimization, route efficiency
                  </p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    Savings: ${(calculations.fuelCost * annualTrips * 0.1).toLocaleString()}/year
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 3: Long-term Investments */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Phase 3</span>
                Long-term Investments (6-12 months)
              </h3>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Fleet Modernization</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Upgrade to high-efficiency trucks, consider electric vehicles for short routes
                </p>
                <p className="text-sm font-semibold text-green-600 mt-2">
                  Savings: ${(calculations.fuelCost * annualTrips * 0.15).toLocaleString()}/year
                </p>
                <p className="text-xs text-gray-500 mt-1">ROI: 2-3 years depending on financing terms</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Generate Implementation Plan
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <DollarSign className="h-4 w-4 mr-2" />
              Export ROI Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Industry Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Performance Benchmarks</CardTitle>
          <CardDescription>Compare your metrics against top-performing fleets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Your Cost/Mile</p>
              <p className="text-xl font-semibold">${calculations.costPerMile.toFixed(2)}</p>
              <p className="text-xs text-gray-500">vs $2.26 industry avg</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Your Backhaul Rate</p>
              <p className="text-xl font-semibold">{backhaul}%</p>
              <p className="text-xs text-gray-500">vs 79.3% industry avg</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Your Fuel Economy</p>
              <p className="text-xl font-semibold">{calculations.truck.fuelEconomy} MPG</p>
              <p className="text-xs text-gray-500">vs 6.8 MPG industry avg</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Operating Margin</p>
              <p className="text-xl font-semibold">{((1 - calculations.costEfficiencyRatio) * 100).toFixed(1)}%</p>
              <p className="text-xs text-gray-500">vs 6% industry avg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
