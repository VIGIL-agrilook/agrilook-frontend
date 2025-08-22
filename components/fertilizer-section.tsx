import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveH5, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import { useState } from 'react'

interface FertilizerSectionProps {
  selectedCrop: string
  fertilizerData?: any
  isLoading?: boolean
}

export default function FertilizerSection({ selectedCrop, fertilizerData, isLoading = false }: FertilizerSectionProps) {
  const [activeTab, setActiveTab] = useState<'base' | 'additional'>('base')

  // API 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const getFertilizerRecommendations = () => {
    if (isLoading) {
      return Array(3).fill(null).map((_, index) => ({
        rank: index + 1,
        name: '로딩 중...',
        npk: 'N-P-K: --',
        dosage: '--kg',
        deficiency: '--',
        image: '/placeholder.svg?height=80&width=200&text=로딩중'
      }))
    }

    if (fertilizerData?.fertilizer) {
      const fertilizers = fertilizerData.fertilizer[activeTab] || []
      
      return fertilizers.slice(0, 3).map((fertilizer: any, index: number) => ({
        rank: index + 1,
        name: fertilizer.fertilizer_name,
        npk: `N-P-K: ${fertilizer.N_ratio}-${fertilizer.P_ratio}-${fertilizer.K_ratio}`,
        dosage: `${fertilizer.usage_kg}kg`,
        deficiency: `${fertilizer.shortage_N_kg > 0 ? `질소 ${fertilizer.shortage_N_kg}kg 부족` : ''} ${fertilizer.shortage_P_kg > 0 ? `인산 ${fertilizer.shortage_P_kg}kg 부족` : ''} ${fertilizer.shortage_K_kg > 0 ? `\n칼륨 ${fertilizer.shortage_K_kg}kg 부족` : ''}`.trim() || '균형',
        image: activeTab === 'base' ? 
          (index === 0 ? '/base_1.jpg' : 
           index === 1 ? '/base_2.jpg' : '/base_3.gif') :
          (index === 0 ? '/top_1.jpg' : 
           index === 1 ? '/top_2.jpg' : '/top_3.jpg')
      }))
    }

    // 기본 데이터 (API 데이터가 없을 때)
    const defaultFertilizers = {
      base: {
        '대파': [
          {
            rank: 1,
            name: "대파 밑거름 복합비료",
            npk: "N-P-K: 15-8-10",
            dosage: "30kg",
            deficiency: "질소 부족",
            image: "/base_1.jpg"
          },
          {
            rank: 2,
            name: "대파 밑거름 질소비료",
            npk: "N-P-K: 18-6-8",
            dosage: "35kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "대파 밑거름 칼륨비료",
            npk: "N-P-K: 8-4-15",
            dosage: "25kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ],
        '부추': [
          {
            rank: 1,
            name: "부추 밑거름 복합비료",
            npk: "N-P-K: 18-10-12",
            dosage: "35kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=부추비료"
          },
          {
            rank: 2,
            name: "부추 밑거름 질소비료",
            npk: "N-P-K: 20-8-10",
            dosage: "40kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "부추 밑거름 칼륨비료",
            npk: "N-P-K: 10-6-18",
            dosage: "30kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ],
        '고추': [
          {
            rank: 1,
            name: "고추 밑거름 복합비료",
            npk: "N-P-K: 12-6-8",
            dosage: "25kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=고추비료"
          },
          {
            rank: 2,
            name: "고추 밑거름 질소비료",
            npk: "N-P-K: 15-4-6",
            dosage: "30kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "고추 밑거름 칼륨비료",
            npk: "N-P-K: 6-3-12",
            dosage: "20kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ]
      },
      additional: {
        '대파': [
          {
            rank: 1,
            name: "대파 웃거름 복합비료",
            npk: "N-P-K: 12-6-8",
            dosage: "20kg",
            deficiency: "균형",
            image: "/placeholder.svg?height=80&width=200&text=대파비료"
          },
          {
            rank: 2,
            name: "대파 웃거름 질소비료",
            npk: "N-P-K: 15-4-6",
            dosage: "25kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "대파 웃거름 칼륨비료",
            npk: "N-P-K: 6-3-12",
            dosage: "15kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ],
        '부추': [
          {
            rank: 1,
            name: "부추 웃거름 복합비료",
            npk: "N-P-K: 15-8-10",
            dosage: "25kg",
            deficiency: "균형",
            image: "/placeholder.svg?height=80&width=200&text=부추비료"
          },
          {
            rank: 2,
            name: "부추 웃거름 질소비료",
            npk: "N-P-K: 18-6-8",
            dosage: "30kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "부추 웃거름 칼륨비료",
            npk: "N-P-K: 8-4-15",
            dosage: "20kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ],
        '고추': [
          {
            rank: 1,
            name: "고추 웃거름 복합비료",
            npk: "N-P-K: 10-5-8",
            dosage: "18kg",
            deficiency: "균형",
            image: "/placeholder.svg?height=80&width=200&text=고추비료"
          },
          {
            rank: 2,
            name: "고추 웃거름 질소비료",
            npk: "N-P-K: 12-4-6",
            dosage: "22kg",
            deficiency: "질소 부족",
            image: "/placeholder.svg?height=80&width=200&text=질소비료"
          },
          {
            rank: 3,
            name: "고추 웃거름 칼륨비료",
            npk: "N-P-K: 5-3-10",
            dosage: "15kg",
            deficiency: "칼륨 부족",
            image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
          }
        ]
      }
    }

    return defaultFertilizers[activeTab][selectedCrop as keyof typeof defaultFertilizers.base] || defaultFertilizers[activeTab]['대파']
  }

  const fertilizerRecommendations = getFertilizerRecommendations()

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ResponsiveH3 className="!text-foreground">🌱 {selectedCrop} 비료 추천</ResponsiveH3>
        </CardTitle>
        
        {/* 탭 버튼 */}
        <div className="flex space-x-1 mt-2">
          <button
            onClick={() => setActiveTab('base')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === 'base'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            밑거름
          </button>
          <button
            onClick={() => setActiveTab('additional')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === 'additional'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            웃거름
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-fluid-base">
        {/* 3열 비료 추천 섹션 */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {fertilizerRecommendations.map((fertilizer: any) => (
            <div key={fertilizer.rank} className="border border-gray-200 rounded-lg p-fluid-base hover:bg-gray-50 transition-colors">
              {/* 순위 배지 */}
              <div className="flex items-center justify-between mb-3 min-w-0">
                <Badge className={`text-fluid-xs px-2 py-1 ${
                  fertilizer.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  fertilizer.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {fertilizer.rank}순위
                </Badge>
                <span className="text-fluid-sm font-medium text-green-600 break-all">{fertilizer.dosage}</span>
              </div>

              {/* 비료 이미지 */}
              <div className="flex justify-center mb-3">
                <img
                  src={fertilizer.image}
                  alt={`${fertilizer.name} 이미지`}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              </div>

              {/* 비료 정보 */}
              <div className="space-fluid-sm text-center">
                <ResponsiveH5 className="font-semibold text-foreground break-words leading-tight">
                  {fertilizer.name}
                </ResponsiveH5>
                <div className="space-fluid-xs">
                  <div className="flex flex-col items-center">
                    <ResponsiveSmall className="font-medium text-blue-600 break-words leading-tight">
                      {fertilizer.npk}
                    </ResponsiveSmall>
                  </div>
                                     <div className="flex flex-col items-center">
                     <ResponsiveSmall className="font-medium text-red-600 break-words leading-tight whitespace-pre-line">
                       {fertilizer.deficiency}
                     </ResponsiveSmall>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 비료 처방 안내*/}
        <div className="text-xs text-gray-400">
          * {selectedCrop}에 최적화된 비료 추천입니다. 부족분에 대한 단일비료를 추가로 사용하시면 더 좋은 결과를 얻을 수 있어요!
        </div>
      </CardContent>
    </Card>
  )
}
