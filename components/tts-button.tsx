'use client'

import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Loader2, Play, Pause } from 'lucide-react'
import { useTTS } from '@/lib/hooks/useTTS'
import { useEffect } from 'react'

interface TTSButtonProps {
  text: string
  disabled?: boolean
  className?: string
  autoPlay?: boolean
}

export function TTSButton({ 
  text, 
  disabled = false, 
  className = '',
  autoPlay = false
}: TTSButtonProps) {
  const {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
    error
  } = useTTS({
    language: 'ko-KR',
    rate: 1,
    pitch: 1,
    volume: 1
  })

  // autoPlay가 true이고 텍스트가 있으면 자동 재생
  useEffect(() => {
    if (autoPlay && text.trim() && isSupported) {
      speak(text)
    }
  }, [text, autoPlay, isSupported, speak])

  const handlePlayClick = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }

  // 지원하지 않는 경우 비활성화
  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        className={`text-muted-foreground ${className}`}
        title="이 브라우저는 음성 합성을 지원하지 않습니다"
      >
        <VolumeX className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePlayClick}
      disabled={disabled || !text.trim()}
      className={`transition-all duration-200 ${
        isSpeaking ? 'text-primary' : ''
      } ${className}`}
      title={isSpeaking ? '음성 재생 중지' : '음성으로 들으기'}
    >
      {isSpeaking ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  )
}
