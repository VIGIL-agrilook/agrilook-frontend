'use client'

export default function Farm3DViewer({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className} bg-gradient-to-b from-blue-200 to-green-200`}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">��️</div>
          <h3 className="text-2xl font-bold text-farm-brown mb-4">농장 전경</h3>
          <p className="text-farm-brown mb-2">스마트 농장 관리 시스템</p>
          <p className="text-farm-brown text-sm mb-6">
            AI와 IoT 기술로 농장을 효율적으로 관리하세요
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-farm-brown">작물 관리</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-farm-brown">토양 모니터링</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl mb-2">🚨</div>
              <p className="text-farm-brown">침입자 감지</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-farm-brown">데이터 분석</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}