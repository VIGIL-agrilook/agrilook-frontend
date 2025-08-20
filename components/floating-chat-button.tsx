'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FloatingChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-6 right-6 w-16 h-16 md:bottom-8 md:right-8 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-105"
    >
      <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
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