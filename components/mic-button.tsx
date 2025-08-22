'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useSTT } from '@/lib/hooks/useSTT'
import { useEffect } from 'react'

interface MicButtonProps {
  onTranscriptChange: (transcript: string) => void
  onTranscriptFinal: (transcript: string) => void
  onListeningChange?: (isListening: boolean) => void
  disabled?: boolean
  className?: string
}

export function MicButton({ 
  onTranscriptChange, 
  onTranscriptFinal, 
  onListeningChange,
  disabled = false,
  className = ''
}: MicButtonProps) {
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error
  } = useSTT({
    language: 'ko-KR',
    continuous: false,
    interimResults: true
  })

  // 실시간 transcript 변경 시 콜백 호출
  useEffect(() => {
    onTranscriptChange(transcript)
  }, [transcript, onTranscriptChange])

  // STT 상태 변경 시 콜백 호출
  useEffect(() => {
    if (onListeningChange) {
      onListeningChange(isListening)
    }
  }, [isListening, onListeningChange])

  // 에러가 있으면 콘솔에 출력
  useEffect(() => {
    if (error) {
      console.error('STT Error:', error)
    }
  }, [error])

  const handleMicClick = () => {
    console.log('Mic button clicked, isListening:', isListening, 'isSupported:', isSupported)
    
    if (isListening) {
      console.log('Stopping listening...')
      stopListening()
      // 최종 transcript가 있으면 전송
      if (transcript.trim()) {
        console.log('Final transcript:', transcript.trim())
        onTranscriptFinal(transcript.trim())
        resetTranscript()
      }
    } else {
      console.log('Starting listening...')
      // STT 시작 시 transcript만 초기화하고, 입력창은 그대로 유지
      resetTranscript()
      startListening()
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
        title="이 브라우저는 음성 인식을 지원하지 않습니다"
      >
        <MicOff className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={handleMicClick}
      disabled={disabled}
      className={`transition-all duration-200 ${
        isListening ? 'animate-pulse' : ''
      } ${className}`}
      title={isListening ? '음성 인식 중... 클릭하여 중지' : '음성으로 입력하기'}
    >
      {isListening ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  )
}
