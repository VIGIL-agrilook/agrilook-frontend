'use client'

import Navigation from '@/components/navigation'
import SummaryCard from '@/components/summary-card'
import FloatingChatButton from '@/components/floating-chat-button'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const summaryCards = [
    {
      title: '내 작물',
      description: '현재 재배 중인 작물 현황',
      icon: '🌱',
      onClick: () => router.push('/dashboard')
    },
    {
      title: '토양 성분',
      description: 'pH, EC, 영양소 상태',
      icon: '🌍',
      onClick: () => router.push('/dashboard')
    },
    {
      title: '침입자',
      description: '실시간 모니터링 현황',
      icon: '🚨',
      onClick: () => router.push('/monitoring')
    }
  ]

  return (
    <div className="min-h-screen bg-farm-light-green">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* 소개 텍스트 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-farm-brown mb-4">
            들여다밭 스마트 농업 플랫폼
          </h1>
          <p className="text-farm-brown text-lg">
            AI와 IoT 기술로 농장을 스마트하게 관리하세요
          </p>
        </div>

        {/* 3x3 그리드 레이아웃 */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]">
          {/* 1행: 요약 카드들 */}
          {summaryCards.map((card, index) => (
            <div key={index} className="col-span-1">
              <SummaryCard {...card} />
            </div>
          ))}
          
          {/* 2-3행: 농장 이미지 (6칸 차지) */}
          <div className="col-span-3 row-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://sjc.microlink.io/nJCFki3nEtkjhhSUdLSJZeg4KbKuBbKAKPAwyYt6eDxWLAzp-sNrpsw05p3fp_QVYulAq-sgu0ZS3UXNqe4WRQ.jpeg"
              alt="농장 전경"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>

      <FloatingChatButton />
    </div>
  )
}
