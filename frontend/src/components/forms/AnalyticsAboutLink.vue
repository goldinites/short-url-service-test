<template>
  <VForm :error="error" :pending="pending" @submit="handleSubmit">
    <template #fields>
      <VLabel>
        <span>Короткая ссылка</span>
        <VInput v-model="shortLink" type="text" name="shortUrl" />
      </VLabel>
    </template>
    <template #button>
      <VButton type="submit">Получить аналитику по url</VButton>
    </template>
  </VForm>
  <div v-if="data">
    <div>Всего переходов: {{ data.totalClicks }}</div>
    <div>
      Последние переходы:
      <ul>
        <li v-for="(click, index) in data.recentClicks" :key="index">
          IP: {{ click.ipAddress }}, Дата: {{ click.clickedAt }}
        </li>
      </ul>
    </div>
  </div>
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
