import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardProps {
  title: string
  description?: string
  icon?: string
  onClick: () => void
  transparent?: boolean
  details?: React.ReactNode
  compact?: boolean
}

export default function SummaryCard({ title, description, icon, onClick, transparent = false, details, compact = false }: SummaryCardProps) {
  return (
    <Card 
      className={`${transparent ? 'bg-white/80 backdrop-blur-sm border-white/50 shadow-lg' : 'bg-white'} hover:shadow-lg transition-all cursor-pointer ${compact ? '' : 'h-full'}`}
      onClick={onClick}
    >
      <CardHeader className={`text-center ${compact ? 'p-2' : 'pb-2'}`}>
        {icon && <div className={`${compact ? 'text-2xl' : 'text-3xl'} mb-1`}>{icon}</div>}
        <CardTitle className={`${compact ? 'text-base' : 'text-2xl'} ${transparent ? "text-gray-800 drop-shadow-lg font-bold" : "text-farm-brown"}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`${compact ? 'p-2 pt-0' : 'pt-0'}`}>
        {description && <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-center mb-3 ${transparent ? "text-gray-700 drop-shadow font-medium" : "text-gray-600"}`}>{description}</p>}
        {details && (
          <div className={`${compact ? 'text-[10px]' : 'text-xs'} ${transparent ? "text-gray-800 drop-shadow font-medium" : "text-gray-700"}`}>
            {details}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
