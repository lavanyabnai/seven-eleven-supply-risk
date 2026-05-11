"use client"
import Image from "next/image"
interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  hasSQL?: boolean
  hasScenario?: boolean
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="w-10 h-10 bg-white border border-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Image src="/assets/logo-4.png" alt="Logo" width={35} height={35} />
        </div>
      )}

      <div className={`max-w-3xl ${isUser ? "order-first" : ""}`}>
        <div
          className={`p-4 rounded-lg ${
            isUser ? "bg-blue-600 text-white ml-auto" : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <div className={`text-sm ${isUser ? "text-white" : "text-gray-800"}`}>
            {message.content.split("\n").map((line, index) => (
              <span key={index} className={index > 0 ? "block mt-2" : "block"}>
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : ""}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">👤</span>
        </div>
      )}
    </div>
  )
}
