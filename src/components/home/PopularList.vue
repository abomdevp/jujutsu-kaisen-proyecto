<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/useAppStore'
import { TrendingUp, ChevronRight } from 'lucide-vue-next'

const router = useRouter()
const store = useAppStore()

const popular = computed(() => store.popularCharacters)
const loading = computed(() => store.loadingPopular)

onMounted(() => {
  store.fetchPopular()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 text-jjk-purple">
      <TrendingUp class="w-5 h-5" />
      <h3 class="text-xl font-cinzel font-bold uppercase tracking-tight">Más Vistos</h3>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="h-16 bg-jjk-card rounded-xl animate-pulse"></div>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="(char, index) in popular" 
        :key="char.id"
        @click="router.push(`/characters/${char.slug}`)"
        class="group flex items-center gap-4 p-3 rounded-2xl hover:bg-jjk-purple/10 border border-transparent hover:border-jjk-purple/20 transition-all cursor-pointer"
      >
        <div class="relative flex-none">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-jjk-black border border-jjk-border">
            <img :src="char.image_url" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <span class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-jjk-purple text-[10px] font-bold flex items-center justify-center text-white border-2 border-jjk-surface">
            {{ index + 1 }}
          </span>
        </div>

        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white group-hover:text-jjk-purple transition-colors truncate">{{ char.name }}</h4>
          <p class="text-[10px] text-jjk-muted uppercase tracking-widest">{{ char.grade }}</p>
        </div>

        <ChevronRight class="w-4 h-4 text-jjk-muted group-hover:text-white transition-colors" />
      </div>

      <div v-if="popular.length === 0" class="text-center py-10">
         <p class="text-xs text-jjk-muted italic">No hay datos de popularidad aún.</p>
      </div>
    </div>
  </div>
</template>
