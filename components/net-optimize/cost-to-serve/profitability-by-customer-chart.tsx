"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const fergusonBranches = [
  "NYC Metro", "LA Metro", "Houston", "Chicago", "Phoenix", "Philadelphia",
  "DFW", "Atlanta", "Miami", "Denver", "Seattle", "Charlotte",
  "SF Bay Area", "Minneapolis", "Tampa Bay", "Boston", "Indianapolis",
  "Portland", "Las Vegas", "Nashville", "Orlando", "Sacramento",
  "San Diego", "Detroit", "Cincinnati", "Cleveland", "St. Louis",
  "Kansas City", "Columbus", "San Antonio", "Austin", "Jacksonville",
  "Memphis", "Louisville", "Milwaukee", "Raleigh", "Hartford",
  "Salt Lake City", "Richmond", "Birmingham", "New Orleans",
  "Tucson", "Albuquerque", "Omaha", "Boise", "Des Moines",
  "Little Rock", "Spokane", "Charleston", "Savannah",
]

const customerData = {
  labels: fergusonBranches,
  datasets: [
    {
      data: [
        820000, 680000, 540000, 620000, -85000, 410000,
        580000, 490000, -120000, 350000, 280000, 320000,
        450000, 190000, -65000, 380000, 260000,
        175000, -42000, 310000, 420000, 210000,
        195000, 85000, 140000, 120000, 165000,
        155000, 180000, 290000, 340000, -38000,
        95000, 110000, 78000, 245000, 130000,
        160000, 220000, -55000, 88000,
        65000, 72000, 98000, 55000, 68000,
        45000, 42000, 105000, 92000,
      ],
      backgroundColor: (context: any) => {
        const value = context.parsed.y
        return value < 0 ? "#FF7043" : value < 100000 ? "#FFD54F" : "#66BB6A"
      },
      borderWidth: 0,
      borderRadius: 6,
    },
  ],
}

export default function ProfitabilityByCustomerChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: customerData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                  font: {
                    size: 8,
                  },
                },
              },
              y: {
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
                callbacks: {
                  label: (context) => {
                    return `Profit: ${new Intl.NumberFormat("en-US").format(context.parsed.y ?? 0)}`
                  },
                },
              },
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
    <div className="h-48">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
