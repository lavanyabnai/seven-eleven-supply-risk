"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, BarChart3, Settings } from "lucide-react"

interface ReportsProps {
  results: any
}

export default function Reports({ results }: ReportsProps) {
  const [activeReport, setActiveReport] = useState("summary")

  if (!results) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Run calculations to generate reports</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatNumber = (value: number, decimals = 1) =>
    value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  const summaryData = Object.entries(results.processes).map(([key, process]: [string, any]) => ({
    process: key.charAt(0).toUpperCase() + key.slice(1),
    laborCost: process.laborCost,
    spaceCost: process.spaceCost,
    equipmentCost: process.equipmentCost,
    totalCost: process.totalCost,
    ftes: process.ftes,
    spaceRequired: process.spaceRequired,
    productivity: process.productivity,
    unitCost: process.unitCost,
  }))

  const handleExport = (reportType: string) => {
    // In a real application, this would generate and download the report
    console.log(`Exporting ${reportType} report...`)
  }

  return (
    <div className="space-y-6">
      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleExport("executive-summary")} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Executive Summary
            </Button>
            <Button
              onClick={() => handleExport("detailed-analysis")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Detailed Analysis
            </Button>
            <Button
              onClick={() => handleExport("cost-breakdown")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Cost Breakdown
            </Button>
            <Button
              onClick={() => handleExport("recommendations")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs value={activeReport} onValueChange={setActiveReport}>
        <TabsList>
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Report</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Annual Operating Cost</p>
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(results.totals.costs.total * 12)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total FTEs Required</p>
                  <p className="text-3xl font-bold text-green-600">{formatNumber(results.totals.ftes)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Space Required</p>
                  <p className="text-3xl font-bold text-orange-600">{formatNumber(results.totals.space)} sq ft</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3>Key Findings</h3>
                <ul>
                  <li>
                    Picking operations represent the highest cost center at{" "}
                    {((results.processes.picking.totalCost / results.totals.costs.total) * 100).toFixed(1)}% of total
                    costs
                  </li>
                  <li>
                    Labor costs account for{" "}
                    {((results.totals.costs.labor / results.totals.costs.total) * 100).toFixed(1)}% of total operating
                    expenses
                  </li>
                  <li>
                    Current space utilization is at {(results.kpis.spaceUtilization * 100).toFixed(1)}%, with potential
                    for optimization
                  </li>
                  <li>
                    Cost per order is ${results.kpis.costPerOrder.toFixed(2)}, compared to industry average of $
                    {results.benchmarks.industryAverages.costPerOrder.toFixed(2)}
                  </li>
                </ul>

                <h3>Optimization Opportunities</h3>
                <ul>
                  <li>Implement zone picking to improve productivity by 15-20%</li>
                  <li>Optimize storage layout to achieve 90%+ space utilization</li>
                  <li>Consider automation for high-volume processes</li>
                  <li>Implement lean warehouse practices to reduce waste</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Process Report */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Process Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process</TableHead>
                    <TableHead>Labor Cost</TableHead>
                    <TableHead>Space Cost</TableHead>
                    <TableHead>Equipment Cost</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>FTEs</TableHead>
                    <TableHead>Space (sq ft)</TableHead>
                    <TableHead>Productivity</TableHead>
                    <TableHead>Unit Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData.map((row) => (
                    <TableRow key={row.process}>
                      <TableCell className="font-medium">{row.process}</TableCell>
                      <TableCell>{formatCurrency(row.laborCost)}</TableCell>
                      <TableCell>{formatCurrency(row.spaceCost)}</TableCell>
                      <TableCell>{formatCurrency(row.equipmentCost)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(row.totalCost)}</TableCell>
                      <TableCell>{formatNumber(row.ftes)}</TableCell>
                      <TableCell>{formatNumber(row.spaceRequired)}</TableCell>
                      <TableCell>{formatNumber(row.productivity)}</TableCell>
                      <TableCell>{formatCurrency(row.unitCost)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="font-bold">{formatCurrency(results.totals.costs.labor)}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(results.totals.costs.space)}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(results.totals.costs.equipment)}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(results.totals.costs.total)}</TableCell>
                    <TableCell className="font-bold">{formatNumber(results.totals.ftes)}</TableCell>
                    <TableCell className="font-bold">{formatNumber(results.totals.space)}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* KPI Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KPI</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Industry Average</TableHead>
                    <TableHead>Best in Class</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Cost per Order</TableCell>
                    <TableCell>{formatCurrency(results.kpis.costPerOrder)}</TableCell>
                    <TableCell>{formatCurrency(results.benchmarks.industryAverages.costPerOrder)}</TableCell>
                    <TableCell>{formatCurrency(results.benchmarks.bestInClass.costPerOrder)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          results.kpis.costPerOrder <= results.benchmarks.bestInClass.costPerOrder
                            ? "default"
                            : results.kpis.costPerOrder <= results.benchmarks.industryAverages.costPerOrder
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {results.kpis.costPerOrder <= results.benchmarks.bestInClass.costPerOrder
                          ? "Excellent"
                          : results.kpis.costPerOrder <= results.benchmarks.industryAverages.costPerOrder
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cost per Order Line</TableCell>
                    <TableCell>{formatCurrency(results.kpis.costPerOrderLine)}</TableCell>
                    <TableCell>{formatCurrency(results.benchmarks.industryAverages.costPerOrderLine)}</TableCell>
                    <TableCell>{formatCurrency(results.benchmarks.bestInClass.costPerOrderLine)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          results.kpis.costPerOrderLine <= results.benchmarks.bestInClass.costPerOrderLine
                            ? "default"
                            : results.kpis.costPerOrderLine <= results.benchmarks.industryAverages.costPerOrderLine
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {results.kpis.costPerOrderLine <= results.benchmarks.bestInClass.costPerOrderLine
                          ? "Excellent"
                          : results.kpis.costPerOrderLine <= results.benchmarks.industryAverages.costPerOrderLine
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Picking Productivity</TableCell>
                    <TableCell>{formatNumber(results.kpis.laborProductivity.picking)} lines/hr</TableCell>
                    <TableCell>
                      {formatNumber(results.benchmarks.industryAverages.pickingProductivity)} lines/hr
                    </TableCell>
                    <TableCell>{formatNumber(results.benchmarks.bestInClass.pickingProductivity)} lines/hr</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          results.kpis.laborProductivity.picking >= results.benchmarks.bestInClass.pickingProductivity
                            ? "default"
                            : results.kpis.laborProductivity.picking >=
                                results.benchmarks.industryAverages.pickingProductivity
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {results.kpis.laborProductivity.picking >= results.benchmarks.bestInClass.pickingProductivity
                          ? "Excellent"
                          : results.kpis.laborProductivity.picking >=
                              results.benchmarks.industryAverages.pickingProductivity
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Space Utilization</TableCell>
                    <TableCell>{formatNumber(results.kpis.spaceUtilization * 100)}%</TableCell>
                    <TableCell>{formatNumber(results.benchmarks.industryAverages.spaceUtilization * 100)}%</TableCell>
                    <TableCell>{formatNumber(results.benchmarks.bestInClass.spaceUtilization * 100)}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          results.kpis.spaceUtilization >= results.benchmarks.bestInClass.spaceUtilization
                            ? "default"
                            : results.kpis.spaceUtilization >= results.benchmarks.industryAverages.spaceUtilization
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {results.kpis.spaceUtilization >= results.benchmarks.bestInClass.spaceUtilization
                          ? "Excellent"
                          : results.kpis.spaceUtilization >= results.benchmarks.industryAverages.spaceUtilization
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">Cost Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Implement lean warehouse practices to reduce waste by 15-20%</li>
                      <li>• Optimize labor scheduling to match demand patterns</li>
                      <li>• Negotiate better rates for space and equipment leasing</li>
                      <li>• Consider shared warehouse facilities for seasonal peaks</li>
                      <li>• Implement energy-efficient lighting and equipment</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Process Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Implement wave picking to increase productivity by 25%</li>
                      <li>• Use voice-directed picking systems</li>
                      <li>• Optimize slotting to reduce travel time</li>
                      <li>• Implement cross-docking for fast-moving items</li>
                      <li>• Use ABC analysis for inventory positioning</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Technology Investments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Implement WMS with real-time inventory tracking</li>
                      <li>• Deploy automated sorting systems</li>
                      <li>• Use RFID for improved inventory accuracy</li>
                      <li>• Implement predictive analytics for demand forecasting</li>
                      <li>• Consider robotic process automation for repetitive tasks</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">Space Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Implement vertical storage solutions</li>
                      <li>• Use dynamic slotting based on velocity</li>
                      <li>• Optimize aisle widths for equipment used</li>
                      <li>• Implement mezzanine levels for additional storage</li>
                      <li>• Use mobile racking systems for seasonal items</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Phase 1 (0-3 months) - Quick Wins</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Optimize current slotting and layout</li>
                        <li>• Implement basic lean practices</li>
                        <li>• Train staff on best practices</li>
                        <li>• Establish performance metrics and KPIs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Phase 2 (3-9 months) - Process Improvements</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Implement wave picking methodology</li>
                        <li>• Deploy voice-directed picking</li>
                        <li>• Optimize labor scheduling systems</li>
                        <li>• Implement cross-docking processes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">
                        Phase 3 (9-18 months) - Technology & Automation
                      </h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Deploy advanced WMS capabilities</li>
                        <li>• Implement automated sorting systems</li>
                        <li>• Install RFID tracking systems</li>
                        <li>• Deploy predictive analytics tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
