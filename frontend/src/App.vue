<template>
  <VCard>
    <VHeadline>Short Link Service</VHeadline>
    <div class="content">
      <VTabs>
        <VTab
          v-for="tab in tabs"
          :key="tab.key"
          :is-active="currentTab === tab.key"
          @click="handleSetCurrentTab(tab.key)"
        >
          {{ tab.name }}
        </VTab>
      </VTabs>
      <div class="tabs__content">
        <CreateShortUrl v-if="currentTab === TabKeys.Create" />
        <GetLinkInfo v-if="currentTab === TabKeys.GetInfo" />
        <DeleteLink v-if="currentTab === TabKeys.Delete" />
        <AnalyticsAboutLink v-if="currentTab === TabKeys.Analytics" />
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import VCard from '@/components/ui/VCard.vue'
import VHeadline from '@/components/ui/VHeadline.vue'
import VTabs from '@/components/ui/VTabs.vue'
import VTab from '@/components/ui/VTab.vue'
import CreateShortUrl from '@/components/forms/CreateShortUrl.vue'
import GetLinkInfo from '@/components/forms/GetLinkInfo.vue'
import DeleteLink from '@/components/forms/DeleteLink.vue'
import AnalyticsAboutLink from '@/components/forms/AnalyticsAboutLink.vue'
import { ref } from 'vue'

enum TabKeys {
  Create = 'create-url',
  GetInfo = 'get-link-url',
  Delete = 'delete-url',
  Analytics = 'analytics-url',
}

interface Tab {
  name: string
  key: TabKeys
}

const tabs: Tab[] = [
  {
    name: 'Сгенерировать',
    key: TabKeys.Create,
  },
  {
    name: 'Информация о ссылке',
    key: TabKeys.GetInfo,
  },
  {
    name: 'Удалить ссылку',
    key: TabKeys.Delete,
  },
  {
    name: 'Аналитика переходов',
    key: TabKeys.Analytics,
  },
]

const currentTab = ref<TabKeys>(tabs[0].key)

const handleSetCurrentTab = (key: TabKeys) => {
  currentTab.value = key
}
</script>

<style scoped>
.tabs__content {
  height: 365px;
}
</style>
