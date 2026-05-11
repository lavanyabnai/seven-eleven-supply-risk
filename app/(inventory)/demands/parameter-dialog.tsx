"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, BarChart } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ParameterDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ParameterData) => void
  initialData?: ParameterData
}

export interface ParameterData {
  firstOccurrence: Date
  orderInterval: number
  quantity: number
}

export function ParameterDialog({ isOpen, onClose, onSave, initialData }: ParameterDialogProps) {
  const [date, setDate] = useState<Date>(initialData?.firstOccurrence || new Date())
  const [orderInterval, setOrderInterval] = useState<string>(initialData?.orderInterval?.toString() || "5")
  const [quantity, setQuantity] = useState<string>(initialData?.quantity?.toString() || "10")

  const handleSave = () => {
    onSave({
      firstOccurrence: date,
      orderInterval: Number.parseInt(orderInterval),
      quantity: Number.parseInt(quantity),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please edit selected cell(s)</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="first-occurrence">First occurrence</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="first-occurrence"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MM/dd/yyyy h:mm a") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order-interval">Order interval, days</Label>
            <div className="relative">
              <Input
                id="order-interval"
                value={orderInterval}
                onChange={(e) => setOrderInterval(e.target.value)}
                className="pr-10"
              />
              <BarChart className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="relative">
              <Input id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="pr-10" />
              <BarChart className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
