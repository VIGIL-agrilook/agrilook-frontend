// 토양 센서 데이터 타입 정의
export interface SoilSensorData {
  id: string;
  timestamp: string;
  location: string;
  soilData: {
    nitrogen: number; // 질소 (N) - mg/kg
    phosphorus: number; // 인산 (P) - mg/kg
    potassium: number; // 칼륨 (K) - mg/kg
    pH: number; // pH 값
    organicMatter: number; // 유기물 함량 (%)
    moisture: number; // 토양 수분 (%)
    temperature: number; // 토양 온도 (°C)
    conductivity: number; // 전기전도도 (mS/cm)
  };
  notes?: string; // 추가 메모
}

// 토양 데이터 업로드 폼 타입
export interface SoilDataUploadForm {
  location: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  pH: string;
  organicMatter: string;
  moisture: string;
  temperature: string;
  conductivity: string;
  notes: string;
}

// 토양 상태 평가 타입
export interface SoilStatus {
  overall: 'excellent' | 'good' | 'fair' | 'poor';
  nitrogen: 'sufficient' | 'deficient' | 'excessive';
  phosphorus: 'sufficient' | 'deficient' | 'excessive';
  potassium: 'sufficient' | 'deficient' | 'excessive';
  pH: 'optimal' | 'acidic' | 'alkaline';
  recommendations: string[];
}

// Web Speech API 타입 정의
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
    speechSynthesis: SpeechSynthesis
  }
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

export interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

export interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

export interface SpeechSynthesis extends EventTarget {
  speak(utterance: SpeechSynthesisUtterance): void
  cancel(): void
  pause(): void
  resume(): void
  getVoices(): SpeechSynthesisVoice[]
  addEventListener(type: string, listener: EventListener): void
  removeEventListener(type: string, listener: EventListener): void
}

export interface SpeechSynthesisUtterance extends EventTarget {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  rate: number
  pitch: number
  volume: number
  onstart: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onend: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onerror: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisErrorEvent) => any) | null
}

export interface SpeechSynthesisVoice {
  voiceURI: string
  name: string
  lang: string
  localService: boolean
  default: boolean
}

export interface SpeechSynthesisErrorEvent extends Event {
  error: string
}
