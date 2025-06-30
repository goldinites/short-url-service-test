export interface CreateLinkDtoRequest {
  originalUrl: string
  expiresAt: Date
  alias: string
}

export interface CreateLinkDtoResponse {
  shortUrl: string
}

export interface GetInfoLinkDtoResponse {
  originalUrl: string
  createdAt: Date;
  clickCount: number
}
