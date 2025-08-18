import type { Metadata } from 'next'
import './globals.css'

// Google Fonts 대신 시스템 폰트 사용
const systemFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

export const metadata: Metadata = {
  title: '들여다밭 - 노지농업 스마트 솔루션',
  description: '스마트 농업 관리 플랫폼',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: systemFont }}>
        {children}
      </body>
    </html>
  )
}
