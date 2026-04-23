<script setup>
import { onMounted, ref, computed } from 'vue'
import { techniqueService } from '../../services/entityServices'
import TechniqueCard from '../../components/shared/TechniqueCard.vue'
import SkeletonCard from '../../components/shared/SkeletonCard.vue'
import EmptyState from '../../components/shared/EmptyState.vue'
import { Search, Zap } from 'lucide-vue-next'
import { translations } from '../../utils/translations'

const techniques = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedType = ref('Todos')

onMounted(async () => {
  try {
    techniques.value = await techniqueService.getAll()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const filteredTechniques = computed(() => {
  return techniques.value.filter(tech => {
    const matchesQuery = tech.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'Todos' || tech.type === selectedType.value
    return matchesQuery && matchesType
  })
})
</script>

<template>
  <div class="space-y-12 pb-20">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-jjk-border pb-8">
      <div class="space-y-4">
        <h1 class="text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
          Técnicas <span class="text-jjk-purple">Malditas</span>
        </h1>
        <p class="text-jjk-muted text-lg max-w-xl font-medium">
          El arte de manipular la energía maldita para manifestar fenómenos sobrenaturales.
        </p>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <div class="relative group">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-jjk-muted group-focus-within:text-jjk-purple transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar en el registro..." 
            class="bg-jjk-surface border border-jjk-border rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:border-jjk-purple/50 focus:ring-4 focus:ring-jjk-purple/10 transition-all text-sm hover:bg-jjk-card w-full md:w-64"
          />
        </div>
        <select 
          v-model="selectedType" 
          class="bg-jjk-surface border border-jjk-border rounded-2xl px-6 py-3 focus:outline-none focus:border-jjk-purple/50 focus:ring-4 focus:ring-jjk-purple/10 transition-all text-sm cursor-pointer hover:bg-jjk-card appearance-none"
        >
          <option value="Todos">Todos los tipos</option>
          <option v-for="(label, key) in translations.techniqueTypes" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Content Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkeletonCard v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="filteredTechniques.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TechniqueCard 
        v-for="tech in filteredTechniques" 
        :key="tech.id" 
        :technique="tech" 
      />
    </div>

    <EmptyState 
      v-else 
      :icon="Zap" 
      title="Sin resultados" 
      description="No se han encontrado técnicas que coincidan con los criterios de búsqueda."
    />
  </div>
</template>
