'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function IntroPage() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showContactDialog, setShowContactDialog] = useState(false)

  const handleTryDemo = () => {
    router.push('/home')
  }

  const handleLogin = () => {
    setShowContactDialog(true)
  }

  const handleSignup = () => {
    setShowContactDialog(true)
  }

  return (
    <div className="min-h-screen bg-farm-cream flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* 왼쪽: 브랜드 섹션 */}
        <div className="text-center">
          <div className="mb-8">
            <Image 
              src="/logo.png" 
              alt="들여다밭 로고" 
              width={300}
              height={300}
              className="object-contain mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-farm-brown mb-4">
            올인원 토양·침입자 관리
          </h1>
          <p className="text-farm-brown text-lg mb-8">
            AI와 IoT 기술로 노지를 스마트하게 관리하세요
          </p>
          
          {/* 체험하기 버튼 (강조) */}
          <Button 
            onClick={handleTryDemo}
            className="bg-farm-orange hover:bg-farm-orange/90 text-white text-xl px-24 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            size="lg"
          >
            🌱 무료 체험하기
          </Button>
        </div>

        {/* 오른쪽: 로그인 섹션 */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-farm-brown">로그인</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-farm-brown mb-2">
                  아이디
                </label>
                <Input 
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-farm-brown mb-2">
                  비밀번호
                </label>
                <Input 
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-farm-brown hover:bg-farm-brown/90 text-white"
                >
                  로그인
                </Button>
                
                <Button 
                  onClick={handleSignup}
                  variant="outline"
                  className="w-full border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white"
                >
                  회원가입
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 관리자 문의 팝업 */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>서비스 이용 안내</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              관리자에게 문의해주세요.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowContactDialog(false)}
                className="bg-farm-orange hover:bg-farm-orange/90 text-white"
              >
                확인
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
