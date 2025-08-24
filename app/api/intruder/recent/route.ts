import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let hours: string | null = null
  let farmid: string | null = null
  
  try {
    const { searchParams } = new URL(request.url)
    hours = searchParams.get('hours')
    farmid = searchParams.get('farmid')
    
    // 백엔드 API URL 구성 (Azure 클라우드 서버 사용)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/api'
    let apiUrl = `${API_BASE_URL}/intruder/recent`
    
    const params = new URLSearchParams()
    if (hours) params.append('hours', hours)
    if (farmid) params.append('farmid', farmid)
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`
    }
    
    console.log('백엔드 API 호출 URL:', apiUrl)
    
    // 백엔드 API 호출
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 타임아웃 설정 (10초로 복원)
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('백엔드 API 응답 성공:', data)
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('침입자 감지 API 오류:', error)
    
    // 에러 시 더미 데이터 반환
    const dummyData = {
      farm_id: farmid || 'farm_0001',
      hours_filter: parseInt(hours || '24'),
      total_count: 3,
      class_counts: {
        human: 1,
        squirrel: 1,
        wild_boar: 1
      },
      data: [
        {
          id: "dummy_001",
          class: "human",
          confidence: "85%",
          datetime: "20250124-143000",
          datetime_iso: "2025-01-24T14:30:00",
          farm_id: farmid || 'farm_0001',
          image_url: "/intruder1.jpg"
        },
        {
          id: "dummy_002",
          class: "squirrel",
          confidence: "92%",
          datetime: "20250124-142000",
          datetime_iso: "2025-01-24T14:20:00",
          farm_id: farmid || 'farm_0001',
          image_url: "/intruder2.jpg"
        },
        {
          id: "dummy_003",
          class: "wild_boar",
          confidence: "78%",
          datetime: "20250124-141000",
          datetime_iso: "2025-01-24T14:10:00",
          farm_id: farmid || 'farm_0001',
          image_url: "/intruder3.jpg"
        }
      ]
    }
    
    console.log('더미 데이터 반환:', dummyData)
    return NextResponse.json(dummyData)
  }
}
