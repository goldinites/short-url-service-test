<template>
  <VForm :error="sendError" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Оригинальный Url</span>
        <VInput v-model="formData.originalUrl" type="text" name="originalUrl" />
      </VLabel>
      <VLabel>
        <span>Срок действия</span>
        <VDatePicker v-model="formData.expiresAt" :min-date="MinDate" :max-date="MaxDate" />
      </VLabel>
      <VLabel>
        <span>Псевдоним</span>
        <VInput v-model="formData.alias" type="text" name="alias" maxLength="30" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Сгенерировать короткую ссылку</VButton>
    </template>
  </VForm>
  {{ shortUrl }}
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import VDatePicker from '@/components/ui/VDatePicker.vue'
import { DAY, MONTH } from '@/lib/constants.ts'
import { reactive, ref } from 'vue'
import ShortUrlApi from '@/lib/api/ShortUrlApi.ts'
import type { CreateShortUrlResponse } from '@/lib/api/createShortUrl/createShortUrl.type.ts'

interface CreateShortUrlFormData {
  originalUrl: string
  expiresAt?: Date
  alias?: string
}

const MinDate = new Date(Date.now() + DAY)
const MaxDate = new Date(Date.now() + DAY + MONTH)

const formData = reactive<CreateShortUrlFormData>({
  originalUrl: '',
  expiresAt: undefined,
  alias: undefined,
})

const shortUrl = ref<CreateShortUrlResponse | null>(null)
const sendError = ref<string | null>(null)
const pending = ref<boolean>(false)

const handleSubmit = async () => {
  pending.value = true
  shortUrl.value = null
  sendError.value = null

  const { data, error } = await ShortUrlApi.createShortUrl(formData)

  shortUrl.value = data
  sendError.value = error
  pending.value = false
}
</script>
