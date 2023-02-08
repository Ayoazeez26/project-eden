<template>
  <div v-for="(image, index) in showCount" :key="index" v-bind="$attrs">
    <q-skeleton :height="heightVal" width="100%" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  showCount: {
    type: Number,
    required: true
  },
  heightVal: {
    type: String,
    required: true
  }
})
</script>

<style scoped>

</style>
