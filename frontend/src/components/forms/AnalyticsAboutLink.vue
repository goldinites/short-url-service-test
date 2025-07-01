<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Short Url</span>
        <VInput v-model="shortLink" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Get analytics about link</VButton>
    </template>
  </VForm>
  {{ data }}
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { ref } from 'vue'
import ShortLinkApi from '@/lib/api/ShortLinkApi.ts'

const shortLink = ref<string>('')

const { data, pending, error, execute } = ShortLinkApi.analyticsAboutLink()

const handleSubmit = () => {
  execute(shortLink.value)
}
</script>
