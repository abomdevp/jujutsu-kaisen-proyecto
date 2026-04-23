<script setup>
import { onMounted, ref } from 'vue'
import { changelogService } from '../services/entityServices'
import { Bell, Calendar, Sparkles } from 'lucide-vue-next'

const updates = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    updates.value = await changelogService.getAll()
    
    // Al entrar, marcamos como leído guardando la fecha del último update visto
    if (updates.value.length > 0) {
      localStorage.setItem('last_read_update', updates.value[0].created_at)
      // Disparamos un evento custom para que el Header se entere y quite el punto rojo
      window.dispatchEvent(new CustomEvent('updates-read'))
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-8 pb-20 max-w-4xl mx-auto">
    <div class="space-y-2">
      <h1 class="text-5xl font-display font-black text-white uppercase tracking-tighter">Actualizaciones</h1>
      <p class="text-jjk-muted">Registro de cambios y nuevas adiciones al archivo.</p>
    </div>

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="glass-panel p-8 rounded-3xl animate-pulse h-40"></div>
    </div>

    <div v-else-if="updates.length" class="relative space-y-12 before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-jjk-border">
      <div v-for="update in updates" :key="update.id" class="relative pl-20 group">
        <!-- Dot -->
        <div class="absolute left-6 top-2 w-5 h-5 rounded-full bg-jjk-surface border-4 border-jjk-purple group-hover:scale-125 transition-transform z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
        
        <div class="glass-panel p-8 rounded-3xl group-hover:border-jjk-purple/30 transition-all space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <span class="px-2 py-0.5 bg-jjk-purple/20 text-jjk-purple text-[10px] font-bold rounded uppercase tracking-widest">{{ update.version || 'v1.0.0' }}</span>
                <h3 class="text-2xl font-display font-bold text-white">{{ update.title }}</h3>
              </div>
              <div class="flex items-center gap-2 text-xs text-jjk-muted">
                <Calendar class="w-3.5 h-3.5" />
                {{ formatDate(update.created_at) }}
              </div>
            </div>
            <Sparkles class="w-6 h-6 text-jjk-purple/50 group-hover:text-jjk-purple transition-colors" />
          </div>

          <div class="prose prose-invert max-w-none text-jjk-text leading-relaxed whitespace-pre-wrap">
            {{ update.content }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="py-20 text-center glass-panel rounded-3xl">
      <Bell class="w-12 h-12 text-jjk-muted mx-auto mb-4 opacity-20" />
      <p class="text-jjk-muted">No hay actualizaciones registradas aún.</p>
    </div>
  </div>
</template>
