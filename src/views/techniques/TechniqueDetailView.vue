<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { techniqueService } from '../../services/entityServices'
import { Zap, User, ArrowUpRight } from 'lucide-vue-next'
import { t as translate } from '../../utils/translations'

const route = useRoute()
const router = useRouter()
const technique = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    technique.value = await techniqueService.getBySlug(route.params.slug)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const character = computed(() => {
  if (!technique.value?.characters) return null
  return Array.isArray(technique.value.characters) 
    ? technique.value.characters[0] 
    : technique.value.characters
})
</script>

<template>
  <div class="pb-20 max-w-5xl mx-auto space-y-12">
    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-8 animate-pulse">
      <div class="h-64 bg-jjk-card rounded-3xl"></div>
      <div class="h-32 bg-jjk-card rounded-3xl w-2/3"></div>
    </div>

    <template v-else-if="technique">
      <!-- Technique Header Card -->
      <div class="glass-panel p-10 lg:p-16 rounded-[2.5rem] border-l-8 border-jjk-purple bg-gradient-to-br from-jjk-purple/10 via-transparent to-transparent relative overflow-hidden group">
        <Zap class="absolute -right-12 -top-12 w-64 h-64 text-jjk-purple opacity-[0.03] group-hover:opacity-[0.05] transition-all duration-700 transform group-hover:-rotate-12" />
        
        <div class="relative z-10 space-y-8">
          <div class="space-y-4">
            <span class="px-4 py-1.5 bg-jjk-purple/20 border border-jjk-purple/30 text-jjk-purple rounded-xl text-xs font-bold uppercase tracking-widest inline-block">
              {{ translate('techniqueTypes', technique.type) }}
            </span>
            <h1 class="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
              {{ technique.name }}
            </h1>
          </div>
          
          <div class="prose prose-invert max-w-3xl">
            <p class="text-xl text-jjk-muted leading-relaxed font-medium">
              {{ technique.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- User Reference Card -->
      <div v-if="character" class="space-y-6">
        <h2 class="text-sm font-bold text-jjk-muted uppercase tracking-[0.3em] px-4">Usuario de la técnica</h2>
        
        <div 
          @click="router.push(`/characters/${character.slug}`)"
          class="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer hover:border-jjk-purple/50 transition-all hover:bg-jjk-purple/5"
        >
          <div class="w-32 h-32 rounded-2xl overflow-hidden border-2 border-jjk-purple/30 group-hover:border-jjk-purple transition-all relative">
            <img :src="character.image_url" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div class="absolute inset-0 bg-jjk-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div class="flex-1 text-center md:text-left space-y-2">
            <h3 class="text-4xl font-display font-black text-white group-hover:text-jjk-purple transition-colors uppercase tracking-tight">
              {{ character.name }}
            </h3>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span class="text-sm text-jjk-muted font-bold uppercase tracking-widest">{{ character.affiliation }}</span>
              <span class="w-1 h-1 bg-jjk-border rounded-full hidden md:block"></span>
              <span class="text-sm text-jjk-purple font-bold uppercase tracking-widest">{{ translate('grades', character.grade) }}</span>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 text-jjk-purple font-bold uppercase tracking-widest text-xs">
            Ver Perfil
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
