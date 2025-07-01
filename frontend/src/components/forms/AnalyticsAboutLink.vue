<template>
  <VForm :error="sendError" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Короткая ссылка</span>
        <VInput v-model="shortUrl" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Получить аналитику переходов</VButton>
    </template>
  </VForm>
  {{ analytics }}
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import ShortUrlApi from '@/lib/api/ShortUrlApi.ts'
import type { AnalyticsAboutLinkResponse } from '@/lib/api/analyticsAboutLink/analyticsAboutLink.type.ts'

const shortUrl = ref<string>('')
const analytics = ref<AnalyticsAboutLinkResponse | null>(null)
const sendError = ref<string | null>(null)
const pending = ref<boolean>(false)

const handleSubmit = async () => {
  pending.value = true
  analytics.value = null
  sendError.value = null

  const { data, error } = await ShortUrlApi.analyticsAboutLink(shortUrl.value)

  analytics.value = data
  sendError.value = error
  pending.value = false
}
</script>
