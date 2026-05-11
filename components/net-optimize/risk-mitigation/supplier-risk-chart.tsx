"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import SupplierDetailModal from "./supplier-detail-modal"
import SupplierRiskOverviewModal from "./supplier-risk-overview-modal"

Chart.register(...registerables)

// Sample supplier data with detailed risk metrics
const supplierData = [
  {
    name: "SUP_Barley_UK",
    riskScore: 4.5,
    economicResiliency: 5.9,
    naturalDisaster: 3.9,
    political: 3.1,
    epidemic: 6.1,
    labor: 4.2,
    geographicRisk: 4.5,
  },
  {
    name: "SUP_Barley_US",
    riskScore: 2.4,
    economicResiliency: 1.2,
    naturalDisaster: 1.2,
    political: 4.3,
    epidemic: 5.8,
    labor: 2.8,
    geographicRisk: 3.1,
  },
  {
    name: "SUP_Hops_CZ",
    riskScore: 4.1,
    economicResiliency: 7.0,
    naturalDisaster: 2.4,
    political: 3.8,
    epidemic: 6.7,
    labor: 3.5,
    geographicRisk: 4.7,
  },
  {
    name: "SUP_Hops_NZ",
    riskScore: 3.7,
    economicResiliency: 1.6,
    naturalDisaster: 1.2,
    political: 3.1,
    epidemic: 2.5,
    labor: 1.8,
    geographicRisk: 2.0,
  },
  {
    name: "SUP_Hops_UK",
    riskScore: 3.6,
    economicResiliency: 5.9,
    naturalDisaster: 2.5,
    political: 4.1,
    epidemic: 6.1,
    labor: 3.9,
    geographicRisk: 4.5,
  },
  {
    name: "SUP_Hops_US",
    riskScore: 2.7,
    economicResiliency: 1.2,
    naturalDisaster: 1.2,
    political: 4.3,
    epidemic: 5.8,
    labor: 2.7,
    geographicRisk: 3.0,
  },
]

const supplierRiskData = {
  labels: supplierData.map((supplier) => supplier.name),
  datasets: [
    {
      label: "Risk Score",
      data: supplierData.map((supplier) => supplier.riskScore),
      backgroundColor: "#4DD0E1", // Light blue color
      borderColor: "#4DD0E1",
      borderWidth: 0,
      borderRadius: 6,
    },
  ],
}

export default function SupplierRiskChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<(typeof supplierData)[0] | null>(null)
  const [showOverview, setShowOverview] = useState(false)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: supplierRiskData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 5.0,
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#333",
                bodyColor: "#333",
                borderColor: "#ddd",
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                  label: (context) => `Risk Score: ${context.parsed.y}`,
                },
              },
            },
            onClick: (_event, elements) => {
              if (elements && elements.length > 0) {
                const index = elements[0].index
                setSelectedSupplier(supplierData[index])
              } else {
                // If clicked on empty area, show overview
                setShowOverview(true)
              }
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
      {selectedSupplier && (
        <SupplierDetailModal supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
      )}
      {showOverview && <SupplierRiskOverviewModal isOpen={showOverview} onClose={() => setShowOverview(false)} />}
    </div>
  )
}
