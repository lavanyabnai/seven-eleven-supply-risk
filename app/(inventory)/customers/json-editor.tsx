"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Trash } from "lucide-react"

interface JsonEditorProps {
  value: Record<string, any>
  onChange: (value: Record<string, any>) => void
  label?: string
}

export function JsonEditor({ value, onChange, label = "JSON Data" }: JsonEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedValue, setEditedValue] = useState<Record<string, any>>(value || {})

  const handleSave = () => {
    onChange(editedValue)
    setIsOpen(false)
  }

  const handleAddField = () => {
    setEditedValue({
      ...editedValue,
      "": "",
    })
  }

  const handleRemoveField = (key: string) => {
    const newValue = { ...editedValue }
    delete newValue[key]
    setEditedValue(newValue)
  }

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return

    const newValue = { ...editedValue }
    const val = newValue[oldKey]
    delete newValue[oldKey]
    newValue[newKey] = val
    setEditedValue(newValue)
  }

  const handleValueChange = (key: string, newValue: string) => {
    setEditedValue({
      ...editedValue,
      [key]: newValue,
    })
  }

  // Format the JSON for display
  const displayValue = value ? (Object.keys(value).length > 0 ? `${Object.keys(value).length} fields` : "Empty") : "N/A"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-full justify-start">
          <Edit className="h-3.5 w-3.5 mr-1" />
          {displayValue}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
          <DialogDescription>Make changes to the JSON data. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
          {Object.keys(editedValue || {}).map((key) => (
            <div key={key} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <Input value={key} onChange={(e) => handleKeyChange(key, e.target.value)} placeholder="Key" />
              <Input
                value={typeof editedValue[key] === "object" ? JSON.stringify(editedValue[key]) : editedValue[key]}
                onChange={(e) => handleValueChange(key, e.target.value)}
                placeholder="Value"
              />
              <Button variant="ghost" size="icon" onClick={() => handleRemoveField(key)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={handleAddField} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
