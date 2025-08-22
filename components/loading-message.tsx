'use client'

import { ResponsiveSmall } from '@/components/ui/typography'
import { Loader2 } from 'lucide-react'

interface LoadingMessageProps {
  id: number
  timestamp: Date
}

export function LoadingMessage({ id, timestamp }: LoadingMessageProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] md:max-w-2xl lg:max-w-3xl px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted text-foreground">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm text-muted-foreground">답변을 생성하고 있습니다...</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <ResponsiveSmall className="opacity-70">
            {timestamp.toLocaleTimeString()}
          </ResponsiveSmall>
        </div>
      </div>
    </div>
  )
} 