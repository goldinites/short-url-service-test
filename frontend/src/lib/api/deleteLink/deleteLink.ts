import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { DeleteLinkResponse } from '@/lib/api/deleteLink/deleteLink.type.ts'

export const deleteLink = async (
  shortUrl: string,
): Promise<UseFetchReturnType<DeleteLinkResponse>> => {
  return await useFetch<DeleteLinkResponse>(`/api/delete/${shortUrl}`, {
    method: 'DELETE',
  })
}
