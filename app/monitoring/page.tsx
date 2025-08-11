'use client'

import Image from 'next/image'
import Navigation from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MonitoringPage() {

  return (
    <div className="min-h-screen bg-farm-light-green">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-farm-brown mb-8">실시간 관리</h1>
        
        {/* 왼쪽: CCTV, 오른쪽: 침입자 현황 */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* 왼쪽: CCTV 영상 영역 */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-farm-brown">CCTV 1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 rounded overflow-hidden">
                  <Image
                    src="/cctv1.jpg"
                    alt="CCTV 1 영상"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2">* 실시간 CCTV 영상</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-farm-brown">CCTV 2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 rounded overflow-hidden">
                  <Image
                    src="/cctv2.jpg"
                    alt="CCTV 2 영상"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2">* 실시간 CCTV 영상</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-farm-brown">CCTV 3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 rounded overflow-hidden">
                  <Image
                    src="/cctv3.jpg"
                    alt="CCTV 3 영상"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2">* 실시간 CCTV 영상</div>
              </CardContent>
            </Card>
          </div>
          
          {/* 오른쪽: 침입자 현황 */}
          <div>
            <Card className="bg-white h-full">
              <CardHeader>
                <CardTitle className="text-farm-brown">침입자 현황</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-red-600 font-semibold">
                  최근 24시간 내 침입자 3건 감지
                </div>
                
                {/* 멧돼지 */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    • 멧돼지 (오늘 06:23)
                  </div>
                  <div className="ml-4">
                    <Image
                      src="/intruder1.png"
                      alt="멧돼지 침입자"
                      width={300}
                      height={200}
                      className="w-full h-72 object-cover rounded"
                    />
                  </div>
                </div>

                {/* 고라니 */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    • 고라니 (어제 23:50)
                  </div>
                  <div className="ml-4">
                    <Image
                      src="/intruder2.png"
                      alt="고라니 침입자"
                      width={300}
                      height={200}
                      className="w-full h-72 object-cover rounded"
                    />
                  </div>
                </div>

                {/* 조류 떼 */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    • 조류 떼 (어제 18:15)
                  </div>
                  <div className="ml-4">
                    <Image
                      src="/intruder3.png"
                      alt="조류 떼 침입자"
                      width={300}
                      height={200}
                      className="w-full h-72 object-cover rounded"
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-400">* Mock 데이터 - 실제 AI 분석 연동 예정</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
