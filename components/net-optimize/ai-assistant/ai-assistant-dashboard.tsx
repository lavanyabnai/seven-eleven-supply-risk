"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ChevronDown, Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessage from "./chat-message"
import SQLQueryPanel from "./sql-query-panel"
import ScenariosPanel from "./scenarios-panel"
import Image from "next/image"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  hasSQL?: boolean
  hasScenario?: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hi, I'm Leapfrog and I'm here to help!\nAsk me questions about your model data and I will respond with SQL, data grids, and scenario item updates.",
    timestamp: new Date(),
  },
]

const suggestedQueries = [
  "What are the top 5 products by demand?",
  "Increase facility costs by 5% at my North American DCs",
  "Show me the most profitable customers",
  "Create a scenario increasing transportation cost by 5%",
  "What are my highest cost routes?",
]

export default function AIAssistantDashboard() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedSQL, setExpandedSQL] = useState<string | null>(null)
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        hasSQL: inputValue.toLowerCase().includes("top") || inputValue.toLowerCase().includes("products"),
        hasScenario: inputValue.toLowerCase().includes("increase") || inputValue.toLowerCase().includes("scenario"),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("top") && query.toLowerCase().includes("products")) {
      return "I'll help you find the top 5 products by demand. Let me query the data for you."
    }
    if (query.toLowerCase().includes("increase") && query.toLowerCase().includes("cost")) {
      return "I'll create a scenario to increase facility costs by 5% for North American distribution centers."
    }
    if (query.toLowerCase().includes("profitable")) {
      return "Here are your most profitable customers based on the latest data analysis."
    }
    return "I understand your request. Let me analyze the data and provide you with the relevant information."
  }

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-100px)]">
      {/* Left Sidebar - Conversations */}
      {isSidebarOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white border border-blue-600 rounded-full flex items-center justify-center p-1">
                  <Image src="/assets/logo-4.png" alt="Logo" width={35} height={35} />
                </div>
                <div>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                    Conversations <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)} className="h-8 w-8 p-0">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-800">Current Conversation</div>
                <div className="text-xs text-blue-600 mt-1">Supply Chain Analysis</div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="/net-optimize/ai/conversations">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Conversations
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Actions */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isSidebarOpen && (
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)} className="h-8 w-8 p-0">
                <Menu className="w-4 h-4" />
              </Button>
            )}
              <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                <Link href="/net-optimize/ai/conversations">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-200">
                ▶ S@S
              </Button>
              <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-200">
                ▶ Run
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />

              {/* SQL Query Panel */}
              {message.hasSQL && (
                <div className="mt-4">
                  <SQLQueryPanel
                    messageId={message.id}
                    isExpanded={expandedSQL === message.id}
                    onToggle={() => setExpandedSQL(expandedSQL === message.id ? null : message.id)}
                  />
                </div>
              )}

              {/* Scenarios Panel */}
              {message.hasScenario && (
                <div className="mt-4">
                  <ScenariosPanel
                    messageId={message.id}
                    isExpanded={expandedScenario === message.id}
                    onToggle={() => setExpandedScenario(expandedScenario === message.id ? null : message.id)}
                  />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white border border-blue-600 rounded-full flex items-center justify-center p-1">
                <Image src="/assets/logo-4.png" alt="Logo" width={35} height={35} />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

       {/* Suggested Queries */}
       {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {suggestedQueries.slice(0, 4).map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(query)}
                  className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <div className="w-6 h-6 border border-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Image src="/assets/logo-4.png" alt="Logo" width={35} height={35} />
                  </div>
                  <span className="text-sm text-gray-700">{query}</span>
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white border border-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Image src="/assets/logo-4.png" alt="Logo" width={35} height={35} />
            </div>
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your supply chain data..."
                className="pr-12"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 ml-11">Creating new message...</div>
        </div>
      </div>
    </div>
  )
}
