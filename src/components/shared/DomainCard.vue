<script setup>
import { Ghost } from 'lucide-vue-next'
import InfoBadge from './InfoBadge.vue'

defineProps({
  domain: Object
})
</script>

<template>
  <div 
    class="relative group aspect-video rounded-3xl overflow-hidden border border-jjk-border hover:border-jjk-pink/50 transition-all cursor-pointer bg-jjk-card"
    @click="$router.push(`/domains/${domain.slug}`)"
  >
    <div class="absolute inset-0 bg-gradient-to-t from-jjk-black via-jjk-black/20 to-transparent z-10"></div>
    <div class="absolute inset-0 bg-jjk-pink/5 group-hover:bg-jjk-pink/10 transition-colors"></div>
    
    <div class="absolute top-4 right-4 z-20">
      <Ghost class="w-6 h-6 text-jjk-pink/50 group-hover:text-jjk-pink transition-colors" />
    </div>

    <div class="absolute bottom-0 left-0 p-6 z-20 space-y-1">
      <InfoBadge text="Dominio" type="pink" />
      <h4 class="text-2xl font-display font-bold text-white group-hover:text-jjk-pink transition-colors">{{ domain.name }}</h4>
      <p class="text-xs text-jjk-muted" v-if="domain.characters && domain.characters.length">
        Usuario: {{ domain.characters[0].name }}
      </p>
    </div>
  </div>
</template>
