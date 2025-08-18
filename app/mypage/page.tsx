'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import SoilSensorUpload from '@/components/soil-sensor-upload'
import { ResponsiveH1, ResponsiveP, ResponsiveSmall } from '@/components/ui/typography'
import { SoilSensorData } from '@/lib/types'

export default function MyPage() {
  const [farmAddress, setFarmAddress] = useState('구리시 교문동 486')
  const [farmSize, setFarmSize] = useState('1000') // 농지 크기 상태 추가
  const [selectedCrops, setSelectedCrops] = useState(['오이', '토마토', '배추'])
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [showSizeDialog, setShowSizeDialog] = useState(false) // 농지 크기 다이얼로그 상태 추가
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [soilDataHistory, setSoilDataHistory] = useState<SoilSensorData[]>([])

  const availableCrops = [
    '오이', '토마토', '배추', '상추', '시금치', '무', '당근', '감자', '고구마', '옥수수'
  ]

  // 컴포넌트 마운트 시 로컬 스토리지에서 토양 데이터 불러오기
  useEffect(() => {
    const savedSoilData = localStorage.getItem('soilSensorData')
    if (savedSoilData) {
      try {
        setSoilDataHistory(JSON.parse(savedSoilData))
      } catch (error) {
        console.error('토양 데이터 로드 중 오류:', error)
      }
    }
  }, [])

  // 토양 데이터 업로드 핸들러
  const handleSoilDataUpload = (data: SoilSensorData) => {
    const newSoilDataHistory = [data, ...soilDataHistory]
    setSoilDataHistory(newSoilDataHistory)
    
    // 로컬 스토리지에 저장
    localStorage.setItem('soilSensorData', JSON.stringify(newSoilDataHistory))
  }

  const handleAddressUpdate = () => {
    setShowAddressDialog(false)
    alert('농지 주소가 업데이트되었습니다.')
  }

  const handleSizeUpdate = () => {
    setShowSizeDialog(false)
    alert('농지 크기가 업데이트되었습니다.')
  }

  const handleCropToggle = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    )
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl pt-20">
        <ResponsiveH1 className="text-foreground mb-8">마이페이지</ResponsiveH1>
        
        <div className="space-y-6">
          {/* 농지 정보 */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">농지 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 농지 주소 */}
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  현재 농지 주소
                </label>
                <div className="flex gap-2">
                  <Input 
                    value={farmAddress} 
                    readOnly 
                    className="flex-1"
                  />
                  <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-primary-foreground">
                        주소 수정
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>농지 주소 수정</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <ResponsiveP className="text-gray-600">
                          농지 주소 변경을 위해서는 관리자 승인이 필요합니다.
                          변경 요청 후 1-2일 내에 처리됩니다.
                        </ResponsiveP>
                        <Input 
                          placeholder="새로운 농지 주소를 입력하세요"
                          onChange={(e) => setFarmAddress(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddressDialog(false)}
                          >
                            취소
                          </Button>
                          <Button 
                            onClick={handleAddressUpdate}
                            className="bg-primary text-primary-foreground"
                          >
                            변경 요청
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* 농지 크기 */}
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  농지 크기
                </label>
                <div className="flex gap-2">
                  <Input 
                    value={farmSize} 
                    readOnly 
                    className="flex-1"
                    placeholder="농지 크기를 입력하세요"
                  />
                  <span className="flex items-center px-3 text-fluid-sm text-gray-500 bg-gray-100 rounded-md">
                    ㎡
                  </span>
                  <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-primary-foreground">
                        크기 수정
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>농지 크기 수정</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <ResponsiveP className="text-gray-600">
                          농지 크기를 정확히 입력해주세요. 정확한 크기 정보는 맞춤형 관리 방안 제공에 활용됩니다.
                        </ResponsiveP>
                        <div className="flex gap-2">
                          <Input 
                            type="number"
                            placeholder="농지 크기"
                            value={farmSize}
                            onChange={(e) => setFarmSize(e.target.value)}
                            className="flex-1"
                          />
                          <span className="flex items-center px-3 text-fluid-sm text-gray-500 bg-gray-100 rounded-md">
                            ㎡
                          </span>
                        </div>
                        <ResponsiveSmall className="text-gray-500">
                          * 1평 = 3.3058㎡, 1헥타르 = 10,000㎡
                        </ResponsiveSmall>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowSizeDialog(false)}
                          >
                            취소
                          </Button>
                          <Button 
                            onClick={handleSizeUpdate}
                            className="bg-primary text-primary-foreground"
                          >
                            저장
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 토양 센서 데이터 업로드 */}
          <SoilSensorUpload onDataUpload={handleSoilDataUpload} />

          {/* 토양 데이터 히스토리 */}
          {soilDataHistory.length > 0 && (
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">📊 토양 데이터 히스토리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {soilDataHistory.slice(0, 5).map((data) => (
                    <div key={data.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <ResponsiveP className="font-semibold text-foreground">
                            📍 {data.location}
                          </ResponsiveP>
                          <ResponsiveSmall className="text-gray-500">
                            {formatDate(data.timestamp)}
                          </ResponsiveSmall>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center">
                          <ResponsiveSmall className="text-gray-600">질소 (N)</ResponsiveSmall>
                          <ResponsiveP className="font-medium text-blue-600">
                            {data.soilData.nitrogen} mg/kg
                          </ResponsiveP>
                        </div>
                        <div className="text-center">
                          <ResponsiveSmall className="text-gray-600">인산 (P)</ResponsiveSmall>
                          <ResponsiveP className="font-medium text-green-600">
                            {data.soilData.phosphorus} mg/kg
                          </ResponsiveP>
                        </div>
                        <div className="text-center">
                          <ResponsiveSmall className="text-gray-600">칼륨 (K)</ResponsiveSmall>
                          <ResponsiveP className="font-medium text-orange-600">
                            {data.soilData.potassium} mg/kg
                          </ResponsiveP>
                        </div>
                        <div className="text-center">
                          <ResponsiveSmall className="text-gray-600">pH</ResponsiveSmall>
                          <ResponsiveP className="font-medium text-purple-600">
                            {data.soilData.pH}
                          </ResponsiveP>
                        </div>
                      </div>
                      
                      {data.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded">
                          <ResponsiveSmall className="text-gray-700">
                            📝 {data.notes}
                          </ResponsiveSmall>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {soilDataHistory.length > 5 && (
                    <ResponsiveSmall className="text-gray-500 text-center block">
                      최근 5개 데이터만 표시됩니다. (총 {soilDataHistory.length}개)
                    </ResponsiveSmall>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 작물 수정 */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">재배 작물 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  현재 재배 중인 작물
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCrops.map((crop) => (
                    <span 
                      key={crop}
                      className="bg-secondary text-foreground px-3 py-1 rounded-full text-fluid-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-fluid-sm font-medium text-foreground mb-2">
                  작물 선택
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableCrops.map((crop) => (
                    <label key={crop} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCrops.includes(crop)}
                        onChange={() => handleCropToggle(crop)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-fluid-sm text-foreground">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <Button className="bg-primary text-primary-foreground">
                작물 정보 저장
              </Button>
            </CardContent>
          </Card>

          {/* 계정 정보 */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">계정 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    사용자명
                  </label>
                  <Input value="농부김씨" readOnly />
                </div>
                <div>
                  <label className="block text-fluid-sm font-medium text-foreground mb-2">
                    이메일
                  </label>
                  <Input value="farmer@example.com" readOnly />
                </div>
              </div>
              <ResponsiveP className="text-gray-600">
                계정 정보 변경은 고객센터로 문의해주세요.
              </ResponsiveP>
              
              {/* 계정 관리 버튼들 */}
              <div className="flex gap-3">
                <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      로그아웃
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>로그아웃</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ResponsiveP className="text-center text-gray-600">
                        관리자에게 문의해주세요.
                      </ResponsiveP>
                      <div className="flex justify-center">
                        <Button 
                          onClick={() => setShowLogoutDialog(false)}
                          className="bg-primary text-primary-foreground"
                        >
                          확인
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      계정 삭제
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>계정 삭제</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ResponsiveP className="text-center text-gray-600">
                        관리자에게 문의해주세요.
                      </ResponsiveP>
                      <div className="flex justify-center">
                        <Button 
                          onClick={() => setShowDeleteAccountDialog(false)}
                          className="bg-primary text-primary-foreground"
                        >
                          확인
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
