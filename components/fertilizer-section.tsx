import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FertilizerSection() {
  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">비료 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-secondary rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">추천 비료</h4>
            <p className="text-sm text-muted-foreground">
              질소 비료 (요소) - 10kg/10a<br/>
              인산 비료 (용과린) - 5kg/10a<br/>
              칼리 비료 (염화칼리) - 8kg/10a
            </p>
          </div>
          <div className="text-xs text-gray-400">
            * Mock 데이터 - 비료추천 API 연동 예정 (토양 분석 결과 기반 맞춤 추천)
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
