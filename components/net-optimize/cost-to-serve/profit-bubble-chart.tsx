"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const bubbleData = {
  datasets: [
    {
      label: "Product Profitability",
      data: [
        { x: 2000000, y: 15000000, r: 25 },
        { x: 8000000, y: 12000000, r: 35 },
        { x: 1500000, y: 8000000, r: 15 },
        { x: 4000000, y: 6000000, r: 20 },
        { x: 6000000, y: 18000000, r: 30 },
        { x: 3000000, y: 4000000, r: 18 },
        { x: 7000000, y: 10000000, r: 28 },
      ],
      backgroundColor: "rgba(77, 208, 225, 0.6)",
      borderColor: "#4DD0E1",
      borderWidth: 2,
    },
  ],
}

export default function ProfitBubbleChart() {
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
          type: "bubble",
          data: bubbleData,
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
                title: {
                  display: true,
                  text: "perunitcost",
                },
                ticks: {
                  callback: (value) =>
                    new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(Number(value)),
                },
              },
              y: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Volume",
                },
                ticks: {
                  callback: (value) =>
                    new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(Number(value)),
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
                    const point = context.parsed
                    return [
                      `Cost: ${new Intl.NumberFormat("en-US").format(point.x ?? 0)}`,
                      `Volume: ${new Intl.NumberFormat("en-US").format(point.y ?? 0)}`,
                      `Size: ${
                        typeof context.raw === "object" && context.raw !== null && "r" in context.raw
                          ? (context.raw as { r: number }).r
                          : "N/A"
                      }`,
                    ]
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
    <div className="h-[370px]">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
