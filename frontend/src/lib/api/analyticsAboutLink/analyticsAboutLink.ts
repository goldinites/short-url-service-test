import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { AnalyticsAboutLinkResponse } from '@/lib/api/analyticsAboutLink/analyticsAboutLink.type.ts'

export const analyticsAboutLink = (): UseFetchReturnType<AnalyticsAboutLinkResponse> => {
  return useFetch<AnalyticsAboutLinkResponse>('/api/analytics', {
    method: 'GET',
  })
}
