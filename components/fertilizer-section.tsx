import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveH5, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'

interface FertilizerSectionProps {
  selectedCrop: string
}

export default function FertilizerSection({ selectedCrop }: FertilizerSectionProps) {
  // 작물별 비료 추천 데이터
  const cropFertilizers = {
    '토마토': [
      {
        rank: 1,
        name: "토마토 전용비료",
        npk: "N-P-K: 12-6-8",
        dosage: "25kg/10a",
        deficiency: "질소 부족",
        image: "/placeholder.svg?height=80&width=200&text=토마토비료"
      },
      {
        rank: 2,
        name: "칼륨 강화비료",
        npk: "N-P-K: 8-4-12",
        dosage: "20kg/10a",
        deficiency: "칼륨 부족",
        image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
      },
      {
        rank: 3,
        name: "미량원소비료",
        npk: "N-P-K: 5-3-6",
        dosage: "15kg/10a",
        deficiency: "칼슘 부족",
        image: "/placeholder.svg?height=80&width=200&text=미량비료"
      }
    ],
    '오이': [
      {
        rank: 1,
        name: "오이 전용비료",
        npk: "N-P-K: 15-8-10",
        dosage: "30kg/10a",
        deficiency: "질소 부족",
        image: "/placeholder.svg?height=80&width=200&text=오이비료"
      },
      {
        rank: 2,
        name: "인산 강화비료",
        npk: "N-P-K: 10-12-8",
        dosage: "25kg/10a",
        deficiency: "인산 부족",
        image: "/placeholder.svg?height=80&width=200&text=인산비료"
      },
      {
        rank: 3,
        name: "유기질비료",
        npk: "N-P-K: 6-8-6",
        dosage: "20kg/10a",
        deficiency: "유기물 부족",
        image: "/placeholder.svg?height=80&width=200&text=유기비료"
      }
    ],
    '배추': [
      {
        rank: 1,
        name: "배추 전용비료",
        npk: "N-P-K: 18-10-12",
        dosage: "35kg/10a",
        deficiency: "질소 부족",
        image: "/placeholder.svg?height=80&width=200&text=배추비료"
      },
      {
        rank: 2,
        name: "복합비료",
        npk: "N-P-K: 12-12-12",
        dosage: "30kg/10a",
        deficiency: "균형 부족",
        image: "/placeholder.svg?height=80&width=200&text=복합비료"
      },
      {
        rank: 3,
        name: "칼륨비료",
        npk: "N-P-K: 8-6-15",
        dosage: "25kg/10a",
        deficiency: "칼륨 부족",
        image: "/placeholder.svg?height=80&width=200&text=칼륨비료"
      }
    ]
  }

  // 선택된 작물의 비료 추천 가져오기
  const fertilizerRecommendations = cropFertilizers[selectedCrop as keyof typeof cropFertilizers] || cropFertilizers['토마토']

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ResponsiveH3 className="!text-foreground">🌱 {selectedCrop} 비료 추천</ResponsiveH3>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-fluid-base">
        {/* 3열 비료 추천 섹션 */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {fertilizerRecommendations.map((fertilizer) => (
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
                    <ResponsiveSmall className="text-gray-600 break-words leading-tight">NPK 비율</ResponsiveSmall>
                    <ResponsiveSmall className="font-medium text-blue-600 break-words leading-tight">
                      {fertilizer.npk}
                    </ResponsiveSmall>
                  </div>
                  <div className="flex flex-col items-center">
                    <ResponsiveSmall className="text-gray-600 break-words leading-tight">부족분</ResponsiveSmall>
                    <ResponsiveSmall className="font-medium text-red-600 break-words leading-tight">
                      {fertilizer.deficiency}
                    </ResponsiveSmall>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 비료 처방 안내*/}
        <div className="text-center mb-3">
          <ResponsiveSmall className="text-gray-400">
            * {selectedCrop}에 최적화된 비료 추천입니다. 부족분에 대한 단일비료를 추가로 사용하시면 더 좋은 결과를 얻을 수 있어요!
          </ResponsiveSmall>
        </div>
      </CardContent>
    </Card>
  )
}
