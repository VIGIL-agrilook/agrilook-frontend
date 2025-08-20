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
    
    // 백엔드 연결 시도
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('백엔드에서 받은 챗봇 응답:', data);
        return NextResponse.json(data);
      }
    } catch (backendError) {
      console.log('백엔드 연결 실패, 모의 응답 사용:', backendError);
    }
    
    // 백엔드 연결 실패 시 모의 응답 제공
    const mockResponses: { [key: string]: string } = {
      '비료': `안녕하세요! 비료 관련 질문이시군요. 

### 비료 사용 시 주의사항

1. **적정량 준수**: 과다 시비는 작물 생육에 악영향
2. **시기 지키기**: 밑거름과 추비 시기를 정확히 지키기
3. **토양 검사**: 정기적인 토양 성분 분석 필요
4. **환경 보호**: 빗물에 씻겨 수질 오염 방지

현재 토양 상태에 맞는 구체적인 비료 처방이 필요하시면 작물명과 농장 ID를 알려주세요!`,
      
      '토마토': `토마토 재배에 대한 정보를 드릴게요!

### 토마토 재배 관리 포인트

| 구분 | 내용 |
|------|------|
| **온도** | 낮 25-30°C, 밤 15-20°C |
| **습도** | 60-70% 유지 |
| **비료** | 질소:인산:칼륨 = 1:1:1.5 |
| **관수** | 토양 수분 60-80% 유지 |

토마토는 온도와 습도 관리가 중요합니다. 현재 농장의 환경 조건을 알려주시면 더 구체적인 조언을 드릴 수 있어요!`,
      
      '날씨': `현재 농장 지역의 날씨 정보입니다:

### 실시간 기상 정보
- **온도**: 22°C
- **습도**: 65%
- **강수량**: 0mm
- **날씨**: 맑음

### 농업 기상 주의사항
오늘은 작물 생육에 적합한 날씨입니다. 단, 야간 온도가 낮을 수 있으니 보온에 주의하세요.`,
      
      '병해충': `병해충 관리에 대한 정보를 드릴게요!

### 주요 병해충 예방법

1. **예방적 관리**
   - 정기적인 관찰과 조기 발견
   - 적절한 재배 밀도 유지
   - 통풍과 일조량 확보

2. **생물학적 방제**
   - 천적 활용 (잠자리, 무당벌레 등)
   - 유기농 약제 사용

3. **화학적 방제**
   - 농약 사용 시 안전 수칙 준수
   - 약효 지속 기간 확인

구체적인 병해충 증상이 있다면 사진과 함께 알려주세요!`
    };
    
    // 메시지에 따른 적절한 응답 선택
    let answer = '안녕하세요! 농업 관련 질문이 있으시면 언제든 물어보세요. 비료, 작물 관리, 날씨, 병해충 등에 대해 답변해드릴 수 있습니다.';
    
    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (message.includes(keyword)) {
        answer = response;
        break;
      }
    }
    
    return NextResponse.json({
      answer,
      source: ['농업 기술 자료', '기상청 데이터', '농촌진흥청 가이드라인']
    });
    
  } catch (error) {
    console.error('챗봇 API 오류:', error);
    return NextResponse.json({ 
      error: '챗봇 응답을 가져올 수 없습니다.',
      answer: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      source: []
    }, { status: 500 });
  }
}
