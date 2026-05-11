"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// Sample scenario data with detailed risk metrics
const scenarioData = [
  {
    name: "Sc7b_Add barley supplier in FR",
    economic: 5,
    naturalDisaster: 5,
    political: 5,
    epidemic: 5,
  },
  {
    name: "Sc7a_BeerSCRiskProfile",
    economic: 5,
    naturalDisaster: 5,
    political: 5,
    epidemic: 5,
  },
]

const riskCategoryData = {
  labels: scenarioData.map((scenario) => scenario.name),
  datasets: [
    {
      label: "Economic",
      data: scenarioData.map((scenario) => scenario.economic),
      backgroundColor: "#4DD0E1", // Light blue
      barPercentage: 1,
      categoryPercentage: 1,
      barThickness: 30,
    },
    {
      label: "Natural Disaster",
      data: scenarioData.map((scenario) => scenario.naturalDisaster),
      backgroundColor: "#66BB6A", // Green
      barPercentage: 1,
      categoryPercentage: 1,
      barThickness: 30,
    },
    {
      label: "Political",
      data: scenarioData.map((scenario) => scenario.political),
      backgroundColor: "#FFD54F", // Yellow
      barPercentage: 1,
      categoryPercentage: 1,
      barThickness: 30,
    },
    {
      label: "Epidemic",
      data: scenarioData.map((scenario) => scenario.epidemic),
      backgroundColor: "#FF7043", // Red/orange
      barPercentage: 1,
      categoryPercentage: 1,
      barThickness: 30,
      borderRadius: 6,
    },
  ],
}

interface ScenarioDetailModalProps {
  scenario: {
    name: string
    economic: number
    naturalDisaster: number
    political: number
    epidemic: number
  } | null
  onClose: () => void
}

function ScenarioDetailModal({ scenario, onClose }: ScenarioDetailModalProps) {
  if (!scenario) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Scenario Risk Breakdown</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{scenario.name}</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#4DD0E1] mr-2"></div>
              <span className="text-sm text-gray-600 w-32">Economic</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-[#4DD0E1] h-2 rounded-full"
                  style={{ width: `${(scenario.economic / 20) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{scenario.economic}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#66BB6A] mr-2"></div>
              <span className="text-sm text-gray-600 w-32">Natural Disaster</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-[#66BB6A] h-2 rounded-full"
                  style={{ width: `${(scenario.naturalDisaster / 20) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{scenario.naturalDisaster}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#FFD54F] mr-2"></div>
              <span className="text-sm text-gray-600 w-32">Political</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-[#FFD54F] h-2 rounded-full"
                  style={{ width: `${(scenario.political / 20) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{scenario.political}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#FF7043] mr-2"></div>
              <span className="text-sm text-gray-600 w-32">Epidemic</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-[#FF7043] h-2 rounded-full"
                  style={{ width: `${(scenario.epidemic / 20) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{scenario.epidemic}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 mr-2"></div>
              <span className="text-sm text-gray-600 w-32">Total Risk</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-gray-400 h-2 rounded-full"
                  style={{
                    width: `${
                      ((scenario.economic + scenario.naturalDisaster + scenario.political + scenario.epidemic) / 80) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">
                {scenario.economic + scenario.naturalDisaster + scenario.political + scenario.epidemic}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RiskCategoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<(typeof scenarioData)[0] | null>(null)

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
          data: riskCategoryData,
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
                max: 20,
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
              y: {
                stacked: true,
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#333",
                bodyColor: "#333",
                borderColor: "#ddd",
                borderWidth: 1,
                padding: 10,
              },
            },
            onClick: (_event, elements) => {
              if (elements && elements.length > 0) {
                const index = elements[0].index
                setSelectedScenario(scenarioData[index])
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
    <div className="h-32">
      <canvas ref={chartRef}></canvas>
      {selectedScenario && (
        <ScenarioDetailModal scenario={selectedScenario} onClose={() => setSelectedScenario(null)} />
      )}
    </div>
  )
}
