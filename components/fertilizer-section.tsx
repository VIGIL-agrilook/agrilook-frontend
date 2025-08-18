import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveH5, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'

export default function FertilizerSection() {
  const fertilizerRecommendations = [
    {
      rank: 1,
      name: "복합비료 A",
      npk: "N-P-K: 15-15-15",
      dosage: "20kg/10a",
      deficiency: "질소 부족",
      image: "/placeholder.svg?height=80&width=200&text=비료A"
    },
    {
      rank: 2,
      name: "유기질비료 B",
      npk: "N-P-K: 8-12-10",
      dosage: "15kg/10a",
      deficiency: "인산 부족",
      image: "/placeholder.svg?height=80&width=200&text=비료B"
    },
    {
      rank: 3,
      name: "미량원소비료 C",
      npk: "N-P-K: 5-8-12",
      dosage: "10kg/10a",
      deficiency: "칼륨 부족",
      image: "/placeholder.svg?height=80&width=200&text=비료C"
    }
  ]

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ResponsiveH3 className="!text-foreground">🌱 비료 추천</ResponsiveH3>
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
            * 추천비료와 함께 부족분에 대한 단일비료를 추가로 사용하신다면 작물이 더 잘 자라요!
          </ResponsiveSmall>
        </div>
      </CardContent>
    </Card>
  )
}
