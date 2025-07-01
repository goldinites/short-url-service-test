export interface CreateShortUrlRequest {
  originalUrl: string
  expiresAt?: Date
  alias?: string
}

export interface CreateShortUrlResponse {
  shortUrl: string
}
