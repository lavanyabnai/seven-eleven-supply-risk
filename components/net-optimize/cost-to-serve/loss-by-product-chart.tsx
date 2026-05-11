"use client"

// Waterfall chart data - each item represents a step in the waterfall
const waterfallData = [
  {
    name: "Total Loss",
    value: 186200000,
    displayValue: "$186.2M",
    isStart: true,
    color: "#374151",
  },
  {
    name: "Import Faucets (China tariff)",
    value: -68400000,
    displayValue: "-$68.4M",
    isStart: false,
    color: "#06b6d4",
  },
  {
    name: "HVAC Systems (freight + handling)",
    value: -42800000,
    displayValue: "-$42.8M",
    isStart: false,
    color: "#06b6d4",
  },
  {
    name: "Tankless Water Heaters (import)",
    value: -31500000,
    displayValue: "-$31.5M",
    isStart: false,
    color: "#06b6d4",
  },
  {
    name: "Cast Iron Pipe (last-mile)",
    value: -24600000,
    displayValue: "-$24.6M",
    isStart: false,
    color: "#06b6d4",
  },
  {
    name: "Waterworks (municipal LTL)",
    value: -18900000,
    displayValue: "-$18.9M",
    isStart: false,
    color: "#06b6d4",
  },
]



// Custom component to render the waterfall bars
function WaterfallBars() {
  return (
    <div className="relative h-full w-full">
      {/* Waterfall bars */}
      <div className="relative h-full flex items-end justify-around px-4 pb-8">
        {waterfallData.map((item) => {
          const maxValue = Math.max(...waterfallData.map((d) => Math.abs(d.value)))
          const barHeight = (Math.abs(item.value) / maxValue) * 200 // Max height of 200px

          return (
            <div key={item.name} className="flex flex-col items-center relative">
              {/* Value label above bar */}
              <div className="mb-2 text-xs font-medium text-gray-700 text-center">{item.displayValue}</div>

              {/* Bar */}
              <div
                className="relative"
                style={{
                  width: item.isStart ? "60px" : "80px",
                  height: `${barHeight}px`,
                  backgroundColor: item.color,
                  borderRadius: item.isStart ? "4px" : "0px",
                }}
              >
                {/* Value inside bar for larger bars */}
                {barHeight > 40 && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                    {item.displayValue}
                  </div>
                )}
              </div>

              {/* Product name below bar */}
              <div className="mt-2 text-xs text-gray-600 text-center max-w-16">{item.name}</div>
            </div>
          )
        })}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-0 w-16 flex flex-col justify-between py-4 text-xs text-gray-500">
        <div>$200M</div>
        <div>$160M</div>
        <div>$120M</div>
        <div>$80M</div>
        <div>$40M</div>
        <div>$20M</div>
        <div>$0</div>
      </div>
    </div>
  )
}

export default function LossByProductChart() {
  return (
    <div className="h-full w-full">
      <WaterfallBars />
    </div>
  )
}
