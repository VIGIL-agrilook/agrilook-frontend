'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import SoilStatusSection from '@/components/soil-status-section'
import CropSection from '@/components/crop-section'
import FertilizerSection from '@/components/fertilizer-section'
import CompostSection from '@/components/compost-section'
import SoilChartSection from '@/components/soil-chart-section'

export default function DashboardPage() {
  const [isPremium, setIsPremium] = useState(false)

  const handlePremiumUpgrade = () => {
    setIsPremium(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-farm-brown mb-8">대시보드</h1>
        
        {/* 3행 2열 그리드 */}
        <div className="grid grid-cols-2 grid-rows-[200px_450px_350px] gap-6 h-[1100px]">
          {/* 섹션 1: 토양 상태 (1행 전체) */}
          <div className="col-span-2">
            <SoilStatusSection 
              isPremium={isPremium}
              onUpgrade={handlePremiumUpgrade}
            />
          </div>
          
          {/* 섹션 2: 내 작물 (2행 왼쪽) */}
          <div className={`${!isPremium ? 'blur-section' : ''}`}>
            <CropSection />
          </div>
          
          {/* 섹션 5: 시계열 그래프 (2행 오른쪽) */}
          <div className={`${!isPremium ? 'blur-section' : ''}`}>
            <SoilChartSection />
          </div>
          
          {/* 섹션 3: 비료 관리 (3행 왼쪽) */}
          <div className={`${!isPremium ? 'blur-section' : ''}`}>
            <FertilizerSection />
          </div>
          
          {/* 섹션 4: 퇴비 관리 (3행 오른쪽) */}
          <div className={`${!isPremium ? 'blur-section' : ''}`}>
            <CompostSection />
          </div>
        </div>
      </main>
    </div>
  )
}
