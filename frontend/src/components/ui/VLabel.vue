<template>
  <label class="v-label">
    <slot />
  </label>
</template>

<style scoped>
.v-label {
  display: flex;
  flex-direction: column;
  font-size: 1.08rem;
  color: #232946;
  gap: 7px;
}
</style>
