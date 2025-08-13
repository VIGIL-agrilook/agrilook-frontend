'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', label: '🏠 홈' },
    { href: '/dashboard', label: '📊 대시보드' },
    { href: '/monitoring', label: '🎥 실시간관리' },
    { href: '/chatbot', label: '🤖 챗봇' },
    { href: '/mypage', label: '🌱 마이페이지' }
  ]

  return (
    <nav className="bg-white text-foreground border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/home" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="들여다밭 로고" 
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">들여다밭</span>
              <span className="text-sm text-muted-foreground">올인원 AI 농지 관리 플랫폼</span>
            </div>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-primary transition-colors px-3 py-1 rounded-md',
                  pathname === item.href && 'text-primary font-semibold border-2 border-green-500'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
