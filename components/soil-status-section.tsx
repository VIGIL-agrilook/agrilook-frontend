import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SoilStatusSectionProps {
  isPremium: boolean
  onUpgrade: () => void
}

export default function SoilStatusSection({ isPremium, onUpgrade }: SoilStatusSectionProps) {
  const soilData = [
    { name: 'pH', value: isPremium ? '6.2' : '5.5-7.0', status: 'normal', unit: '' },
    { name: 'EC', value: isPremium ? '1.8' : '1.0-2.0', status: 'normal', unit: '[dS/m]' },
    { name: 'Ca', value: isPremium ? '245' : '200-300', status: 'normal', unit: '[ppm]' },
    { name: 'Mg', value: isPremium ? '89' : '50-100', status: 'high', unit: '[ppm]' },
    { name: 'OC', value: isPremium ? '2.1' : '1.5-3.0', status: 'normal', unit: '[%]' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'high': return 'bg-red-100 text-red-800'
      case 'low': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '적정'
      case 'high': return '과다'
      case 'low': return '부족'
      default: return '측정중'
    }
  }

  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">토양 상태</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {soilData.map((item) => (
            <div key={item.name} className="text-center">
              <div className="text-2xl font-bold text-farm-brown mb-1">
                {item.value}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {item.name} {item.unit}
              </div>
              <Badge className={getStatusColor(item.status)}>
                {getStatusText(item.status)}
              </Badge>
            </div>
          ))}
        </div>
        
        {!isPremium && (
          <div className="text-center">
            <Button 
              onClick={onUpgrade}
              className="bg-farm-orange hover:bg-farm-orange/90 text-white"
            >
              유료 버전으로 전환하고 내 토양 진단하기
            </Button>
            <div className="text-xs text-gray-400 mt-2">* Mock 데이터 - 센서 연동 예정</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
