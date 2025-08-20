import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json({ 
        error: '메시지가 필요합니다.' 
      }, { status: 400 });
    }
    
    console.log('챗봇 메시지 요청:', message);
    
    // 백엔드 연결 시도 (타임아웃 제거)
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('백엔드에서 받은 챗봇 응답:', data);
        return NextResponse.json(data);
      } else {
        console.log('백엔드 응답 오류:', response.status, response.statusText);
      }
    } catch (backendError) {
      console.log('백엔드 연결 실패, 모의 응답 사용:', backendError);
    }
    
    // 백엔드 연결 실패 시 모의 응답 제공
    const mockResponses: { [key: string]: string } = {
      '비료': `비료 관리에 대해 설명드리겠습니다.

### 비료의 종류
- **질소비료 (N)**: 잎과 줄기 성장 촉진
- **인산비료 (P)**: 뿌리 발달과 꽃, 열매 형성
- **칼륨비료 (K)**: 식물의 전반적인 건강과 내병성

### 토마토 재배 시 권장 비료량
| 성분 | 권장량 | 단위 |
|------|--------|------|
| 질소 | 150-200 | mg/kg |
| 인산 | 80-120 | mg/kg |
| 칼륨 | 200-250 | mg/kg |

### 비료 시비 시기
1. **기비**: 정식 전 2-3주 전
2. **추비**: 정식 후 2-3주 간격으로 3-4회

현재 토양 상태를 확인하시면 더 구체적인 비료 처방을 받으실 수 있습니다.`,

      '토양': `토양 관리에 대해 설명드리겠습니다.

### 토양 pH 관리
- **적정 pH**: 6.0-7.0 (대부분 작물)
- **산성 토양**: 석회 시용으로 pH 상승
- **알칼리성 토양**: 유황 시용으로 pH 하강

### 토양 성분 분석
| 성분 | 적정 범위 | 단위 |
|------|-----------|------|
| pH | 6.0-7.0 | - |
| 유기물 | 1.5-3.0 | % |
| 전기전도도 | 1.0-2.0 | mS/cm |
| 수분 | 20-40 | % |

### 토양 개선 방법
1. **유기물 공급**: 퇴비, 부숙유기물 시용
2. **토양 구조 개선**: 모래, 점토 비율 조절
3. **배수 개선**: 고랑 설치, 배수관 설치

토양 센서를 통해 정확한 토양 상태를 파악하시면 더 구체적인 관리 방안을 제시해드릴 수 있습니다.`,

      '병해충': `병해충 관리에 대해 설명드리겠습니다.

### 주요 병해
- **역병**: 과습 시 발생, 배수 개선 필요
- **노균병**: 잎에 노란 반점, 통풍 개선
- **탄저병**: 과실에 발생, 예방적 살균제 사용

### 주요 해충
- **진딧물**: 잎 뒷면 서식, 천적 활용
- **응애**: 건조 시 발생, 습도 관리
- **선충**: 뿌리 피해, 토양 소독

### 예방 방법
1. **위생 관리**: 병든 식물 제거
2. **적정 밀도**: 통풍 확보
3. **순환 재배**: 같은 작물 연작 피함
4. **천적 활용**: 무당벌레, 기생벌 등

### 방제 방법
- **물리적 방제**: 끈끈이 트랩, 색깔 트랩
- **생물적 방제**: 천적 활용, 미생물 농약
- **화학적 방제**: 살균제, 살충제 (최후 수단)

정기적인 관찰과 예방적 관리가 가장 중요합니다.`,

      '날씨': `농업 기상 정보에 대해 설명드리겠습니다.

### 현재 날씨 정보
- **온도**: 31.6°C
- **습도**: 63%
- **강수량**: -9mm (증발량이 강수량보다 많음)
- **날씨**: 흐림

### 농작업 권장사항
1. **온도 관리**: 31.6°C는 다소 높은 온도입니다
   - 환기 강화
   - 차광막 활용
   - 물 뿌리기 시간 조절

2. **습도 관리**: 63%는 적정 범위입니다
   - 통풍 유지
   - 과습 주의

3. **강수량**: 현재 건조한 상태입니다
   - 관수 필요
   - 토양 수분 확인

### 일기 예보 활용
- **단기 예보**: 3-5일 내 농작업 계획
- **중기 예보**: 10-15일 내 병해충 예방
- **장기 예보**: 월별 재배 계획 수립

날씨 변화에 따른 농작업 조정이 수확량에 큰 영향을 미칩니다.`
    };

    // 키워드 기반 응답 선택
    let response = '안녕하세요! 농업 관련 질문이 있으시면 언제든 물어보세요. 비료, 토양, 병해충, 날씨 등에 대해 답변해드릴 수 있습니다.';
    
    const lowerMessage = message.toLowerCase();
    for (const [keyword, mockResponse] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        response = mockResponse;
        break;
      }
    }
    
    const mockData = {
      answer: response,
      source: ['농업 기술 가이드', '토양 분석 데이터', '기상청 데이터'],
      message: '모의 응답 (백엔드 연결 실패)'
    };
    
    console.log('모의 챗봇 응답 사용:', mockData);
    return NextResponse.json(mockData);
    
  } catch (error) {
    console.error('챗봇 API 오류:', error);
    return NextResponse.json({ 
      error: '서버 내부 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}
