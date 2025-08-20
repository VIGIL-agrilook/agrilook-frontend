'use client'

import { ResponsiveSmall } from '@/components/ui/typography'
import { TTSButton } from '@/components/tts-button'

interface MessageItemProps {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
  renderMessageContent: (text: string) => JSX.Element
}

export function MessageItem({ 
  id, 
  text, 
  isUser, 
  timestamp, 
  renderMessageContent 
}: MessageItemProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] md:max-w-2xl lg:max-w-3xl px-3 py-2 md:px-4 md:py-3 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <div className="break-words">
          {renderMessageContent(text)}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <ResponsiveSmall className="opacity-70">
            {timestamp.toLocaleTimeString()}
          </ResponsiveSmall>
          
          {/* 사용자 메시지가 아닌 경우에만 TTS 버튼 표시 */}
          {!isUser && (
            <TTSButton 
              text={text} 
              className="ml-2"
              autoPlay={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
