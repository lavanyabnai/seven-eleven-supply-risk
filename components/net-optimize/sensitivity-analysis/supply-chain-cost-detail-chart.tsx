"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const costDetailData = {
  labels: Array.from({ length: 50 }, (_, i) => `Scenario ${i + 1}`),
  datasets: [
    {
      label: "Fixed Operating Cost",
      data: Array.from({ length: 50 }, () => 200000000 + Math.random() * 100000000),
      backgroundColor: "#4DD0E1",
      borderWidth: 0,
    },
    {
      label: "Transportation Cost",
      data: Array.from({ length: 50 }, () => 300000000 + Math.random() * 150000000),
      backgroundColor: "#66BB6A",
      borderWidth: 0,
    },
    {
      label: "Sourcing Cost",
      data: Array.from({ length: 50 }, () => 400000000 + Math.random() * 200000000),
      backgroundColor: "#FFD54F",
      borderWidth: 0,
    },
    {
      label: "Processing Cost",
      data: Array.from({ length: 50 }, () => 500000000 + Math.random() * 250000000),
      backgroundColor: "#FF7043",
      borderWidth: 0,
      borderRadius: 6,
    },
  ],
}

export default function SupplyChainCostDetailChart() {
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
          data: costDetailData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                display: false,
              },
              y: {
                stacked: true,
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
                    return `${context.dataset.label}: ${new Intl.NumberFormat("en-US").format(context.parsed.y ?? 0)}`
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
