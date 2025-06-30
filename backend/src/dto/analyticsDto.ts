export interface AnalyticsDtoResponse {
  totalClicks: number
  recentClicks: {
    ipAddress: string
    clickedAt: Date
  }[]
}