'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock 12-month soil data
const soilTimeSeriesData = [
  { month: '1월', pH: 6.2, EC: 1.1, Ca: 78, Mg: 42, OC: 2.3 },
  { month: '2월', pH: 6.3, EC: 1.2, Ca: 80, Mg: 43, OC: 2.4 },
  { month: '3월', pH: 6.4, EC: 1.3, Ca: 82, Mg: 44, OC: 2.5 },
  { month: '4월', pH: 6.5, EC: 1.4, Ca: 85, Mg: 45, OC: 2.6 },
  { month: '5월', pH: 6.3, EC: 1.3, Ca: 87, Mg: 46, OC: 2.7 },
  { month: '6월', pH: 6.2, EC: 1.2, Ca: 89, Mg: 47, OC: 2.8 },
  { month: '7월', pH: 6.1, EC: 1.1, Ca: 91, Mg: 48, OC: 2.9 },
  { month: '8월', pH: 6.2, EC: 1.2, Ca: 92, Mg: 48, OC: 2.8 },
  { month: '9월', pH: 6.3, EC: 1.3, Ca: 93, Mg: 49, OC: 2.7 },
  { month: '10월', pH: 6.4, EC: 1.4, Ca: 94, Mg: 48, OC: 2.6 },
  { month: '11월', pH: 6.3, EC: 1.3, Ca: 92, Mg: 48, OC: 2.5 },
  { month: '12월', pH: 6.3, EC: 1.4, Ca: 92, Mg: 48, OC: 2.5 },
]

export default function SoilChartSection() {
  return (
    <Card className="bg-card h-full">
      <CardHeader>
        <CardTitle className="text-foreground">토양 성분 변화</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={soilTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EFDCAB" />
              <XAxis 
                dataKey="month" 
                stroke="#443627"
                fontSize={12}
              />
              <YAxis 
                stroke="#443627"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#F2F6D0',
                  border: '1px solid #D98324',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pH" 
                stroke="#D98324" 
                strokeWidth={2}
                name="pH"
              />
              <Line 
                type="monotone" 
                dataKey="EC" 
                stroke="#443627" 
                strokeWidth={2}
                name="EC"
              />
              <Line 
                type="monotone" 
                dataKey="Ca" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Ca"
              />
              <Line 
                type="monotone" 
                dataKey="Mg" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Mg"
              />
              <Line 
                type="monotone" 
                dataKey="OC" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="OC"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          * Mock 데이터 - 센서 기반 데이터 연동 예정
        </div>
      </CardContent>
    </Card>
  )
}
