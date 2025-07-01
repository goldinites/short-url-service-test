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
      <template v-if="data.recentClicks.length">
        Последние переходы:
        <ul class="recent-clicks">
          <li v-for="(click, index) in data.recentClicks" :key="index">
            IP: {{ click.ipAddress }}, Дата: {{ dateFormatter(click.clickedAt) }}
          </li>
        </ul>
      </template>
      <span v-else>По этой ссылке было переходов</span>
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
import { dateFormatter } from '@/utils/dateFormatter.ts'

const shortLink = ref<string>('')

const { data, pending, error, execute } = ShortLinkApi.analyticsAboutLink()

const handleSubmit = () => {
  if (shortLink.value) {
    execute(shortLink.value)
  }
}
</script>

<style scoped>
.recent-clicks {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & li {
    list-style: none;
  }
}
</style>
