<script setup>
import { Shield } from 'lucide-vue-next'

defineProps({
  clan: Object
})
</script>

<template>
  <div 
    class="glass-panel p-8 rounded-3xl space-y-4 hover:border-jjk-blue/50 transition-all cursor-pointer group text-center"
    @click="$router.push(`/clans/${clan.slug}`)"
  >
    <div class="w-16 h-16 bg-jjk-blue/10 rounded-2xl flex items-center justify-center text-jjk-blue border border-jjk-blue/30 mx-auto group-hover:scale-110 transition-transform">
      <Shield class="w-8 h-8" />
    </div>
    <div class="p-6 space-y-4">
      <h3 class="text-2xl font-display font-bold text-white group-hover:text-jjk-blue transition-colors">{{ clan.name }}</h3>
      <p class="text-sm text-jjk-muted line-clamp-2 leading-relaxed">{{ clan.description }}</p>
      <span class="text-[10px] font-bold text-jjk-blue uppercase tracking-widest">Ver miembros</span>
    </div>
  </div>
</template>
