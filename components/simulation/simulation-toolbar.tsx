"use client"

import { Play, Pause, Square, BarChart3, Settings, Save, Upload, Download } from "lucide-react"

export function SimulationToolbar() {
  return (
    <div className="bg-white border-b p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="font-semibold text-gray-700">Ferguson DC Simulation</div>
        <div className="flex items-center gap-1 bg-blue-100 rounded px-3 py-1">
          <span className="text-sm font-medium text-blue-800">Newport News DC - Inbound Receiving</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 text-sm font-medium">
          <Play size={16} />
          <span>Run</span>
        </button>

        <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2 text-sm font-medium">
          <Pause size={16} />
          <span>Pause</span>
        </button>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-sm font-medium">
          <Square size={16} />
          <span>Stop</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
          <BarChart3 size={16} />
          <span>Statistics</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
          <Upload size={16} />
          <span>Import</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
          <Download size={16} />
          <span>Export</span>
        </button>

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
          <Save size={16} />
          <span>Save</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Status:</span> Ready
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Time:</span> 0.00
        </div>
      </div>
    </div>
  )
}
