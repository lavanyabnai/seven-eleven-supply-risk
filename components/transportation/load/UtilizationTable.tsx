"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UtilizationTable() {
  // Data structure matching the image
  const data = [
    {
      values: [
        "83%",
        "86%",
        "83%",
        "84%",
        "83%",
        "84%",
        "81%",
        "84%",
        "79%",
        "82%",
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
    if (numericValue < 80) return "bg-red-600";
    if (numericValue < 82) return "bg-red-100";
    if (numericValue < 83) return "bg-red-200";
    if (numericValue < 84) return "bg-green-300";
    if (numericValue < 85) return "bg-green-400";
    if (numericValue < 87) return "bg-green-500";


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
        </div>
  );
}
