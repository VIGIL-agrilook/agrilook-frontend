import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompostSection() {
  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">퇴비 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-secondary rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">토마토 추천퇴비</h4>
            <p className="text-sm text-muted-foreground">
            우분퇴비	처방량 : 3kg<br/>
            계분퇴비	처방량 : 3kg<br/>
            돈부퇴비	처방량 : 3kg<br/>
            혼합퇴비	처방량 : 3kg<br/>
            </p>
          </div>
          <div className="text-xs text-gray-400">
          * 4가지 퇴비 중 하나를 선택해서 처방해주세요
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}
