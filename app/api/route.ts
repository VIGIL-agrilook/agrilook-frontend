import { NextRequest, NextResponse } from 'next/server';

// 백엔드 서버 URL
const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://agrilook-be.koreacentral.cloudapp.azure.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || '';
    
    const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API GET 요청 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || '';
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API POST 요청 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
