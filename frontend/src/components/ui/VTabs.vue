<template>
  <div class="v-tabs">
    <slot />
  </div>
</template>

<style scoped>
.v-tabs {
  display: flex;
  background: #f3f6fa;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.06);
  border: 2px solid #e3e8ef;
  overflow: hidden;
  margin-bottom: 26px;
  padding: 4px;
}
</style>
