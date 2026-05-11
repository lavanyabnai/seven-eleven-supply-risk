"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TransportationCost() {
  // Data structure matching the image
  const data = [
    {
      values: [
        "$1.79",
        "$1.79",
        "$1.75",
        "$1.79",
        "$1.83",
        "$1.73",
        "$1.70",
        "$1.67",
        "$1.75",
        "$1.72",
      ],
    },
    {
      values: [
        "$0.27",
        "$0.23",
        "$0.24",
        "$0.30",
        "$0.28",
        "$0.26",
        "$0.24",
        "$0.21",
        "$0.25",
        "$0.21",
      ],
    },
    {
      values: [
        "$0.10",
        "$0.11",
        "$0.09",
        "$0.12",
        "$0.12",
        "$0.11",
        "$0.11",
        "$0.12",
        "$0.10",
        "$0.09",
      ],
    },
  ];

  // Function to determine color intensity based on value
  const getColorClass = (value: string) => {
    // Extract numeric value from string (remove $ and M/K)
    let numericValue = Number.parseFloat(value.replace(/[$M]/g, ""));

    // Convert K to millions for consistent comparison
    if (value.includes("K")) {
      numericValue = numericValue / 1000;
    }

    // Return appropriate color class based on value range
    if (numericValue < 0.10) return "bg-green-200";
    if (numericValue < 0.11) return "bg-green-100";
    if (numericValue < 0.12) return "bg-red-200";
    if (numericValue < 0.13) return "bg-red-500";
    if (numericValue < 0.22) return "bg-green-400";
    if (numericValue < 0.24) return "bg-green-200";
    if (numericValue < 0.25) return "bg-green-300";
    if (numericValue < 0.26) return "bg-green-100";
    if (numericValue < 0.27) return "bg-red-100";
    if (numericValue < 0.28) return "bg-red-300";
    if (numericValue < 0.29) return "bg-red-400";
    if (numericValue < 0.31) return "bg-red-600";
    if (numericValue < 1.68) return "bg-green-700";
    if (numericValue < 1.71) return "bg-green-500";
    if (numericValue < 1.73) return "bg-green-200";
    if (numericValue < 1.74 ) return "bg-green-300";
    if (numericValue < 1.76) return "bg-yellow-100";
    if (numericValue < 1.80) return "bg-red-300";
    if (numericValue <1.84 ) return "bg-red-600";
    return "bg-blue-900";
  };

  // Function to determine text color based on background intensity
  const getTextColorClass = (value: string) => {
    let numericValue = Number.parseFloat(value.replace(/[$M]/g, ""));
    if (value.includes("K")) {
      numericValue = numericValue / 1000;
    }

    return numericValue >= 3.0 ? "text-white" : "text-black";
  };

  return (

        <div className="overflow-x-auto">
          <table>
            <tbody>
              {data.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                  <td className="py-2 pr-4 font-medium">{row.values[0]}</td>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`py-2 px-4 text-center font-medium rounded-md ${getColorClass(
                        value
                      )} ${getTextColorClass(value)}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}
