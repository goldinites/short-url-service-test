<template>
  <VForm :error="sendError" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Короткая ссылка</span>
        <VInput v-model="shortUrl" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Получить информацию о ссылке</VButton>
    </template>
  </VForm>
  {{ info }}
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import ShortUrlApi from '@/lib/api/ShortUrlApi.ts'
import type { GetLinkInfoResponse } from '@/lib/api/getLinkInfo/getLinkInfo.type.ts'

const shortUrl = ref<string>('')
const info = ref<GetLinkInfoResponse | null>(null)
const sendError = ref<string | null>(null)
const pending = ref<boolean>(false)

const handleSubmit = async () => {
  pending.value = true
  info.value = null
  sendError.value = null

  const { data, error } = await ShortUrlApi.getLinkInfo(shortUrl.value)

  info.value = data
  sendError.value = error
  pending.value = false
}
</script>
