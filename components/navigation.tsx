'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', label: '🏠 홈', mobileIcon: '🏠' },
    { href: '/dashboard', label: '📊 대시보드', mobileIcon: '📊' },
    { href: '/monitoring', label: '🎥 실시간관리', mobileIcon: '🎥' },
    { href: '/chatbot', label: '🤖 챗봇', mobileIcon: '🤖' },
    { href: '/mypage', label: '🌱 마이페이지', mobileIcon: '🌱' }
  ]

  return (
    <nav className="bg-green-600 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/home" className="flex items-center space-x-2">
            {/* 로고 이미지 */}
            <Image 
              src="/logo.png" 
              alt="들여다밭 로고" 
              width={40}
              height={40}
              className="object-contain"
            />
            
            {/* 브랜드명 */}
            <span className="text-xl md:text-2xl font-bold text-white">들여다밭</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex space-x-2 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-green-900 hover:bg-white transition-colors px-2 md:px-3 py-1 rounded-md text-white font-medium',
                  pathname === item.href && 'text-green-900 font-semibold bg-white shadow-sm'
                )}
                title={item.label} // 모바일에서 툴팁으로 표시
              >
                {/* 모바일에서는 아이콘만, 데스크톱에서는 전체 텍스트 */}
                <span className="md:hidden text-lg">{item.mobileIcon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
