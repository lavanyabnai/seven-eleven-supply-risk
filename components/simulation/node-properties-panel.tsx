"use client"

import { useState, useEffect } from "react"
import { X, Code, Settings } from "lucide-react"
import type { Node } from "reactflow"

interface NodePropertiesPanelProps {
  node: Node
  onClose: () => void
  onUpdate: (nodeId: string, properties: any, methods: any) => void
}

export function NodePropertiesPanel({ node, onClose, onUpdate }: NodePropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "methods">("properties")
  const [properties, setProperties] = useState(node.data.properties || {})
  const [methods, setMethods] = useState(node.data.methods || {})
  const [label, setLabel] = useState(node.data.label || "")

  useEffect(() => {
    setProperties(node.data.properties || {})
    setMethods(node.data.methods || {})
    setLabel(node.data.label || "")
  }, [node])

  const handlePropertyChange = (key: string, value: any) => {
    const newProperties = { ...properties, [key]: value }
    setProperties(newProperties)
  }

  const handleMethodChange = (key: string, value: string) => {
    const newMethods = { ...methods, [key]: value }
    setMethods(newMethods)
  }

  const handleSave = () => {
    onUpdate(node.id, properties, methods)
    onClose()
  }

  const addProperty = () => {
    const key = prompt("Property name:")
    if (key) {
      handlePropertyChange(key, "")
    }
  }

  const addMethod = () => {
    const key = prompt("Method name:")
    if (key) {
      handleMethodChange(key, "// Add your code here")
    }
  }

  return (
    <div className="w-80 bg-white border-l shadow-lg flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Node Properties</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 border-b">
        <label className="block text-sm font-medium text-gray-700 mb-2">Node Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("properties")}
          className={`flex-1 px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === "properties"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Settings size={16} />
          Properties
        </button>
        <button
          onClick={() => setActiveTab("methods")}
          className={`flex-1 px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === "methods"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Code size={16} />
          Methods
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "properties" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700">Properties</h4>
              <button
                onClick={addProperty}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {Object.entries(properties).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  type={typeof value === "number" ? "number" : "text"}
                  value={String(value)}
                  onChange={(e) => {
                    const newValue = typeof value === "number" ? Number(e.target.value) : e.target.value
                    handlePropertyChange(key, newValue)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "methods" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700">Methods</h4>
              <button
                onClick={addMethod}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {Object.entries(methods).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <textarea
                  value={String(value)}
                  onChange={(e) => handleMethodChange(key, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="// Add your JavaScript code here"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium"
        >
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
