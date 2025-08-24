import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveH5, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import { useState, useEffect } from 'react'
import { IntruderResponse, IntruderDetection } from '@/lib/types'
import { apiService } from '@/lib/api'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface IntruderSectionProps {
  farmId?: string
  refreshInterval?: number // 자동 새로고침 간격 (ms)
}

export default function IntruderSection({ farmId = 'farm_0001', refreshInterval = 30000 }: IntruderSectionProps) {
  const [intruderData, setIntruderData] = useState<IntruderResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeFilter] = useState<number>(24) // 기본 24시간으로 고정
  const [currentIntruderIndex, setCurrentIntruderIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null) // 마지막 새로고침 시간

  // 침입자 클래스별 색상 매핑
  const getClassColor = (className: string) => {
    switch (className) {
      case 'human':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'wild_boar':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'squirrel':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'deer':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'bird':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // 침입자 클래스별 한글 이름
  const getClassName = (className: string) => {
    switch (className) {
      case 'human':
        return '사람'
      case 'wild_boar':
        return '멧돼지'
      case 'squirrel':
        return '다람쥐'
      case 'deer':
        return '사슴'
      case 'bird':
        return '새'
      default:
        return className
    }
  }

  // 날짜 포맷팅
  const formatDateTime = (dateTimeIso: string) => {
    const date = new Date(dateTimeIso)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 데이터 로드 함수
  const loadIntruderData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const data = await apiService.getIntruderData({
        hours: timeFilter,
        farmid: farmId
      })
      
      // 새로고침 버튼을 눌렀을 때만 시간 필터링 적용
      let filteredData = data
      if (lastRefreshTime) {
        const filteredIntruders = data.data.filter((intruder: IntruderDetection) => {
          const intruderTime = new Date(intruder.datetime_iso)
          return intruderTime > lastRefreshTime
        })
        
        filteredData = {
          ...data,
          data: filteredIntruders,
          total_count: filteredIntruders.length,
          class_counts: filteredIntruders.reduce((counts: Record<string, number>, intruder: IntruderDetection) => {
            counts[intruder.class] = (counts[intruder.class] || 0) + 1
            return counts
          }, {} as Record<string, number>)
        }
      }
      
      setIntruderData(filteredData)
      setCurrentIntruderIndex(0) // 데이터 로드 시 첫 번째 항목으로 리셋
    } catch (err) {
      console.error('침입자 데이터 로드 실패:', err)
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
      
      // 에러 시 더미 데이터 표시
      setIntruderData({
        farm_id: farmId,
        hours_filter: timeFilter,
        total_count: 3,
        class_counts: {
          human: 1,
          squirrel: 1,
          wild_boar: 1
        },
        data: [
          {
            id: "dummy_001",
            class: "human",
            confidence: "85%",
            datetime: "20250124-143000",
            datetime_iso: "2025-01-24T14:30:00",
            farm_id: farmId,
            image_url: "/intruder1.jpg"
          },
          {
            id: "dummy_002",
            class: "squirrel",
            confidence: "92%",
            datetime: "20250124-142000",
            datetime_iso: "2025-01-24T14:20:00",
            farm_id: farmId,
            image_url: "/intruder2.jpg"
          },
          {
            id: "dummy_003",
            class: "wild_boar",
            confidence: "78%",
            datetime: "20250124-141000",
            datetime_iso: "2025-01-24T14:10:00",
            farm_id: farmId,
            image_url: "/intruder3.jpg"
          }
        ]
      })
      setCurrentIntruderIndex(0)
    } finally {
      setIsLoading(false)
    }
  }

  // 수동 새로고침 함수
  const handleManualRefresh = async () => {
    setLastRefreshTime(new Date()) // 현재 시간을 마지막 새로고침 시간으로 설정
    await loadIntruderData()
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadIntruderData()
  }, [farmId, timeFilter])

  // 자동 새로고침 설정
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(loadIntruderData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval, farmId, timeFilter])

  // 슬라이더 네비게이션 함수들
  const handlePrevIntruder = () => {
    if (isTransitioning || !intruderData?.data) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIntruderIndex(prev => 
        prev === 0 ? intruderData.data.length - 1 : prev - 1
      )
      setIsTransitioning(false)
    }, 300)
  }

  const handleNextIntruder = () => {
    if (isTransitioning || !intruderData?.data) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIntruderIndex(prev => 
        prev === intruderData.data.length - 1 ? 0 : prev + 1
      )
      setIsTransitioning(false)
    }, 300)
  }

  const handleDirectIntruder = (index: number) => {
    if (isTransitioning || index === currentIntruderIndex || !intruderData?.data) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIntruderIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const currentIntruder = intruderData?.data?.[currentIntruderIndex]

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <ResponsiveH3 className="!text-foreground">🚨 침입자 감지 현황</ResponsiveH3>
          <button
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? '로딩 중...' : '새로고침'}
          </button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-fluid-base">
        {error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* 요약 통계 */}
        {intruderData && (
          <div className="text-red-600 font-semibold mb-4">
            {lastRefreshTime ? (
              <>
                새로고침 이후 침입자 {intruderData.total_count}건 감지
                <div className="text-xs text-gray-500 mt-1">
                  (마지막 새로고침: {lastRefreshTime.toLocaleString('ko-KR')})
                </div>
              </>
            ) : (
              `최근 ${timeFilter}시간 내 침입자 ${intruderData.total_count}건 감지`
            )}
          </div>
        )}

        {/* 침입자 슬라이더 */}
        {isLoading ? (
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : currentIntruder ? (
          <div className="relative">
            {/* 침입자 이미지 - 페이드 효과 */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              <div 
                className={`w-full h-full transition-all duration-500 ease-in-out ${
                  isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <Image
                  src={currentIntruder.image_url}
                  alt={`${getClassName(currentIntruder.class)} 침입자`}
                  width={640}
                  height={480}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* 화살표 버튼 */}
            <Button
              onClick={handlePrevIntruder}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 transition-all duration-200 hover:scale-110"
              size="sm"
            >
              ←
            </Button>
            <Button
              onClick={handleNextIntruder}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 transition-all duration-200 hover:scale-110"
              size="sm"
            >
              →
            </Button>
            
            {/* 침입자 정보 */}
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-foreground">
                {getClassName(currentIntruder.class)}
              </div>
              <div className="text-sm text-gray-600">
                {formatDateTime(currentIntruder.datetime_iso)}
              </div>
              <Badge className={`mt-2 ${getClassColor(currentIntruder.class)}`}>
                신뢰도 {currentIntruder.confidence}
              </Badge>
            </div>
            
            {/* 인디케이터 점 */}
            {intruderData?.data && intruderData.data.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {intruderData.data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDirectIntruder(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                      index === currentIntruderIndex
                        ? 'bg-primary scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ResponsiveP>최근 {timeFilter}시간 동안 감지된 침입자가 없습니다.</ResponsiveP>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="text-xs text-gray-400 mt-4">
          * 침입자 감지 시스템이 자동으로 동물과 사람을 구분하여 감지합니다. 
          정확한 신뢰도와 함께 실시간으로 업데이트됩니다.
        </div>
      </CardContent>
    </Card>
  )
}
