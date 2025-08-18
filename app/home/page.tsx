'use client'

import Navigation from '@/components/navigation'
import SummaryCard from '@/components/summary-card'
import FloatingChatButton from '@/components/floating-chat-button'
import Farm3DViewer from '@/components/farm-3d-viewer'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const router = useRouter()

  const summaryCards = [
    {
      title: '🌱 내 작물',
      onClick: () => router.push('/dashboard'),
      details: (
        <div className="space-y-0.5 md:space-y-1 text-sm md:text-lg leading-tight">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">🥒 오이</span>
            <span className="text-green-600">생육 양호</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">🍅 토마토</span>
            <span className="text-blue-600">개화기</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">🥬 배추</span>
            <span className="text-orange-600">결구기</span>
          </div>
        </div>
      )
    },
    {
      title: '🌍 토양 성분',
      onClick: () => router.push('/dashboard'),
      details: (
        <div className="space-y-0.5 md:space-y-1 text-sm md:text-lg leading-tight">
          <div className="flex justify-between items-center">
            <span className="font-medium">pH</span>
            <span className="text-green-600 font-bold">6.2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">EC</span>
            <span className="text-green-600 font-bold">1.8 dS/m</span>
          </div>
          <div className="text-center text-green-600 text-[10px] md:text-xs mt-0.5 md:mt-1">
            ✓ 모든 수치 적정 범위
          </div>
        </div>
      )
    },
    {
      title: '🚨 침입자 관리',
      onClick: () => router.push('/monitoring'),
      details: (
        <div className="space-y-0.5 md:space-y-1 text-sm md:text-lg leading-tight">
          <div className="text-red-600 font-medium text-center mb-1 md:mb-2">
            24시간 내 침입자 3건 감지
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <div className="flex justify-between text-xs md:text-sm">
              <span>🐗 멧돼지</span>
              <span>오늘 06:23</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span>🦌 고라니</span>
              <span>어제 23:50</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span>🐦 조류 떼</span>
              <span>어제 18:15</span>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto py-4 space-y-4 pt-20">
        {/* 데스크톱: 3D 모델과 오버레이 카드들 */}
        <div className="relative h-[800px] bg-card rounded-lg shadow-lg overflow-hidden hidden md:block">
          {/* 3D 모델 배경 */}
          <Farm3DViewer className="w-full h-full" />
          
          {/* 상단에 오버레이된 요약 카드들 */}
          <div className="absolute top-4 left-4 right-4 grid grid-cols-3 gap-4 z-10">
            {summaryCards.map((card, index) => (
              <div key={index} className="col-span-1">
                <SummaryCard 
                  title={card.title}
                  onClick={card.onClick}
                  details={card.details}
                  transparent={true} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* 모바일: 한 화면에 3개 섹션이 모두 보이도록 3행 레이아웃 + 아래에 3D 모델 */}
        <div className="md:hidden">
          <div className="grid grid-rows-3 gap-2">
            {summaryCards.map((card, index) => (
              <div key={index} className="min-h-0">
                <SummaryCard 
                  title={card.title}
                  onClick={card.onClick}
                  details={card.details}
                  transparent={false}
                  compact
                />
              </div>
            ))}
          </div>

          {/* 모바일: 3D 모델을 카드 아래에 배치 */}
          <div className="mt-3 bg-card rounded-lg shadow-lg overflow-hidden">
            <Farm3DViewer className="w-full aspect-[16/9]" />
          </div>
        </div>
      </div>
      
      {/* 날씨 버튼 */}
      <button
        onClick={() => router.push('/dashboard')}
        className="fixed bottom-24 right-6 w-16 h-16 md:bottom-32 md:right-8 md:w-24 md:h-24 bg-farm-orange bg-opacity-95 rounded-full shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center"
      >
        <div className="w-12 h-12 md:w-20 md:h-20 bg-farm-cream rounded-full flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <div className="text-xl md:text-3xl mb-0 md:mb-1">☀️</div>
            <div className="text-[10px] md:text-base font-bold text-blue-700">24°C</div>
          </div>
        </div>
      </button>
      
      <FloatingChatButton />
    </div>
  )
}
