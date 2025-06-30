import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type {
  GetLinkInfoRequest,
  GetLinkInfoResponse,
} from '@/lib/api/getLinkInfo/getLinkInfo.type.ts'

export const getLinkInfo = (
  request: GetLinkInfoRequest,
): UseFetchReturnType<GetLinkInfoResponse> => {
  return useFetch<GetLinkInfoResponse>(() => `/api/info/${request.shortLink}`, {
    method: 'GET',
  })
}
