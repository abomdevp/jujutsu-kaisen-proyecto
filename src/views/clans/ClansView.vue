<script setup>
import { onMounted, ref } from 'vue'
import { clanService } from '../../services/entityServices'
import ClanCard from '../../components/shared/ClanCard.vue'
import SkeletonCard from '../../components/shared/SkeletonCard.vue'

const clans = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    clans.value = await clanService.getAll()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-8 pb-20">
    <div class="space-y-2">
      <h1 class="text-5xl font-cinzel font-bold text-white uppercase tracking-tighter">Grandes Clanes</h1>
      <p class="text-jjk-muted">Los linajes que dominan el mundo de la hechicería.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkeletonCard v-for="i in 3" :key="i" />
    </div>

    <div v-else-if="clans.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ClanCard 
        v-for="clan in clans" 
        :key="clan.id" 
        :clan="clan" 
      />
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-jjk-muted">No hay clanes registrados en el archivo.</p>
    </div>
  </div>
</template>
