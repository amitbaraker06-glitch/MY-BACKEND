import type { IrrigationRecommendation } from './types'

export const mockIrrigationRecommendation: IrrigationRecommendation = {
  status: 'recommended',
  message: 'Current soil moisture is 28%. Irrigation is recommended.',
  recommendedTime: 'Early morning (5:00-7:00 AM)',
  waterQuantity: '25-30 mm',
  nextSchedule: 'In 3 days (Aug 23)',
  moistureTarget: 60,
  history: [
    { date: 'Aug 15', amount: 30, type: 'auto' },
    { date: 'Aug 12', amount: 25, type: 'manual' },
    { date: 'Aug 10', amount: 15, type: 'rain' },
    { date: 'Aug 07', amount: 30, type: 'auto' },
    { date: 'Aug 04', amount: 20, type: 'manual' },
    { date: 'Aug 01', amount: 10, type: 'rain' },
  ],
}