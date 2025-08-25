'use client'
import Navigation from '@/components/navigation'
import SummaryCard from '@/components/summary-card'
import FloatingChatButton from '@/components/floating-chat-button'
import Farm3DViewer from '@/components/farm-3d-viewer'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IntruderResponse } from '@/lib/types'

interface WeatherData {
  temperature: number
  humidity: number
  precipitation: number
  weather: string
}

export default function HomePage() {
  const router = useRouter()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [intruderData, setIntruderData] = useState<IntruderResponse | null>(null)
  const [intruderLoading, setIntruderLoading] = useState(true)

  // 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setWeatherLoading(true)
        setWeatherError(null)
        
        console.log('홈 화면: 날씨 데이터 가져오기 시작...')
        const response = await fetch('/api/weather/current')
        console.log('홈 화면: 날씨 API 응답:', response)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('홈 화면: 날씨 API 데이터:', data)
        
        if (data && data.data) {
          setWeatherData(data.data)
          console.log('홈 화면: 날씨 데이터 설정 완료:', data.data)
        } else {
          console.error('홈 화면: 날씨 데이터 구조 오류:', data)
          throw new Error('날씨 데이터가 올바르지 않습니다')
        }
      } catch (error) {
        console.error('홈 화면: 날씨 데이터 가져오기 오류:', error)
        setWeatherError(error instanceof Error ? error.message : '날씨 데이터를 가져올 수 없습니다')
        
        // 기본 날씨 데이터 설정
        setWeatherData({
          temperature: 24,
          humidity: 65,
          precipitation: 0,
          weather: '맑음'
        })
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  // 침입자 데이터 가져오기
  useEffect(() => {
    const fetchIntruderData = async () => {
      try {
        setIntruderLoading(true)
        
        console.log('홈 화면: 침입자 데이터 가져오기 시작...')
        const response = await fetch('/api/intruder/recent?hours=24&farmid=farm_0001')
        console.log('홈 화면: 침입자 API 응답:', response)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('홈 화면: 침입자 API 데이터:', data)
        
        setIntruderData(data)
      } catch (error) {
        console.error('홈 화면: 침입자 데이터 가져오기 오류:', error)
        // 에러 시 기본 데이터 설정
        setIntruderData({
          farm_id: 'farm_0001',
          hours_filter: 24,
          total_count: 0,
          class_counts: {},
          data: []
        })
      } finally {
        setIntruderLoading(false)
      }
    }

    fetchIntruderData()
  }, [])

  // 침입자 클래스별 한글 이름
  const getClassName = (className: string) => {
    switch (className) {
      case 'human':
        return '사람'
      case 'wild_boar':
        return '멧돼지'
      case 'siberian_chipmunk':
        return '다람쥐'
      case 'water_deer':
        return '고라니'
      case 'bird':
        return '새'
      case 'wild_rabbit':
        return '토끼'
      case 'leopard_cat':
        return '삵'
      case 'raccoon':
        return '너구리'
      case 'squirrel':
        return '청설모'
      case 'dog':
        return '개'
      case 'weasel':
        return '족제비'
      default:
        return className
    }
  }

  // 침입자 클래스별 이모지
  const getClassEmoji = (className: string) => {
    switch (className) {
      case 'human':
        return '👤'
      case 'wild_boar':
        return '🐗'
      case 'siberian_chipmunk':
        return '🐿️'
      case 'water_deer':
        return '🦌'
      case 'bird':
        return '🐦'
      case 'wild_rabbit':
        return '🐰'
      case 'leopard_cat':
        return '🐱'
      case 'raccoon':
        return '🦝'
      case 'squirrel':
        return '🐿️'
      case 'dog':
        return '🐕'
      case 'weasel':
        return '🦡'
      default:
        return '🐾'
    }
  }

  // 날짜 포맷팅 (상대적 시간)
  const formatRelativeTime = (dateTimeIso: string) => {
    const date = new Date(dateTimeIso)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}일 전`
    }
  }

  const summaryCards = [
    {
      title: '🌱 내 작물',
      onClick: () => router.push('/dashboard'),
      details: (
        <div className="space-y-0.5 md:space-y-1 text-sm md:text-lg leading-tight">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">대파</span>
            <span className="text-green-600">생육 양호</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">부추</span>
            <span className="text-blue-600">수확기</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">고추</span>
            <span className="text-orange-600">개화기</span>
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
          {intruderLoading ? (
            <div className="text-center text-gray-500">
              <div className="text-xs md:text-sm">로딩 중...</div>
            </div>
          ) : intruderData ? (
            <>
              <div className="text-red-600 font-medium text-center mb-1 md:mb-2">
                24시간 내 침입자 {intruderData.total_count}건 감지
              </div>
              {intruderData.class_counts && Object.keys(intruderData.class_counts).length > 0 ? (
                <div className="space-y-0.5 md:space-y-1">
                  {Object.entries(intruderData.class_counts).map(([className, count]) => (
                    <div key={className} className="flex justify-between text-xs md:text-sm">
                      <span>{getClassEmoji(className)} {getClassName(className)}</span>
                      <span className="font-medium">{count}건</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-green-600 text-xs md:text-sm">
                  ✓ 침입자 없음
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 text-xs md:text-sm">
              데이터 없음
            </div>
          )}
        </div>
      )
    }
  ]
  // 하단 외부 링크 바로가기 설정: 이름(name), 외부 URL(href), 로고(이모지/텍스트)
  const quickLinks = [
    { name: '농촌진흥청', href: 'https://www.rda.go.kr/main/mainPage.do', logo: '/Emblemgovernment.png' },
    { name: '흙토람', href: 'https://soil.rda.go.kr/', logo: '/Emblemgovernment.png' },
    { name: '농사로(농업기술포털)', href: 'https://www.nongsaro.go.kr/portal/portalMain.ps?menuId=PS00001', logo: '/Emblemgovernment.png' },
    { name: '농업e지', href: 'https://www.nongupez.go.kr/nsm/main', logo: '/Emblemgovernment.png' }
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
        {/* 데스크톱: 3D 모델 섹션 하단 외부 링크 바로가기 (스크롤 후 노출) */}
        <div className="hidden md:block">
          <div className="mt-6 grid grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm md:text-base text-primary hover:underline hover:text-primary/80"
              >
                {typeof link.logo === 'string' && link.logo.startsWith('/') ? (
                  <Image
                    src={link.logo}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                ) : (
                  <span className="text-base" aria-hidden>
                    {link.logo}
                  </span>
                )}
                <span className="font-medium">{link.name}</span>
                                 <span className="ml-0.5 text-xs" aria-hidden>↗</span>
              </a>
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
          {/* 모바일: 3D 모델 섹션 하단 외부 링크 바로가기 (스크롤 후 노출) */}
          <div className="mt-4 mb-6">
            <div className="grid grid-cols-4 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 text-xs text-primary hover:underline hover:text-primary/80"
                >
                  {typeof link.logo === 'string' && link.logo.startsWith('/') ? (
                    <Image
                      src={link.logo}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    <span className="text-base" aria-hidden>
                      {link.logo}
                    </span>
                  )}
                  <span className="font-medium">{link.name}</span>
                                     <span className="ml-0.5 text-[10px]" aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 날씨 버튼 */}
      <button
        onClick={() => router.push('/dashboard')}
        className="fixed bottom-24 right-6 w-16 h-16 md:bottom-32 md:right-8 md:w-24 md:h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105"
      >
        <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
          <div className="text-center">
            {weatherLoading ? (
              <>
                <div className="text-xl md:text-3xl mb-0 md:mb-1">⏳</div>
                <div className="text-[10px] md:text-base font-bold text-blue-700">로딩...</div>
              </>
            ) : weatherError ? (
              <>
                <div className="text-xl md:text-3xl mb-0 md:mb-1">⚠️</div>
                <div className="text-[10px] md:text-base font-bold text-red-600">오류</div>
              </>
            ) : weatherData ? (
              <>
                <div className="text-xl md:text-3xl mb-0 md:mb-1">
                  {weatherData.weather === '맑음' ? '☀️' : 
                   weatherData.weather === '흐림' ? '☁️' : 
                   weatherData.weather === '비' ? '🌧️' : 
                   weatherData.weather === '눈' ? '❄️' : '🌤️'}
                </div>
                <div className="text-[10px] md:text-base font-bold text-blue-700">
                  {Math.round(weatherData.temperature)}°C
                </div>
              </>
            ) : (
              <>
                <div className="text-xl md:text-3xl mb-0 md:mb-1">☀️</div>
                <div className="text-[10px] md:text-base font-bold text-blue-700">24°C</div>
              </>
            )}
          </div>
        </div>
      </button>
      <FloatingChatButton />
    </div>
  )
}
