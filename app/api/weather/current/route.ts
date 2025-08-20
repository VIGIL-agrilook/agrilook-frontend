import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com';

export async function GET(request: NextRequest) {
  try {
    // 백엔드 API에서 실제 날씨 데이터 가져오기
    const response = await fetch(`${BACKEND_BASE_URL}/api/weather/current`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // 항상 최신 데이터 가져오기
    });
    
    if (!response.ok) {
      throw new Error(`백엔드 응답 오류: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('백엔드에서 받은 날씨 데이터:', data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('백엔드 날씨 API 연결 실패:', error);
    
    // 백엔드 연결 실패 시 모의 데이터 제공
    const mockWeatherData = {
      data: {
        humidity: 65,
        precipitation: 0,
        temperature: 22,
        weather: '맑음'
      },
      status: 'success'
    };
    
    console.log('모의 날씨 데이터 사용:', mockWeatherData);
    return NextResponse.json(mockWeatherData);
  }
}
