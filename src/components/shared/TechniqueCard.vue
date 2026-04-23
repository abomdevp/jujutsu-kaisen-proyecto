<script setup>
import { Zap, User } from 'lucide-vue-next'
import { t as translate } from '../../utils/translations'

defineProps({
  technique: Object
})
</script>

<template>
  <div 
    class="glass-panel p-8 rounded-3xl h-full flex flex-col space-y-6 hover:border-jjk-purple/50 transition-all cursor-pointer group relative overflow-hidden"
    @click="$router.push(`/techniques/${technique.slug}`)"
  >
    <!-- Background Decor -->
    <Zap class="absolute -right-4 -top-4 w-24 h-24 text-jjk-purple/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-rotate-12 group-hover:scale-110" />

    <div class="flex justify-between items-start">
      <span class="px-2 py-0.5 bg-jjk-purple/10 text-jjk-purple text-[10px] font-bold rounded uppercase tracking-widest border border-jjk-purple/20">
        {{ translate('techniqueTypes', technique.type) }}
      </span>
      <Zap class="w-5 h-5 text-jjk-purple group-hover:animate-pulse" />
    </div>

    <div class="space-y-2 flex-1">
      <h4 class="text-2xl font-display font-black text-white group-hover:text-jjk-purple transition-colors uppercase tracking-tight">
        {{ technique.name }}
      </h4>
      <p class="text-sm text-jjk-muted line-clamp-3 leading-relaxed">
        {{ technique.description }}
      </p>
    </div>

    <!-- User Info -->
    <div v-if="technique.characters" class="pt-4 border-t border-white/5 flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-jjk-purple/10 flex items-center justify-center text-jjk-purple group-hover:bg-jjk-purple group-hover:text-white transition-colors">
        <User class="w-4 h-4" />
      </div>
      <div>
        <p class="text-[10px] text-jjk-muted uppercase font-bold tracking-widest leading-none">Usuario</p>
        <p class="text-sm text-white font-medium group-hover:text-jjk-purple transition-colors">
          {{ Array.isArray(technique.characters) ? technique.characters[0]?.name : technique.characters.name }}
        </p>
      </div>
    </div>
  </div>
</template>
