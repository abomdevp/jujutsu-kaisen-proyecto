<script setup>
import { onMounted, ref } from 'vue'
import { domainService } from '../../services/entityServices'
import DomainCard from '../../components/shared/DomainCard.vue'
import SkeletonCard from '../../components/shared/SkeletonCard.vue'

const domains = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    domains.value = await domainService.getAll()
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
      <h1 class="text-5xl font-display font-black text-white uppercase tracking-tighter">Expansiones de Dominio</h1>
      <p class="text-jjk-muted">El pináculo de la hechicería jujutsu.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SkeletonCard v-for="i in 4" :key="i" class="aspect-video" />
    </div>

    <div v-else-if="domains.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <DomainCard 
        v-for="domain in domains" 
        :key="domain.id" 
        :domain="domain" 
      />
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-jjk-muted">No hay dominios registrados en el archivo aún.</p>
    </div>
  </div>
</template>
