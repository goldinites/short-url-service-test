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
        <CreateShortLink v-if="currentTab === TabKeys.Create" />
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
import CreateShortLink from '@/components/forms/CreateShortLink.vue'
import GetLinkInfo from '@/components/forms/GetLinkInfo.vue'
import DeleteLink from '@/components/forms/DeleteLink.vue'
import AnalyticsAboutLink from '@/components/forms/AnalyticsAboutLink.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import shortLinkApi from '@/lib/api/ShortLinkApi.ts'

enum TabKeys {
  Create = 'create-link',
  GetInfo = 'get-link-info',
  Delete = 'delete-link',
  Analytics = 'analytics-link',
}

interface Tab {
  name: string
  key: TabKeys
}

const tabs: Tab[] = [
  {
    name: 'Создать ссылку',
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
    name: 'Аналитика о ссылке',
    key: TabKeys.Analytics,
  },
]

const currentTab = ref<TabKeys>(tabs[0].key)

const router = useRouter()

const handleSetCurrentTab = (key: TabKeys) => {
  currentTab.value = key
}

const { data, execute } = shortLinkApi.redirectShortUrl()

router.beforeEach((to) => {
  if (to.path !== '/') {
    execute(to.path.slice(1, to.path.length))
  }
})

watch(data, (url) => {
  if (typeof url === 'string') {
    window.location.href = url
  }
})
</script>

<style scoped>
.tabs__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 370px;
}
</style>
