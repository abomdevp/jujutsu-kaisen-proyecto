<script setup>
import { onMounted, computed } from 'vue'
import { useCharactersStore } from '../stores/useCharactersStore'
import HeroFeatured from '../components/home/HeroFeatured.vue'
import SectionRow from '../components/home/SectionRow.vue'

const store = useCharactersStore()

onMounted(() => {
  store.fetchFeatured()
  store.fetchCharacters()
})

const featuredCharacter = computed(() => store.featuredCharacters[0] || null)
const popularCharacters = computed(() => store.characters.slice(0, 8))
</script>

<template>
  <div class="space-y-12 pb-20">
    <HeroFeatured 
      v-if="featuredCharacter"
      :title="featuredCharacter.name"
      :subtitle="featuredCharacter.affiliation"
      :description="featuredCharacter.description"
      :image="featuredCharacter.image_url"
    />
    <HeroFeatured v-else />

    <SectionRow title="Personajes Populares" :items="popularCharacters" />
    
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="glass-panel p-8 rounded-3xl space-y-4 hover:border-jjk-pink/50 transition-all">
        <h2 class="text-2xl font-display font-bold text-white">Dominios</h2>
        <p class="text-jjk-muted">Explora las expansiones de dominio más poderosas.</p>
        <RouterLink to="/domains" class="inline-block text-jjk-pink font-bold hover:underline">Ver todos los dominios</RouterLink>
      </div>
      
      <div class="glass-panel p-8 rounded-3xl space-y-4 hover:border-jjk-blue/50 transition-all">
        <h2 class="text-2xl font-display font-bold text-white">Clanes</h2>
        <p class="text-jjk-muted">Conoce a las familias que dominan el mundo de la hechicería.</p>
        <RouterLink to="/clans" class="inline-block text-jjk-blue font-bold hover:underline">Explorar clanes</RouterLink>
      </div>
    </section>
  </div>
</template>
