import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SoilStatusSectionProps {
  isPremium: boolean
}

export default function SoilStatusSection({ isPremium }: SoilStatusSectionProps) {
  const soilData = [
    { name: 'pH', value: isPremium ? '6.2' : '5.5-7.0', status: 'normal', unit: '' },
    { name: 'EC', value: isPremium ? '1.8' : '1.0-2.0', status: 'normal', unit: '[dS/m]' },
    { name: 'Ca', value: isPremium ? '245' : '200-300', status: 'normal', unit: '[ppm]' },
    { name: 'Mg', value: isPremium ? '89' : '50-100', status: 'high', unit: '[ppm]' },
    { name: 'OC', value: isPremium ? '2.1' : '1.5-3.0', status: 'normal', unit: '[%]' },
    { name: 'K', value: isPremium ? '156' : '120-200', status: 'normal', unit: '[ppm]' },
    { name: 'P', value: isPremium ? '45' : '30-60', status: 'normal', unit: '[ppm]' }
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">토양 상태</CardTitle>
          <Badge className="bg-blue-100 text-blue-800 text-xs">
            {isPremium ? '토양센서 기반 - 90% 정확도' : '인공위성 기반 - 70% 정확도'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 1행: 3개 */}
          <div className="grid grid-cols-3 gap-4">
            {soilData.slice(0, 3).map((item) => (
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
          
          {/* 2행: 4개 */}
          <div className="grid grid-cols-4 gap-4">
            {soilData.slice(3, 7).map((item) => (
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
        </div>
      </CardContent>
    </Card>
  )
}