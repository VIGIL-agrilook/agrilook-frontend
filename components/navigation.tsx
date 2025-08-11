'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', label: '홈' },
    { href: '/dashboard', label: '대시보드' },
    { href: '/monitoring', label: '실시간관리' },
    { href: '/chatbot', label: '챗봇' },
    { href: '/mypage', label: '마이페이지' }
  ]

  return (
    <nav className="bg-farm-brown text-farm-cream shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-farm-orange rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">들</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">들여다밭</span>
              <span className="text-sm text-gray-400">올인원 토양·침입자 관리 플랫폼</span>
            </div>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-farm-orange transition-colors',
                  pathname === item.href && 'text-farm-orange font-semibold'
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
