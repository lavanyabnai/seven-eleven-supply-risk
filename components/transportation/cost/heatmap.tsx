"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Heatmap() {
  // Data structure matching the image
  const data = [
    {
      region: "Northeast",
      values: ["$1.2M", "$1.5M", "$2.1M", "$2.7M", "$3.3M", "$3.9M", "$4.5M"],
    },
    {
      region: "Midwest",
      values: ["$800K", "$1.1M", "$1.4M", "$1.7M", "$2M", "$2.3M", "$2.6M"],
    },
    {
      region: "South",
      values: ["$1.5M", "$1.9M", "$2.3M", "$2.7M", "$3.1M", "$3.5M", "$3.9M"],
    },
    {
      region: "West",
      values: ["$2M", "$2.5M", "$3M", "$3.5M", "$4M", "$4.5M", "$5M"],
    },
  ]

  // Function to determine color intensity based on value
  const getColorClass = (value: string) => {
    // Extract numeric value from string (remove $ and M/K)
    let numericValue = Number.parseFloat(value.replace(/[$M]/g, ""))

    // Convert K to millions for consistent comparison
    if (value.includes("K")) {
      numericValue = numericValue / 1000
    }

    // Return appropriate color class based on value range
    if (numericValue < 1.0) return "bg-blue-50"
    if (numericValue < 1.5) return "bg-blue-100"
    if (numericValue < 2.0) return "bg-blue-200"
    if (numericValue < 2.5) return "bg-blue-300"
    if (numericValue < 3.0) return "bg-blue-400"
    if (numericValue < 3.5) return "bg-blue-500"
    if (numericValue < 4.0) return "bg-blue-600"
    if (numericValue < 4.5) return "bg-blue-700"
    return "bg-blue-800"
  }

  // Function to determine text color based on background intensity
  const getTextColorClass = (value: string) => {
    let numericValue = Number.parseFloat(value.replace(/[$M]/g, ""))
    if (value.includes("K")) {
      numericValue = numericValue / 1000
    }

    return numericValue >= 3.0 ? "text-white" : "text-black"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Regional Sales Heatmap</CardTitle>
        <CardDescription>Visualize sales performance across different regions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  <td className="py-2 pr-4 font-medium">{row.region}</td>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`py-2 px-4 text-center font-medium rounded-md ${getColorClass(value)} ${getTextColorClass(value)}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

