import { forwardRef } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  status?: 'good' | 'warning' | 'critical'
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple'
  className?: string
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, unit, icon, trend, trendValue, status, color = 'green', className = '' }, ref) => {
    const colorClasses = {
      green: 'bg-green-50 border-green-100 text-green-700',
      blue: 'bg-blue-50 border-blue-100 text-blue-700',
      yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
      red: 'bg-red-50 border-red-100 text-red-700',
      purple: 'bg-purple-50 border-purple-100 text-purple-700',
    }

    const statusColors = {
      good: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
    }

    const trendIcons = {
      up: '↑',
      down: '↓',
      stable: '→',
    }

    const trendColors = {
      up: 'text-green-600',
      down: 'text-red-600',
      stable: 'text-gray-500',
    }

    return (
      <div
        ref={ref}
        className={`card card-hover border ${colorClasses[color]} ${className}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
              {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-medium ${trendColors[trend]}`}>
                  {trendIcons[trend]} {trendValue}
                </span>
                <span className="text-sm text-gray-500">vs last week</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color].replace('bg-', 'bg-').replace('text-', 'text-')}`}>
            {icon}
          </div>
        </div>
        {status && (
          <div className="mt-3">
            <span className={`status-badge ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        )}
      </div>
    )
  }
)

MetricCard.displayName = 'MetricCard'