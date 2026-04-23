<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, Users, Zap, Ghost, Shield, X } from 'lucide-vue-next'
import { useSearch } from '../composables/useSearch'
import CharacterCard from '../components/characters/CharacterCard.vue'
import TechniqueCard from '../components/shared/TechniqueCard.vue'
import DomainCard from '../components/shared/DomainCard.vue'
import ClanCard from '../components/shared/ClanCard.vue'
import EmptyState from '../components/shared/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { searchQuery, searchResults, isSearching, performSearch } = useSearch()

const activeTab = ref('all')
const tabs = [
  { id: 'all', name: 'Todos', icon: Search },
  { id: 'characters', name: 'Personajes', icon: Users },
  { id: 'techniques', name: 'Técnicas Malditas', icon: Users },
  { id: 'domains', name: 'Expansiones de Dominio', icon: Users },
  { id: 'clans', name: 'Clanes', icon: Users },
  { id: 'arcs', name: 'Arcos Argumentales', icon: Users }
]

const updateUrl = (q) => {
  router.replace({ query: { q: q || undefined } })
}

watch(searchQuery, (newQuery) => {
  updateUrl(newQuery)
  performSearch(newQuery)
})

onMounted(() => {
  const q = route.query.q
  if (q) {
    searchQuery.value = q
    performSearch(q)
  }
})

const clearSearch = () => {
  searchQuery.value = ''
}

const hasResults = (type) => {
  if (type === 'all') {
    return searchResults.value.characters.length > 0 ||
           searchResults.value.techniques.length > 0 ||
           searchResults.value.domains.length > 0 ||
           searchResults.value.clans.length > 0
  }
  return searchResults.value[type]?.length > 0
}
</script>

<template>
  <div class="space-y-12 pb-20 max-w-7xl mx-auto">
    <!-- Search Bar Section -->
    <div class="text-center space-y-8 py-12">
      <div class="space-y-2">
        <h1 class="text-6xl font-cinzel font-bold text-white uppercase tracking-tighter">Buscador Global</h1>
        <p class="text-jjk-muted text-xl">Explora el archivo completo de hechicería.</p>
      </div>

      <div class="max-w-2xl mx-auto relative group">
        <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-jjk-muted group-focus-within:text-jjk-purple transition-colors" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Escribe el nombre de un personaje, técnica o clan..." 
          class="w-full bg-jjk-surface border-2 border-jjk-border rounded-2xl py-5 pl-16 pr-14 focus:outline-none focus:border-jjk-purple/50 focus:ring-8 focus:ring-jjk-purple/5 transition-all text-xl font-medium"
          autofocus
        />
        <button v-if="searchQuery" @click="clearSearch" class="absolute right-6 top-1/2 -translate-y-1/2 text-jjk-muted hover:text-white transition-colors">
          <X class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex items-center justify-center gap-2 border-b border-jjk-border">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-bold text-sm uppercase tracking-widest"
        :class="activeTab === tab.id ? 'border-jjk-purple text-jjk-purple bg-jjk-purple/5' : 'border-transparent text-jjk-muted hover:text-jjk-text'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.name }}
      </button>
    </div>

    <!-- Results Section -->
    <div v-if="isSearching" class="py-20 text-center space-y-4">
      <div class="w-12 h-12 border-4 border-jjk-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-jjk-muted font-cinzel">Consultando los registros prohibidos...</p>
    </div>

    <div v-else-if="searchQuery && !hasResults('all')" class="py-20">
      <EmptyState 
        title="Sin resultados" 
        :message="`No se encontró nada relacionado con '${searchQuery}'`" 
        :icon="Search"
      />
    </div>

    <div v-else-if="!searchQuery" class="py-20">
       <EmptyState 
        title="Comienza tu búsqueda" 
        message="Ingresa un término para explorar el archivo de Jujutsu Kaisen." 
        :icon="Search"
      />
    </div>

    <div v-else class="space-y-16">
      <!-- Characters Results -->
      <section v-if="(activeTab === 'all' || activeTab === 'characters') && searchResults.characters.length" class="space-y-6">
        <h2 class="text-2xl font-cinzel font-bold text-white border-l-4 border-jjk-purple pl-4 uppercase">Personajes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CharacterCard v-for="char in searchResults.characters" :key="char.id" :character="char" @click="router.push(`/characters/${char.slug}`)" />
        </div>
      </section>

      <!-- Techniques Results -->
      <section v-if="(activeTab === 'all' || activeTab === 'techniques') && searchResults.techniques.length" class="space-y-6">
        <h2 class="text-2xl font-cinzel font-bold text-white border-l-4 border-jjk-purple pl-4 uppercase">Técnicas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TechniqueCard v-for="tech in searchResults.techniques" :key="tech.id" :technique="tech" />
        </div>
      </section>

      <!-- Domains Results -->
      <section v-if="(activeTab === 'all' || activeTab === 'domains') && searchResults.domains.length" class="space-y-6">
        <h2 class="text-2xl font-cinzel font-bold text-white border-l-4 border-jjk-pink pl-4 uppercase">Dominios</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DomainCard v-for="dom in searchResults.domains" :key="dom.id" :domain="dom" />
        </div>
      </section>

      <!-- Clans Results -->
      <section v-if="(activeTab === 'all' || activeTab === 'clans') && searchResults.clans.length" class="space-y-6">
        <h2 class="text-2xl font-cinzel font-bold text-white border-l-4 border-jjk-blue pl-4 uppercase">Clanes</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ClanCard v-for="clan in searchResults.clans" :key="clan.id" :clan="clan" />
        </div>
      </section>
    </div>
  </div>
</template>
