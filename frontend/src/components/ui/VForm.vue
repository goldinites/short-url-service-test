<template>
  <form class="v-form" :class="{ pending }" @submit="onSubmit">
    <div class="v-form__fields">
      <slot name="fields" />
    </div>
    <slot name="button" />
    <slot v-if="error" name="error">
      <VErrorText>{{ error }}</VErrorText>
    </slot>
  </form>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'
import VErrorText from '@/components/ui/VErrorText.vue'

defineProps<{
  pending: boolean
  error: FetchError<string> | null
}>()

const emit = defineEmits(['submit'])
const onSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit', event)
}
</script>

<style scoped>
.v-form {
  flex: 1;
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
}
</style>
