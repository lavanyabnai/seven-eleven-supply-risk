"use client"

import { useState } from "react"
import { Plus, MessageSquare, Clock, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messageCount: number
  type: "supply-chain" | "risk-analysis" | "cost-optimization" | "transportation"
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    title: "Supply Chain Analysis",
    lastMessage: "What are the top 5 products by demand?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    messageCount: 12,
    type: "supply-chain",
  },
  {
    id: "2",
    title: "Risk Mitigation Discussion",
    lastMessage: "Show me supplier risk scores for North America",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    messageCount: 8,
    type: "risk-analysis",
  },
  {
    id: "3",
    title: "Cost Optimization Review",
    lastMessage: "Increase facility costs by 5% at my North American DCs",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    messageCount: 15,
    type: "cost-optimization",
  },
  {
    id: "4",
    title: "Transportation Route Planning",
    lastMessage: "What are my highest cost routes?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    messageCount: 6,
    type: "transportation",
  },
  {
    id: "5",
    title: "Inventory Management",
    lastMessage: "Show me products with low inventory levels",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    messageCount: 9,
    type: "supply-chain",
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "supply-chain":
      return "bg-blue-100 text-blue-800"
    case "risk-analysis":
      return "bg-red-100 text-red-800"
    case "cost-optimization":
      return "bg-green-100 text-green-800"
    case "transportation":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "supply-chain":
      return "Supply Chain"
    case "risk-analysis":
      return "Risk Analysis"
    case "cost-optimization":
      return "Cost Optimization"
    case "transportation":
      return "Transportation"
    default:
      return "General"
  }
}

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredConversations = sampleConversations.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || conv.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Assistant Conversations</h1>
                <p className="text-gray-600 mt-1">Manage and continue your supply chain analysis conversations</p>
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/net-optimize/ai">
                  <Plus className="w-4 h-4 mr-2" />
                  New Conversation
                </Link>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="supply-chain">Supply Chain</option>
                <option value="risk-analysis">Risk Analysis</option>
                <option value="cost-optimization">Cost Optimization</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>

            {/* Conversations List */}
            <div className="space-y-4">
              {filteredConversations.map((conversation) => (
                <Link key={conversation.id} href={`/net-optimize/ai?conversation=${conversation.id}`}>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900 truncate">{conversation.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(conversation.type)}`}
                            >
                              {getTypeLabel(conversation.type)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{conversation.timestamp.toLocaleDateString()}</span>
                            </div>
                            <span>{conversation.messageCount} messages</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredConversations.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Start a new conversation to begin"}
                </p>
                <Button asChild>
                  <Link href="/net-optimize/ai">
                    <Plus className="w-4 h-4 mr-2" />
                    New Conversation
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
