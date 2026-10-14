import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { chartColors, chartOptions } from '../utils/helpers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface LineChartProps { labels: string[]; data: number[]; color?: string; fill?: boolean }
export function LineChart({ labels, data, color = chartColors.primary, fill = true }: LineChartProps) {
  const chartData = { labels, datasets: [{ label: 'Value', data, borderColor: color, backgroundColor: fill ? `${color}20` : 'transparent', fill, tension: 0.4, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: color, pointBorderColor: '#fff', pointBorderWidth: 2 }] }
  return (<div className="h-[200px]"><Line data={chartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, tooltip: { ...chartOptions.plugins?.tooltip, callbacks: { label: (context:any) => `${context.dataset.label}: ${context.parsed.y}` } } } }} /></div>)
}

interface BarChartProps { labels: string[]; data: number[]; colors?: string[] }
export function BarChart({ labels, data, colors = [chartColors.primary] }: BarChartProps) {
  const chartData = { labels, datasets: [{ label: 'Value', data, backgroundColor: colors, borderRadius: 8, borderSkipped: false, maxBarThickness: 50 }] }
  return (<div className="h-[200px]"><Bar data={chartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, tooltip: { ...chartOptions.plugins?.tooltip, callbacks: { label: (context:any) => `${context.dataset.label}: ${context.parsed.y}` } } } }} /></div>)
}

interface DoughnutChartProps { labels: string[]; data: number[]; colors?: string[]; centerLabel?: string }
export function DoughnutChart({ labels, data, colors = [chartColors.primary, chartColors.primaryLight, '#e5e7eb'], centerLabel }: DoughnutChartProps) {
  const chartData = { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, cutout: '70%' }] }
  return (
    <div className="relative h-[200px] w-full">
      <Doughnut data={chartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, tooltip: { ...chartOptions.plugins?.tooltip, callbacks: { label: (context:any) => `${context.label}: ${context.parsed}%` } } } }} />
      {centerLabel && (<div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="text-center"><p className="text-3xl font-bold text-gray-900">{centerLabel}</p></div></div>)}
    </div>
  )
}
