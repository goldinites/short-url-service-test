<template>
  <div>
    <VForm :error="error" :pending="pending" @submit="handleSubmit">
      <template #fields>
        <VLabel>
          <span>Оригинальный URL</span>
          <VInput v-model="formData.originalUrl" type="text" name="originalUrl" />
          <span v-if="isOriginalUrlInvalid">URL адрес недействителен</span>
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

    <div v-if="data && data.shortUrl" class="result-block">
      <span>Короткая ссылка: </span>
      <a :href="data.shortUrl" target="_blank">{{ data.shortUrl }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import VForm from '@/components/ui/VForm.vue'
import VLabel from '@/components/ui/VLabel.vue'
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import { onMounted, reactive, ref } from 'vue'
import ShortLinkApi from '@/lib/api/ShortLinkApi.ts'
import VDatePicker from '@/components/ui/VDatePicker.vue'
import { DAY, MONTH } from '@/lib/constants.ts'

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

const handleSubmit = () => {
  isOriginalUrlInvalid.value = false
  if (!formData.originalUrl || !URL.canParse(formData.originalUrl)) {
    isOriginalUrlInvalid.value = true
    return
  }

  execute()
}

onMounted(() => {
  console.log(123)
})
</script>
