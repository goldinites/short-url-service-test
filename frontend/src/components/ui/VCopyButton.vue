<template>
  <button class="copy-btn" @click="copy" :title="title">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="#333" stroke-width="2" />
      <rect x="4" y="4" width="12" height="12" rx="2" stroke="#333" stroke-width="2" />
    </svg>
    <span v-if="copied" class="copied-msg">Скопировано!</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
  title?: string
}>()

const copied = ref(false)

const copy = async () => {
  if (!props.text) return

  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (e) {
    copied.value = false
  }
}
</script>

<style scoped>
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
