import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    change: string
    icon: React.ReactNode
}

export function MetricCard({ title, value, change, icon }: MetricCardProps) {
  

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                        {icon}
                        <p className="mt-2 text-sm text-center font-medium text-gray-500">{title}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <div className="text-3xl font-bold">{value}</div>
                    <p className="text-sm text-gray-500 mt-1">{change}</p>
                </div>
            </CardContent>
        </Card>
    )
}

