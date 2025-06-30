import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type {
  AnalyticsAboutLinkRequest,
  AnalyticsAboutLinkResponse,
} from '@/lib/api/analyticsAboutLink/analyticsAboutLink.type.ts'

export const analyticsAboutLink = (
  request: AnalyticsAboutLinkRequest,
): UseFetchReturnType<AnalyticsAboutLinkResponse> => {
  return useFetch<AnalyticsAboutLinkResponse>(() => `/api/analytics/${request.shortLink}`, {
    method: 'GET',
  })
}
