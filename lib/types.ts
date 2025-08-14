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
