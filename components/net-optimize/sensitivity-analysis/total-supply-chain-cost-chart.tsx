"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const supplyChainData = {
  labels: Array.from({ length: 50 }, (_, i) => `Scenario ${i + 1}`),
  datasets: [
    {
      label: "Total Supply Chain Cost",
      data: Array.from({ length: 50 }, (_, i) => {
        const baseValue = 1500000000
        const variation = Math.sin(i * 0.2) * 300000000 + Math.random() * 200000000
        return baseValue + variation
      }),
      backgroundColor: "#4DD0E1",
      borderColor: "#4DD0E1",
      borderWidth: 0,
      fill: true,
    },
  ],
}

export default function TotalSupplyChainCostChart() {
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
          type: "line",
          data: supplyChainData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 3000000000,
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
                title: {
                  display: false,
                },
              },
              x: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                align: "start",
                labels: {
                  usePointStyle: true,
                  pointStyle: "rect",
                  color: "#4DD0E1",
                },
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
                    return `Total Cost: ${new Intl.NumberFormat("en-US").format(context.parsed.y ?? 0)}`
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
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
