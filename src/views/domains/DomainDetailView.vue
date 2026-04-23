<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'
import { ChevronLeft, Ghost, User } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const domain = ref(null)
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('domains')
    .select('*, characters(*)')
    .eq('slug', route.params.slug)
    .single()
  domain.value = data
  loading.value = false
})
</script>

<template>
  <div class="space-y-8 pb-20 max-w-5xl mx-auto">
    <button @click="router.back()" class="flex items-center gap-2 text-jjk-muted hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest">
      Volver
    </button>

    <div v-if="loading" class="animate-pulse glass-panel p-12 rounded-3xl h-64"></div>

    <div v-else-if="domain" class="space-y-8">
       <!-- Domain Banner -->
       <div class="relative overflow-hidden rounded-3xl aspect-video max-h-[400px] border border-jjk-border group">
          <div class="absolute inset-0 bg-jjk-black">
             <div class="absolute inset-0 bg-gradient-to-t from-jjk-black via-jjk-black/40 to-transparent z-10"></div>
             <!-- Dynamic Domain Background -->
             <div 
                class="w-full h-full bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"
                :style="{ backgroundImage: `url(${domain.image_url || 'https://images.alphacoders.com/132/1324108.png'})` }"
             ></div>
          </div>
          <div class="absolute bottom-0 left-0 p-8 lg:p-12 z-20 space-y-2">
             <span class="inline-block px-3 py-1 bg-jjk-pink/20 border border-jjk-pink/30 text-jjk-pink rounded-full text-xs font-bold uppercase tracking-widest">EXPANSIÓN DE DOMINIO</span>
             <h1 class="text-5xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter">{{ domain.name }}</h1>
          </div>
       </div>

       <!-- Effect Panel -->
       <div class="glass-panel p-8 lg:p-12 rounded-3xl space-y-6">
          <h2 class="text-3xl font-display font-bold text-jjk-pink border-l-4 border-jjk-pink pl-4 uppercase">Efecto de Dominio</h2>
          <p class="text-jjk-text text-xl leading-relaxed italic">
             "{{ domain.effect || domain.description }}"
          </p>
       </div>

       <!-- User Link (Handles multiple/first user) -->
       <div v-if="domain.characters && domain.characters.length" class="space-y-4">
          <div 
            v-for="user in domain.characters" 
            :key="user.id"
            class="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer hover:border-jjk-pink/50 transition-all" 
            @click="router.push(`/characters/${user.slug}`)"
          >
            <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-jjk-pink/30 group-hover:border-jjk-pink transition-all flex-none">
               <img :src="user.image_url" class="w-full h-full object-cover" />
            </div>
            <div class="text-center md:text-left">
               <p class="text-xs text-jjk-muted uppercase font-bold tracking-tighter">Usuario del Dominio</p>
               <h3 class="text-2xl font-display font-bold text-white group-hover:text-jjk-pink transition-colors">{{ user.name }}</h3>
               <p class="text-jjk-muted">{{ user.affiliation }}</p>
            </div>
            <div class="ml-auto">
               <button class="bg-jjk-pink/20 text-jjk-pink px-6 py-2 rounded-xl font-bold hover:bg-jjk-pink hover:text-white transition-all">
                  Ver Perfil
               </button>
            </div>
          </div>
       </div>
    </div>
  </div>
</template>
