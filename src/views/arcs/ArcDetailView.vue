<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'
import { ChevronLeft, Map } from 'lucide-vue-next'
import CharacterCard from '../../components/characters/CharacterCard.vue'

const route = useRoute()
const router = useRouter()
const arc = ref(null)
const characters = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data: arcData } = await supabase
      .from('arcs')
      .select('*, character_arcs(characters(*))')
      .eq('slug', route.params.slug)
      .single()
    
    arc.value = arcData
    // Extract characters from junction table
    characters.value = arcData.character_arcs?.map(ca => ca.characters) || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-12 pb-20 max-w-7xl mx-auto">
    <button @click="router.back()" class="flex items-center gap-2 text-jjk-muted hover:text-white transition-colors group">
      <ChevronLeft class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      Volver
    </button>

    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-64 bg-jjk-card rounded-3xl"></div>
      <div class="grid grid-cols-4 gap-8">
         <div v-for="i in 4" :key="i" class="h-80 bg-jjk-card rounded-3xl"></div>
      </div>
    </div>

    <div v-else-if="arc" class="space-y-12">
       <div class="glass-panel p-8 lg:p-12 rounded-3xl border-l-8 border-jjk-purple">
          <div class="space-y-4">
             <span class="text-xs font-bold text-jjk-purple uppercase tracking-widest">Arco {{ arc.order_index }}</span>
             <h1 class="text-6xl font-cinzel font-bold text-white uppercase">{{ arc.name }}</h1>
             <p class="text-jjk-text text-xl leading-relaxed max-w-4xl">
                {{ arc.description }}
             </p>
          </div>
       </div>

       <div class="space-y-8">
          <h2 class="text-3xl font-cinzel font-bold text-white border-l-4 border-jjk-purple pl-4 uppercase">Personajes del Arco</h2>
          <div v-if="characters.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             <CharacterCard v-for="char in characters" :key="char.id" :character="char" @click="router.push(`/characters/${char.slug}`)" />
          </div>
          <div v-else class="glass-panel p-12 rounded-3xl text-center">
             <p class="text-jjk-muted italic">No se han registrado personajes específicos para este arco aún.</p>
          </div>
       </div>
    </div>
  </div>
</template>
