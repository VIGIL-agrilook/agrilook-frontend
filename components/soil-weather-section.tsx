'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import WeatherSection from './weather-section'
import { SoilSensorData } from '@/lib/types'

interface SoilWeatherSectionProps {
  isPremium: boolean
}

export default function SoilWeatherSection({ isPremium }: SoilWeatherSectionProps) {
  const [latestSoilData, setLatestSoilData] = useState<SoilSensorData | null>(null)
  const [dataTimestamp, setDataTimestamp] = useState<string>('')

  // 컴포넌트 마운트 시 로컬 스토리지에서 최신 토양 데이터 불러오기
  useEffect(() => {
    const savedSoilData = localStorage.getItem('soilSensorData')
    if (savedSoilData) {
      try {
        const soilDataHistory: SoilSensorData[] = JSON.parse(savedSoilData)
        if (soilDataHistory.length > 0) {
          setLatestSoilData(soilDataHistory[0]) // 가장 최신 데이터
          setDataTimestamp(soilDataHistory[0].timestamp)
        }
      } catch (error) {
        console.error('토양 데이터 로드 중 오류:', error)
      }
    }
  }, [])

  // 토양 성분별 상태 평가 함수
  const getSoilStatus = (type: string, value: number): string => {
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

  // 실제 센서 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const soilData = latestSoilData ? [
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
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '적정'
      case 'high': return '과다'
      case 'low': return '부족'
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

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">
            <ResponsiveH3 className="!text-foreground">토양 상태 & 날씨</ResponsiveH3>
          </CardTitle>
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-blue-100 text-blue-800 text-fluid-xs">
              {latestSoilData ? '토양센서 기반 - 95% 정확도' : (isPremium ? '토양센서 기반 - 90% 정확도' : '인공위성 기반 - 70% 정확도')}
            </Badge>
            {latestSoilData && (
              <ResponsiveSmall className="text-gray-500">
                📍 {latestSoilData.location} | {formatTimestamp(dataTimestamp)}
              </ResponsiveSmall>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-4 gap-2 md:gap-4 auto-rows-auto">
          {/* 1행 1열: 날씨 */}
          <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-300 rounded-xl border border-blue-300 p-3 md:p-4 flex flex-col justify-center items-center shadow-lg md:h-40">
            <div className="text-3xl md:text-5xl mb-1 md:mb-2">☀️</div>
            <div className="text-lg md:text-2xl font-bold text-blue-900 mb-2 md:mb-3">24°C</div>
            <div className="grid grid-cols-2 gap-1 md:gap-2 w-full">
              <div className="bg-white/60 rounded-lg p-1.5 md:p-2 text-center">
                <div className="text-[10px] md:text-fluid-xs text-blue-700 mb-0.5 md:mb-1 font-medium">습도</div>
                <div className="text-xs md:text-fluid-sm font-bold text-blue-900">65%</div>
              </div>
              <div className="bg-white/60 rounded-lg p-1.5 md:p-2 text-center">
                <div className="text-[10px] md:text-fluid-xs text-blue-700 mb-0.5 md:mb-1 font-medium">강수량</div>
                <div className="text-xs md:text-fluid-sm font-bold text-blue-900">0mm</div>
              </div>
            </div>
          </div>

          {/* 1행 2-4열: 토양 성분 3개 */}
          {soilData.slice(0, 3).map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-3 md:p-4 text-center hover:bg-gray-100 transition-colors flex flex-col justify-center md:h-40">
              <div className="text-[11px] md:text-fluid-sm font-semibold text-gray-700 mb-1 md:mb-2">
                {item.name} {item.unit}
              </div>
              <div className="text-base md:text-xl font-bold text-farm-brown mb-1 md:mb-2">
                {item.value}
              </div>
              <Badge className={`${getStatusColor(item.status)} text-[10px] md:text-fluid-xs px-1.5 py-0.5 md:px-2 md:py-1 pointer-events-none transition-none hover:bg-transparent hover:text-inherit focus:outline-none focus:ring-0`}>
                {getStatusText(item.status)}
              </Badge>
            </div>
          ))}

          {/* 2행 1-4열: 토양 성분 4개 */}
          {soilData.slice(3, 7).map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-3 md:p-4 text-center hover:bg-gray-100 transition-colors flex flex-col justify-center md:h-40">
              <div className="text-[11px] md:text-fluid-sm font-semibold text-gray-700 mb-1 md:mb-2">
                {item.name} {item.unit}
              </div>
              <div className="text-base md:text-xl font-bold text-farm-brown mb-1 md:mb-2">
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
