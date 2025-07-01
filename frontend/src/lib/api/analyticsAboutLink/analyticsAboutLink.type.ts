export interface AnalyticsAboutLinkRequest {
  shortUrl: string
}

export interface AnalyticsAboutLinkResponse {
  totalClicks: number
  recentClicks: {
    ipAddress: string
    clickedAt: Date
  }[]
}
