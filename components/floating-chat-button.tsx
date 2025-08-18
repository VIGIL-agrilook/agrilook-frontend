'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FloatingChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-6 right-6 w-16 h-16 md:bottom-8 md:right-8 md:w-24 md:h-24 bg-farm-orange bg-opacity-95 rounded-full shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center z-50"
    >
      <div className="w-12 h-12 md:w-20 md:h-20 bg-farm-cream rounded-full flex items-center justify-center overflow-hidden">
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