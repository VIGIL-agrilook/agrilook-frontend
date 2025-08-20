'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SoilSensorData } from '@/lib/types'

interface SoilDataUploadForm {
  location: string
  nitrogen: string
  phosphorus: string
  potassium: string
  pH: string
  organicMatter: string
  moisture: string
  temperature: string
  conductivity: string
  notes: string
}

interface SoilSensorUploadProps {
  onDataUpload: (data: any) => void;
}

export default function SoilSensorUpload({ onDataUpload }: SoilSensorUploadProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<SoilDataUploadForm>>({})
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
    
    // 에러 메시지 제거
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<SoilDataUploadForm> = {}
    
    // 필수 필드 검증
    if (!formData.location.trim()) {
      errors.location = '위치를 입력해주세요'
    }
    
    if (!formData.nitrogen.trim()) {
      errors.nitrogen = '질소 함량을 입력해주세요'
    } else if (isNaN(Number(formData.nitrogen)) || Number(formData.nitrogen) < 0) {
      errors.nitrogen = '유효한 숫자를 입력해주세요'
    }
    
    if (!formData.phosphorus.trim()) {
      errors.phosphorus = '인산 함량을 입력해주세요'
    } else if (isNaN(Number(formData.phosphorus)) || Number(formData.phosphorus) < 0) {
      errors.phosphorus = '유효한 숫자를 입력해주세요'
    }
    
    if (!formData.potassium.trim()) {
      errors.potassium = '칼륨 함량을 입력해주세요'
    } else if (isNaN(Number(formData.potassium)) || Number(formData.potassium) < 0) {
      errors.potassium = '유효한 숫자를 입력해주세요'
    }
    
    if (!formData.pH.trim()) {
      errors.pH = 'pH 값을 입력해주세요'
    } else if (isNaN(Number(formData.pH)) || Number(formData.pH) < 0 || Number(formData.pH) > 14) {
      errors.pH = 'pH는 0-14 사이의 값이어야 합니다'
    }
    
    // 선택적 필드 검증
    if (formData.organicMatter.trim() && (isNaN(Number(formData.organicMatter)) || Number(formData.organicMatter) < 0)) {
      errors.organicMatter = '유효한 숫자를 입력해주세요'
    }
    
    if (formData.moisture.trim() && (isNaN(Number(formData.moisture)) || Number(formData.moisture) < 0 || Number(formData.moisture) > 100)) {
      errors.moisture = '습도는 0-100% 사이의 값이어야 합니다'
    }
    
    if (formData.temperature.trim() && (isNaN(Number(formData.temperature)) || Number(formData.temperature) < -50 || Number(formData.temperature) > 100)) {
      errors.temperature = '온도는 -50°C ~ 100°C 사이의 값이어야 합니다'
    }
    
    if (formData.conductivity.trim() && (isNaN(Number(formData.conductivity)) || Number(formData.conductivity) < 0)) {
      errors.conductivity = '유효한 숫자를 입력해주세요'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // 데이터 변환 및 업로드
      const soilData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        location: formData.location.trim(),
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
        notes: formData.notes.trim()
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
      
      setFormErrors({})
      setShowUploadDialog(false)
      
      // 성공 메시지
      alert('토양 데이터가 성공적으로 업로드되었습니다!')
      
    } catch (error) {
      console.error('토양 데이터 업로드 오류:', error)
      alert('데이터 업로드 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
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
    setFormErrors({})
    setShowUploadDialog(false)
  }

  return (
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          📊 토양 센서 데이터 업로드
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>토양 센서 데이터 업로드</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 위치 정보 */}
          <div>
            <label className="block text-sm font-medium mb-2">위치 *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="예: 농장 A구역, 온실 1호 등"
              className={formErrors.location ? 'border-red-500' : ''}
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
            )}
          </div>

          {/* 필수 토양 성분 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">질소 (N) mg/kg *</label>
              <Input
                type="number"
                value={formData.nitrogen}
                onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                placeholder="150-200"
                className={formErrors.nitrogen ? 'border-red-500' : ''}
              />
              {formErrors.nitrogen && (
                <p className="text-red-500 text-sm mt-1">{formErrors.nitrogen}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">인산 (P) mg/kg *</label>
              <Input
                type="number"
                value={formData.phosphorus}
                onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                placeholder="80-120"
                className={formErrors.phosphorus ? 'border-red-500' : ''}
              />
              {formErrors.phosphorus && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phosphorus}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">칼륨 (K) mg/kg *</label>
              <Input
                type="number"
                value={formData.potassium}
                onChange={(e) => handleInputChange('potassium', e.target.value)}
                placeholder="200-250"
                className={formErrors.potassium ? 'border-red-500' : ''}
              />
              {formErrors.potassium && (
                <p className="text-red-500 text-sm mt-1">{formErrors.potassium}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">pH *</label>
              <Input
                type="number"
                step="0.1"
                value={formData.pH}
                onChange={(e) => handleInputChange('pH', e.target.value)}
                placeholder="6.0-7.0"
                className={formErrors.pH ? 'border-red-500' : ''}
              />
              {formErrors.pH && (
                <p className="text-red-500 text-sm mt-1">{formErrors.pH}</p>
              )}
            </div>
          </div>

          {/* 선택적 토양 성분 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">유기물 (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.organicMatter}
                onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                placeholder="1.5-3.0"
                className={formErrors.organicMatter ? 'border-red-500' : ''}
              />
              {formErrors.organicMatter && (
                <p className="text-red-500 text-sm mt-1">{formErrors.organicMatter}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">습도 (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.moisture}
                onChange={(e) => handleInputChange('moisture', e.target.value)}
                placeholder="20-40"
                className={formErrors.moisture ? 'border-red-500' : ''}
              />
              {formErrors.moisture && (
                <p className="text-red-500 text-sm mt-1">{formErrors.moisture}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">온도 (°C)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="15-25"
                className={formErrors.temperature ? 'border-red-500' : ''}
              />
              {formErrors.temperature && (
                <p className="text-red-500 text-sm mt-1">{formErrors.temperature}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">전기전도도 (mS/cm)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.conductivity}
                onChange={(e) => handleInputChange('conductivity', e.target.value)}
                placeholder="1.0-2.0"
                className={formErrors.conductivity ? 'border-red-500' : ''}
              />
              {formErrors.conductivity && (
                <p className="text-red-500 text-sm mt-1">{formErrors.conductivity}</p>
              )}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-medium mb-2">메모</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="추가적인 관찰 사항이나 특이사항을 기록하세요..."
              rows={3}
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? '업로드 중...' : '업로드'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
