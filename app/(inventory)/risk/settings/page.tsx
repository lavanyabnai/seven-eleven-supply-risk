"use client"

import { useState } from "react"
import {
  ChevronDown,
  Terminal,
  Monitor,
  Sparkles,
  Search,
  Globe,
  Compass,
  MessageSquare,
  BookOpen,
  Grid3X3,
  Table2,
  FileText,
  Database,
  Snowflake,
  GlobeLock,
  Presentation,
  FolderOpen,
  AppWindow,
  Image,
  Video,
  Volume2,
  LayoutGrid,
  User,
  MapPin,
  Lock,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Tool = {
  id: string
  name: string
  icon: React.ElementType
  enabled: boolean
  color: string
  locked?: boolean
}

type ToolCategory = {
  label: string
  tools: Tool[]
}

type Integration = {
  id: string
  name: string
  icon: React.ElementType | string
  enabled: boolean
  locked?: boolean
}

const initialToolCategories: ToolCategory[] = [
  {
    label: "EXECUTION",
    tools: [
      { id: "script", name: "Script", icon: Terminal, enabled: false, color: "bg-slate-100 text-slate-700 border-slate-200" },
      { id: "full-vm", name: "Full VM", icon: Monitor, enabled: true, color: "bg-blue-50 text-blue-700 border-blue-200" },
    ],
  },
  {
    label: "RESEARCH",
    tools: [
      { id: "exa", name: "Exa", icon: Sparkles, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
      { id: "exa-search", name: "Exa Search", icon: Search, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
      { id: "browser", name: "Browser", icon: Globe, enabled: true, color: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "find-similar", name: "Find Similar", icon: Compass, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
      { id: "exa-answer", name: "Exa Answer", icon: MessageSquare, enabled: true, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { id: "exa-research", name: "Exa Research", icon: BookOpen, enabled: true, color: "bg-purple-50 text-purple-700 border-purple-200" },
      { id: "exa-websets", name: "Exa Websets", icon: Grid3X3, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
    ],
  },
  {
    label: "DATA",
    tools: [
      { id: "tables", name: "Tables", icon: Table2, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
      { id: "documents", name: "Documents", icon: FileText, enabled: true, color: "bg-orange-50 text-orange-700 border-orange-200" },
      { id: "databricks", name: "Databricks", icon: Database, enabled: true, color: "bg-red-50 text-red-700 border-red-200" },
      { id: "snowflake", name: "Snowflake", icon: Snowflake, enabled: false, color: "bg-slate-50 text-slate-400 border-slate-200", locked: true },
    ],
  },
  {
    label: "INTERACTIVE",
    tools: [
      { id: "webpage", name: "Webpage", icon: GlobeLock, enabled: true, color: "bg-green-50 text-green-700 border-green-200" },
      { id: "slides", name: "Slides", icon: Presentation, enabled: true, color: "bg-purple-50 text-purple-700 border-purple-200" },
      { id: "hyperapps", name: "HyperApps", icon: FolderOpen, enabled: true, color: "bg-violet-50 text-violet-700 border-violet-200" },
      { id: "publish-apps", name: "Publish Apps", icon: AppWindow, enabled: false, color: "bg-slate-100 text-slate-700 border-slate-200" },
    ],
  },
  {
    label: "MEDIA",
    tools: [
      { id: "images", name: "Images", icon: Image, enabled: true, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { id: "video", name: "Video", icon: Video, enabled: true, color: "bg-pink-50 text-pink-700 border-pink-200" },
      { id: "audio", name: "Audio", icon: Volume2, enabled: true, color: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "transcribe", name: "Transcribe", icon: LayoutGrid, enabled: true, color: "bg-orange-50 text-orange-700 border-orange-200" },
      { id: "avatar", name: "Avatar", icon: User, enabled: true, color: "bg-sky-50 text-sky-700 border-sky-200" },
      { id: "maps", name: "Maps", icon: MapPin, enabled: false, color: "bg-slate-50 text-slate-400 border-slate-200", locked: true },
    ],
  },
]

const initialIntegrations: Integration[] = [
  { id: "google-drive", name: "Google Drive", icon: "🔺", enabled: true },
  { id: "google-slides", name: "Google Slides", icon: "📊", enabled: true },
  { id: "google-docs", name: "Google Docs", icon: "📄", enabled: true },
  { id: "airtable", name: "Airtable", icon: "🟪", enabled: true },
]

type IntegrationFilter = "off" | "selected" | "open"

export default function SettingsPage() {
  const [model, setModel] = useState("opus-4-6")
  const [toolCategories, setToolCategories] = useState(initialToolCategories)
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [integrationFilter, setIntegrationFilter] = useState<IntegrationFilter>("open")

  const activeToolCount = toolCategories
    .flatMap((c) => c.tools)
    .filter((t) => t.enabled).length

  function toggleTool(categoryLabel: string, toolId: string) {
    setToolCategories((prev) =>
      prev.map((cat) =>
        cat.label === categoryLabel
          ? {
              ...cat,
              tools: cat.tools.map((t) =>
                t.id === toolId && !t.locked ? { ...t, enabled: !t.enabled } : t
              ),
            }
          : cat
      )
    )
  }

  function toggleIntegration(integrationId: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === integrationId && !i.locked ? { ...i, enabled: !i.enabled } : i
      )
    )
  }

  const filteredIntegrations = integrations.filter((i) => {
    if (integrationFilter === "off") return !i.enabled
    if (integrationFilter === "selected") return i.enabled
    return true
  })

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-xl p-6 pb-20">
        {/* Model Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
              <ChevronDown className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Model</h2>
              <p className="text-xs text-muted-foreground">Select the AI model for processing</p>
            </div>
          </div>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opus-4-6">Opus 4.6</SelectItem>
              <SelectItem value="sonnet-4-6">Sonnet 4.6</SelectItem>
              <SelectItem value="haiku-4-5">Haiku 4.5</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-5" />

        {/* Tools Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
              <LayoutGrid className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Tools</h2>
              <p className="text-xs text-muted-foreground">Enable or disable available tools</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {activeToolCount} active
          </Badge>
        </div>

        {/* Tool Categories */}
        <div className="space-y-5">
          {toolCategories.map((category) => (
            <div key={category.label}>
              <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => !tool.locked && toggleTool(category.label, tool.id)}
                      disabled={tool.locked}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                        tool.enabled
                          ? tool.color
                          : "bg-slate-50 text-slate-400 border-slate-200",
                        tool.locked
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer hover:shadow-sm"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tool.name}
                      {tool.id === "exa" && tool.enabled && (
                        <Switch
                          checked={tool.enabled}
                          onCheckedChange={() => toggleTool(category.label, tool.id)}
                          className="ml-1 h-4 w-7 data-[state=checked]:bg-green-500 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-3"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      {tool.locked && <Lock className="h-3 w-3 ml-0.5" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-5" />

        {/* Integrations */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
              <Grid3X3 className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Integrations</h2>
              <p className="text-xs text-muted-foreground">Connect external services</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-3 inline-flex rounded-lg border p-0.5">
            {(["off", "selected", "open"] as IntegrationFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setIntegrationFilter(filter)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                  integrationFilter === filter
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter === "off" ? "Off" : filter === "selected" ? "Selected" : "Open"}
              </button>
            ))}
          </div>

          {/* Integration Items */}
          <div className="space-y-2">
            {filteredIntegrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">
                    {typeof integration.icon === "string"
                      ? integration.icon
                      : (() => {
                          const Icon = integration.icon
                          return <Icon className="h-4 w-4" />
                        })()}
                  </span>
                  <span className="text-sm font-medium">{integration.name}</span>
                </div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                  disabled={integration.locked}
                />
              </div>
            ))}
            {filteredIntegrations.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No integrations match this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
