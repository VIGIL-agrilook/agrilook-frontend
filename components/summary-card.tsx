import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardProps {
  title: string
  description: string
  icon: string
  onClick: () => void
  transparent?: boolean
  details?: React.ReactNode
}

export default function SummaryCard({ title, description, icon, onClick, transparent = false, details }: SummaryCardProps) {
  return (
    <Card 
      className={`${transparent ? 'bg-white/20 backdrop-blur-sm border-white/30' : 'bg-white'} hover:shadow-lg transition-all cursor-pointer h-full`}
      onClick={onClick}
    >
      <CardHeader className="text-center pb-2">
        <div className="text-3xl mb-1">{icon}</div>
        <CardTitle className={`text-2xl ${transparent ? "text-white drop-shadow-lg" : "text-farm-brown"}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`text-xs text-center mb-3 ${transparent ? "text-white/90 drop-shadow" : "text-gray-600"}`}>{description}</p>
        {details && (
          <div className={`text-xs ${transparent ? "text-white/95 drop-shadow" : "text-gray-700"}`}>
            {details}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
