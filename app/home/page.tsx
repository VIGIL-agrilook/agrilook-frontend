'use client'

import Navigation from '@/components/navigation'
import SummaryCard from '@/components/summary-card'
import FloatingChatButton from '@/components/floating-chat-button'
import Farm3DViewer from '@/components/farm-3d-viewer'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const summaryCards = [
    {
      title: '🌱 내 작물',
      // description: '현재 재배 중인 작물 현황',
      // icon: '🌱',
      onClick: () => router.push('/dashboard'),
      details: (
        <div className="space-y-1 text-lg">
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
      // description: 'pH, EC, 영양소 상태',
      // icon: '🌍',
      onClick: () => router.push('/dashboard'),
      details: (
        <div className="space-y-1 text-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">pH</span>
            <span className="text-green-600 font-bold">6.2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">EC</span>
            <span className="text-green-600 font-bold">1.8 dS/m</span>
          </div>
          <div className="text-center text-green-600 text-xs mt-1">
            ✓ 모든 수치 적정 범위
          </div>
        </div>
      )
    },
    {
      title: '🚨 침입자 관리',
      // description: '실시간 모니터링 현황',
      // icon: '🚨',
      onClick: () => router.push('/monitoring'),
      details: (
        <div className="space-y-1 text-lg">
          <div className="text-red-600 font-medium text-center mb-2">
            24시간 내 침입자 3건 감지
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-s">
              <span>🐗 멧돼지</span>
              <span>오늘 06:23</span>
            </div>
            <div className="flex justify-between text-s">
              <span>🦌 고라니</span>
              <span>어제 23:50</span>
            </div>
            <div className="flex justify-between text-s">
              <span>🐦 조류 떼</span>
              <span>어제 18:15</span>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-farm-light-green">
      <Navigation />
      

        <main className="container mx-auto px-4 py-8">

        {/* 3D 모델과 오버레이 카드들 */}
        <div className="relative h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 3D 모델 배경 */}
          <Farm3DViewer className="w-full h-full" />
          
          {/* 상단에 오버레이된 요약 카드들 */}
          <div className="absolute top-4 left-4 right-4 grid grid-cols-3 gap-4 z-10">
            {summaryCards.map((card, index) => (
              <div key={index} className="col-span-1">
                <SummaryCard 
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  onClick={card.onClick}
                  details={card.details}
                  transparent={true} 
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <FloatingChatButton />
    </div>
  )
}
