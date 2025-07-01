import { readonly, ref, type Ref } from 'vue'
import { $fetch, type FetchError, type FetchOptions } from 'ofetch'

export interface UseFetchReturnType<T> {
  /**
   * Реактивная ссылка на данные
   */
  data: Ref<T | null>
  /**
   * Реактивная ссылка на ошибку
   */
  error: Ref<FetchError | null>
  /**
   * Реактивная ссылка на состояние загрузки
   */
  pending: Ref<boolean>
  /**
   * Функция для выполнения запроса
   */
  execute: (url?: string) => Promise<void>
  /**
   * Реактивная ссылка на статус код ответа
   */
  statusCode: Ref<number | null>
}

/**
 * Хук для выполнения HTTP запросов
 * @param url URL запроса
 * @param options Опции запроса (метод, тело, заголовки и т.д.)
 * @param immediate Выполнить запрос сразу при создании хука (по умолчанию true)
 * @returns Объект с реактивными состояниями и методом execute
 */
export const useFetch = <T>(
  url: string | (() => string),
  options?: FetchOptions<'json'>,
  immediate = false,
): UseFetchReturnType<T> => {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const pending = ref(false)
  const statusCode = ref<number | null>(null)

  const execute = async (dynamicUrl?: string) => {
    try {
      pending.value = true
      data.value = null
      error.value = null

      let requestUrl = typeof url === 'function' ? url() : url
      requestUrl = dynamicUrl ? `${requestUrl}/${dynamicUrl}` : requestUrl

      data.value = await $fetch<T>(requestUrl, options)

      statusCode.value = 200
    } catch (err) {
      error.value =
        ((err as FetchError).response?._data?.message as string) ??
        'Что-то пошло не так, повторите попытку позже'

      if (err instanceof Error && 'statusCode' in err) {
        statusCode.value = (err as FetchError).statusCode ?? null
      }
    } finally {
      pending.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data: readonly(data) as Ref<T | null>,
    error: readonly(error) as Ref<FetchError | null>,
    pending: readonly(pending) as Ref<boolean>,
    execute,
    statusCode: readonly(statusCode) as Ref<number | null>,
  }
}
