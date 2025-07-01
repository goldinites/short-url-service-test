export interface GetLinkInfoRequest {
  shortUrl: string
}

export interface GetLinkInfoResponse {
  originalUrl: string
  createdAt: Date
  clickCount: number
}
