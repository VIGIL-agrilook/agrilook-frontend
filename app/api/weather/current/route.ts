import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com';

export async function GET(request: NextRequest) {
  try {
    console.log('=== 날씨 API 호출 시작 ===');
    console.log('백엔드 URL:', BACKEND_BASE_URL);
    console.log('요청 시간:', new Date().toISOString());
    
    // 백엔드 API에서 실제 날씨 데이터 가져오기 (타임아웃 제거)
    const response = await fetch(`${BACKEND_BASE_URL}/api/weather/current`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // 항상 최신 데이터 가져오기
    });
    
    console.log('백엔드 응답 상태:', response.status, response.statusText);
    console.log('백엔드 응답 헤더:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`백엔드 응답 오류: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('백엔드에서 받은 날씨 데이터:', JSON.stringify(data, null, 2));
    
    // 백엔드에서 직접 날씨 데이터를 반환하는 경우
    if (data && (data.humidity !== undefined || data.temperature !== undefined)) {
      // 프론트엔드가 기대하는 구조로 변환
      const formattedData = {
        data: {
          humidity: data.humidity,
          precipitation: data.precipitation,
          temperature: data.temperature,
          weather: data.weather
        },
        status: 'success'
      };
      console.log('변환된 날씨 데이터:', formattedData);
      return NextResponse.json(formattedData);
    }
    
    // 이미 올바른 구조인 경우
    if (data && data.data) {
      return NextResponse.json(data);
    }
    
    throw new Error('백엔드에서 유효하지 않은 데이터 구조를 받았습니다');
    
  } catch (error) {
    console.error('=== 백엔드 날씨 API 연결 실패 ===');
    console.error('에러 타입:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('에러 메시지:', error instanceof Error ? error.message : String(error));
    console.error('에러 스택:', error instanceof Error ? error.stack : '스택 정보 없음');
    
    // 더 자세한 에러 정보 출력
    if (error instanceof Error) {
      console.error('에러 이름:', error.name);
      console.error('에러 코드:', (error as any).code);
      console.error('에러 cause:', error.cause);
    }
    
    // 백엔드 연결 실패 시 모의 데이터 제공
    const mockWeatherData = {
      data: {
        humidity: 65,
        precipitation: 0,
        temperature: 22,
        weather: '맑음'
      },
      status: 'success',
      message: '모의 데이터 (백엔드 연결 실패)'
    };
    
    console.log('모의 날씨 데이터 사용:', mockWeatherData);
    return NextResponse.json(mockWeatherData);
  }
}
