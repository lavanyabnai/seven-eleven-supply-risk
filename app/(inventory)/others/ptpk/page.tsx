"use client"

import { ScatterChart, XAxis, YAxis, ZAxis, Scatter, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Ferguson DC-to-Branch route cost analysis
// Cost per ton-mile ($/mi/ton) vs distance for major distribution lanes
// Based on Ferguson's 9 regional DCs, 5 MDCs serving 1,517 branches
const routeData = [
  // High impact routes (critical lanes with cost inefficiency)
  { x: 45, y: 3.8, z: 280, impact: "high", name: "Front Royal VA → DC Metro branches" },
  { x: 85, y: 2.9, z: 320, impact: "high", name: "Aurora CO → Denver Metro branches" },
  { x: 310, y: 1.4, z: 240, impact: "high", name: "McGregor TX → San Antonio branches" },
  { x: 480, y: 1.1, z: 180, impact: "high", name: "Fort Payne AL → Florida branches" },
  { x: 560, y: 0.95, z: 160, impact: "high", name: "Stockton CA → Phoenix branches" },
  { x: 720, y: 0.82, z: 140, impact: "high", name: "Richland WA → Boise branches" },

  // Regular routes — plumbing/HVAC/waterworks distribution lanes
  { x: 30, y: 4.5, z: 90, impact: "normal", name: "Nashville MDC → Local branches" },
  { x: 55, y: 3.2, z: 110, impact: "normal", name: "Houston MDC → Houston Metro" },
  { x: 75, y: 2.6, z: 150, impact: "normal", name: "Dallas MDC → DFW branches" },
  { x: 95, y: 2.2, z: 130, impact: "normal", name: "Phoenix MDC → Phoenix Metro" },
  { x: 120, y: 1.9, z: 100, impact: "normal", name: "Frostproof FL → Orlando branches" },
  { x: 150, y: 1.7, z: 120, impact: "normal", name: "Front Royal VA → Richmond branches" },
  { x: 185, y: 1.5, z: 95, impact: "normal", name: "Fort Payne AL → Atlanta branches" },
  { x: 220, y: 1.35, z: 85, impact: "normal", name: "Aurora CO → Colorado Springs branches" },
  { x: 270, y: 1.2, z: 110, impact: "normal", name: "McGregor TX → Austin branches" },
  { x: 340, y: 1.05, z: 90, impact: "normal", name: "Stockton CA → Bay Area branches" },
  { x: 380, y: 0.98, z: 75, impact: "normal", name: "Richland WA → Seattle branches" },
  { x: 430, y: 0.92, z: 70, impact: "normal", name: "Front Royal VA → Charlotte branches" },
  { x: 510, y: 0.88, z: 60, impact: "normal", name: "Fort Payne AL → New Orleans branches" },
  { x: 580, y: 0.78, z: 55, impact: "normal", name: "McGregor TX → El Paso branches" },
  { x: 650, y: 0.72, z: 50, impact: "normal", name: "Frostproof FL → Miami branches" },
  { x: 750, y: 0.68, z: 45, impact: "normal", name: "Stockton CA → Portland branches" },

  // Small volume / specialty routes (waterworks, PVF)
  { x: 90, y: 5.2, z: 30, impact: "normal", name: "Import Center → Regional DC (specialty PVF)" },
  { x: 250, y: 1.8, z: 35, impact: "normal", name: "Waterworks hub → Municipal project site" },
  { x: 360, y: 2.1, z: 25, impact: "normal", name: "HVAC equipment → Rural branch (LTL)" },
]

const highImpactRoutes = routeData.filter((route) => route.impact === "high")
const normalRoutes = routeData.filter((route) => route.impact === "normal")

const HighImpactDot = (props: any) => {
  const { cx, cy, payload } = props
  if (!payload || !cx || !cy) return null
  const radius = Math.max(8, Math.min(25, Math.sqrt(payload.z) * 1.2))
  return <circle cx={cx} cy={cy} r={radius} fill="#dc2626" fillOpacity={0.7} stroke="#dc2626" strokeWidth={2} />
}

const NormalDot = (props: any) => {
  const { cx, cy, payload } = props
  if (!payload || !cx || !cy) return null
  const radius = Math.max(6, Math.min(20, Math.sqrt(payload.z) * 1.0))
  return <circle cx={cx} cy={cy} r={radius} fill="#9ca3af" fillOpacity={0.6} stroke="#6b7280" strokeWidth={1} />
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-sm">Distance: {data.x} mi</p>
        <p className="text-sm">Cost: ${data.y.toFixed(2)}/mi/ton</p>
        <p className="text-sm">Volume Index: {data.z}</p>
        <p className="text-sm">Impact: {data.impact === "high" ? "Critical lane — optimization priority" : "Standard distribution lane"}</p>
      </div>
    )
  }
  return null
}

export default function FergusonRouteCostAnalysis() {
  return (
    <div className="w-full p-6 space-y-6">

      {/* Header */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">Ferguson Route Cost Analysis: $/Mile/Ton vs Distance</h1>
        <p className="text-sm text-gray-500 mt-1">
          DC-to-branch transportation cost efficiency across Ferguson&apos;s distribution network
        </p>
      </div>

      {/* Main Chart Card */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900">Cost per Ton-Mile Analysis</p>
          <p className="text-xs text-gray-400 mb-4">Transportation cost efficiency by route distance and freight volume (9 DCs + 5 MDCs → 1,517 branches)</p>

          <div className="relative">
            <ChartContainer
              className="h-[500px] w-full"
              config={{
                normal: { label: "Standard Lanes", color: "#9ca3af" },
                high: { label: "Critical Lanes", color: "#dc2626" },
              }}
            >
              <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[0, 800]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{ value: "Distance (Miles)", position: "insideBottom", offset: -5, style: { fontSize: 13, fill: "#374151", fontWeight: 600 } }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[0, 6]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{ value: "Cost ($/mi/ton)", angle: -90, position: "insideLeft", style: { fontSize: 13, fill: "#374151", fontWeight: 600 } }}
                />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Standard Lanes" data={normalRoutes} fill="#9ca3af" shape={<NormalDot />} />
                <Scatter name="Critical Lanes" data={highImpactRoutes} fill="#dc2626" shape={<HighImpactDot />} />
              </ScatterChart>
            </ChartContainer>

            {/* Trend line equation */}
            <div className="absolute bottom-16 right-8 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-gray-200 rounded-lg shadow-sm">
              <p className="text-sm font-mono text-gray-700">y = 12.4x<sup>-0.41</sup></p>
            </div>

            {/* Custom legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-400 opacity-60"></div>
                  <span className="text-xs text-gray-600">Bubble size = freight volume index</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600 opacity-80"></div>
                  <span className="text-xs text-gray-600">Critical lanes (optimization priority)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400 opacity-60"></div>
                  <span className="text-xs text-gray-600">Standard distribution lanes</span>
                </div>
              </div>
            </div>

            {/* Axis labels */}
            <div className="absolute bottom-2 left-20 text-sm font-semibold text-red-600">Last Mile / MDC</div>
            <div className="absolute bottom-2 right-20 text-sm font-semibold text-red-600">Long Haul / Regional DC</div>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <h2 className="text-lg font-semibold text-gray-800">Critical Lane Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-sm font-bold text-red-600 mb-3">High-Priority Optimization Lanes</p>
            <div className="space-y-2">
              {highImpactRoutes.map((route, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{route.name}</span>
                  <span className="text-gray-600">
                    {route.x}mi — ${route.y}/mi/ton
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 space-y-4">
            <div>
              <div className="text-lg font-bold text-red-600">{highImpactRoutes.length}</div>
              <div className="text-sm text-gray-600">Critical Lanes Flagged</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">$0.68–$5.20</div>
              <div className="text-sm text-gray-600">Cost Range ($/mi/ton)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">750 mi</div>
              <div className="text-sm text-gray-600">Max DC-to-Branch Distance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-4">Key Insights</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-600 mb-2 text-sm">Cost Efficiency Patterns</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Short-haul MDC routes (30-100mi) cost $2.20-$4.50/mi/ton</li>
                <li>• Long-haul DC lanes (500mi+) achieve $0.68-$0.95/mi/ton</li>
                <li>• Plumbing fixtures (heavy/dense) drive short-haul cost spikes</li>
                <li>• LTL shipments to rural branches show highest per-unit cost</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2 text-sm">Network Optimization</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• {highImpactRoutes.length} critical lanes identified for consolidation</li>
                <li>• MDC expansion (Aurora CO, Nashville) reduces average distance</li>
                <li>• Volume-weighted cost follows power law: y = 12.4x^(-0.41)</li>
                <li>• 5,900 fleet vehicles most cost-effective under 150mi radius</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
