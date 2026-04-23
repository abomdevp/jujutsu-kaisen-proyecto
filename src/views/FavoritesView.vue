<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '../composables/useFavorites'
import { Heart, Trash2, ChevronRight } from 'lucide-vue-next'

const router = useRouter()
const { favorites, toggleFavorite } = useFavorites()

const navigateTo = (fav) => {
  if (fav.type === 'character') router.push(`/characters/${fav.slug}`)
  else if (fav.type === 'technique') router.push(`/techniques/${fav.slug}`)
  else if (fav.type === 'domain') router.push(`/domains/${fav.slug}`)
}
</script>

<template>
  <div class="space-y-8 pb-20 max-w-6xl mx-auto">
    <div class="space-y-2">
      <h1 class="text-5xl font-cinzel font-bold text-white uppercase tracking-tighter">Favoritos</h1>
      <p class="text-jjk-muted">Tu colección personal de hechiceros, técnicas y dominios.</p>
    </div>

    <div v-if="favorites.length === 0" class="glass-panel p-20 rounded-3xl text-center space-y-6">
       <div class="w-20 h-20 bg-jjk-surface border border-jjk-border rounded-full flex items-center justify-center mx-auto text-jjk-muted">
          <Heart class="w-10 h-10" />
       </div>
       <div class="space-y-2">
          <h3 class="text-2xl font-cinzel font-bold text-white">No tienes favoritos aún</h3>
          <p class="text-jjk-muted">Explora el archivo y marca el corazón en los perfiles que quieras guardar.</p>
       </div>
       <button @click="router.push('/characters')" class="bg-jjk-purple text-white px-8 py-3 rounded-xl font-bold hover:bg-jjk-violet transition-all">
          Explorar Personajes
       </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <div v-for="fav in favorites" :key="fav.id" 
          class="glass-panel p-4 rounded-2xl flex items-center gap-4 group hover:border-jjk-purple/50 transition-all cursor-pointer"
          @click="navigateTo(fav)"
       >
          <div class="w-16 h-16 rounded-xl overflow-hidden bg-jjk-card flex-none">
             <img v-if="fav.image_url" :src="fav.image_url" class="w-full h-full object-cover" />
             <div v-else class="w-full h-full flex items-center justify-center bg-jjk-purple/10 text-jjk-purple">
                <Heart class="w-6 h-6" />
             </div>
          </div>
          
          <div class="flex-1 min-w-0">
             <p class="text-[10px] text-jjk-muted uppercase font-bold tracking-widest">{{ fav.type }}</p>
             <h4 class="text-lg font-cinzel font-bold text-white group-hover:text-jjk-purple transition-colors truncate">{{ fav.name }}</h4>
          </div>

          <div class="flex items-center gap-2">
             <button @click.stop="toggleFavorite(fav)" class="p-2 text-jjk-red hover:bg-jjk-red/10 rounded-lg transition-colors" title="Eliminar de favoritos">
                <Trash2 class="w-5 h-5" />
             </button>
             <ChevronRight class="w-5 h-5 text-jjk-muted group-hover:text-white transition-colors" />
          </div>
       </div>
    </div>
  </div>
</template>
