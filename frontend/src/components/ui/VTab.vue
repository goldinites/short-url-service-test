<template>
  <button class="v-tab" :class="{ isActive }" @click="$emit('click')" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean
}>()
</script>

<style scoped>
.v-tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  background: transparent;
  color: #3949ab;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  outline: none;
  transition:
    background 0.18s,
    color 0.18s,
    box-shadow 0.18s;
}

.v-tab.isActive {
  background: #e3e8ef;
  color: #1a237e;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.08);
}

.v-tab:not(.isActive):hover {
  background: #e8eaf6;
  color: #1a237e;
}
</style>
