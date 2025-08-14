'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ResponsiveH3, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import { SoilDataUploadForm } from '@/lib/types'

interface SoilSensorUploadProps {
  onDataUpload: (data: any) => void;
}

export default function SoilSensorUpload({ onDataUpload }: SoilSensorUploadProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [formData, setFormData] = useState<SoilDataUploadForm>({
    location: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    pH: '',
    organicMatter: '',
    moisture: '',
    temperature: '',
    conductivity: '',
    notes: ''
  })

  const handleInputChange = (field: keyof SoilDataUploadForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // 폼 데이터 검증
    const requiredFields = ['location', 'nitrogen', 'phosphorus', 'potassium', 'pH']
    const missingFields = requiredFields.filter(field => !formData[field as keyof SoilDataUploadForm])
    
    if (missingFields.length > 0) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    // 데이터 변환 및 업로드
    const soilData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      location: formData.location,
      soilData: {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        pH: parseFloat(formData.pH),
        organicMatter: parseFloat(formData.organicMatter) || 0,
        moisture: parseFloat(formData.moisture) || 0,
        temperature: parseFloat(formData.temperature) || 0,
        conductivity: parseFloat(formData.conductivity) || 0
      },
      notes: formData.notes
    }

    // 부모 컴포넌트로 데이터 전달
    onDataUpload(soilData)
    
    // 폼 초기화
    setFormData({
      location: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      pH: '',
      organicMatter: '',
      moisture: '',
      temperature: '',
      conductivity: '',
      notes: ''
    })
    
    setShowUploadDialog(false)
    alert('토양 센서 데이터가 성공적으로 업로드되었습니다!')
  }

  const handleReset = () => {
    setFormData({
      location: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      pH: '',
      organicMatter: '',
      moisture: '',
      temperature: '',
      conductivity: '',
      notes: ''
    })
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">
          <ResponsiveH3 className="!text-foreground">🌱 토양 센서 데이터 업로드</ResponsiveH3>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-fluid-base">
        <ResponsiveP className="text-muted-foreground">
          토양 센서에서 측정한 데이터를 업로드하여 정확한 토양 분석 결과를 확인하세요.
        </ResponsiveP>
        
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              📊 토양 센서 데이터 업로드
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                <ResponsiveH3>토양 센서 데이터 입력</ResponsiveH3>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-fluid-lg">
              {/* 측정 위치 */}
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  측정 위치 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="예: 농지 A구역, 온실 1호 등"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              {/* NPK 값 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-base">
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    질소 (N) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.nitrogen}
                      onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      mg/kg
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    인산 (P) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.phosphorus}
                      onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      mg/kg
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    칼륨 (K) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.potassium}
                      onChange={(e) => handleInputChange('potassium', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      mg/kg
                    </span>
                  </div>
                </div>
              </div>

              {/* pH 및 기타 값 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-base">
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    pH <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="6.5"
                    value={formData.pH}
                    onChange={(e) => handleInputChange('pH', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    유기물 함량
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.organicMatter}
                      onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* 토양 환경 값 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-base">
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    토양 수분
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.moisture}
                      onChange={(e) => handleInputChange('moisture', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    토양 온도
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange('temperature', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      °C
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    전기전도도
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.conductivity}
                      onChange={(e) => handleInputChange('conductivity', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fluid-xs text-gray-500">
                      mS/cm
                    </span>
                  </div>
                </div>
              </div>

              {/* 추가 메모 */}
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  추가 메모
                </label>
                <Textarea
                  placeholder="측정 시 특이사항이나 추가 정보를 입력하세요..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              </div>

              {/* 참고 정보 */}
              <div className="bg-blue-50 p-fluid-base rounded-lg">
                <ResponsiveSmall className="text-blue-800 font-medium">📋 참고 정보</ResponsiveSmall>
                <ResponsiveSmall className="text-blue-700 block mt-1">
                  • 질소(N): 150-200 mg/kg 권장<br/>
                  • 인산(P): 80-120 mg/kg 권장<br/>
                  • 칼륨(K): 200-250 mg/kg 권장<br/>
                  • pH: 6.0-7.0이 대부분 작물에 적합
                </ResponsiveSmall>
              </div>

              {/* 버튼 */}
              <div className="flex gap-fluid-base justify-end">
                <Button
                  variant="outline"
                  onClick={handleReset}
                >
                  초기화
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-primary text-primary-foreground"
                >
                  데이터 업로드
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
