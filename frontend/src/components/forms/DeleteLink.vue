<template>
  <VForm :error="sendError" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Короткая ссылка</span>
        <VInput v-model="shortUrl" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Удалить ссылку</VButton>
    </template>
  </VForm>
  {{ status }}
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import ShortUrlApi from '@/lib/api/ShortUrlApi.ts'

const shortUrl = ref<string>('')
const status = ref<boolean | null>(null)
const sendError = ref<string | null>(null)
const pending = ref<boolean>(false)

const handleSubmit = async () => {
  pending.value = true
  status.value = null
  sendError.value = null

  const { data, error } = await ShortUrlApi.deleteLink(shortUrl.value)

  status.value = data
  sendError.value = error
  pending.value = false
}
</script>
