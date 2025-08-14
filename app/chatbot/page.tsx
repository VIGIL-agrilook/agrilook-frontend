'use client'

import { useState, useRef, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ResponsiveH1, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* 메인 컨테이너 - 남은 공간을 모두 차지 */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        {/* 상단: 팜멘토 캐릭터 - 고정 높이 */}
        <div className="text-center py-4 md:py-6 flex-shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4">
            {/* 배경 그라데이션 원 */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-xl animate-pulse"></div>
            
            {/* 내부 원 */}
            <div className="absolute inset-2 bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-full shadow-lg"></div>
            
            {/* 팜멘토 이미지 */}
            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner hover:scale-105 transition-transform duration-300">
              <Image 
                src="/farmento.png" 
                alt="팜멘토 캐릭터" 
                width={64}
                height={64}
                className="object-cover w-full h-full p-1 md:p-2"
              />
            </div>
            
            {/* 반짝이는 효과 */}
            <div className="absolute top-1 left-1 w-3 h-3 md:w-4 md:h-4 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 md:w-3 md:h-3 bg-white/40 rounded-full animate-pulse"></div>
          </div>
          
          <ResponsiveH1 className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-1 md:mb-2">
            팜멘토 챗봇
          </ResponsiveH1>
          <ResponsiveP className="text-muted-foreground font-medium">농업 전문 AI 어시스턴트</ResponsiveP>
        </div>

        {/* 중앙: 채팅 영역 - 남은 공간을 모두 차지하고 스크롤 가능 */}
        <Card className="flex-1 bg-card mb-4 flex flex-col min-h-0">
          <CardContent className="flex-1 flex flex-col p-4 md:p-6">
            {/* 메시지 영역 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-md px-3 py-2 md:px-4 md:py-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <ResponsiveP className="break-words">{message.text}</ResponsiveP>
                    <ResponsiveSmall className="opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </ResponsiveSmall>
                  </div>
                </div>
              ))}
              {/* 스크롤을 맨 아래로 이동시키기 위한 빈 div */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* 하단 안내 텍스트 */}
            <div className="text-center flex-shrink-0">
              <ResponsiveSmall className="text-gray-400">
                * RAG 기반 챗봇 연동 예정
              </ResponsiveSmall>
            </div>
          </CardContent>
        </Card>

        {/* 하단: 입력창 - 고정 위치 */}
        <div className="flex gap-2 pb-4 md:pb-6 flex-shrink-0">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="농업 관련 질문을 입력하세요..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-primary text-primary-foreground px-4 md:px-6"
          >
            전송
          </Button>
        </div>
      </main>
    </div>
  )
}