import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropname, farmid } = body;
    
    if (!cropname || !farmid) {
      return NextResponse.json({ 
        error: '작물명과 농장 ID가 필요합니다.' 
      }, { status: 400 });
    }
    
    console.log('비료 추천 요청:', { cropname, farmid });
    
    // 백엔드 연결 시도 (타임아웃 제거)
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/fertilizer-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cropname, farmid })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('백엔드에서 받은 비료 추천 데이터:', data);
        return NextResponse.json(data);
      } else {
        console.log('백엔드 응답 오류:', response.status, response.statusText);
      }
    } catch (backendError) {
      console.log('백엔드 연결 실패, 모의 비료 데이터 사용:', backendError);
    }
    
    // 백엔드 연결 실패 시 모의 비료 추천 데이터 제공
    const mockFertilizerData = {
      _id: 'mock_fertilizer_001',
      crop: {
        code: 'TOMATO',
        name: cropname || '토마토'
      },
      compost: {
        cattle_kg: 500,
        chicken_kg: 200,
        mixed_kg: 300,
        pig_kg: 150
      },
      fertilizer: {
        base: [
          {
            fertilizer_id: 'fert_001',
            fertilizer_name: '복합비료 15-15-15',
            N_ratio: 15,
            P_ratio: 15,
            K_ratio: 15,
            need_N_kg: 120,
            need_P_kg: 80,
            need_K_kg: 100,
            shortage_N_kg: 0,
            shortage_P_kg: 0,
            shortage_K_kg: 0,
            usage_kg: 800,
            bags: 16
          }
        ],
        additional: [
          {
            fertilizer_id: 'fert_002',
            fertilizer_name: '칼륨비료',
            N_ratio: 0,
            P_ratio: 0,
            K_ratio: 50,
            need_N_kg: 0,
            need_P_kg: 0,
            need_K_kg: 50,
            shortage_N_kg: 0,
            shortage_P_kg: 0,
            shortage_K_kg: 0,
            usage_kg: 100,
            bags: 2
          }
        ]
      },
      message: '모의 데이터 (백엔드 연결 실패)'
    };
    
    console.log('모의 비료 추천 데이터 사용:', mockFertilizerData);
    return NextResponse.json(mockFertilizerData);
    
  } catch (error) {
    console.error('비료 추천 API 오류:', error);
    return NextResponse.json({ 
      error: '서버 내부 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}
