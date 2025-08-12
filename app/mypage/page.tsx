'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function MyPage() {
  const [farmAddress, setFarmAddress] = useState('구리시 교문동 486')
  const [selectedCrops, setSelectedCrops] = useState(['오이', '토마토', '배추'])
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)

  const availableCrops = [
    '오이', '토마토', '배추', '상추', '시금치', '무', '당근', '감자', '고구마', '옥수수'
  ]

  const handleAddressUpdate = () => {
    setShowAddressDialog(false)
    alert('농지 주소가 업데이트되었습니다.')
  }

  const handleCropToggle = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">마이페이지</h1>
        
        <div className="space-y-6">
          {/* 농지 주소 수정 */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">농지 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
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
                        <p className="text-sm text-gray-600">
                          농지 주소 변경을 위해서는 관리자 승인이 필요합니다.
                          변경 요청 후 1-2일 내에 처리됩니다.
                        </p>
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
            </CardContent>
          </Card>

          {/* 작물 수정 */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">재배 작물 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  현재 재배 중인 작물
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCrops.map((crop) => (
                    <span 
                      key={crop}
                      className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
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
                      <span className="text-sm text-foreground">{crop}</span>
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    사용자명
                  </label>
                  <Input value="농부김씨" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    이메일
                  </label>
                  <Input value="farmer@example.com" readOnly />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                계정 정보 변경은 고객센터로 문의해주세요.
              </p>
              
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
                      <p className="text-center text-gray-600">
                        관리자에게 문의해주세요.
                      </p>
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
                      <p className="text-center text-gray-600">
                        관리자에게 문의해주세요.
                      </p>
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
