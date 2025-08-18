'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import CropSection from '@/components/crop-section'
import SoilWeatherSection from '@/components/soil-weather-section'
import FertilizerSection from '@/components/fertilizer-section'
import CompostSection from '@/components/compost-section'
import SoilChartSection from '@/components/soil-chart-section'
import FloatingChatButton from '@/components/floating-chat-button'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const [isPremium, setIsPremium] = useState(false)

  const handlePremiumUpgrade = () => {
    setIsPremium(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-farm-brown mb-4 sm:mb-8">대시보드</h1>
        
        {/* 행별 동일 높이 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
          
          {/* 1행: 내 작물과 토양 상태 & 날씨 - 동일 높이 */}
          <div className="h-[360px] lg:h-[450px]">
            <CropSection />
          </div>
          
          <div className="h-[360px] lg:h-[450px]">
            <SoilWeatherSection isPremium={isPremium} />
          </div>
          
          {/* 2행: 토양 진단 버튼 (전체 너비) */}
          {!isPremium && (
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-green-300 p-4 h-[96px] sm:p-8 sm:h-[120px]">
                <div className="text-center">
                  <Button 
                    onClick={handlePremiumUpgrade}
                    className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-4 sm:text-xl sm:px-12 sm:py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    size="lg"
                  >
                    🌱 토양 센서로 내 토양 진단하기
                  </Button>
                  <div className="text-sm text-gray-600 mt-2 sm:mt-4">
                    정확한 토양 성분 분석과 맞춤형 관리 방안을 제공합니다
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 3행: 비료 관리와 퇴비 관리 - 동일 높이 */}
          <div className={`h-[280px] lg:h-[350px] ${isPremium ? 'premium-section' : 'blur-section'}`}>
            <FertilizerSection />
          </div>
          
          <div className={`h-[280px] lg:h-[350px] ${isPremium ? 'premium-section' : 'blur-section'}`}>
            <CompostSection />
          </div>
          
          {/* 4행: 시계열 그래프 (전체 너비) */}
          <div className={`lg:col-span-2 h-[380px] lg:h-[500px] ${isPremium ? 'premium-section' : 'blur-section'}`}>
            <SoilChartSection />
          </div>
        </div>
      </main>
      
      <FloatingChatButton />
    </div>
  )
}