export interface CreateShortLinkRequest {
  originalUrl: string
  expiresAt: Date
  alias: string
}

export interface CreateShortLinkResponse {
  shortLink: string
}
