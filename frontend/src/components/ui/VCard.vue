<template>
  <div class="v-card">
    <slot />
  </div>
</template>

<style scoped>
.v-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 16px 0 rgba(60, 60, 60, 0.1);
  border: 1px solid #e3e8ef;
  padding: 20px 18px 20px 18px;
  max-width: 768px;
  width: 100%;
  box-sizing: border-box;
  margin: 16px auto;
  transition: box-shadow 0.2s;
}

.v-card:hover {
  box-shadow: 0 8px 32px 0 rgba(60, 60, 60, 0.16);
}
</style>
