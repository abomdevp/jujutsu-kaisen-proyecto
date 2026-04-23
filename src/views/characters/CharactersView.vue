<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharactersStore } from '../../stores/useCharactersStore'
import CharacterCard from '../../components/characters/CharacterCard.vue'
import { translations } from '../../utils/translations'

const route = useRoute()
const router = useRouter()
const store = useCharactersStore()

// Initialize filters from URL
const selectedGrade = ref(route.query.grade || 'Todos')
const selectedClan = ref(route.query.clan || 'Todos')

onMounted(() => {
  store.fetchCharacters()
})

const characters = computed(() => store.characters)
const loading = computed(() => store.loading)

// Sync filters with URL
watch([selectedGrade, selectedClan], ([newGrade, newClan]) => {
  router.replace({
    query: {
      ...route.query,
      grade: newGrade === 'Todos' ? undefined : newGrade,
      clan: newClan === 'Todos' ? undefined : newClan
    }
  })
})

const filteredCharacters = computed(() => {
  return characters.value.filter(char => {
    const matchesGrade = selectedGrade.value === 'Todos' || char.grade === selectedGrade.value
    const matchesClan = selectedClan.value === 'Todos' || (char.clans && char.clans.name === selectedClan.value)
    return matchesGrade && matchesClan
  })
})
</script>

<template>
  <div class="space-y-8 pb-20">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-2">
        <h1 class="text-6xl font-display font-black text-white uppercase tracking-tighter">Personajes</h1>
        <p class="text-jjk-muted font-light italic text-lg">Explora los hechiceros y maldiciones que definen el mundo.</p>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <select v-model="selectedGrade" class="bg-jjk-surface border border-jjk-border rounded-xl px-4 py-2 focus:outline-none focus:border-jjk-purple transition-all font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-jjk-card">
          <option value="Todos">Todos los Grados</option>
          <option v-for="(label, key) in translations.grades" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <select v-model="selectedClan" class="bg-jjk-surface border border-jjk-border rounded-xl px-4 py-2 focus:outline-none focus:border-jjk-purple transition-all font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-jjk-card">
          <option value="Todos">Todos los Clanes</option>
          <option>Zenin Clan</option>
          <option>Gojo Clan</option>
          <option>Kamo Clan</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div v-for="i in 8" :key="i" class="aspect-[3/4] bg-jjk-card animate-pulse rounded-3xl border border-jjk-border"></div>
    </div>

    <!-- Grid -->
    <TransitionGroup 
      v-else 
      tag="div" 
      name="staggered-grid"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <CharacterCard 
        v-for="(char, index) in filteredCharacters" 
        :key="char.id" 
        :character="char" 
        :style="{ '--index': index }"
        @click="$router.push(`/characters/${char.slug}`)"
      />
    </TransitionGroup>

    <div v-if="!loading && filteredCharacters.length === 0" class="py-20 text-center">
       <p class="text-jjk-muted text-lg">No se encontraron personajes con estos filtros.</p>
    </div>
  </div>
</template>

<style scoped>
.staggered-grid-enter-active {
  transition: all 0.5s ease;
  transition-delay: calc(var(--index) * 0.05s);
}

.staggered-grid-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
