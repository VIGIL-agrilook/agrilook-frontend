'use client'

import { useState, useRef, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ResponsiveH1, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import Image from 'next/image'
import { apiService } from '@/lib/api'
import { MicButton } from '@/components/mic-button'
import { MessageItem } from '@/components/message-item'
import { useTTS } from '@/lib/hooks/useTTS'

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
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // TTS 훅 사용
  const { speak } = useTTS({
    language: 'ko-KR',
    rate: 1,
    pitch: 1,
    volume: 1
  })

  // 메시지 내 간단한 마크다운(제목/테이블) 렌더러
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []

    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      const trimmed = line.trim()

      // 빈 줄은 단락 구분으로 처리
      if (trimmed.length === 0) {
        i += 1
        continue
      }

      // 제목 (### ) 처리
      if (trimmed.startsWith('### ')) {
        elements.push(
          <div key={`h3-${i}`} className="font-semibold text-sm md:text-base mt-2 mb-1">
            {trimmed.replace(/^###\s+/, '')}
          </div>
        )
        i += 1
        continue
      }

      // 테이블 블록 처리: 연속된 '|' 시작 라인 수집
      if (trimmed.startsWith('|')) {
        const tableLines: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim())
          i += 1
        }

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0]
            .split('|')
            .map((c) => c.trim())
            .filter((c) => c.length > 0)

          // 본문 행: 구분선(---) 라인 제거
          const bodyLines = tableLines.slice(1).filter((row) => !/^\|?\s*[-: ]+\s*(\|\s*[-: ]+\s*)+\|?$/.test(row))

          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-2">
              <table className="w-full border-collapse text-[11px] md:text-sm">
                <thead>
                  <tr>
                    {headerCells.map((cell, idx) => (
                      <th key={`th-${idx}`} className="border px-2 py-1 bg-muted/50 text-left">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyLines.map((row, rIdx) => {
                    const cells = row
                      .split('|')
                      .map((c) => c.trim())
                      .filter((c) => c.length > 0)
                    return (
                      <tr key={`tr-${rIdx}`}> 
                        {cells.map((c, cIdx) => (
                          <td key={`td-${rIdx}-${cIdx}`} className="border px-2 py-1 align-top">
                            {c}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
          continue
        }
      }

      // 일반 문단: 다음 빈 줄 전까지 묶어서 출력
      const para: string[] = []
      while (i < lines.length && lines[i].trim().length > 0 && !lines[i].trim().startsWith('|')) {
        para.push(lines[i])
        i += 1
      }
      if (para.length > 0) {
        elements.push(
          <div key={`p-${i}`} className="whitespace-pre-wrap text-xs md:text-sm leading-snug">
            {para.join('\n')}
          </div>
        )
      }
    }

    return <>{elements}</>
  }

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue
    if (!textToSend.trim() || isLoading) {
      return
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    }

    // 사용자 메시지 추가
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // 백엔드 API 호출 - 직접 fetch 사용
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textToSend }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: data.answer,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      
      // TTS 자동 재생 비활성화 - 버튼으로 제어
      // speak(data.answer)
    } catch (error) {
      console.error('챗봇 API 호출 오류:', error)
      
      const errorResponse: Message = {
        id: messages.length + 2,
        text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  // 음성 인식 transcript 변경 핸들러
  const handleTranscriptChange = (transcript: string) => {
    setInputValue(transcript)
  }

  // 음성 인식 최종 transcript 핸들러
  const handleTranscriptFinal = (transcript: string) => {
    handleSendMessage(transcript)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      
      // 한글 입력 완료를 위해 잠시 대기
      setTimeout(() => {
        handleSendMessage()
      }, 10)
    }
  }

  const handleCompositionStart = () => {
    console.log('한글 입력 시작')
  }

  const handleCompositionEnd = () => {
    console.log('한글 입력 완료')
  }

  const handleSendButtonClick = () => {
    handleSendMessage()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* 메인 컨테이너 - 남은 공간을 모두 차지 */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pt-20">
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
                <MessageItem
                  key={message.id}
                  id={message.id}
                  text={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  renderMessageContent={renderMessageContent}
                />
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
      </main>

      {/* 하단: 입력창 - 화면 하단에 고정 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-10">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="농업 관련 질문을 입력하세요..."
            className="flex-1"
          />
          {/* 음성 인식 버튼 */}
          <MicButton
            onTranscriptChange={handleTranscriptChange}
            onTranscriptFinal={handleTranscriptFinal}
            disabled={isLoading}
            className="bg-primary text-primary-foreground"
          />
          <Button 
            onClick={handleSendButtonClick}
            disabled={isLoading}
            className="bg-primary text-primary-foreground px-4 md:px-6"
          >
            {isLoading ? '전송 중...' : '전송'}
          </Button>
        </div>
      </div>

      {/* 입력창 높이만큼 하단 여백 추가 */}
      <div className="h-20 md:h-24"></div>
    </div>
  )
}