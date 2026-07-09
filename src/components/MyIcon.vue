<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="my-icon">
    <template v-if="name === 'sun'">☀️</template>
    <template v-else-if="name === 'moon'">🌙</template>
    <template v-else-if="name === 'reset'">🔄</template>
    <template v-else-if="name === 'update'">🔄</template>
    <template v-else-if="name === 'log'">📋</template>
    <template v-else>📦</template>
  </span>
</template>

<style scoped>
.my-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}
</style>
