import { $fetch, type FetchError, type FetchOptions } from 'ofetch'

export interface UseFetchReturnType<T> {
  data: T | null
  error: string | null
}

export const useFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>,
): Promise<UseFetchReturnType<T>> => {
  let data: T | null = null
  let error: string | null

  try {
    error = null

    data = await $fetch<T>(url, options)
  } catch (err) {
    error =
      ((err as FetchError).response?._data?.message as string) ??
      'Что-то пошло не так, повторите попытку позже'
  }

  return {
    data,
    error,
  }
}
