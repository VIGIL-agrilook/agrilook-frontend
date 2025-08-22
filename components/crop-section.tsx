import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'

interface CropSectionProps {
  onCropSelect: (cropName: string) => void
  selectedCrop: string
}

export default function CropSection({ onCropSelect, selectedCrop }: CropSectionProps) {
  const crops = [
    { 
      name: '대파', 
      status: '생육 양호',
      action: '적절한 간격 유지 및 통풍 확보',
      statusColor: 'bg-green-100 text-green-800'
    },
    { 
      name: '부추', 
      status: '수확기',
      action: '잎이 20-30cm일 때 수확하여 연속 수확',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    { 
      name: '고추', 
      status: '개화기',
      action: '적정 온도 유지 및 수분 공급으로 착과율 향상',
      statusColor: 'bg-orange-100 text-orange-800'
    }
  ]

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">
          <ResponsiveH3 className="!text-foreground">내 작물</ResponsiveH3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-fluid-base">
          {crops.map((crop) => (
            <div 
              key={crop.name} 
              className={`p-fluid-base bg-secondary rounded-lg border border-border cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedCrop === crop.name 
                  ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5 border-primary/30' 
                  : 'hover:bg-secondary/80'
              }`}
              onClick={() => onCropSelect(crop.name)}
            >
              <div className="flex items-center space-fluid-base">
                {/* 작물 이름과 상태 */}
                <div className="flex-shrink-0">
                  <ResponsiveP className="font-semibold text-foreground">{crop.name}</ResponsiveP>
                  <Badge className={`text-fluid-xs ${crop.statusColor}`}>
                    {crop.status}
                  </Badge>
                </div>
                
                {/* 관리 액션 */}
                <div className="flex-1 min-w-0">
                  <ResponsiveSmall className="text-muted-foreground leading-relaxed">
                    {crop.action}
                  </ResponsiveSmall>
                </div>

                {/* 선택 표시 */}
                {selectedCrop === crop.name && (
                  <div className="flex-shrink-0">
                    <Badge className="bg-primary text-primary-foreground text-fluid-xs">
                      선택됨
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ResponsiveSmall className="text-gray-400">* 작물을 클릭하여 비료/퇴비 추천을 확인하세요</ResponsiveSmall>
        </div>
      </CardContent>
    </Card>
  )
}
