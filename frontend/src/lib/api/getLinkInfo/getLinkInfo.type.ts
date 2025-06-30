export interface GetLinkInfoRequest {
  shortLink: string
}

export interface GetLinkInfoResponse {
  originalUrl: string
  createdAt: Date
  clickCount: number
}
