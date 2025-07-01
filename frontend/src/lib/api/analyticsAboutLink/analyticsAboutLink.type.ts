export interface AnalyticsAboutLinkResponse {
  totalClicks: number
  recentClicks: {
    ipAddress: string
    clickedAt: Date
  }[]
}
