import { useState, useCallback, useEffect, useRef } from 'react'

interface UseTTSOptions {
  language?: string
  rate?: number
  pitch?: number
  volume?: number
}

interface UseTTSReturn {
  isSpeaking: boolean
  isSupported: boolean
  speak: (text: string) => void
  stop: () => void
  pause: () => void
  resume: () => void
  error: string | null
}

export const useTTS = (options: UseTTSOptions = {}): UseTTSReturn => {
  const {
    language = 'ko-KR',
    rate = 1,
    pitch = 1,
    volume = 1
  } = options

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // 브라우저 지원 여부 확인
    if (!('speechSynthesis' in window)) {
      setIsSupported(false)
      setError('이 브라우저는 음성 합성을 지원하지 않습니다.')
      return
    }

    setIsSupported(true)
    synthesisRef.current = window.speechSynthesis

    // 한국어 보이스 우선 선택
    const selectKoreanVoice = () => {
      const voices = synthesisRef.current?.getVoices() || []
      const koreanVoice = voices.find(voice => 
        voice.lang.startsWith('ko') || voice.lang === 'ko-KR'
      )
      
      if (koreanVoice && utteranceRef.current) {
        utteranceRef.current.voice = koreanVoice
      }
    }

    // 보이스 목록이 로드되면 한국어 보이스 선택
    if (synthesisRef.current?.getVoices().length > 0) {
      selectKoreanVoice()
    } else {
      synthesisRef.current?.addEventListener('voiceschanged', selectKoreanVoice)
    }

    return () => {
      synthesisRef.current?.removeEventListener('voiceschanged', selectKoreanVoice)
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!isSupported || !synthesisRef.current) {
      setError('음성 합성을 사용할 수 없습니다.')
      return
    }

    try {
      // 이전 재생 중단
      synthesisRef.current.cancel()

      // 새로운 utterance 생성
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      // 한국어 보이스 우선 선택
      const voices = synthesisRef.current.getVoices()
      const koreanVoice = voices.find(voice => 
        voice.lang.startsWith('ko') || voice.lang === 'ko-KR'
      )
      if (koreanVoice) {
        utterance.voice = koreanVoice
      }

      // 이벤트 핸들러 설정
      utterance.onstart = () => {
        setIsSpeaking(true)
        setError(null)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        utteranceRef.current = null
      }

      utterance.onerror = (event) => {
        setIsSpeaking(false)
        setError(`음성 합성 오류: ${event.error}`)
        utteranceRef.current = null
      }

      utteranceRef.current = utterance
      synthesisRef.current.speak(utterance)
    } catch (err) {
      setError('음성 합성을 시작할 수 없습니다.')
    }
  }, [isSupported, language, rate, pitch, volume])

  const stop = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
      utteranceRef.current = null
    }
  }, [])

  const pause = useCallback(() => {
    if (synthesisRef.current && isSpeaking) {
      synthesisRef.current.pause()
    }
  }, [isSpeaking])

  const resume = useCallback(() => {
    if (synthesisRef.current && isSpeaking) {
      synthesisRef.current.resume()
    }
  }, [isSpeaking])

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
    error
  }
}
