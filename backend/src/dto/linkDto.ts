import { z } from 'zod';

export interface CreateLinkDtoResponse {
  shortUrl: string
}

export interface GetInfoLinkDtoResponse {
  originalUrl: string
  createdAt: Date;
  clickCount: number
}


export const createLinkSchema = z.object({
  originalUrl: z.string().url(),
  expiresAt: z.date().optional(),
  alias: z.string().optional(),
});

export type CreateLinkDtoRequest = z.infer<typeof createLinkSchema>