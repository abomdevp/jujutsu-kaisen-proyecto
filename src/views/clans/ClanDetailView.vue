<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'
import { ChevronLeft, Shield, Users } from 'lucide-vue-next'
import CharacterCard from '../../components/characters/CharacterCard.vue'

const route = useRoute()
const router = useRouter()
const clan = ref(null)
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('clans')
    .select('*, characters(*)')
    .eq('slug', route.params.slug)
    .single()
  clan.value = data
  loading.value = false
})
</script>

<template>
  <div class="space-y-8 pb-20 max-w-7xl mx-auto">
    <button @click="router.back()" class="flex items-center gap-2 text-jjk-muted hover:text-white transition-colors group">
      <ChevronLeft class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      Volver
    </button>

    <div v-if="loading" class="animate-pulse glass-panel p-12 rounded-3xl h-64"></div>

    <div v-else-if="clan" class="space-y-12">
       <!-- Clan Info -->
       <div class="glass-panel p-8 lg:p-16 rounded-3xl relative overflow-hidden">
          <div class="absolute right-0 top-0 opacity-10 p-8">
             <Shield class="w-64 h-64" />
          </div>
          
          <div class="relative z-10 space-y-6">
             <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-jjk-blue/20 flex items-center justify-center text-jjk-blue border border-jjk-blue/30">
                   <Shield class="w-10 h-10" />
                </div>
                <h1 class="text-6xl font-cinzel font-bold text-white uppercase">{{ clan.name }}</h1>
             </div>
             <p class="text-jjk-text text-xl leading-relaxed max-w-4xl">
                {{ clan.description }}
             </p>
          </div>
       </div>

       <!-- Clan Members -->
       <div class="space-y-8">
          <div class="flex items-center justify-between">
             <h2 class="text-3xl font-cinzel font-bold text-white border-l-4 border-jjk-blue pl-4 uppercase">Miembros del Clan</h2>
          </div>

          <div v-if="clan.characters?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             <CharacterCard 
                v-for="char in clan.characters" 
                :key="char.id" 
                :character="char" 
                @click="router.push(`/characters/${char.slug}`)"
             />
          </div>
          <div v-else class="glass-panel p-12 rounded-3xl text-center">
             <p class="text-jjk-muted italic">No se han registrado miembros para este clan aún.</p>
          </div>
       </div>
    </div>
  </div>
</template>
