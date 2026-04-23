<script setup>
import { ChevronRight, Home } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    required: true
    // Array of { name: string, path?: string }
  }
})
</script>

<template>
  <nav class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-jjk-muted mb-6">
    <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
      <Home class="w-3 h-3" />
      Archive
    </RouterLink>
    
    <template v-for="(item, index) in items" :key="index">
      <span class="opacity-30">/</span>
      <RouterLink 
        v-if="item.path" 
        :to="item.path" 
        class="hover:text-white transition-colors"
      >
        {{ item.name }}
      </RouterLink>
      <span v-else class="text-white">{{ item.name }}</span>
    </template>
  </nav>
</template>
