<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Original Url</span>
        <VInput v-model="formData.originalUrl" type="text" name="originalUrl" />
      </VLabel>
      <VLabel>
        <span>Lifespan (in days)</span>
        <VInput v-model="formData.expiresAt" type="text" name="expiresAt" />
      </VLabel>
      <VLabel>
        <span>Alias</span>
        <VInput v-model="formData.alias" type="text" name="alias" maxLength="30" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Create short link</VButton>
    </template>
  </VForm>
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { reactive } from 'vue'
import ShortLinkApi from '@/lib/api/ShortLinkApi.ts'

interface CreateShortLinkFormData {
  originalUrl: string
  expiresAt: Date
  alias: string
}

const formData = reactive<CreateShortLinkFormData>({
  originalUrl: '',
  expiresAt: new Date(),
  alias: '',
})

const { data, pending, error, execute: handleSubmit } = ShortLinkApi.createShortLink(formData)
</script>
