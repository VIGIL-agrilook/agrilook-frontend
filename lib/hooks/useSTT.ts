import { useState, useCallback, useEffect } from 'react'

interface UseSTTOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
}

interface UseSTTReturn {
  isListening: boolean
  transcript: string
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  error: string | null
}

export const useSTT = (options: UseSTTOptions = {}): UseSTTReturn => {
  const {
    language = 'ko-KR',
    continuous = false,
    interimResults = true
  } = options

  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    console.log('useSTT: Checking browser support...')
    
    // 브라우저 지원 여부 확인
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('useSTT: SpeechRecognition not supported')
      setIsSupported(false)
      setError('이 브라우저는 음성 인식을 지원하지 않습니다.')
      return
    }

    console.log('useSTT: SpeechRecognition supported')
    setIsSupported(true)
    
    // SpeechRecognition 인스턴스 생성
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognitionInstance = new SpeechRecognition()
    
    recognitionInstance.continuous = continuous
    recognitionInstance.interimResults = interimResults
    recognitionInstance.lang = language

    console.log('useSTT: Recognition instance created with language:', language)

    // 이벤트 핸들러 설정
    recognitionInstance.onstart = () => {
      console.log('useSTT: Recognition started')
      setIsListening(true)
      setError(null)
    }

    recognitionInstance.onresult = (event) => {
      console.log('useSTT: Recognition result received', event.results.length, 'results')
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        console.log('useSTT: Result', i, 'isFinal:', event.results[i].isFinal, 'transcript:', transcript)
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      const newTranscript = finalTranscript + interimTranscript
      console.log('useSTT: Setting transcript:', newTranscript)
      setTranscript(newTranscript)
    }

    recognitionInstance.onerror = (event) => {
      console.error('useSTT: Recognition error:', event.error, event.message)
      setIsListening(false)
      setError(`음성 인식 오류: ${event.error}`)
    }

    recognitionInstance.onend = () => {
      console.log('useSTT: Recognition ended')
      setIsListening(false)
    }

    setRecognition(recognitionInstance)

    return () => {
      if (recognitionInstance) {
        console.log('useSTT: Cleaning up recognition instance')
        recognitionInstance.stop()
      }
    }
  }, [language, continuous, interimResults])

  const startListening = useCallback(() => {
    console.log('useSTT: startListening called, isSupported:', isSupported, 'recognition:', !!recognition)
    if (!isSupported || !recognition) {
      setError('음성 인식을 사용할 수 없습니다.')
      return
    }

    try {
      // STT 시작 시 transcript를 초기화하지 않음 (기존 입력값 유지)
      setError(null)
      recognition.start()
      console.log('useSTT: Recognition.start() called')
    } catch (err) {
      console.error('useSTT: Error starting recognition:', err)
      setError('음성 인식을 시작할 수 없습니다.')
    }
  }, [isSupported, recognition])

  const stopListening = useCallback(() => {
    console.log('useSTT: stopListening called')
    if (recognition) {
      recognition.stop()
    }
  }, [recognition])

  const resetTranscript = useCallback(() => {
    console.log('useSTT: resetTranscript called')
    setTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error
  }
}
