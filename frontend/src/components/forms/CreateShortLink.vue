<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Оригинальный URL</span>
        <VInput v-model="formData.originalUrl" type="text" name="originalUrl" />
        <VErrorText v-if="isOriginalUrlInvalid">URL адрес недействителен</VErrorText>
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

  <div v-if="createdUrl" class="result-block">
    <span>Короткая ссылка: </span>
    <a :href="createdUrl" target="_blank">{{ createdUrl }}</a>
    <VCopyButton :text="createdUrl" title="Скопировать ссылку" />
  </div>
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { reactive, ref, computed } from 'vue'
import ShortLinkApi from '@/lib/api/ShortLinkApi.ts'
import VDatePicker from '@/components/ui/VDatePicker.vue'
import { DAY, MONTH } from '@/lib/constants.ts'
import VErrorText from '@/components/ui/VErrorText.vue'
import VCopyButton from '@/components/ui/VCopyButton.vue'

interface CreateShortLinkFormData {
  originalUrl: string
  expiresAt?: Date
  alias?: string
}

const MinDate = new Date(Date.now() + DAY)
const MaxDate = new Date(Date.now() + DAY + MONTH)

const formData = reactive<CreateShortLinkFormData>({
  originalUrl: '',
  expiresAt: undefined,
  alias: undefined,
})

const isOriginalUrlInvalid = ref<boolean>(false)

const { data, pending, error, execute } = ShortLinkApi.createShortLink(formData)

const createdUrl = computed(() => {
  if (!data.value) {
    return ''
  }

  return `${window.location.origin}/${data.value.shortUrl}`
})

const handleSubmit = () => {
  isOriginalUrlInvalid.value = false
  if (!formData.originalUrl || !URL.canParse(formData.originalUrl)) {
    isOriginalUrlInvalid.value = true
    return
  }

  execute()
}
</script>

<style>
.result-block a {
  font-weight: 500;
}
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  vertical-align: middle;
  padding: 0;
}
.copied-msg {
  color: #4caf50;
  margin-left: 8px;
  font-size: 0.95em;
}
</style>
