<template>
  <form class="v-form" :class="{ pending }" @submit.prevent="$emit('submit')">
    <div class="v-form__fields">
      <slot name="fields" />
    </div>
    <slot name="button" />
    <slot v-if="error" name="error">
      <span class="v-form__error">{{ error }}</span>
    </slot>
  </form>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'

defineProps<{
  pending: boolean
  error: FetchError<string> | null
}>()
</script>

<style scoped>
.v-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  transition: 0.25s;

  &.pending {
    pointer-events: none;
    opacity: 0.7;
  }

  & .v-form__fields {
    display: flex;
    flex-direction: column;
    gap: 18px;
    flex: 1;
  }

  & .v-form__error {
    color: #7a0000;
  }
}
</style>
