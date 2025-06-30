import type {
  CreateShortLinkRequest,
  CreateShortLinkResponse,
} from '@/lib/api/createShortLink/createShortLink.type.ts'
import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'

export const createShortLink = (
  request: CreateShortLinkRequest,
): UseFetchReturnType<CreateShortLinkResponse> => {
  return useFetch<CreateShortLinkResponse>('/api/shorten', {
    method: 'POST',
    body: request,
  })
}
