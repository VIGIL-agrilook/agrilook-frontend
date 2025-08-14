'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FloatingChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-8 right-8 w-24 h-24 bg-farm-orange rounded-full shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center z-50"
    >
      <div className="w-20 h-20 bg-farm-cream rounded-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/farmento.png" 
          alt="농동이 챗봇" 
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
        </div>

    </button>
  )
}