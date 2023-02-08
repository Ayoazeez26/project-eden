<template>
  <div>
    <q-img
      :src="image"
      no-spinner
      :style="styleName"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  styleName: {
    type: String,
    default: 'height: 250px; width: 100%'
  }
})
</script>

<style scoped>

</style>
