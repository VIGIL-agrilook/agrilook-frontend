import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cropname, farmid } = body

    if (!cropname) {
      return NextResponse.json(
        { error: '작물명이 필요합니다' },
        { status: 400 }
      )
    }

    // 실제 백엔드 API 호출 (임시로 더미 데이터 반환)
    // const response = await fetch('YOUR_BACKEND_URL/api/fertilizer-recommendation', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ cropname, farmid })
    // })
    
    // if (!response.ok) {
    //   throw new Error(`Backend API error: ${response.status}`)
    // }
    
    // const data = await response.json()
    // return NextResponse.json(data)

    // 임시 더미 데이터 반환
    const dummyData = {
      _id: 'dummy_001',
      crop: {
        code: 'CROP001',
        name: cropname
      },
      compost: {
        cattle_kg: 500.0,
        chicken_kg: 300.0,
        mixed_kg: 400.0,
        pig_kg: 350.0
      },
      fertilizer: {
        additional: [
          {
            K_ratio: 0.3,
            N_ratio: 0.4,
            P_ratio: 0.3,
            bags: 2.0,
            fertilizer_id: 'FERT001',
            fertilizer_name: '웃거름 복합비료',
            need_K_kg: 15.0,
            need_N_kg: 20.0,
            need_P_kg: 15.0,
            shortage_K_kg: 5.0,
            shortage_P_kg: 3.0,
            usage_kg: 50.0
          },
          {
            K_ratio: 0.2,
            N_ratio: 0.5,
            P_ratio: 0.3,
            bags: 1.5,
            fertilizer_id: 'FERT002',
            fertilizer_name: '웃거름 질소비료',
            need_K_kg: 10.0,
            need_N_kg: 25.0,
            need_P_kg: 15.0,
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
            fertilizer_name: '웃거름 칼리비료',
            need_K_kg: 20.0,
            need_N_kg: 15.0,
            need_P_kg: 15.0,
            shortage_K_kg: 8.0,
            shortage_P_kg: 2.0,
            usage_kg: 25.0
          }
        ],
        base: [
          {
            K_ratio: 0.3,
            N_ratio: 0.4,
            P_ratio: 0.3,
            bags: 3.0,
            fertilizer_id: 'BASE001',
            fertilizer_name: '밑거름 복합비료',
            need_K_kg: 30.0,
            need_N_kg: 40.0,
            need_P_kg: 30.0,
            shortage_K_kg: 10.0,
            shortage_P_kg: 5.0,
            usage_kg: 75.0
          },
          {
            K_ratio: 0.2,
            N_ratio: 0.5,
            P_ratio: 0.3,
            bags: 2.5,
            fertilizer_id: 'BASE002',
            fertilizer_name: '밑거름 질소비료',
            need_K_kg: 20.0,
            need_N_kg: 50.0,
            need_P_kg: 30.0,
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
            fertilizer_name: '밑거름 칼리비료',
            need_K_kg: 40.0,
            need_N_kg: 30.0,
            need_P_kg: 30.0,
            shortage_K_kg: 15.0,
            shortage_P_kg: 8.0,
            usage_kg: 50.0
          }
        ]
      }
    }

    return NextResponse.json(dummyData)
  } catch (error) {
    console.error('비료 추천 API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
