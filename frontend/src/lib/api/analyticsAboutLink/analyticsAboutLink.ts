import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'
import type { AnalyticsAboutLinkResponse } from '@/lib/api/analyticsAboutLink/analyticsAboutLink.type.ts'

export const analyticsAboutLink = async (
  shortUrl: string,
): Promise<UseFetchReturnType<AnalyticsAboutLinkResponse>> => {
  return await useFetch(`/api/analytics/${shortUrl}`, {
    method: 'GET',
  })
}
