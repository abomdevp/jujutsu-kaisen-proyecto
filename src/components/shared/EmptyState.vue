<script setup>
defineProps({
  title: String,
  message: String,
  icon: [Object, Function] // Lucide icon components can be functions
})
</script>

<template>
  <div class="glass-panel p-20 rounded-3xl text-center space-y-6">
    <div class="w-20 h-20 bg-jjk-surface border border-jjk-border rounded-full flex items-center justify-center mx-auto text-jjk-muted">
      <component :is="icon" class="w-10 h-10" v-if="icon" />
    </div>
    <div class="space-y-2">
      <h3 class="text-2xl font-display font-bold text-white">{{ title }}</h3>
      <p class="text-jjk-muted">{{ message }}</p>
    </div>
    <slot></slot>
  </div>
</template>
