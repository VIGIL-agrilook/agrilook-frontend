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
    },
    {
      id: 2,
      text: '지금 내 토양에 어떤 비료를 쓰는 게 좋아?',
      isUser: true,
      timestamp: new Date()
    },
    {
      id: 3,
      text: `안녕하세요, 김농부님! 농장에 있는 토마토 비료 처방 정보를 정리해 드릴게요.

### 토마토 비료 처방 정보

| 구분 | 비료 이름 | 성분 (%) | 규격 (kg/봉지) |
|------|-----------|----------|----------------|
| 밑거름 | 고추특호 | N 12, P₂O₅ 6, K₂O 5 | 20 |
| 밑거름 | 고추전용 | N 11, P₂O₅ 6, K₂O 8 | 20 |
| 밑거름 | 대풍PNS15(원예) | N 13, P₂O₅ 6, K₂O 6 | 15 |
| 웃거름 | 맞춤추비29호 | N 13, P₂O₅ 0, K₂O 10 | 20 |
| 웃거름 | 납작이 | N 13, P₂O₅ 0, K₂O 12 | 20 |
| 웃거름 | 빠른N | N 13, P₂O₅ 0, K₂O 13 | 20 |

👉 위 표는 김농부 님이 설정한 농지 면적에 맞춘 비료 처방량입니다.`,
      isUser: false,
      timestamp: new Date()
    },
    {
      id: 4,
      text: '비료 줄 때 주의해야 할 점도 알려줄래?',
      isUser: true,
      timestamp: new Date()
    },
    {
      id: 5,
      text: `물론입니다, 김농부님! 비료 시비 시 주의사항을 정리해 드릴게요.
적정량 준수: 과다/부족 시 작물 생육에 문제 발생
시기 지키기: 밑거름·추비 시기를 놓치지 말기
비료 혼합 주의: 성분 반응으로 효과 손실 가능
토양 검사: 현재 pH 6.5, 유기물 22% → 다음 시비 전 재검 추천
환경 주의: 빗물에 씻겨 수질 오염 위험 → 물 빠짐 좋은 밭은 조심
보관: 환기 잘되는 그늘에 두고 습기·건조 주의`,
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
                    className={`max-w-[92%] md:max-w-2xl lg:max-w-3xl px-3 py-2 md:px-4 md:py-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="break-words">{renderMessageContent(message.text)}</div>
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