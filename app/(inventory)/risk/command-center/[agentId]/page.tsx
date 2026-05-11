"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  CheckSquare,
  Play,
  Lightbulb,
  Sparkles,
  Trash2,
  ExternalLink,
  ClipboardList,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// ── Types ──────────────────────────────────────────────────────────────────────

interface AgentDetail {
  id: string
  name: string
  icon: string
  iconBg: string
  category: string
  avgScore: number
  runs: number
  cost: number
  status: "active" | "idle" | "declining"
}

interface SuggestedPrompt {
  title: string
  description: string
  image: string
}

interface Thread {
  id: string
  title: string
  preview: string
  messageCount: number
  lastActivity: string
  image: string
}

interface Evaluation {
  id: string
  score: number
  rubricName: string
  date: string
}

interface RubricCriteria {
  name: string
  description: string
  weight: number
  levels: string
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const agentDetails: Record<string, AgentDetail> = {
  "bug-triage": {
    id: "bug-triage",
    name: "Bug Triage",
    icon: "🐛",
    iconBg: "bg-orange-100",
    category: "analysis",
    avgScore: 89,
    runs: 2,
    cost: 0.52,
    status: "declining",
  },
  "interview-debrief": {
    id: "interview-debrief",
    name: "Interview Debrief",
    icon: "📋",
    iconBg: "bg-blue-100",
    category: "analysis",
    avgScore: 69,
    runs: 2,
    cost: 0.71,
    status: "active",
  },
  "deal-desk-analyst": {
    id: "deal-desk-analyst",
    name: "Deal Desk Analyst",
    icon: "📊",
    iconBg: "bg-green-100",
    category: "analysis",
    avgScore: 80,
    runs: 2,
    cost: 0.13,
    status: "active",
  },
  "onboarding-guide": {
    id: "onboarding-guide",
    name: "Onboarding Guide",
    icon: "📘",
    iconBg: "bg-purple-100",
    category: "operations",
    avgScore: 52,
    runs: 6,
    cost: 1.00,
    status: "declining",
  },
  "contract-reviewer": {
    id: "contract-reviewer",
    name: "Contract Reviewer",
    icon: "📝",
    iconBg: "bg-indigo-100",
    category: "legal",
    avgScore: 59,
    runs: 4,
    cost: 0.48,
    status: "declining",
  },
  "candidate-finder": {
    id: "candidate-finder",
    name: "Candidate Finder",
    icon: "🔍",
    iconBg: "bg-red-100",
    category: "recruiting",
    avgScore: 55,
    runs: 2,
    cost: 0.27,
    status: "declining",
  },
  "interior-design-visualizer": {
    id: "interior-design-visualizer",
    name: "Interior Design Visualizer",
    icon: "🎨",
    iconBg: "bg-gray-100",
    category: "design",
    avgScore: 0,
    runs: 1,
    cost: 0.56,
    status: "idle",
  },
  "meeting-prepper": {
    id: "meeting-prepper",
    name: "Meeting Prepper",
    icon: "💼",
    iconBg: "bg-cyan-100",
    category: "productivity",
    avgScore: 64,
    runs: 3,
    cost: 3.92,
    status: "idle",
  },
  "incident-responder": {
    id: "incident-responder",
    name: "Incident Responder",
    icon: "🚨",
    iconBg: "bg-red-100",
    category: "operations",
    avgScore: 71,
    runs: 2,
    cost: 0.40,
    status: "idle",
  },
  "social-creative": {
    id: "social-creative",
    name: "Social Creative",
    icon: "🎭",
    iconBg: "bg-pink-100",
    category: "marketing",
    avgScore: 45,
    runs: 1,
    cost: 0.00,
    status: "idle",
  },
  "competitive-intel": {
    id: "competitive-intel",
    name: "Competitive Intel",
    icon: "🕵️",
    iconBg: "bg-slate-100",
    category: "research",
    avgScore: 48,
    runs: 1,
    cost: 0.00,
    status: "idle",
  },
  "win-loss-researcher": {
    id: "win-loss-researcher",
    name: "Win/Loss Researcher",
    icon: "📈",
    iconBg: "bg-emerald-100",
    category: "research",
    avgScore: 56,
    runs: 1,
    cost: 0.00,
    status: "idle",
  },
  "customer-intelligence": {
    id: "customer-intelligence",
    name: "Customer Intelligence",
    icon: "🧠",
    iconBg: "bg-violet-100",
    category: "research",
    avgScore: 70,
    runs: 2,
    cost: 0.84,
    status: "idle",
  },
  "databricks-analytics": {
    id: "databricks-analytics",
    name: "Databricks Analytics Assistant",
    icon: "📊",
    iconBg: "bg-amber-100",
    category: "analytics",
    avgScore: 0,
    runs: 4,
    cost: 0.27,
    status: "idle",
  },
}

const suggestedPrompts: SuggestedPrompt[] = [
  {
    title: "Triage bug reports from Q1 product launch",
    description: "After a major product launch, bug reports flood in from multiple sources. This agent excels at...",
    image: "🔴",
  },
  {
    title: "Deduplicate rendering issues across support channels",
    description: "When the same issue appears across multiple channels, manually tracking duplicates wastes time...",
    image: "🟠",
  },
  {
    title: "Process overnight bug queue and prioritize critical issues",
    description: "Time-sensitive bugs need immediate classification and routing. This agent ensures critica...",
    image: "🟡",
  },
  {
    title: "Analyze bug patterns from beta tester feedback",
    description: "Beta programs generate concentrated feedback that needs rapid analysis for sprint planning.",
    image: "✨",
  },
  {
    title: "Route bugs to visualization teams",
    description: "Enterprise customers need careful severity assessment for proper routing...",
    image: "🤖",
  },
]

const threads: Thread[] = [
  {
    id: "thread-1",
    title: "Bug Triage Thread",
    preview: "SSE connection error: SSE connection failed: 401 Unauthorized — body: {\"error\":\"Unauthorized\"}",
    messageCount: 29,
    lastActivity: "1 day ago",
    image: "🐛",
  },
  {
    id: "thread-2",
    title: "Bug Triage Thread",
    preview: "[1 tool result(s)]",
    messageCount: 3,
    lastActivity: "1 day ago",
    image: "🐛",
  },
]

const evaluations: Evaluation[] = [
  { id: "eval-1", score: 88, rubricName: "Bug Triage Quality and Logic Rubric", date: "Feb 17, 2026 at 1:03 PM" },
  { id: "eval-2", score: 75, rubricName: "Bug Triage Quality and Logic Rubric", date: "Feb 17, 2026 at 12:57 PM" },
  { id: "eval-3", score: 81, rubricName: "Bug Triage Quality and Logic Rubric", date: "Feb 17, 2026 at 12:53 PM" },
  { id: "eval-4", score: 88, rubricName: "Bug Triage Quality and Logic Rubric", date: "Feb 17, 2026 at 12:48 PM" },
  { id: "eval-5", score: 100, rubricName: "Bug Triage Quality and Logic Rubric", date: "Feb 17, 2026 at 12:44 PM" },
]

const rubricCriteria: RubricCriteria[] = [
  {
    name: "Deduplication Precision",
    description: "Measures the agent's ability to identify existing issues using semantic matching and document the link via reference ticket numbers.",
    weight: 25,
    levels: "1: Fails to detect exact duplicates or incorrectly flags unrelated issues as duplicates. 2: Misses semantic duplicates that don't share exact keywords or forgets reference IDs. 3: Identifies obvious duplicates but struggles with complex semantic matches; reference IDs are present. 4: Successfully identifies most duplicates through semantic understanding and provides clear reference ticket links. 5: Flawlessly identifies duplicate issues regardless of phrasing and provides explicit justification for the deduplication decision.",
  },
  {
    name: "Severity Calibration",
    description: "Evaluates the logic used to assign severity based on impact signals like user count, business risk, and workaround availability.",
    weight: 25,
    levels: "1: Severity levels appear random or directly contradict the impact signals provided in the report. 2: Severity is assigned but ignores critical signals like data integrity or workarounds. 3: Severity is generally appropriate but the logic for the assignment is vague or inconsistent. 4: Accurately assigns severity with clear alignment to impact signals (e.g., high user count = Critical/High). 5: Provides a sophisticated assessment of severity with rigorous evidence-based logic for business impact and technical risk.",
  },
  {
    name: "Routing and Rationale Accuracy",
    description: "Measures the correctness of the assigned engineering team based on component/system area and the clarity of the routing explanation.",
    weight: 25,
    levels: "1: Issues are routed to irrelevant teams or no team is assigned at all. 2: Team assignment is technically incorrect (e.g., UI bug to Backend team) and rationale is missing. 3: Assigns a plausible team but the rationale is generic and doesn't reference specific components. 4: Correctly identifies the responsible team with a logical explanation of why the issue belongs to their domain. 5: Perfectly routes the issue to the expert team with a detailed rationale based on system area, component ownership, and technical requirements.",
  },
  {
    name: "Technical Extraction and Structural Fidelity",
    description: "Evaluates the completeness of captured technical details (repro steps, environment, errors) and adherence to the specified output format.",
    weight: 25,
    levels: "1: Fails to extract basic info or follow the output format; language is subjective or emotional. 2: Missing critical technical data like reproduction steps or environment details. 3: Captures key info but lacks specific error messages or version data; follows the structured format partially. 4: Extracts all necessary technical details and follows the structured output format with neutral, factual language. 5: Comprehensive extraction of all technical nuances (repro, env, error logs) in a perfectly structured, objective summary that flags missing info where necessary.",
  },
]

// ── Score Trend Sparkline (larger for detail page) ─────────────────────────────

function ScoreTrendChart({ data }: { data: Evaluation[] }) {
  const scores = data.map((e) => e.score).reverse()
  if (scores.length < 2) return null

  const min = Math.min(...scores) - 10
  const max = Math.max(...scores) + 10
  const range = max - min || 1
  const width = 500
  const height = 150
  const padding = 20

  const points = scores.map((v, i) => {
    const x = padding + (i / (scores.length - 1)) * (width - padding * 2)
    const y = height - padding - ((v - min) / range) * (height - padding * 2)
    return { x, y }
  })

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40" fill="none">
      <path d={pathD} stroke="rgb(139, 92, 246)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgb(139, 92, 246)" />
      ))}
    </svg>
  )
}

// ── Score Circle ───────────────────────────────────────────────────────────────

function ScoreCircle({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-green-600 bg-green-50 border-green-200"
      : score >= 75
        ? "text-yellow-600 bg-yellow-50 border-yellow-200"
        : score >= 60
          ? "text-orange-600 bg-orange-50 border-orange-200"
          : "text-red-600 bg-red-50 border-red-200"

  return (
    <div className={`flex items-center justify-center size-12 rounded-full border-2 text-sm font-bold ${color}`}>
      {score}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function AgentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.agentId as string

  const agent = agentDetails[agentId] ?? {
    id: agentId,
    name: agentId.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "),
    icon: "🤖",
    iconBg: "bg-gray-100",
    category: "General",
    avgScore: 0,
    runs: 0,
    cost: 0,
    status: "idle" as const,
  }

  const [selectedRubric, setSelectedRubric] = useState<string | null>(null)
  const avgEvalScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((s, e) => s + e.score, 0) / evaluations.length)
    : 0

  return (
    <ScrollArea className="h-full">
      <div className="bg-gray-50/50 min-h-full">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="border-b bg-white px-6 py-4">
          <button
            onClick={() => router.push("/risk/command-center")}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Command Center
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className={`text-lg ${agent.iconBg}`}>
                  {agent.icon}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{agent.name}</h1>
                  <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                  <Badge variant="secondary" className="text-xs">General</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Evaluates the accuracy of duplicate detection, severity assignment, team routing, and technical information extraction for incoming bug reports.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ClipboardList className="size-3.5" />
                Test Rubric
              </Button>
              <Button variant="destructive" size="icon" className="size-8">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* ── Suggested Prompts ─────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Suggested Prompts</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {suggestedPrompts.map((prompt, i) => (
                <Card
                  key={i}
                  className="min-w-[220px] max-w-[220px] cursor-pointer hover:shadow-md transition-shadow shrink-0"
                >
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{prompt.image}</div>
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {prompt.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Threads ──────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Threads</h2>
                <Badge variant="secondary" className="text-xs">
                  {threads.length} total
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Plus className="size-3.5" />
                New Thread
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {threads.map((thread) => (
                <Card
                  key={thread.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center text-xl">
                        {thread.image}
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{thread.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {thread.preview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="size-3" />
                        {thread.messageCount}
                      </div>
                      <span>{thread.lastActivity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Evaluations ──────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Evaluations</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {evaluations.length} total · avg {avgEvalScore}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Sparkles className="size-3.5" />
                    Generate Rubric
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    View in Rubrics
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Score Trend */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">Score Trend</span>
                </div>
                <ScoreTrendChart data={evaluations} />
              </div>

              <Separator className="my-4" />

              {/* Recent Attempts */}
              <div>
                <h3 className="text-sm font-medium mb-3">Recent Attempts</h3>
                <div className="space-y-2">
                  {evaluations.map((evaluation) => (
                    <div
                      key={evaluation.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedRubric(selectedRubric === evaluation.id ? null : evaluation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <ScoreCircle score={evaluation.score} />
                        <div>
                          <p className="text-sm font-medium">{evaluation.rubricName}</p>
                          <p className="text-xs text-muted-foreground">{evaluation.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Rubric Detail ────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className={`text-sm ${agent.iconBg}`}>
                      {agent.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-bold">
                        Bug Triage Quality and Logic Rubric
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                      <Badge variant="secondary" className="text-xs">General</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Evaluates the accuracy of duplicate detection, severity assignment, team routing, and technical information extraction for incoming bug reports.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ClipboardList className="size-3.5" />
                    Test Rubric
                  </Button>
                  <Button variant="destructive" size="icon" className="size-8">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Criteria ({rubricCriteria.length})</span>
              </div>

              <div className="space-y-4">
                {rubricCriteria.map((criteria, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{criteria.name}</h4>
                      <span className="text-sm text-muted-foreground">{criteria.weight}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {criteria.description}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {criteria.levels}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button className="gap-1.5">
                  <Play className="size-3.5" />
                  Run Evaluation
                </Button>
                <Button variant="outline" className="gap-1.5">
                  <Lightbulb className="size-3.5" />
                  Suggest Improvements
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="text-sm text-muted-foreground">
                Evaluation History (0 runs)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
