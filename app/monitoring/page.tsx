'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FloatingChatButton from '@/components/floating-chat-button'
import { StreamPlayer, StreamStatus } from '@/components/stream-player'

export default function MonitoringPage() {
  const [mainCCTV, setMainCCTV] = useState(1)
  const [currentIntruderIndex, setCurrentIntruderIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)

  const cctvData = [
    {
      id: 1,
      name: 'CCTV 1',
      location: '농장 입구',
      image: '/cctv1.jpg'
    },
    {
      id: 2,
      name: 'CCTV 2',
      location: '작물 구역 A',
      image: '/cctv2.jpg'
    },
    {
      id: 3,
      name: 'CCTV 3',
      location: '작물 구역 B',
      image: '/cctv3.jpg'
    }
  ]

  const intruderData = [
    {
      id: 1,
      name: '멧돼지',
      time: '오늘 06:23',
      image: '/intruder1.png'
    },
    {
      id: 2,
      name: '고라니',
      time: '어제 23:50',
      image: '/intruder2.png'
    },
    {
      id: 3,
      name: '조류 떼',
      time: '어제 18:15',
      image: '/intruder3.png'
    }
  ]

  const currentMainCCTV = cctvData.find(cctv => cctv.id === mainCCTV)
  const subCCTVs = cctvData.filter(cctv => cctv.id !== mainCCTV)
  const currentIntruder = intruderData[currentIntruderIndex]

  const handleSetMain = (cctvId: number) => {
    setMainCCTV(cctvId)
  }

  const handlePrevIntruder = () => {
    setSlideDirection('right')
    setTimeout(() => {
      setCurrentIntruderIndex(prev => 
        prev === 0 ? intruderData.length - 1 : prev - 1
      )
      setSlideDirection(null)
    }, 150)
  }

  const handleNextIntruder = () => {
    setSlideDirection('left')
    setTimeout(() => {
      setCurrentIntruderIndex(prev => 
        prev === intruderData.length - 1 ? 0 : prev + 1
      )
      setSlideDirection(null)
    }, 150)
  }

  const handleDirectIntruder = (index: number) => {
    const direction = index > currentIntruderIndex ? 'left' : 'right'
    setSlideDirection(direction)
    setTimeout(() => {
      setCurrentIntruderIndex(index)
      setSlideDirection(null)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-4 md:py-8 pt-20">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-8">실시간 관리</h1>
        
        {/* 실시간 스트림 플레이어 */}
        <div className="mb-6">
          <Card className="bg-card">
            <CardHeader className="py-3 md:py-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-base md:text-lg">실시간 스트림</CardTitle>
                <StreamStatus />
              </div>
            </CardHeader>
            <CardContent className="pt-3 md:pt-6">
              <StreamPlayer />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          
          {/* 왼쪽: CCTV 멀티뷰 영역 */}
          <div>
            <Card className="bg-card">
              <CardHeader className="py-3 md:py-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground text-base md:text-lg">CCTV 모니터링</CardTitle>
                  <div className="flex space-x-2">
                    {cctvData.map((cctv) => (
                      <Button
                        key={cctv.id}
                        onClick={() => handleSetMain(cctv.id)}
                        variant={mainCCTV === cctv.id ? "default" : "outline"}
                        size="sm"
                        className={`transition-all duration-200 ${
                          mainCCTV === cctv.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        {cctv.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 md:pt-6">
                {/* 상단: 메인 화면 */}
                <div className="mb-4">
                  <div className="relative h-56 md:h-80 rounded-lg overflow-hidden bg-gray-900">
                    <Image
                      src={currentMainCCTV?.image || '/cctv1.jpg'}
                      alt={`${currentMainCCTV?.name} 메인 영상`}
                      fill
                      className="object-cover"
                    />
                    {/* 메인 화면 오버레이 정보 */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      {currentMainCCTV?.name} - {currentMainCCTV?.location}
                    </div>
                  </div>
                </div>

                {/* 하단: 서브 화면 2개 */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {subCCTVs.map((cctv) => (
                    <div key={cctv.id} className="relative">
                      <div className="h-16 md:h-32 rounded-lg overflow-hidden bg-gray-900">
                        <Image
                          src={cctv.image}
                          alt={`${cctv.name} 서브 영상`}
                          fill
                          className="object-cover"
                        />
                        {/* 서브 화면 오버레이 정보 */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {cctv.name}
                        </div>
                      </div>
                      {/* 메인으로 보기 버튼 */}
                      <Button
                        onClick={() => handleSetMain(cctv.id)}
                        className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        size="sm"
                      >
                        메인으로 보기
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-400 mt-4">* 실시간 CCTV 영상</div>
              </CardContent>
            </Card>
          </div>
          
          {/* 오른쪽: 침입자 현황 */}
          <div>
            <Card className="bg-card h-full">
              <CardHeader className="py-3 md:py-6">
                <CardTitle className="text-foreground text-base md:text-lg">침입자 현황</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4 pt-3 md:pt-6">
                <div className="text-red-600 font-semibold">
                  최근 24시간 내 침입자 {intruderData.length}건 감지
                </div>
                
                {/* 침입자 슬라이더 */}
                <div className="relative">
                  {/* 침입자 이미지 - 슬라이드 효과 */}
                  <div className="h-40 md:h-96 rounded-lg overflow-hidden bg-gray-100">
                    <div 
                      className={`w-full h-full transition-transform duration-300 ease-in-out ${
                        slideDirection === 'left' ? 'transform -translate-x-full' :
                        slideDirection === 'right' ? 'transform translate-x-full' :
                        'transform translate-x-0'
                      }`}
                    >
                      <Image
                        src={currentIntruder.image}
                        alt={`${currentIntruder.name} 침입자`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* 화살표 버튼 */}
                  <Button
                    onClick={handlePrevIntruder}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 transition-all duration-200 hover:scale-110"
                    size="sm"
                  >
                    ←
                  </Button>
                  <Button
                    onClick={handleNextIntruder}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 transition-all duration-200 hover:scale-110"
                    size="sm"
                  >
                    →
                  </Button>
                  
                  {/* 침입자 정보 */}
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-foreground">
                      {currentIntruder.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentIntruder.time}
                    </div>
                  </div>
                  
                  {/* 인디케이터 점 */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {intruderData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDirectIntruder(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                          index === currentIntruderIndex
                            ? 'bg-primary scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-400">* Mock 데이터 - 실제 AI 분석 연동 예정</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <FloatingChatButton />
    </div>
  )
}
