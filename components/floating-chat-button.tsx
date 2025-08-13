'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FloatingChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-8 right-8 w-20 h-20 bg-farm-orange rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
    >
      <div className="w-16 h-16 bg-farm-cream rounded-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/farmento.png" 
          alt="농동이 챗봇" 
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
    </button>
  )
}