"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Zap,
  BarChart3,
  Star,
  DollarSign,
  AlertTriangle,
  Search,
  ArrowUpDown,
  Wifi,
  ChevronRight,
  TrendingDown,
  Lightbulb,
  Sparkles,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// ── Types ──────────────────────────────────────────────────────────────────────

interface Agent {
  id: string
  name: string
  icon: string
  iconBg: string
  runs: number
  avgScore: number | null
  scoreColor: "green" | "orange" | "red"
  trend: number[]
  cost: number
  lastActive: string
  status: "active" | "idle" | "declining"
}

interface ActiveOperation {
  name: string
  thread: string
  time: string
  icon: string
  iconBg: string
}

interface CostItem {
  name: string
  cost: number
  color: string
  icon: string
  iconBg: string
}

interface Improvement {
  text: string
  type: "Insight" | "New Skill" | "Prompt"
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const agents: Agent[] = [
  { id: "interview-debrief", name: "Interview Debrief", icon: "📋", iconBg: "bg-blue-100", runs: 2, avgScore: 69, scoreColor: "orange", trend: [70, 72, 68, 65, 69], cost: 0.71, lastActive: "just now", status: "active" },
  { id: "deal-desk-analyst", name: "Deal Desk Analyst", icon: "📊", iconBg: "bg-green-100", runs: 2, avgScore: 80, scoreColor: "green", trend: [78, 80, 75, 82, 80], cost: 0.13, lastActive: "just now", status: "active" },
  { id: "onboarding-guide", name: "Onboarding Guide", icon: "📘", iconBg: "bg-purple-100", runs: 6, avgScore: 52, scoreColor: "red", trend: [60, 55, 58, 50, 48, 52], cost: 1.00, lastActive: "5h ago", status: "declining" },
  { id: "contract-reviewer", name: "Contract Reviewer", icon: "📝", iconBg: "bg-indigo-100", runs: 4, avgScore: 59, scoreColor: "red", trend: [65, 62, 58, 55, 59], cost: 0.48, lastActive: "1d ago", status: "declining" },
  { id: "candidate-finder", name: "Candidate Finder", icon: "🔍", iconBg: "bg-red-100", runs: 2, avgScore: 55, scoreColor: "red", trend: [60, 58, 52, 55], cost: 0.27, lastActive: "1d ago", status: "declining" },
  { id: "bug-triage", name: "Bug Triage", icon: "🐛", iconBg: "bg-orange-100", runs: 2, avgScore: 89, scoreColor: "green", trend: [85, 88, 90, 87, 89], cost: 0.52, lastActive: "1d ago", status: "declining" },
  { id: "interior-design-visualizer", name: "Interior Design Visualizer", icon: "🎨", iconBg: "bg-gray-100", runs: 1, avgScore: null, scoreColor: "orange", trend: [], cost: 0.56, lastActive: "16m ago", status: "idle" },
  { id: "meeting-prepper", name: "Meeting Prepper", icon: "💼", iconBg: "bg-cyan-100", runs: 3, avgScore: 64, scoreColor: "orange", trend: [60, 65, 62, 68, 64], cost: 3.92, lastActive: "1d ago", status: "idle" },
  { id: "incident-responder", name: "Incident Responder", icon: "🚨", iconBg: "bg-red-100", runs: 2, avgScore: 71, scoreColor: "orange", trend: [68, 72, 70, 73, 71], cost: 0.40, lastActive: "1d ago", status: "idle" },
  { id: "social-creative", name: "Social Creative", icon: "🎭", iconBg: "bg-pink-100", runs: 1, avgScore: 45, scoreColor: "red", trend: [], cost: 0.00, lastActive: "1d ago", status: "idle" },
  { id: "competitive-intel", name: "Competitive Intel", icon: "🕵️", iconBg: "bg-slate-100", runs: 1, avgScore: 48, scoreColor: "red", trend: [48], cost: 0.00, lastActive: "1d ago", status: "idle" },
  { id: "win-loss-researcher", name: "Win/Loss Researcher", icon: "📈", iconBg: "bg-emerald-100", runs: 1, avgScore: 56, scoreColor: "red", trend: [56], cost: 0.00, lastActive: "1d ago", status: "idle" },
  { id: "customer-intelligence", name: "Customer Intelligence", icon: "🧠", iconBg: "bg-violet-100", runs: 2, avgScore: 70, scoreColor: "orange", trend: [70], cost: 0.84, lastActive: "1d ago", status: "idle" },
  { id: "databricks-analytics", name: "Databricks Analytics Assistant", icon: "📊", iconBg: "bg-amber-100", runs: 4, avgScore: null, scoreColor: "orange", trend: [], cost: 0.27, lastActive: "2d ago", status: "idle" },
]

const activeOperations: ActiveOperation[] = [
  { name: "Interview Debrief", thread: "Interview Debrief Thread", time: "0m 38s", icon: "📋", iconBg: "bg-blue-100" },
  { name: "Deal Desk Analyst", thread: "Deal Desk Analyst Thread", time: "0m 44s", icon: "📊", iconBg: "bg-green-100" },
]

const costBreakdown: CostItem[] = [
  { name: "Meeting Pr...", cost: 3.92, color: "bg-violet-500", icon: "💼", iconBg: "bg-cyan-100" },
  { name: "Onboardin...", cost: 1.00, color: "bg-violet-400", icon: "📘", iconBg: "bg-purple-100" },
  { name: "Customer I...", cost: 0.84, color: "bg-violet-300", icon: "🧠", iconBg: "bg-violet-100" },
  { name: "Interview D...", cost: 0.71, color: "bg-blue-400", icon: "📋", iconBg: "bg-blue-100" },
  { name: "Interior De...", cost: 0.56, color: "bg-blue-300", icon: "🎨", iconBg: "bg-gray-100" },
  { name: "Bug Triage", cost: 0.52, color: "bg-blue-200", icon: "🐛", iconBg: "bg-orange-100" },
]

const improvements: Improvement[] = [
  { text: "While the existing interior design rubrics cover the core dimensions well, this tas...", type: "Insight" },
  { text: "Expanding the skill suggestion to be more specific about the failure patterns o...", type: "New Skill" },
  { text: "The assistant scraped copyrighted listing photos from news outlets and used th...", type: "Prompt" },
]

const decliningAgents = ["Onboarding Guide", "Contract Reviewer", "Interview Debrief", "Candidate Finder", "Bug Triage"]

// ── Sparkline Component ────────────────────────────────────────────────────────

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  if (data.length < 2) {
    return <span className="text-xs text-muted-foreground">1 run</span>
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 100
  const height = 30
  const padding = 2

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((v - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className ?? "h-8 w-24"}
      fill="none"
    >
      <polyline
        points={points.join(" ")}
        stroke="rgb(139, 92, 246)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const x = padding + (i / (data.length - 1)) * (width - padding * 2)
        const y = height - padding - ((v - min) / range) * (height - padding * 2)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="rgb(139, 92, 246)"
          />
        )
      })}
    </svg>
  )
}

// ── Score Badge ────────────────────────────────────────────────────────────────

function ScoreBadge({ score, color }: { score: number | null; color: string }) {
  if (score === null) return <span className="text-sm text-muted-foreground">--</span>

  const bgColor =
    color === "green"
      ? "bg-green-500"
      : color === "orange"
        ? "bg-orange-500"
        : "bg-red-500"

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-8 rounded-full ${bgColor}`} />
      <span className="text-sm font-medium">{score}%</span>
    </div>
  )
}

// ── Stats Card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  valueColor?: string
}) {
  return (
    <div className="flex flex-col gap-1 px-6 py-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className={`text-2xl font-bold ${valueColor ?? "text-foreground"}`}>
        {value}
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function CommandCenterPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const totalRuns = agents.reduce((s, a) => s + a.runs, 0)
  const scoredAgents = agents.filter((a) => a.avgScore !== null)
  const avgScore =
    scoredAgents.length > 0
      ? Math.round(scoredAgents.reduce((s, a) => s + (a.avgScore ?? 0), 0) / scoredAgents.length)
      : 0
  const totalCost = agents.reduce((s, a) => s + a.cost, 0)
  const activeCount = activeOperations.length

  const filteredAgents = agents.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const maxCost = Math.max(...costBreakdown.map((c) => c.cost))

  return (
    <div className="h-full bg-gray-50/50">
      {/* ── Top Stats Bar ─────────────────────────────────────────────── */}
      <div className="border-b bg-white">
        <div className="flex items-center divide-x">
          <StatCard icon={Users} label="Agents" value={agents.length} />
          <StatCard icon={Zap} label="Active" value={activeCount} valueColor="text-green-600" />
          <StatCard icon={BarChart3} label="Total Runs" value={totalRuns} />
          <StatCard icon={Star} label="Avg Score" value={`${avgScore}%`} valueColor="text-green-600" />
          <StatCard icon={DollarSign} label="Total Cost" value={`$${totalCost.toFixed(2)}`} />
          <StatCard icon={AlertTriangle} label="Pending" value={486} valueColor="text-red-500" />
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="flex gap-4 p-4 h-[calc(100%-80px)]">
        {/* ── Left: Agent Roster Table ──────────────────────────────── */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="size-4 text-muted-foreground" />
                  <CardTitle className="text-lg">Agent Roster</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {agents.length} agents
                </Badge>
              </div>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[250px]">Agent</TableHead>
                    <TableHead className="text-center">Runs</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow
                      key={agent.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/risk/command-center/${agent.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div
                              className={`absolute -left-3 top-1/2 -translate-y-1/2 size-2 rounded-full ${
                                agent.status === "active"
                                  ? "bg-green-500"
                                  : agent.status === "declining"
                                    ? "bg-red-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <Avatar className="size-8">
                              <AvatarFallback className={`text-sm ${agent.iconBg}`}>
                                {agent.icon}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <span className="font-medium text-sm">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-sm">{agent.runs}</TableCell>
                      <TableCell>
                        <ScoreBadge score={agent.avgScore} color={agent.scoreColor} />
                      </TableCell>
                      <TableCell>
                        <Sparkline data={agent.trend} />
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        ${agent.cost.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {agent.lastActive}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* ── Right: Sidebar Panels ────────────────────────────────── */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">
          {/* Active Operations */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Wifi className="size-4" />
                <CardTitle className="text-sm font-semibold">Active Operations</CardTitle>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  {activeOperations.length} running
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {activeOperations.map((op, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className={`text-xs ${op.iconBg}`}>
                        {op.icon}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{op.name}</p>
                      <p className="text-xs text-muted-foreground">{op.thread}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">{op.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4" />
                  <CardTitle className="text-sm font-semibold">Cost Breakdown</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground">
                  ${totalCost.toFixed(2)} total
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0">
              {costBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarFallback className={`text-[10px] ${item.iconBg}`}>
                      {item.icon}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs w-20 truncate">{item.name}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${(item.cost / maxCost) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium w-12 text-right">
                    ${item.cost.toFixed(2)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Needs Attention */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-500" />
                <CardTitle className="text-sm font-semibold">Needs Attention</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 flex-1 overflow-auto">
              {/* Pending Improvements */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-amber-500" />
                  <span className="text-sm font-medium">486 pending improvements</span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>

              {/* Improvement Items */}
              <div className="space-y-2">
                {improvements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="mt-0.5">
                      {item.type === "Insight" ? (
                        <Lightbulb className="size-3.5 text-amber-500" />
                      ) : item.type === "New Skill" ? (
                        <Sparkles className="size-3.5 text-purple-500" />
                      ) : (
                        <FileText className="size-3.5 text-blue-500" />
                      )}
                    </span>
                    <p className="flex-1 text-muted-foreground line-clamp-2">{item.text}</p>
                    <Badge variant="outline" className="text-[10px] shrink-0 px-1.5">
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Declining Agents */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="size-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">
                    {decliningAgents.length} agents declining
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {decliningAgents.map((name, i) => {
                    const agent = agents.find((a) => a.name === name)
                    return (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs gap-1 font-normal"
                      >
                        <span>{agent?.icon}</span>
                        {name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
