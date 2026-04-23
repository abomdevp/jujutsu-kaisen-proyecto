<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'
import SkeletonCard from '../../components/shared/SkeletonCard.vue'
import { Map, ChevronRight } from 'lucide-vue-next'

const arcs = ref([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const { data } = await supabase.from('arcs').select('*').order('order_index')
    arcs.value = data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8 pb-20 max-w-5xl mx-auto">
    <div class="space-y-2">
      <h1 class="text-5xl font-cinzel font-bold text-white uppercase tracking-tighter">Arcos de la Historia</h1>
      <p class="text-jjk-muted">Sigue el hilo de la narrativa de Jujutsu Kaisen.</p>
    </div>

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 4" :key="i" class="h-32 bg-jjk-card rounded-3xl animate-pulse"></div>
    </div>

    <div v-else-if="arcs.length" class="relative space-y-8 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-jjk-border">
      <div 
        v-for="arc in arcs" 
        :key="arc.id" 
        class="relative pl-20 group cursor-pointer"
        @click="router.push(`/arcs/${arc.slug}`)"
      >
        <!-- Timeline Dot -->
        <div class="absolute left-6 top-6 w-5 h-5 rounded-full bg-jjk-surface border-4 border-jjk-border group-hover:border-jjk-purple transition-all z-10"></div>
        
        <div class="glass-panel p-8 rounded-3xl group-hover:border-jjk-purple/50 transition-all flex items-center justify-between">
           <div class="space-y-2">
              <div class="flex items-center gap-3">
                 <span class="text-xs font-bold text-jjk-purple">ARCO {{ arc.order_index }}</span>
                 <h3 class="text-2xl font-cinzel font-bold text-white group-hover:text-jjk-purple transition-colors">{{ arc.name }}</h3>
              </div>
              <p class="text-jjk-muted line-clamp-2 max-w-2xl">{{ arc.description }}</p>
           </div>
           <ChevronRight class="w-8 h-8 text-jjk-muted group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-jjk-muted">No hay arcos registrados en el archivo.</p>
    </div>
  </div>
</template>
