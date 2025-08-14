'use client'

export default function Farm3DViewer({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className} bg-gradient-to-b from-blue-200 to-green-200`}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold text-farm-brown mb-4">농장 전경</h3>
          <p className="text-farm-brown mb-2">스마트 농장 관리 시스템</p>

        </div>
      </div>
    </div>
  )
}