'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WeatherData {
  temperature: number
  humidity: number
  precipitation: number
  weatherIcon: string
}

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    precipitation: 0,
    weatherIcon: '☀️'
  })

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          🌤️ 실시간 날씨
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 메인 날씨 정보 */}
        <div className="flex items-center justify-center">
          <div className="text-6xl mb-2">{weatherData.weatherIcon}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-900 mb-1">
            {weatherData.temperature}°C
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-white/50 rounded-lg p-2">
            <div className="text-xs font-medium text-blue-800 mb-1">습도</div>
            <div className="text-sm font-bold text-blue-900">
              {weatherData.humidity}%
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-2">
            <div className="text-xs font-medium text-blue-800 mb-1">강수량</div>
            <div className="text-sm font-bold text-blue-900">
              {weatherData.precipitation}mm
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
