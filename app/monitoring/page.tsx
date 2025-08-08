'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MonitoringPage() {
  const [showIntruders, setShowIntruders] = useState(false)

  const intruderImages = [
    '/placeholder.svg?height=80&width=200&text=멧돼지',
    '/placeholder.svg?height=80&width=200&text=고라니',
    '/placeholder.svg?height=80&width=200&text=조류떼'
  ]

  return (
    <div className="min-h-screen bg-farm-light-green">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-farm-brown mb-8">실시간 관리</h1>
        
        {/* 2x2 그리드 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[600px]">
          {/* 1-3사분면: CCTV 영상 영역 */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-farm-brown">CCTV 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">CCTV 영상 연결 대기중</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">* 공인IP 데이터 연동 예정</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-farm-brown">CCTV 2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">CCTV 영상 연결 대기중</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">* 공인IP 데이터 연동 예정</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-farm-brown">CCTV 3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">CCTV 영상 연결 대기중</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">* 공인IP 데이터 연동 예정</div>
            </CardContent>
          </Card>
          
          {/* 4사분면: 침입자 현황 */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-farm-brown">침입자 현황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-red-600 font-semibold">
                최근 24시간 내 침입자 3건 감지
              </div>
              <div className="text-sm text-gray-600">
                • 멧돼지 (오늘 06:23)<br/>
                • 고라니 (어제 23:50)<br/>
                • 조류 떼 (어제 18:15)
              </div>
              <Button 
                onClick={() => setShowIntruders(!showIntruders)}
                className="bg-farm-orange hover:bg-farm-orange/90 text-white"
              >
                {showIntruders ? '침입자 목록 숨기기' : '침입자 보기'}
              </Button>
              
              {showIntruders && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {intruderImages.map((src, index) => (
                    <img
                      key={index}
                      src={src || "/placeholder.svg"}
                      alt={`침입자 ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-400">* Mock 데이터 - 실제 AI 분석 연동 예정</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
