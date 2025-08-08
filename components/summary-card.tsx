import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardProps {
  title: string
  description: string
  icon: string
  onClick: () => void
}

export default function SummaryCard({ title, description, icon, onClick }: SummaryCardProps) {
  return (
    <Card 
      className="bg-white hover:shadow-lg transition-shadow cursor-pointer h-full"
      onClick={onClick}
    >
      <CardHeader className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle className="text-farm-brown">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
