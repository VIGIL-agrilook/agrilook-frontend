import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'

interface CompostSectionProps {
  selectedCrop: string
  compostData?: any
  isLoading?: boolean
}

export default function CompostSection({ selectedCrop, compostData, isLoading = false }: CompostSectionProps) {
  // API 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const getCompostRecommendations = () => {
    if (isLoading) {
      return Array(4).fill(null).map((_, index) => ({
        name: '로딩 중...',
        dosage: '--kg'
      }))
    }

    if (compostData) {
      return [
        { name: '우분퇴비', dosage: `${compostData.cattle_kg}kg` },
        { name: '계분퇴비', dosage: `${compostData.chicken_kg}kg` },
        { name: '혼합퇴비', dosage: `${compostData.mixed_kg}kg` },
        { name: '돈분퇴비', dosage: `${compostData.pig_kg}kg` }
      ]
    }

    // 기본 데이터 (API 데이터가 없을 때)
    const defaultComposts = {
      '대파': [
        { name: '우분퇴비', dosage: '3kg' },
        { name: '계분퇴비', dosage: '2.5kg' },
        { name: '돈분퇴비', dosage: '3kg' },
        { name: '혼합퇴비', dosage: '2.8kg' }
      ],
      '부추': [
        { name: '우분퇴비', dosage: '4kg' },
        { name: '계분퇴비', dosage: '3kg' },
        { name: '돈분퇴비', dosage: '3.5kg' },
        { name: '혼합퇴비', dosage: '3.2kg' }
      ],
      '고추': [
        { name: '우분퇴비', dosage: '3.5kg' },
        { name: '계분퇴비', dosage: '3kg' },
        { name: '돈분퇴비', dosage: '3.2kg' },
        { name: '혼합퇴비', dosage: '3kg' }
      ]
    }

    return defaultComposts[selectedCrop as keyof typeof defaultComposts] || defaultComposts['대파']
  }

  const compostRecommendations = getCompostRecommendations()

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
