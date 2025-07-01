import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { GetLinkInfoResponse } from '@/lib/api/getLinkInfo/getLinkInfo.type.ts'

export const getLinkInfo = async (
  shortUrl: string,
): Promise<UseFetchReturnType<GetLinkInfoResponse>> => {
  return await useFetch<GetLinkInfoResponse>(`/api/info/${shortUrl}`, {
    method: 'GET',
  })
}
