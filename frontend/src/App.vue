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
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    name: 'Create link',
    key: TabKeys.Create,
  },
  {
    name: 'Get link info',
    key: TabKeys.GetInfo,
  },
  {
    name: 'Delete link',
    key: TabKeys.Delete,
  },
  {
    name: 'Analytics about link',
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
  height: 360px;
}
</style>
