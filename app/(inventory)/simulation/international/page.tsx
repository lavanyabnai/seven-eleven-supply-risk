"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample Gantt chart data
const ganttData = [
  {
    id: 1,
    vessel: "Kohler Faucets (Foshan)",
    route: "Foshan → Long Beach → San Bernardino DC",
    timeline: [
      { start: 13350, end: 13355, type: "service", status: "Loading at Foshan port" },
      { start: 13355, end: 13365, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13365, end: 13368, type: "storm", status: "Typhoon delay - South China Sea" },
      { start: 13368, end: 13385, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13385, end: 13390, type: "service", status: "Port of Long Beach - customs/25% tariff" },
      { start: 13390, end: 13395, type: "sailing", status: "Drayage to San Bernardino DC" },
    ],
  },
  {
    id: 2,
    vessel: "Moen Faucets (Jiangmen)",
    route: "Jiangmen → Long Beach → Sacramento DC",
    timeline: [
      { start: 13352, end: 13357, type: "service", status: "Loading at Jiangmen port" },
      { start: 13357, end: 13370, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13370, end: 13375, type: "storm", status: "Pacific storm delay" },
      { start: 13375, end: 13392, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13392, end: 13398, type: "service", status: "Port of Long Beach - congestion delay" },
      { start: 13398, end: 13405, type: "sailing", status: "Truck to Sacramento DC" },
    ],
  },
  {
    id: 3,
    vessel: "Delta Faucet Components (Zhuhai)",
    route: "Zhuhai → Los Angeles → San Bernardino DC",
    timeline: [
      { start: 13348, end: 13353, type: "service", status: "Loading at Zhuhai FTZ" },
      { start: 13353, end: 13368, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13368, end: 13372, type: "storm", status: "Typhoon Mangkhut zone" },
      { start: 13372, end: 13388, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13388, end: 13393, type: "service", status: "Port of LA - Section 301 inspection" },
      { start: 13393, end: 13398, type: "sailing", status: "Drayage to San Bernardino DC" },
    ],
  },
  {
    id: 4,
    vessel: "TOTO Toilets (Kitakyushu)",
    route: "Kitakyushu → Long Beach → San Bernardino DC",
    timeline: [
      { start: 13351, end: 13356, type: "service", status: "Loading at Kitakyushu port" },
      { start: 13356, end: 13376, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13376, end: 13379, type: "storm", status: "North Pacific storm" },
      { start: 13379, end: 13392, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13392, end: 13396, type: "service", status: "Port of Long Beach - unloading" },
      { start: 13396, end: 13400, type: "sailing", status: "Intermodal to San Bernardino DC" },
    ],
  },
  {
    id: 5,
    vessel: "Navien Tankless WH (Sejong)",
    route: "Busan → Oakland → Sacramento DC",
    timeline: [
      { start: 13349, end: 13354, type: "service", status: "Loading at Busan port" },
      { start: 13354, end: 13374, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13374, end: 13377, type: "storm", status: "Pacific weather delay" },
      { start: 13377, end: 13393, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13393, end: 13398, type: "service", status: "Port of Oakland - customs clearance" },
      { start: 13398, end: 13403, type: "sailing", status: "Truck to Sacramento DC" },
    ],
  },
  {
    id: 6,
    vessel: "Grohe Faucets (Hemer, DE)",
    route: "Hamburg → Norfolk → Newport News DC",
    timeline: [
      { start: 13350, end: 13355, type: "service", status: "Loading at Hamburg port" },
      { start: 13355, end: 13371, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13371, end: 13375, type: "storm", status: "North Atlantic storm" },
      { start: 13375, end: 13389, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13389, end: 13393, type: "service", status: "Port of Norfolk - unloading" },
      { start: 13393, end: 13396, type: "sailing", status: "Truck to Newport News DC" },
    ],
  },
  {
    id: 7,
    vessel: "Viega Fittings (Attendorn, DE)",
    route: "Hamburg → Savannah → Newport News DC",
    timeline: [
      { start: 13352, end: 13357, type: "service", status: "Loading at Hamburg port" },
      { start: 13357, end: 13377, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13377, end: 13380, type: "storm", status: "Atlantic weather delay" },
      { start: 13380, end: 13395, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13395, end: 13400, type: "service", status: "Port of Savannah - unloading" },
      { start: 13400, end: 13408, type: "sailing", status: "Rail to Newport News DC" },
    ],
  },
  {
    id: 8,
    vessel: "Grohe Thailand (Klaeng)",
    route: "Laem Chabang → Long Beach → San Bernardino DC",
    timeline: [
      { start: 13348, end: 13353, type: "service", status: "Loading at Laem Chabang" },
      { start: 13353, end: 13372, type: "sailing", status: "Sailing (normal conditions)" },
      { start: 13372, end: 13376, type: "storm", status: "Monsoon delay - Indian Ocean" },
      { start: 13376, end: 13396, type: "sailing", status: "Sailing via Suez/Panama" },
      { start: 13396, end: 13401, type: "service", status: "Port of Long Beach - congestion" },
      { start: 13401, end: 13406, type: "sailing", status: "Drayage to San Bernardino DC" },
    ],
  },
];

const timeRange = { min: 13350, max: 13445 };
const totalWidth = timeRange.max - timeRange.min;

function GanttChart() {
  const getBarColor = (type: string) => {
    switch (type) {
      case "service":
        return "#F5E6A3"; // Yellow/beige for in service
      case "sailing":
        return "#22C55E"; // Green for normal sailing
      case "storm":
        return "#A855F7"; // Purple for storm sailing
      default:
        return "#E5E7EB";
    }
  };

  const getBarPosition = (start: number, end: number) => {
    const left = ((start - timeRange.min) / totalWidth) * 100;
    const width = ((end - start) / totalWidth) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  // Generate time labels
  const timeLabels: number[] = [];
  for (let i = timeRange.min; i <= timeRange.max; i += 5) {
    timeLabels.push(i);
  }

  return (
    <div className="h-full bg-slate-800 p-4 rounded-lg">
      <div className="h-full bg-yellow-100 rounded border-2 border-slate-600 relative overflow-hidden">
        {/* Time axis */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-700 flex items-center justify-between px-4 text-white text-xs">
          {timeLabels.map((time) => (
            <span key={time} className="text-xs">
              {time.toLocaleString()}
            </span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 bottom-8">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-b border-yellow-200"
              style={{ top: `${(i / 19) * 100}%` }}
            />
          ))}
          {timeLabels.map((time, index) => (
            <div
              key={time}
              className="absolute top-0 bottom-0 border-l border-yellow-200"
              style={{ left: `${(index / (timeLabels.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Gantt bars */}
        <div className="absolute inset-0 bottom-8 p-2">
          {ganttData.map((vessel, vesselIndex) => (
            <div
              key={vessel.id}
              className="relative h-12 mb-1"
              style={{ top: `${(vesselIndex / ganttData.length) * 100}%` }}
            >
              {/* Vessel label */}
              <div className="absolute left-2 top-1 text-xs font-medium text-slate-700 z-10">
                {vessel.vessel}
              </div>

              {/* Timeline bars */}
              {vessel.timeline.map((segment, segmentIndex) => {
                const position = getBarPosition(segment.start, segment.end);
                return (
                  <div
                    key={segmentIndex}
                    className="absolute top-0 h-8 rounded-sm border border-slate-400"
                    style={{
                      ...position,
                      backgroundColor: getBarColor(segment.type),
                    }}
                    title={`${segment.status}: ${segment.start} - ${segment.end}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-10 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-3 bg-yellow-200 border border-slate-400 rounded-sm"></div>
            <span>In service</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-3 bg-green-500 border border-slate-400 rounded-sm"></div>
            <span>Sailing (normal conditions)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-3 bg-purple-500 border border-slate-400 rounded-sm"></div>
            <span>Sailing (storm)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogisticsGanttRoute() {
  return (
    <div className="pt-4 pl-4">
      {/* Header - Supply Chain Simulation Style */}
      <div className="bg-blue-50  rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">
            Ferguson International Logistics & Vessel Timeline
          </h1>
        </div>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg">Vessel Timeline</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div>
            <iframe
              width="100%"
              height="650"
              allow="fullscreen"
              src="https://cloud.anylogic.com/assets/embed?modelId=1247ae62-bbd6-4ee6-b0d2-b67025c81cf5"
            ></iframe>
          </div>
        </CardContent>
      </Card>
      {/* Main Content - Logistics Config Left, Gantt Chart Right */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Logistics Configuration */}
        <Card className="h-[500px]">
          <CardHeader>
            <CardTitle className="text-lg">Route Configuration</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            <Tabs defaultValue="origin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="origin" className="text-sm">
                  Origin
                </TabsTrigger>
                <TabsTrigger value="destination" className="text-sm">
                  Destination
                </TabsTrigger>
              </TabsList>

              <TabsContent value="origin" className="space-y-6">
                {/* Origin Header Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Origin Configuration
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Select defaultValue="china">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">
                          <div className="flex items-center gap-2">
                            <span>🇨🇳</span>
                            <span>China (Guangdong)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="japan">
                          <div className="flex items-center gap-2">
                            <span>🇯🇵</span>
                            <span>Japan</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="korea">
                          <div className="flex items-center gap-2">
                            <span>🇰🇷</span>
                            <span>South Korea</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="germany">
                          <div className="flex items-center gap-2">
                            <span>🇩🇪</span>
                            <span>Germany</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="thailand">
                          <div className="flex items-center gap-2">
                            <span>🇹🇭</span>
                            <span>Thailand</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mexico">
                          <div className="flex items-center gap-2">
                            <span>🇲🇽</span>
                            <span>Mexico</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="foshan">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="foshan">Foshan (Kohler)</SelectItem>
                        <SelectItem value="jiangmen">Jiangmen (Moen)</SelectItem>
                        <SelectItem value="zhuhai">Zhuhai (Delta)</SelectItem>
                        <SelectItem value="kitakyushu">Kitakyushu (TOTO)</SelectItem>
                        <SelectItem value="sejong">Sejong (Navien)</SelectItem>
                        <SelectItem value="hemer">Hemer (Grohe)</SelectItem>
                        <SelectItem value="monterrey">Monterrey (Am. Std.)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="nansha">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Port" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nansha">Nansha Port</SelectItem>
                        <SelectItem value="yantian">Yantian Port</SelectItem>
                        <SelectItem value="busan">Port of Busan</SelectItem>
                        <SelectItem value="hamburg">Port of Hamburg</SelectItem>
                        <SelectItem value="kitakyushu-port">Kitakyushu Port</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Origin Configuration Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Region
                      </Label>
                      <Input
                        className="h-7 text-xs"
                        defaultValue="Asia Pacific"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Min. backhaul distance
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="30%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Currency
                      </Label>
                      <Select defaultValue="container">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="container">
                            Container / Pallets...
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Max. backhaul distance
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="30%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance measure
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="km" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Truck utilization on line haul in LTL
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Road toll
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="0.5" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Max backhaul discount
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Toll proportion
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="20%" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Labor cost
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="150000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance to hub (pickup)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Fuel price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="9.14" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance to hub (delivery)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Semi-trailer purchasing price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="2,50,000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Loading/unloading base duration
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Refrigerator truck purchasing price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="2,50,000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Loading/unloading ramp duration
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Maximum speed
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="65" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Backhaul (% of main haul distance)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Average speed
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="55" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="destination" className="space-y-6">
                {/* Destination Header Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Destination Configuration
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Select defaultValue="usa">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">
                          <div className="flex items-center gap-2">
                            <span>🇺🇸</span>
                            <span>United States</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="san-bernardino">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Ferguson DC" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="san-bernardino">San Bernardino DC</SelectItem>
                        <SelectItem value="newport-news">Newport News DC</SelectItem>
                        <SelectItem value="sacramento">Sacramento DC</SelectItem>
                        <SelectItem value="dallas">Dallas DC</SelectItem>
                        <SelectItem value="atlanta">Atlanta DC</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="long-beach">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Port" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long-beach">Port of Long Beach</SelectItem>
                        <SelectItem value="la-port">Port of LA</SelectItem>
                        <SelectItem value="oakland">Port of Oakland</SelectItem>
                        <SelectItem value="norfolk">Port of Norfolk</SelectItem>
                        <SelectItem value="savannah">Port of Savannah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Destination Configuration Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Region
                      </Label>
                      <Input
                        className="h-7 text-xs"
                        defaultValue="North America"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Min. backhaul distance
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="30%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Currency
                      </Label>
                      <Select defaultValue="container">
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="container">
                            Container / Pallets...
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Max. backhaul distance
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="30%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance measure
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="miles" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Truck utilization on line haul in LTL
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Road toll
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="0.3" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Max backhaul discount
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Toll proportion
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="15%" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Labor cost
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="180000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance to hub (pickup)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Fuel price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="3.85" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Distance to hub (delivery)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Semi-trailer purchasing price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="3,50,000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Loading/unloading base duration
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Refrigerator truck purchasing price
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="3,80,000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Loading/unloading ramp duration
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Maximum speed
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="70" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Backhaul (% of main haul distance)
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-blue-600">
                        Average speed
                      </Label>
                      <Input className="h-7 text-xs" defaultValue="60" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Panel - Gantt Chart */}
        <Card >
          <CardHeader>
            <CardTitle className="text-lg">Vessel Timeline</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <GanttChart />
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
