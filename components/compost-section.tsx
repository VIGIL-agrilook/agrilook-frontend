import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'

interface CompostSectionProps {
  selectedCrop: string
}

export default function CompostSection({ selectedCrop }: CompostSectionProps) {
  // 작물별 퇴비 추천 데이터
  const cropComposts = {
    '토마토': [
      { name: '우분퇴비', dosage: '3kg/㎡', description: '토마토 뿌리 발달에 도움' },
      { name: '계분퇴비', dosage: '2.5kg/㎡', description: '질소 함량이 높아 생육 촉진' },
      { name: '돈부퇴비', dosage: '3kg/㎡', description: '균형잡힌 영양분 공급' },
      { name: '혼합퇴비', dosage: '2.8kg/㎡', description: '다양한 영양분 복합 효과' }
    ],
    '오이': [
      { name: '우분퇴비', dosage: '4kg/㎡', description: '오이 생육에 필요한 유기물 공급' },
      { name: '계분퇴비', dosage: '3kg/㎡', description: '덩굴 발달 촉진' },
      { name: '돈부퇴비', dosage: '3.5kg/㎡', description: '균형잡힌 영양분' },
      { name: '혼합퇴비', dosage: '3.2kg/㎡', description: '종합적인 토양 개선' }
    ],
    '배추': [
      { name: '우분퇴비', dosage: '5kg/㎡', description: '배추 결구에 필요한 영양분' },
      { name: '계분퇴비', dosage: '4kg/㎡', description: '잎 생육 촉진' },
      { name: '돈부퇴비', dosage: '4.5kg/㎡', description: '균형잡힌 영양분 공급' },
      { name: '혼합퇴비', dosage: '4.2kg/㎡', description: '토양 구조 개선' }
    ]
  }

  // 선택된 작물의 퇴비 추천 가져오기
  const compostRecommendations = cropComposts[selectedCrop as keyof typeof cropComposts] || cropComposts['토마토']

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">
          <ResponsiveH3 className="!text-foreground">🌿 {selectedCrop} 퇴비 관리</ResponsiveH3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-secondary rounded-lg">
            <div className="space-y-2">
              {compostRecommendations.map((compost, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-background rounded border">
                  <div className="flex-1">
                    <ResponsiveP className="font-medium text-foreground">{compost.name}</ResponsiveP>
                    <ResponsiveSmall className="text-muted-foreground">{compost.description}</ResponsiveSmall>
                  </div>
                  <div className="text-right">
                    <ResponsiveSmall className="font-semibold text-green-600">처방량: {compost.dosage}</ResponsiveSmall>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            * {selectedCrop}에 최적화된 퇴비 추천입니다. 4가지 퇴비 중 하나를 선택해서 처방해주세요
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
