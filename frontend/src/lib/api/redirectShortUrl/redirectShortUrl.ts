import { useFetch } from '@/composables/useFetch.ts'

export const redirectShortUrl = () => {
  return useFetch('/api', {
    method: 'GET',
  })
}
