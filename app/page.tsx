'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function IntroPage() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/home')
  }

  useEffect(() => {
    const handleKeyPress = () => {
      router.push('/home')
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-farm-cream flex items-center justify-center cursor-pointer">
      <div className="text-center">
        <div className="w-48 h-48 bg-farm-brown rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
          <span className="text-farm-cream text-3xl font-bold">들여다밭</span>
        </div>
        <p className="text-farm-brown text-lg">화면을 클릭하여 시작하세요</p>
      </div>
    </div>
  )
}
