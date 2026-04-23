<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharactersStore } from '../../stores/useCharactersStore'
import { useFavorites } from '../../composables/useFavorites'
import { t } from '../../utils/translations'
import { 
  ChevronLeft, 
  Zap, 
  Shield, 
  Ghost, 
  Users, 
  MapPin, 
  Activity,
  Heart,
  Crown
} from 'lucide-vue-next'

import RelationshipList from '../../components/characters/RelationshipList.vue'
import Breadcrumbs from '../../components/shared/Breadcrumbs.vue'

const route = useRoute()
const router = useRouter()
const store = useCharactersStore()
const { isFavorite, toggleFavorite } = useFavorites()

const character = computed(() => store.selectedCharacter)
const loading = computed(() => store.loading)
const imageError = ref(false)

onMounted(async () => {
  await store.fetchCharacterBySlug(route.params.slug)
})

const isSpecial = computed(() => character.value?.grade === 'Special Grade')

const getGradeColor = (grade) => {
  if (grade === 'Special Grade') return 'text-jjk-gold border-jjk-gold/30 bg-jjk-gold/10'
  if (grade === 'Grade 1') return 'text-jjk-purple border-jjk-purple/30 bg-jjk-purple/10'
  return 'text-jjk-muted border-jjk-border bg-jjk-surface'
}
</script>

<template>
  <div class="space-y-8 pb-20 max-w-7xl mx-auto">
    <!-- Breadcrumbs -->
    <Breadcrumbs 
      v-if="character"
      :items="[
        { name: 'Personajes', path: '/characters' },
        { name: character.name }
      ]" 
    />

    <!-- Header / Back -->
    <div class="flex items-center justify-between">
      <button @click="router.back()" class="flex items-center gap-2 text-jjk-muted hover:text-white transition-colors group text-sm font-bold tracking-widest uppercase">
        Volver al archivo
      </button>

      <button 
        v-if="character"
        @click="toggleFavorite(character)"
        class="flex items-center gap-2 px-6 py-2 rounded-xl border transition-all font-bold text-xs uppercase tracking-widest"
        :class="isFavorite(character.id) 
          ? 'text-jjk-pink border-jjk-pink/50 bg-jjk-pink/5 shadow-[0_0_15px_rgba(236,72,153,0.1)]' 
          : 'text-jjk-muted border-jjk-border hover:bg-jjk-card'"
      >
        <Heart class="w-4 h-4" :class="{ 'fill-current': isFavorite(character.id) }" />
        <span>{{ isFavorite(character.id) ? 'Favorito' : 'Guardar' }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-96 bg-jjk-card rounded-3xl"></div>
    </div>

    <template v-else-if="character">
      <!-- Main Info Panel -->
      <div 
        class="relative overflow-hidden rounded-3xl border transition-all duration-700"
        :class="isSpecial ? 'border-jjk-gold/30 bg-jjk-surface shadow-[0_0_40px_rgba(245,158,11,0.05)]' : 'border-jjk-border bg-jjk-surface'"
      >
         <!-- Background Blur Image -->
         <div class="absolute inset-0 opacity-10 blur-3xl scale-110">
            <img :src="character.image_url" class="w-full h-full object-cover" />
         </div>

         <!-- Special Subtle Gradient -->
         <div v-if="isSpecial" class="absolute inset-0 bg-gradient-to-br from-jjk-gold/5 via-transparent to-transparent"></div>

         <div class="relative p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-start">
            <!-- Portrait -->
            <div class="w-full lg:w-96 flex-none">
               <div 
                 class="aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-500 bg-jjk-black relative"
                 :class="isSpecial ? 'border-jjk-gold/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-jjk-border'"
               >
                  <!-- Main Image -->
                  <img 
                    v-if="character.image_url && !imageError"
                    :src="character.image_url" 
                    class="w-full h-full object-cover" 
                    @error="imageError = true"
                  />
                  <!-- Placeholder Image -->
                  <img 
                    v-else
                    src="https://tlhxlgfmwfmxmubwnymj.supabase.co/storage/v1/object/public/characters/placeholder.jpg"
                    class="w-full h-full object-cover opacity-50 grayscale"
                  />

                  <div v-if="isSpecial" class="absolute top-4 right-4 text-jjk-gold drop-shadow-lg">
                    <Crown class="w-8 h-8" />
                  </div>
               </div>
            </div>

            <!-- Text Content -->
            <div class="flex-1 space-y-8 pt-4">
               <div class="space-y-4">
                  <div class="flex flex-wrap items-center gap-4">
                     <span :class="['px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all', getGradeColor(character.grade)]">
                        {{ t('grades', character.grade) }}
                     </span>
                  </div>
                  <h1 
                    class="text-6xl lg:text-8xl font-display font-black uppercase leading-none tracking-tighter"
                    :class="isSpecial ? 'text-jjk-gold' : 'text-white'"
                  >
                    {{ character.name }}
                  </h1>
                  <p class="text-jjk-purple font-display text-2xl uppercase tracking-widest italic opacity-80">{{ character.affiliation }}</p>
               </div>

               <p class="text-jjk-text text-xl leading-relaxed max-w-3xl italic font-light">
                 "{{ character.description }}"
               </p>

               <!-- Relational Metadata -->
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                  <div v-if="character.clans" class="flex items-center gap-4 p-5 bg-jjk-black/40 rounded-2xl border border-jjk-border group cursor-pointer hover:border-jjk-blue/50 transition-all" @click="router.push(`/clans/${character.clans.slug}`)">
                     <div class="w-12 h-12 rounded-xl bg-jjk-blue/10 flex items-center justify-center text-jjk-blue">
                        <Shield class="w-6 h-6" />
                     </div>
                     <div>
                        <p class="text-[10px] text-jjk-muted uppercase font-black tracking-widest">Clan</p>
                        <p class="font-display font-bold text-white group-hover:text-jjk-blue transition-colors">{{ character.clans.name }}</p>
                     </div>
                  </div>

                  <div v-if="character.domains" class="flex items-center gap-4 p-5 bg-jjk-black/40 rounded-2xl border border-jjk-border group cursor-pointer hover:border-jjk-pink/50 transition-all" @click="router.push(`/domains/${character.domains.slug}`)">
                     <div class="w-12 h-12 rounded-xl bg-jjk-pink/10 flex items-center justify-center text-jjk-pink">
                        <Ghost class="w-6 h-6" />
                     </div>
                     <div>
                        <p class="text-[10px] text-jjk-muted uppercase font-black tracking-widest">Dominio</p>
                        <p class="font-display font-bold text-white group-hover:text-jjk-pink transition-colors">{{ character.domains.name }}</p>
                     </div>
                  </div>

                  <div class="flex items-center gap-4 p-5 bg-jjk-black/40 rounded-2xl border border-jjk-border">
                     <div class="w-12 h-12 rounded-xl bg-jjk-purple/10 flex items-center justify-center text-jjk-purple">
                        <MapPin class="w-6 h-6" />
                     </div>
                     <div>
                        <p class="text-[10px] text-jjk-muted uppercase font-black tracking-widest">Debut</p>
                        <p class="font-display font-bold text-white">{{ character.first_appearance || 'Capítulo 1' }}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- Detail Grid (Techniques & Relationships) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
         <!-- Techniques Column -->
         <div class="lg:col-span-2 space-y-8">
            <div class="flex items-center gap-4">
               <h2 class="text-4xl font-display font-black text-white uppercase tracking-tighter">Técnicas</h2>
               <div class="h-px flex-1 bg-gradient-to-r from-jjk-purple/50 to-transparent"></div>
            </div>
            
            <div v-if="character.techniques?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="tech in character.techniques" :key="tech.id" class="glass-panel p-6 rounded-2xl space-y-4 hover:border-jjk-purple/50 transition-all group cursor-pointer" @click="router.push(`/techniques/${tech.slug}`)">
                  <div class="flex justify-between items-start">
                     <span class="text-[9px] bg-jjk-purple/20 text-jjk-purple px-3 py-1 rounded-full font-black uppercase tracking-widest">{{ t('techniqueTypes', tech.type) }}</span>
                  </div>
                  <h4 class="text-2xl font-display font-bold text-white group-hover:text-jjk-purple transition-colors">{{ tech.name }}</h4>
                  <p class="text-sm text-jjk-muted leading-relaxed font-light">{{ tech.description }}</p>
               </div>
            </div>
            <div v-else class="glass-panel p-12 rounded-2xl text-center border-dashed">
               <p class="text-jjk-muted italic font-light italic text-lg">"Este hechicero no posee técnicas registradas en los archivos."</p>
            </div>
         </div>

         <!-- Relationships Column -->
         <div class="space-y-8">
            <div class="flex items-center gap-4">
               <h2 class="text-4xl font-display font-black text-white uppercase tracking-tighter">Vínculos</h2>
               <div class="h-px flex-1 bg-gradient-to-r from-jjk-pink/50 to-transparent"></div>
            </div>
            <div class="glass-panel p-8 rounded-3xl bg-jjk-surface/40">
               <RelationshipList :characterId="character.id" />
            </div>
         </div>
      </div>
    </template>
  </div>
</template>
