import type {
  CreateShortUrlRequest,
  CreateShortUrlResponse,
} from '@/lib/api/createShortUrl/createShortUrl.type.ts'
import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'

export const createShortUrl = async (
  request: CreateShortUrlRequest,
): Promise<UseFetchReturnType<CreateShortUrlResponse>> => {
  return await useFetch<CreateShortUrlResponse>('/api/shorten', {
    method: 'POST',
    body: request,
  })
}
