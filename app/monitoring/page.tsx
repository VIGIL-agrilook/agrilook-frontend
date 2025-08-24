'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FloatingChatButton from '@/components/floating-chat-button'
import { StreamPlayer, StreamStatus } from '@/components/stream-player'
import IntruderSection from '@/components/intruder-section'

export default function MonitoringPage() {
  const [mainCCTV, setMainCCTV] = useState(1)

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

  const currentMainCCTV = cctvData.find(cctv => cctv.id === mainCCTV)
  const subCCTVs = cctvData.filter(cctv => cctv.id !== mainCCTV)

  const handleSetMain = (cctvId: number) => {
    setMainCCTV(cctvId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-4 md:py-8 pt-20">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-8">실시간 관리</h1>
        
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
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                    <StreamPlayer 
                      key={`main-${currentMainCCTV?.id}`}
                      cctvId={currentMainCCTV?.id || 1}
                      className="w-full h-full"
                      showControls={true}
                      showInfo={false}
                    />
                    {/* 메인 화면 오버레이 정보 */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm z-10">
                      {currentMainCCTV?.name} - {currentMainCCTV?.location}
                    </div>
                  </div>
                </div>

                {/* 하단: 서브 화면 2개 */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {subCCTVs.map((cctv) => (
                    <div key={cctv.id} className="relative">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                        <StreamPlayer 
                          cctvId={cctv.id}
                          className="w-full h-full"
                          showControls={false}
                          showInfo={false}
                        />
                        {/* 서브 화면 오버레이 정보 */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs z-10">
                          {cctv.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-400 mt-4">* 실시간 CCTV 스트림</div>
              </CardContent>
            </Card>
          </div>
          
          {/* 오른쪽: 침입자 감지 현황 */}
          <div>
            <IntruderSection farmId="farm_0001" refreshInterval={30000} />
          </div>
        </div>
      </main>
      
      <FloatingChatButton />
    </div>
  )
}
