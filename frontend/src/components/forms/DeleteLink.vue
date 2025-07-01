<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Короткая ссылка</span>
        <VInput v-model="shortLink" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Удалить ссылку</VButton>
    </template>
  </VForm>
  <div v-if="data?.success">Ссылка успешно удалена!</div>
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import ShortLinkApi from '@/lib/api/ShortLinkApi.ts'

const shortLink = ref<string>('')

const { data, pending, error, execute } = ShortLinkApi.deleteLink()

const handleSubmit = () => {
  const result = shortLink.value.replace(window.location.origin, '')

  if (result) {
    execute(result)
  }
}
</script>
