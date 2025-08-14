'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '안녕하세요! 팜멘토입니다. 농업 관련 궁금한 점이 있으시면 언제든 물어보세요!',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    const botResponse: Message = {
      id: messages.length + 2,
      text: '죄송합니다. 현재 RAG 기반 챗봇 연동을 준비 중입니다. 곧 더 정확한 답변을 드릴 수 있을 예정입니다!',
      isUser: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 상단: 팜멘토 캐릭터 */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* 배경 그라데이션 원 */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-2xl animate-pulse"></div>
            
            {/* 내부 원 */}
            <div className="absolute inset-2 bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-full shadow-lg"></div>
            
            {/* 팜멘토 이미지 */}
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner hover:scale-105 transition-transform duration-300">
              <Image 
                src="/farmento.png" 
                alt="팜멘토 캐릭터" 
                width={96}
                height={96}
                className="object-cover w-full h-full p-2"
              />
            </div>
            
            {/* 반짝이는 효과 */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
            팜멘토 챗봇
          </h1>
          <p className="text-muted-foreground text-lg font-medium">농업 전문 AI 어시스턴트</p>
        </div>

        {/* 중앙: 채팅 영역 */}
        <Card className="bg-card mb-6">
          <CardContent className="p-6">
            <div className="h-96 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 text-center">
              * RAG 기반 챗봇 연동 예정
            </div>
          </CardContent>
        </Card>

        {/* 하단: 입력창 */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="농업 관련 질문을 입력하세요..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-primary text-primary-foreground"
          >
            전송
          </Button>
        </div>
      </main>
    </div>
  )
}