import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CropSection() {
  const crops = [
    { name: '오이', icon: '🥒', status: '생육 양호' },
    { name: '토마토', icon: '🍅', status: '개화기' },
    { name: '배추', icon: '🥬', status: '결구기' }
  ]

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">내 작물</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.name} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
              <span className="text-2xl">{crop.icon}</span>
              <div>
                <p className="font-semibold text-foreground">{crop.name}</p>
                <p className="text-sm text-muted-foreground">{crop.info}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-4">* Mock 데이터 - 작물 관리 API 연동 예정</div>
      </CardContent>
    </Card>
  )
}
