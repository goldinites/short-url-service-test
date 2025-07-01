import { useFetch, type UseFetchReturnType } from '@/composables/useFetch.ts'

export const redirectShortUrl = (): UseFetchReturnType<string> => {
  return useFetch<string>('/api', {
    method: 'GET',
  })
}
