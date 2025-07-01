import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { DeleteLinkResponse } from '@/lib/api/deleteLink/deleteLink.type.ts'

export const deleteLink = (): UseFetchReturnType<DeleteLinkResponse> => {
  return useFetch<DeleteLinkResponse>(() => '/api/delete', {
    method: 'DELETE',
  })
}
