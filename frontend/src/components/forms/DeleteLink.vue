<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Short Url</span>
        <VInput v-model="formData.shortLink" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Delete link</VButton>
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

interface GetLinkInfoFormData {
  shortLink: ''
}

const formData = reactive<GetLinkInfoFormData>({
  shortLink: '',
})

const { data, pending, error, execute: handleSubmit } = ShortLinkApi.deleteLink(formData)
</script>
