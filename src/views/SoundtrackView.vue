<script setup>
import { Music, ExternalLink, Play } from 'lucide-vue-next'

const soundtracks = [
  {
    title: 'Season 2: Hidden Inventory & Shibuya Incident',
    artist: 'Yoshimasa Terui',
    cover: 'images/Shibuya.jpg',
    url: 'https://music.youtube.com/playlist?list=OLAK5uy_n9BiRXUUFMeSfvDRudpZ6M9hHbJ1qFjTs',
    color: 'from-jjk-purple/40'
  },
  {
    title: 'Season 2: Culling Game Part 1 Original Sound',
    artist: 'Yoshimasa Terui',
    cover: 'images/Sacrificio.jpg',
    url: 'https://music.youtube.com/playlist?list=OLAK5uy_mqwY_lFoR-mZV47RvMZEVmQIVFmjf3DLw',
    color: 'from-blue-500/40'
  }
]
</script>

<template>
  <div class="space-y-12 pb-20">
    <!-- Header -->
    <div class="space-y-4 border-b border-jjk-border pb-8">
      <h1 class="text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
        Banda <span class="text-jjk-purple">Sonora</span>
      </h1>
      <p class="text-jjk-muted text-lg max-w-xl font-medium">
        Escucha los temas oficiales que dan vida al mundo de hechicería.
      </p>
    </div>

    <!-- Album Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        v-for="album in soundtracks" 
        :key="album.title"
        class="group relative overflow-hidden rounded-[2.5rem] bg-jjk-card border border-jjk-border hover:border-jjk-purple/50 transition-all duration-500"
      >
        <!-- Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity" :class="album.color"></div>
        
        <div class="flex flex-col md:flex-row p-8 gap-8 relative z-10">
          <!-- Cover Art -->
          <div class="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl flex-none group-hover:scale-105 transition-transform duration-700">
            <img :src="album.cover" class="w-full h-full object-cover" />
          </div>

          <!-- Info -->
          <div class="flex flex-col justify-center space-y-6">
            <div class="space-y-2">
              <h3 class="text-3xl font-display font-black text-white tracking-tight leading-none uppercase">
                {{ album.title }}
              </h3>
              <p class="text-jjk-muted font-bold tracking-widest uppercase text-xs">{{ album.artist }}</p>
            </div>

            <a 
              :href="album.url" 
              target="_blank"
              class="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm self-start hover:bg-jjk-purple hover:text-white transition-all transform hover:translate-x-2"
            >
              <Play class="w-4 h-4 fill-current" />
              Escuchar Ahora
              <ExternalLink class="w-4 h-4 opacity-50" />
            </a>
          </div>
        </div>

        <!-- Decorative Icon -->
        <Music class="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 transform rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-display {
  font-family: 'Fraunces', serif;
}
</style>
