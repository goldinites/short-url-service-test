import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { GetLinkInfoResponse } from '@/lib/api/getLinkInfo/getLinkInfo.type.ts'

export const getLinkInfo = (): UseFetchReturnType<GetLinkInfoResponse> => {
  return useFetch<GetLinkInfoResponse>('/api/info', {
    method: 'GET',
  })
}
