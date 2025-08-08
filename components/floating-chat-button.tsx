'use client'

import { useRouter } from 'next/navigation'

export default function FloatingChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-8 right-8 w-16 h-16 bg-farm-orange rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
    >
      <div className="w-12 h-12 bg-farm-cream rounded-full flex items-center justify-center">
        <span className="text-2xl">🤖</span>
      </div>
    </button>
  )
}
