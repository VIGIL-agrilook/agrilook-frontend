import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompostSection() {
  return (
    <Card className="bg-white h-full">
      <CardHeader>
        <CardTitle className="text-farm-brown">퇴비 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <img
            src="/placeholder.svg?height=80&width=200&text=퇴비"
            alt="퇴비"
            className="w-full h-20 object-cover rounded"
          />
          <div className="p-3 bg-farm-light-green rounded-lg">
            <h4 className="font-semibold text-farm-brown mb-2">퇴비 추천</h4>
            <p className="text-sm text-gray-700">
              우분 퇴비 - 2톤/10a<br/>
              계분 퇴비 - 1.5톤/10a<br/>
              적용 시기: 파종 2주 전
            </p>
          </div>
          <div className="text-xs text-gray-400">
            * Mock 데이터 - 퇴비추천 API 연동 예정 (작물별 맞춤 퇴비 추천)
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
