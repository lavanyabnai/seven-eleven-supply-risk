"use client"

interface ScenarioSelectorProps {
  scenarios: { id: string; name: string }[]
  selectedScenario: string
  onSelectScenario: (id: string) => void
}

export default function ScenarioSelector({ scenarios, selectedScenario, onSelectScenario }: ScenarioSelectorProps) {
  return (
    <div className="space-y-1">
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className={`flex items-center p-2 rounded-md cursor-pointer ${
            selectedScenario === scenario.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
          }`}
          onClick={() => onSelectScenario(scenario.id)}
        >
          <div
            className={`w-3 h-3 rounded-full mr-2 ${selectedScenario === scenario.id ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>
          <span className="text-sm">{scenario.name}</span>
        </div>
      ))}
    </div>
  )
}
