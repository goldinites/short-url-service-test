import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { DeleteLinkRequest, DeleteLinkResponse } from '@/lib/api/deleteLink/deleteLink.type.ts'

export const deleteLink = (request: DeleteLinkRequest): UseFetchReturnType<DeleteLinkResponse> => {
  return useFetch<DeleteLinkResponse>(() => `/api/delete/${request.shortLink}`, {
    method: 'DELETE',
  })
}
