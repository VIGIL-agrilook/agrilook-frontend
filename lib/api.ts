const API_BASE_URL = '/api'; // 상대 경로 사용

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

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
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
  }
};
