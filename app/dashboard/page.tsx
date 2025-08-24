'use client'

import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/navigation'
import CropSection from '@/components/crop-section'
import SoilWeatherSection from '@/components/soil-weather-section'
import FertilizerSection from '@/components/fertilizer-section'
import CompostSection from '@/components/compost-section'
import SoilChartSection from '@/components/soil-chart-section'
import IntruderSection from '@/components/intruder-section'
import FloatingChatButton from '@/components/floating-chat-button'
import { Button } from '@/components/ui/button'
import { fetchFertilizerRecommendation } from '@/lib/api'

export default function DashboardPage() {
  const [isPremium, setIsPremium] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState('')
  const [weatherData, setWeatherData] = useState<{
    temperature: number
    humidity: number
    precipitation: number
    weather: string
  } | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [showSensorData, setShowSensorData] = useState(false)
  const [fertilizerData, setFertilizerData] = useState<any>(null)
  const [fertilizerLoading, setFertilizerLoading] = useState(false)
  const isInitialFetch = useRef(false)

  // 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather/current')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        
        // API 응답 구조에 맞게 데이터 추출
        const data = result.data || result
        setWeatherData(data)
        setWeatherError(null)
      } catch (error) {
        console.error('날씨 데이터 가져오기 오류:', error)
        setWeatherError(error instanceof Error ? error.message : '날씨 데이터를 가져올 수 없습니다')
        
        // 에러 시에도 기본 데이터 설정
        setWeatherData({
          temperature: 22,
          humidity: 65,
          precipitation: 0,
          weather: '맑음'
        })
      } finally {
        setWeatherLoading(false)
        isInitialFetch.current = true
      }
    }

    fetchWeatherData()
    // 5분마다 날씨 데이터 업데이트
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handlePremiumUpgrade = () => {
    setIsPremium(true)
  }

  const handleSoilDiagnosis = () => {
    setShowSensorData(true)
  }

  const handleCropSelect = async (cropName: string) => {
    setSelectedCrop(cropName)
    
    // 작물 선택 시 비료 추천 데이터 가져오기
    if (cropName) {
      setFertilizerLoading(true)
      try {
        const data = await fetchFertilizerRecommendation(cropName)
        setFertilizerData(data)
      } catch (error) {
        console.error('비료 추천 데이터 가져오기 오류:', error)
      } finally {
        setFertilizerLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-2 py-3 sm:px-4 sm:py-8 pt-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-farm-brown mb-4 sm:mb-8">대시보드</h1>
        
        {/* 날씨 데이터 상태 표시 (디버깅용) */}
        {weatherError && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ 날씨 데이터 로드 중 오류: {weatherError}
            </p>
          </div>
        )}
        
        {/* 행별 동일 높이 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-5">
          
          {/* 1행: 내 작물과 토양 상태 & 날씨 - 동일 높이 */}
          <div className="lg:h-[450px]">
            <CropSection onCropSelect={handleCropSelect} selectedCrop={selectedCrop} />
          </div>
          
          <div className="lg:h-[450px]">
            <SoilWeatherSection 
              isPremium={isPremium} 
              weatherData={weatherData} 
              showSensorData={showSensorData}
            />
          </div>
          
          {/* 2행: 토양 진단 버튼 (전체 너비) */}
          {!isPremium && !showSensorData && (
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-green-300 p-4 h-[96px] sm:p-8 sm:h-[120px]">
                <div className="text-center">
                  <Button 
                    onClick={handleSoilDiagnosis}
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
          <div className={`${isPremium || showSensorData || selectedCrop ? 'premium-section' : 'blur-section'} lg:h-[420px]`}>
            <FertilizerSection 
              selectedCrop={selectedCrop} 
              fertilizerData={fertilizerData}
              isLoading={fertilizerLoading}
            />
          </div>
          
          <div className={`${isPremium || showSensorData || selectedCrop ? 'premium-section' : 'blur-section'} lg:h-[420px]`}>
            <CompostSection 
              selectedCrop={selectedCrop} 
              compostData={fertilizerData?.compost}
              isLoading={fertilizerLoading}
            />
          </div>
          
          {/* 4행: 시계열 그래프와 침입자 감지 (전체 너비) */}
          <div className={`lg:col-span-2 lg:h-[500px] ${isPremium || showSensorData || selectedCrop ? 'premium-section' : 'blur-section'}`}>
            <SoilChartSection />
          </div>
          
          {/* 5행: 침입자 감지 현황 (전체 너비) */}
          <div className="lg:col-span-2 lg:h-[400px]">
            <IntruderSection farmId="farm_0001" refreshInterval={60000} />
          </div>
        </div>
      </main>
      
      <FloatingChatButton />
    </div>
  )
}