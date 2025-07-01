<template>
  <VueDatePicker
    v-model="model"
    :min-date="minDate"
    :max-date="maxDate"
    :enable-time-picker="false"
    disable-month-year-select
    auto-apply
    locale="ru-RU"
    format="dd.MM.yyyy"
    type="date"
    name="lifespan"
  />
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { ModelValue } from '@vuepic/vue-datepicker'

const model = defineModel<ModelValue>()

defineProps<{
  minDate?: string | Date
  maxDate?: string | Date
}>()
</script>

<style>
:root {
  --dp-input-padding: 14px 14px;
  --dp-border-radius: 10px;
}

.dp__input {
  box-shadow: 0 2px 6px rgba(60, 60, 60, 0.06);
  border-width: 2px;
  line-height: 1;
}

.dp__today {
  border: none;
}

.dp__theme_light {
  --dp-background-color: #f9fafe;
  --dp-border-color: #e3e8ef;
  --dp-border-color-hover: #e3e8ef;
  --dp-border-color-focus: #3949ab;
  --dp-primary-color: #3949ab;
}
</style>
