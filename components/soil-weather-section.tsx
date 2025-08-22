'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import { SoilSensorData } from '@/lib/types'
import { fetchLatestSoilData, fetchSensorSoilData } from '@/lib/api/soil'

interface SoilWeatherSectionProps {
  isPremium: boolean
  weatherData?: {
    humidity: number
    precipitation: number
    temperature: number
    weather: string
  } | null
  showSensorData?: boolean
}

export default function SoilWeatherSection({ isPremium, weatherData, showSensorData = false }: SoilWeatherSectionProps) {
  const [latestSoilData, setLatestSoilData] = useState<SoilSensorData | null>(null)
  const [dataTimestamp, setDataTimestamp] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 컴포넌트 마운트 시 백엔드 API에서 최신 토양 데이터 불러오기
  useEffect(() => {
    const loadSoilData = async () => {
      setIsLoading(true)
      try {
        // showSensorData가 true이면 센서 데이터, 아니면 위성 데이터
        const soilData = showSensorData ? await fetchSensorSoilData() : await fetchLatestSoilData()
        if (soilData) {
          setLatestSoilData(soilData)
          setDataTimestamp(soilData.timestamp)
        }
      } catch (error) {
        console.error('토양 데이터 API 호출 중 오류:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSoilData()
  }, [showSensorData])

  // 토양 성분별 상태 평가 함수 (숫자 값만 처리)
  const getSoilStatus = (type: string, value: number | string): string => {
    // 범위 문자열인 경우 'normal' 반환 (위성 데이터)
    if (typeof value === 'string') {
      return 'normal'
    }
    
    // 숫자 값인 경우 기존 로직 적용 (센서 데이터)
    switch (type) {
      case 'pH':
        if (value >= 6.0 && value <= 7.0) return 'normal'
        if (value < 6.0) return 'low'
        return 'high'
      case 'nitrogen':
        if (value >= 150 && value <= 200) return 'normal'
        if (value < 150) return 'low'
        return 'high'
      case 'phosphorus':
        if (value >= 80 && value <= 120) return 'normal'
        if (value < 80) return 'low'
        return 'high'
      case 'potassium':
        if (value >= 200 && value <= 250) return 'normal'
        if (value < 200) return 'low'
        return 'high'
      case 'organicMatter':
        if (value >= 1.5 && value <= 3.0) return 'normal'
        if (value < 1.5) return 'low'
        return 'high'
      case 'moisture':
        if (value >= 20 && value <= 40) return 'normal'
        if (value < 20) return 'low'
        return 'high'
      case 'conductivity':
        if (value >= 1.0 && value <= 2.0) return 'normal'
        if (value < 1.0) return 'low'
        return 'high'
      default:
        return 'normal'
    }
  }

  // 기본 토양 데이터 (센서 데이터가 없을 때 사용)
  const defaultSoilData = [
    { name: 'pH', value: isPremium ? '6.2' : '5.5-7.0', status: 'normal', unit: '' },
    { name: 'EC', value: isPremium ? '1.8' : '1.0-2.0', status: 'normal', unit: '[dS/m]' },
    { name: 'Ca', value: isPremium ? '245' : '200-300', status: 'normal', unit: '[ppm]' },
    { name: 'Mg', value: isPremium ? '89' : '50-100', status: 'high', unit: '[ppm]' },
    { name: 'OC', value: isPremium ? '2.1' : '1.5-3.0', status: 'normal', unit: '[%]' },
    { name: 'K', value: isPremium ? '156' : '120-200', status: 'normal', unit: '[ppm]' },
    { name: 'P', value: isPremium ? '45' : '30-60', status: 'normal', unit: '[ppm]' }
  ]

  // 로딩 중이거나 실제 센서 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const soilData = isLoading ?
    // 로딩 중일 때 스켈레톤 데이터
    Array(7).fill(null).map((_, index) => ({
      name: ['pH', 'EC', 'N', 'P', 'K', 'OM', 'Moisture'][index],
      value: '--',
      status: 'loading',
      unit: ['', '[mS/cm]', '[mg/kg]', '[mg/kg]', '[mg/kg]', '[%]', '[%]'][index]
    })) :
    latestSoilData ? [
      { name: 'pH', value: latestSoilData.soilData.pH.toString(), status: getSoilStatus('pH', latestSoilData.soilData.pH), unit: '' },
      { name: 'EC', value: latestSoilData.soilData.conductivity.toString(), status: getSoilStatus('conductivity', latestSoilData.soilData.conductivity), unit: '[mS/cm]' },
      { name: 'N', value: latestSoilData.soilData.nitrogen.toString(), status: getSoilStatus('nitrogen', latestSoilData.soilData.nitrogen), unit: '[mg/kg]' },
      { name: 'P', value: latestSoilData.soilData.phosphorus.toString(), status: getSoilStatus('phosphorus', latestSoilData.soilData.phosphorus), unit: '[mg/kg]' },
      { name: 'K', value: latestSoilData.soilData.potassium.toString(), status: getSoilStatus('potassium', latestSoilData.soilData.potassium), unit: '[mg/kg]' },
      { name: 'OM', value: latestSoilData.soilData.organicMatter.toString(), status: getSoilStatus('organicMatter', latestSoilData.soilData.organicMatter), unit: '[%]' },
      { name: 'Moisture', value: latestSoilData.soilData.moisture.toString(), status: getSoilStatus('moisture', latestSoilData.soilData.moisture), unit: '[%]' }
    ] : defaultSoilData

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'high': return 'bg-red-100 text-red-800'
      case 'low': return 'bg-yellow-100 text-yellow-800'
      case 'loading': return 'bg-gray-100 text-gray-600 animate-pulse'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '적정'
      case 'high': return '과다'
      case 'low': return '부족'
      case 'loading': return '로딩중...'
      default: return '측정중'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 데이터 소스에 따른 정확도 텍스트
  const getAccuracyText = () => {
    if (isLoading) return '데이터 로딩 중...'
    if (!latestSoilData) return isPremium ? '토양센서 기반 - 90% 정확도' : '인공위성 기반 - 70% 정확도'
    
    switch (latestSoilData.source) {
      case 'sensor':
        return '토양센서 기반 - 90% 정확도'
      case 'satellite':
        return '인공위성 기반 - 70% 정확도'
      default:
        return '데이터 기반 - 80% 정확도'
    }
  }

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">
            <ResponsiveH3 className="!text-foreground">토양 상태 & 날씨</ResponsiveH3>
          </CardTitle>
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-blue-100 text-blue-800 text-fluid-xs">
              {getAccuracyText()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-4 gap-2 md:gap-4 auto-rows-auto">
          {/* 1행 1열: 날씨 */}
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-300 rounded-xl border border-blue-300 p-3 md:p-4 flex flex-col justify-center items-center shadow-lg md:h-40">
            <div className="text-3xl md:text-5xl mb-1 md:mb-2">
              {weatherData?.weather === '맑음' ? '☀️' : 
               weatherData?.weather === '흐림' ? '☁️' : 
               weatherData?.weather === '비' ? '🌧️' : 
               weatherData?.weather === '눈' ? '❄️' : '🌤️'}
            </div>
            <div className="text-lg md:text-2xl font-bold text-blue-900 mb-2 md:mb-3">
              {weatherData && typeof weatherData.temperature === 'number' ? `${weatherData.temperature}°C` : '--°C'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2 w-full">
              <div className="bg-white/60 rounded-lg p-1.5 md:p-2 text-center flex flex-col items-center justify-center">
                <span className="text-[8px] sm:text-[10px] md:text-fluid-xs text-blue-700 font-medium">습도</span>
                <span className="text-[10px] sm:text-xs md:text-fluid-sm font-bold text-blue-900">
                  {weatherData && typeof weatherData.humidity === 'number' ? `${weatherData.humidity}%` : '--%'}
                </span>
              </div>
              <div className="bg-white/60 rounded-lg p-1.5 md:p-2 text-center flex flex-col items-center justify-center">
                <span className="text-[8px] sm:text-[10px] md:text-fluid-xs text-blue-700 font-medium">강수량</span>
                <span className="text-[10px] sm:text-xs md:text-fluid-sm font-bold text-blue-900">
                  {weatherData && typeof weatherData.precipitation === 'number' ? `${weatherData.precipitation < 0 ? 0 : weatherData.precipitation}mm` : '--mm'}
                </span>
              </div>
            </div>
          </div>

          {/* 1행 2-4열: 토양 성분 3개 */}
          {soilData.slice(0, 3).map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-3 md:p-4 text-center hover:bg-gray-100 transition-colors flex flex-col justify-center items-center md:h-40">
              <div className="text-[11px] md:text-fluid-sm font-semibold text-gray-700 mb-1 md:mb-2">
                {item.name} {item.unit}
              </div>
              <div className={`text-base md:text-xl font-bold text-farm-brown mb-1 md:mb-2 ${item.status === 'loading' ? 'animate-pulse' : ''}`}>
                {item.value}
              </div>
              <Badge className={`${getStatusColor(item.status)} text-[10px] md:text-fluid-xs px-1.5 py-0.5 md:px-2 md:py-1 pointer-events-none transition-none hover:bg-transparent hover:text-inherit focus:outline-none focus:ring-0`}>
                {getStatusText(item.status)}
              </Badge>
            </div>
          ))}

          {/* 2행 1-4열: 토양 성분 4개 */}
          {soilData.slice(3, 7).map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-3 md:p-4 text-center hover:bg-gray-100 transition-colors flex flex-col justify-center items-center md:h-40">
              <div className="text-[11px] md:text-fluid-sm font-semibold text-gray-700 mb-1 md:mb-2">
                {item.name} {item.unit}
              </div>
              <div className={`text-base md:text-xl font-bold text-farm-brown mb-1 md:mb-2 ${item.status === 'loading' ? 'animate-pulse' : ''}`}>
                {item.value}
              </div>
              <Badge className={`${getStatusColor(item.status)} text-[10px] md:text-fluid-xs px-1.5 py-0.5 md:px-2 md:py-1 pointer-events-none transition-none hover:bg-transparent hover:text-inherit focus:outline-none focus:ring-0`}>
                {getStatusText(item.status)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
