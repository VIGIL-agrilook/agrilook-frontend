const API_BASE_URL = '/api'; // Next.js API 라우트 사용

// 타입 정의
export interface FertilizerRecommendationRequest {
  cropname: string;
  farmid: string;
}

export interface FertilizerRecommendationResponse {
  _id: string;
  crop: {
    code: string;
    name: string;
  };
  compost: {
    cattle_kg: number;
    chicken_kg: number;
    mixed_kg: number;
    pig_kg: number;
  };
  fertilizer: {
    additional: Array<{
      K_ratio: number;
      N_ratio: number;
      P_ratio: number;
      bags: number;
      fertilizer_id: string;
      fertilizer_name: string;
      need_K_kg: number;
      need_N_kg: number;
      need_P_kg: number;
      shortage_K_kg: number;
      shortage_P_kg: number;
      usage_kg: number;
    }>;
    base: Array<{
      K_ratio: number;
      N_ratio: number;
      P_ratio: number;
      bags: number;
      fertilizer_id: string;
      fertilizer_name: string;
      need_K_kg: number;
      need_N_kg: number;
      need_P_kg: number;
      shortage_K_kg: number;
      shortage_P_kg: number;
      usage_kg: number;
    }>;
  };
}

export interface WeatherResponse {
  data: {
    humidity: number;
    precipitation: number;
    temperature: number;
    weather: string;
  };
  status: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  answer: string;
  source: string[];
}

// 재시도 로직을 포함한 fetch 함수
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 2): Promise<Response> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000) // 10초 타임아웃
      });
      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`API 호출 실패 (시도 ${i + 1}/${maxRetries + 1}):`, error);
      
      if (i < maxRetries) {
        // 지수 백오프: 1초, 2초, 4초 대기
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError!;
}

export const apiClient = {
  async get(endpoint: string) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`GET ${endpoint} 실패:`, error);
      throw error;
    }
  },
  
  async post(endpoint: string, data: any) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`POST ${endpoint} 실패:`, error);
      throw error;
    }
  },

  async put(endpoint: string, data: any) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`PUT ${endpoint} 실패:`, error);
      throw error;
    }
  },

  async delete(endpoint: string) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`DELETE ${endpoint} 실패:`, error);
      throw error;
    }
  }
};

// 백엔드 API 스펙에 맞는 서비스 함수들
export const apiService = {
  // 비료 추천 API
  async getFertilizerRecommendation(cropname: string, farmid: string): Promise<FertilizerRecommendationResponse> {
    return apiClient.post('/fertilizer-recommendation', {
      cropname,
      farmid
    });
  },

  // 현재 날씨 정보
  async getCurrentWeather(): Promise<WeatherResponse> {
    return apiClient.get('/weather/current');
  },

  // AI 챗봇 메시지 전송
  async sendChatMessage(message: string): Promise<ChatResponse> {
    return apiClient.post('/chat', { message });
  },

  // 작물 목록 조회 (백엔드에서 제공하는 경우)
  async getCrops() {
    return apiClient.get('/crops');
  },

  // 비료 처방 테스트 (백엔드에서 제공하는 경우)
  async getFertilizerPrescriptionTest() {
    return apiClient.get('/fertilizer-prescription/test');
  },

  // 기상 데이터 업데이트 (백엔드에서 제공하는 경우)
  async updateWeatherData(station: string) {
    return apiClient.post('/weather/update', { station });
  },

  // 농업 맞춤 기상 요약 (백엔드에서 제공하는 경우)
  async getAgriculturalWeatherSummary(station: string) {
    return apiClient.get(`/weather/agricultural-summary?station=${station}`);
  },

  // 침입자 감지 데이터 조회
  async getIntruderData(params?: { hours?: number; farmid?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.hours) searchParams.append('hours', params.hours.toString());
    if (params?.farmid) searchParams.append('farmid', params.farmid);
    
    const queryString = searchParams.toString();
    const endpoint = `/intruder/recent${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get(endpoint);
  }
};

// 비료 추천 API
export async function fetchFertilizerRecommendation(cropName: string, farmId: string = 'farm0001') {
  try {
    // Azure 백엔드에서 받아오도록 수정
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/api';
    const response = await fetch(`${API_BASE_URL}/fertilizer-recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cropname: cropName,
        farmid: farmId
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('비료 추천 API 호출 중 오류:', error)
    // 에러 시 더미 데이터 반환
    return getDummyFertilizerData(cropName)
  }
}

// 더미 비료 추천 데이터 (작물별 차별화)
function getDummyFertilizerData(cropName: string) {
  // 작물별 맞춤 데이터
  const cropSpecificData = {
    '대파': {
      base: [
        {
          K_ratio: 0.25,
          N_ratio: 0.5,
          P_ratio: 0.25,
          bags: 3.0,
          fertilizer_id: 'BASE001',
          fertilizer_name: '대파 밑거름 복합비료',
          need_K_kg: 25.0,
          need_N_kg: 50.0,
          need_P_kg: 25.0,
          shortage_K_kg: 8.0,
          shortage_P_kg: 4.0,
          usage_kg: 75.0
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 2.5,
          fertilizer_id: 'BASE002',
          fertilizer_name: '대파 밑거름 질소비료',
          need_K_kg: 20.0,
          need_N_kg: 60.0,
          need_P_kg: 20.0,
          shortage_K_kg: 5.0,
          shortage_P_kg: 3.0,
          usage_kg: 62.5
        },
        {
          K_ratio: 0.4,
          N_ratio: 0.3,
          P_ratio: 0.3,
          bags: 2.0,
          fertilizer_id: 'BASE003',
          fertilizer_name: '대파 밑거름 칼리비료',
          need_K_kg: 40.0,
          need_N_kg: 30.0,
          need_P_kg: 30.0,
          shortage_K_kg: 15.0,
          shortage_P_kg: 8.0,
          usage_kg: 50.0
        }
      ],
      additional: [
        {
          K_ratio: 0.25,
          N_ratio: 0.5,
          P_ratio: 0.25,
          bags: 2.0,
          fertilizer_id: 'FERT001',
          fertilizer_name: '대파 웃거름 복합비료',
          need_K_kg: 15.0,
          need_N_kg: 30.0,
          need_P_kg: 15.0,
          shortage_K_kg: 5.0,
          shortage_P_kg: 3.0,
          usage_kg: 50.0
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 1.5,
          fertilizer_id: 'FERT002',
          fertilizer_name: '대파 웃거름 질소비료',
          need_K_kg: 10.0,
          need_N_kg: 30.0,
          need_P_kg: 10.0,
          shortage_K_kg: 2.0,
          shortage_P_kg: 1.0,
          usage_kg: 37.5
        },
        {
          K_ratio: 0.4,
          N_ratio: 0.3,
          P_ratio: 0.3,
          bags: 1.0,
          fertilizer_id: 'FERT003',
          fertilizer_name: '대파 웃거름 칼리비료',
          need_K_kg: 20.0,
          need_N_kg: 15.0,
          need_P_kg: 15.0,
          shortage_K_kg: 8.0,
          shortage_P_kg: 2.0,
          usage_kg: 25.0
        }
      ]
    },
    '부추': {
      base: [
        {
          K_ratio: 0.3,
          N_ratio: 0.45,
          P_ratio: 0.25,
          bags: 3.5,
          fertilizer_id: 'BASE001',
          fertilizer_name: '부추 밑거름 복합비료',
          need_K_kg: 35.0,
          need_N_kg: 52.5,
          need_P_kg: 29.2,
          shortage_K_kg: 12.0,
          shortage_P_kg: 6.0,
          usage_kg: 87.5
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 3.0,
          fertilizer_id: 'BASE002',
          fertilizer_name: '부추 밑거름 질소비료',
          need_K_kg: 24.0,
          need_N_kg: 72.0,
          need_P_kg: 24.0,
          shortage_K_kg: 8.0,
          shortage_P_kg: 4.0,
          usage_kg: 75.0
        },
        {
          K_ratio: 0.45,
          N_ratio: 0.25,
          P_ratio: 0.3,
          bags: 2.5,
          fertilizer_id: 'BASE003',
          fertilizer_name: '부추 밑거름 칼리비료',
          need_K_kg: 56.3,
          need_N_kg: 31.3,
          need_P_kg: 37.5,
          shortage_K_kg: 20.0,
          shortage_P_kg: 10.0,
          usage_kg: 62.5
        }
      ],
      additional: [
        {
          K_ratio: 0.3,
          N_ratio: 0.45,
          P_ratio: 0.25,
          bags: 2.5,
          fertilizer_id: 'FERT001',
          fertilizer_name: '부추 웃거름 복합비료',
          need_K_kg: 25.0,
          need_N_kg: 37.5,
          need_P_kg: 20.8,
          shortage_K_kg: 8.0,
          shortage_P_kg: 4.0,
          usage_kg: 62.5
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 2.0,
          fertilizer_id: 'FERT002',
          fertilizer_name: '부추 웃거름 질소비료',
          need_K_kg: 16.0,
          need_N_kg: 48.0,
          need_P_kg: 16.0,
          shortage_K_kg: 5.0,
          shortage_P_kg: 3.0,
          usage_kg: 50.0
        },
        {
          K_ratio: 0.45,
          N_ratio: 0.25,
          P_ratio: 0.3,
          bags: 1.5,
          fertilizer_id: 'FERT003',
          fertilizer_name: '부추 웃거름 칼리비료',
          need_K_kg: 33.8,
          need_N_kg: 18.8,
          need_P_kg: 22.5,
          shortage_K_kg: 12.0,
          shortage_P_kg: 6.0,
          usage_kg: 37.5
        }
      ]
    },
    '고추': {
      base: [
        {
          K_ratio: 0.3,
          N_ratio: 0.4,
          P_ratio: 0.3,
          bags: 2.5,
          fertilizer_id: 'BASE001',
          fertilizer_name: '고추 밑거름 복합비료',
          need_K_kg: 25.0,
          need_N_kg: 33.3,
          need_P_kg: 25.0,
          shortage_K_kg: 8.0,
          shortage_P_kg: 4.0,
          usage_kg: 62.5
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 2.0,
          fertilizer_id: 'BASE002',
          fertilizer_name: '고추 밑거름 질소비료',
          need_K_kg: 16.0,
          need_N_kg: 48.0,
          need_P_kg: 16.0,
          shortage_K_kg: 5.0,
          shortage_P_kg: 3.0,
          usage_kg: 50.0
        },
        {
          K_ratio: 0.4,
          N_ratio: 0.3,
          P_ratio: 0.3,
          bags: 1.8,
          fertilizer_id: 'BASE003',
          fertilizer_name: '고추 밑거름 칼리비료',
          need_K_kg: 36.0,
          need_N_kg: 27.0,
          need_P_kg: 27.0,
          shortage_K_kg: 12.0,
          shortage_P_kg: 6.0,
          usage_kg: 45.0
        }
      ],
      additional: [
        {
          K_ratio: 0.3,
          N_ratio: 0.4,
          P_ratio: 0.3,
          bags: 1.8,
          fertilizer_id: 'FERT001',
          fertilizer_name: '고추 웃거름 복합비료',
          need_K_kg: 18.0,
          need_N_kg: 24.0,
          need_P_kg: 18.0,
          shortage_K_kg: 6.0,
          shortage_P_kg: 3.0,
          usage_kg: 45.0
        },
        {
          K_ratio: 0.2,
          N_ratio: 0.6,
          P_ratio: 0.2,
          bags: 1.5,
          fertilizer_id: 'FERT002',
          fertilizer_name: '고추 웃거름 질소비료',
          need_K_kg: 12.0,
          need_N_kg: 36.0,
          need_P_kg: 12.0,
          shortage_K_kg: 4.0,
          shortage_P_kg: 2.0,
          usage_kg: 37.5
        },
        {
          K_ratio: 0.4,
          N_ratio: 0.3,
          P_ratio: 0.3,
          bags: 1.2,
          fertilizer_id: 'FERT003',
          fertilizer_name: '고추 웃거름 칼리비료',
          need_K_kg: 24.0,
          need_N_kg: 18.0,
          need_P_kg: 18.0,
          shortage_K_kg: 8.0,
          shortage_P_kg: 4.0,
          usage_kg: 30.0
        }
      ]
    }
  }

  // 기본값 (알 수 없는 작물)
  const defaultData = cropSpecificData['대파']

  return {
    _id: 'dummy_001',
    crop: {
      code: 'CROP001',
      name: cropName
    },
    compost: {
      cattle_kg: 500.0,
      chicken_kg: 300.0,
      mixed_kg: 400.0,
      pig_kg: 350.0
    },
    fertilizer: cropSpecificData[cropName as keyof typeof cropSpecificData] || defaultData
  }
}
