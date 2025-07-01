<template>
  <input class="v-input" v-bind="$attrs" v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style scoped>
.v-input {
  padding: 14px 14px;
  border: 2px solid #e3e8ef;
  border-radius: 10px;
  font-size: 1.08rem;
  background: #f9fafe;
  color: #232946;
  outline: none;
  transition:
    border 0.18s,
    box-shadow 0.18s;
  box-shadow: 0 2px 6px rgba(60, 60, 60, 0.06);
}

.v-input:focus {
  border-color: #3949ab;
  box-shadow: 0 0 0 2px #3949ab22;
}

.v-input::placeholder {
  color: #b0b3b8;
}
</style>
