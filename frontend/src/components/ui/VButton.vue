<template>
  <button class="v-button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped>
.v-button {
  margin-top: 10px;
  padding: 16px 0;
  background: linear-gradient(90deg, #3949ab 0%, #7c4dff 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.18s,
    box-shadow 0.18s,
    transform 0.1s;
  box-shadow: 0 2px 10px #7c4dff22;
}

.v-button:hover {
  background: linear-gradient(90deg, #7c4dff 0%, #3949ab 100%);
  transform: scale(1.035);
}
</style>
