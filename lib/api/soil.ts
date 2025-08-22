import { SoilSensorData } from '@/lib/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/api'

// 위성 데이터 조회 (기본값)
export async function fetchLatestSoilData(): Promise<SoilSensorData | null> {
  return fetchSatelliteSoilData()
}

// 위성 데이터 조회
export async function fetchSatelliteSoilData(): Promise<SoilSensorData | null> {
  try {
    console.log('위성 데이터 API 호출 시작:', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/soil/satellite`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('위성 데이터 API 응답 상태:', response.status, response.statusText)
    if (!response.ok) {
      console.log('위성 데이터 API가 없으므로 더미 데이터 반환')
      return getDummySatelliteData()
    }
    const data = await response.json()
    console.log('위성 데이터 API 응답:', data)
    return transformSatelliteApiResponse(data)
  } catch (error) {
    console.error('위성 데이터 API 호출 중 오류:', error)
    console.log('에러 발생으로 더미 위성 데이터 반환')
    return getDummySatelliteData()
  }
}

// 센서 데이터 조회
export async function fetchSensorSoilData(): Promise<SoilSensorData | null> {
  try {
    console.log('센서 데이터 API 호출 시작:', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/soil/sensor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('센서 데이터 API 응답 상태:', response.status, response.statusText)
    if (!response.ok) {
      console.log('센서 데이터 API가 없으므로 더미 데이터 반환')
      return getDummySensorData()
    }
    const data = await response.json()
    console.log('센서 데이터 API 응답:', data)
    return transformSensorApiResponse(data)
  } catch (error) {
    console.error('센서 데이터 API 호출 중 오류:', error)
    console.log('에러 발생으로 더미 센서 데이터 반환')
    return getDummySensorData()
  }
}

// 더미 위성 데이터 생성 함수 (범위 문자열)
function getDummySatelliteData(): SoilSensorData {
  return {
    id: 'test001',
    timestamp: new Date().toISOString(),
    location: '농장 farm0001',
    source: 'satellite',
    soilData: {
      pH: '6.2 - 6.6',
      conductivity: '1.0 - 1.4',
      nitrogen: '150 - 200',
      phosphorus: '100 - 140',
      potassium: '0.45 - 0.65',
      organicMatter: '20.0 - 25.0',
      moisture: '25 - 35',
      temperature: '18 - 22',
    }
  }
}

// 더미 센서 데이터 생성 함수 (정확한 값)
function getDummySensorData(): SoilSensorData {
  return {
    id: 'test002',
    timestamp: new Date().toISOString(),
    location: '농장 farm0001',
    source: 'sensor',
    soilData: {
      pH: 6.4,
      conductivity: 1.2,
      nitrogen: 150,
      phosphorus: 120,
      potassium: 0.55,
      organicMatter: 22.5,
      moisture: 30,
      temperature: 20,
    }
  }
}

// 위성 API 응답을 SoilSensorData 형식으로 변환하는 함수 (범위 문자열 유지)
function transformSatelliteApiResponse(apiData: any): SoilSensorData | null {
  try {
    console.log('변환할 위성 API 데이터:', apiData)
    
    return {
      id: apiData._id || apiData.id || 'test001',
      timestamp: apiData.tested_at?.$date ? new Date(apiData.tested_at.$date).toISOString() : new Date().toISOString(),
      location: `농장 ${apiData.farmid}` || '기본 위치',
      source: 'satellite',
      soilData: {
        pH: apiData.result?.pH || '6.2 - 6.6',
        conductivity: apiData.result?.EC || '1.0 - 1.4',
        nitrogen: '150 - 200', // 위성 데이터에 N이 없으므로 기본 범위 사용
        phosphorus: apiData.result?.P || '100 - 140',
        potassium: apiData.result?.K || '0.45 - 0.65',
        organicMatter: apiData.result?.OM || '20.0 - 25.0',
        moisture: '25 - 35', // 위성 데이터에 moisture가 없으므로 기본 범위 사용
        temperature: '18 - 22', // 위성 데이터에 temperature가 없으므로 기본 범위 사용
      }
    }
  } catch (error) {
    console.error('위성 API 응답 변환 중 오류:', error)
    return null
  }
}

// 센서 API 응답을 SoilSensorData 형식으로 변환하는 함수 (정확한 값)
function transformSensorApiResponse(apiData: any): SoilSensorData | null {
  try {
    console.log('변환할 센서 API 데이터:', apiData)
    
    return {
      id: apiData._id || apiData.id || 'test002',
      timestamp: apiData.tested_at?.$date ? new Date(apiData.tested_at.$date).toISOString() : new Date().toISOString(),
      location: `농장 ${apiData.farmid}` || '기본 위치',
      source: 'sensor',
      soilData: {
        pH: parseFloat(apiData.result?.pH) || 6.5,
        conductivity: parseFloat(apiData.result?.EC) || 1.5,
        nitrogen: 150, // 센서 데이터에 N이 없으므로 기본값 사용
        phosphorus: parseFloat(apiData.result?.P) || 100,
        potassium: parseFloat(apiData.result?.K) || 200,
        organicMatter: parseFloat(apiData.result?.OM) || 2.0,
        moisture: 30, // 센서 데이터에 moisture가 없으므로 기본값 사용
        temperature: 20, // 센서 데이터에 temperature가 없으므로 기본값 사용
      }
    }
  } catch (error) {
    console.error('센서 API 응답 변환 중 오류:', error)
    return null
  }
}

export async function fetchSoilDataHistory(limit: number = 10): Promise<SoilSensorData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/soil/history?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('토양 데이터 히스토리 API 호출 중 오류:', error)
    return []
  }
}