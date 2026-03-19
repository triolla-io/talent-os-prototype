import type { DashboardMetrics, ChartDataPoint } from '../../types'

export const dashboardMetrics: DashboardMetrics = {
  activeRoles: 5,
  candidatesInPipeline: 87,
  monthlyHires: 2,
  aiConfidenceScore: 91,
}

export const pipelineChartData: ChartDataPoint[] = [
  { name: 'New', value: 32 },
  { name: 'Screening', value: 24 },
  { name: 'Interview', value: 18 },
  { name: 'Offer', value: 8 },
  { name: 'Hired', value: 5 },
]

export const hiringTrendData: ChartDataPoint[] = [
  { name: 'Oct', value: 2 },
  { name: 'Nov', value: 1 },
  { name: 'Dec', value: 3 },
  { name: 'Jan', value: 2 },
  { name: 'Feb', value: 4 },
  { name: 'Mar', value: 2 },
]

export const sourceDistributionData: ChartDataPoint[] = [
  { name: 'LinkedIn', value: 40 },
  { name: 'Referral', value: 25 },
  { name: 'Agency', value: 20 },
  { name: 'Direct', value: 15 },
]
