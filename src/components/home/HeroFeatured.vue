<script setup>
import { Play, Info } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    default: 'Satoru Gojo'
  },
  subtitle: {
    type: String,
    default: 'The Strongest Jujutsu Sorcerer'
  },
  description: {
    type: String,
    default: 'A special grade jujutsu sorcerer and a teacher at the Tokyo Jujutsu High. He is the first person in four hundred years to inherit both the Limitless and the Six Eyes.'
  },
  image: {
    type: String,
    default: 'https://images.alphacoders.com/132/1324108.png' // Satoru Gojo wallpaper
  }
})
</script>

<template>
  <section class="relative h-[500px] rounded-3xl overflow-hidden mb-12 group">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img :src="image" :alt="title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div class="absolute inset-0 bg-gradient-to-r from-jjk-black via-jjk-black/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-jjk-black to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 space-y-6">
      <div class="space-y-2">
        <span class="inline-block px-3 py-1 bg-jjk-purple/20 border border-jjk-purple/30 text-jjk-purple rounded-full text-xs font-bold tracking-widest uppercase">
          Personaje Destacado
        </span>
        <h1 class="text-5xl lg:text-7xl font-cinzel font-bold text-white tracking-tight">
          {{ title }}
        </h1>
        <p class="text-xl text-jjk-purple font-cinzel tracking-wider uppercase">
          {{ subtitle }}
        </p>
      </div>

      <p class="max-w-xl text-jjk-muted text-lg leading-relaxed line-clamp-3">
        {{ description }}
      </p>

      <div class="flex items-center gap-4 pt-4">
        <button class="flex items-center gap-2 bg-jjk-purple hover:bg-jjk-violet text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 glow-purple">
          <Play class="w-5 h-5 fill-current" />
          Ver Perfil
        </button>
        <button class="flex items-center gap-2 bg-jjk-surface/80 hover:bg-jjk-card text-white border border-jjk-border px-8 py-3.5 rounded-xl font-bold transition-all backdrop-blur-sm">
          <Info class="w-5 h-5" />
          Más Info
        </button>
      </div>
    </div>
  </section>
</template>
