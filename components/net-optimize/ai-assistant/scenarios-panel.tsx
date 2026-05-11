"use client"

import { ChevronDown, ChevronUp, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScenariosPanelProps {
  messageId: string
  isExpanded: boolean
  onToggle: () => void
}

export default function ScenariosPanel({ isExpanded, onToggle }: ScenariosPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Layers className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-800">Scenarios</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scenario Name</label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">New Conversation - Scenario (1)</div>
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">generated_item_0</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Name</label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">Facilities</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <div className="text-sm bg-gray-50 p-2 rounded font-mono">
                  <span className="text-red-600">cost</span> = <span className="text-red-600">cost</span> *{" "}
                  <span className="text-red-600">1.05</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <div className="text-sm bg-gray-50 p-2 rounded font-mono">
                  <span className="text-red-600">region</span> = <span className="text-green-600">'north america'</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Scenario will increase facility costs by 5% for North American locations
              </div>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                Create Scenario
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
