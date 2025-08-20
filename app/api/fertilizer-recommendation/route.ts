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
    
    // 백엔드 연결 시도
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/fertilizer-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cropname, farmid }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('백엔드에서 받은 비료 추천 데이터:', data);
        return NextResponse.json(data);
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
        chicken_kg: 300,
        mixed_kg: 200,
        pig_kg: 400
      },
      fertilizer: {
        base: [
          {
            K_ratio: 5,
            N_ratio: 12,
            P_ratio: 6,
            bags: 2,
            fertilizer_id: 'base_001',
            fertilizer_name: '고추특호',
            need_K_kg: 10,
            need_N_kg: 24,
            need_P_kg: 12,
            shortage_K_kg: 0,
            shortage_P_kg: 0,
            usage_kg: 40
          },
          {
            K_ratio: 8,
            N_ratio: 11,
            P_ratio: 6,
            bags: 1,
            fertilizer_id: 'base_002',
            fertilizer_name: '고추전용',
            need_K_kg: 16,
            need_N_kg: 22,
            need_P_kg: 12,
            shortage_K_kg: 0,
            shortage_P_kg: 0,
            usage_kg: 20
          }
        ],
        additional: [
          {
            K_ratio: 10,
            N_ratio: 13,
            P_ratio: 0,
            bags: 1,
            fertilizer_id: 'add_001',
            fertilizer_name: '맞춤추비29호',
            need_K_kg: 20,
            need_N_kg: 26,
            need_P_kg: 0,
            shortage_K_kg: 0,
            shortage_P_kg: 0,
            usage_kg: 20
          }
        ]
      }
    };
    
    return NextResponse.json(mockFertilizerData);
    
  } catch (error) {
    console.error('비료 추천 API 오류:', error);
    return NextResponse.json({ 
      error: '비료 추천을 가져올 수 없습니다.',
      _id: '',
      crop: { code: '', name: '' },
      compost: {
        cattle_kg: 0,
        chicken_kg: 0,
        mixed_kg: 0,
        pig_kg: 0
      },
      fertilizer: {
        additional: [],
        base: []
      }
    }, { status: 500 });
  }
}
