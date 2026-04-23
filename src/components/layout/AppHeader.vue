<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Bell, Menu, X, User, Zap, Ghost, Shield } from 'lucide-vue-next'
import { useSearch } from '../../composables/useSearch'
import { useDebounceFn } from '@vueuse/core'
import { changelogService } from '../../services/entityServices'

const router = useRouter()
const { searchQuery, searchResults, isSearching, performSearch } = useSearch()
const showResults = ref(false)
const hasUnreadUpdates = ref(false)

const checkUpdates = async () => {
  const latest = await changelogService.getLatest()
  if (latest) {
    const lastRead = localStorage.getItem('last_read_update')
    hasUnreadUpdates.value = !lastRead || new Date(latest.created_at) > new Date(lastRead)
  }
}

const handleUpdatesRead = () => {
  hasUnreadUpdates.value = false
}

onMounted(() => {
  checkUpdates()
  window.addEventListener('updates-read', handleUpdatesRead)
})

onUnmounted(() => {
  window.removeEventListener('updates-read', handleUpdatesRead)
})

const handleSearch = useDebounceFn(() => {
  performSearch(searchQuery.value)
  showResults.value = searchQuery.value.length > 0
}, 300)

const handleInput = (e) => {
  searchQuery.value = e.target.value
  handleSearch()
}

const navigateTo = (path) => {
  router.push(path)
  showResults.value = false
  searchQuery.value = ''
}

const clearSearch = () => {
  searchQuery.value = ''
  showResults.value = false
}
</script>

<template>
  <header class="h-20 border-b border-jjk-border bg-jjk-black/50 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">
    <!-- Search Bar -->
    <div class="flex-1 max-w-xl relative">
      <div class="relative group">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-jjk-muted group-focus-within:text-jjk-purple transition-colors" />
        <input 
          :value="searchQuery"
          @input="handleInput"
          @focus="showResults = searchQuery.length > 0"
          type="text" 
          placeholder="Buscar personajes, técnicas, dominios..." 
          class="w-full bg-jjk-surface border border-jjk-border rounded-full py-2.5 pl-11 pr-10 focus:outline-none focus:border-jjk-purple/50 focus:ring-4 focus:ring-jjk-purple/10 transition-all text-sm"
        />
        <button v-if="searchQuery" @click="clearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-jjk-muted hover:text-white">
           <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Search Results Dropdown -->
      <transition name="fade">
        <div v-if="showResults" class="absolute top-full mt-2 left-0 right-0 glass-panel rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[70vh] overflow-y-auto custom-scrollbar">
           <div v-if="isSearching" class="p-8 text-center">
              <div class="w-6 h-6 border-2 border-jjk-purple border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p class="text-xs text-jjk-muted">Buscando en el archivo...</p>
           </div>
           
           <div v-else class="p-2 space-y-4">
              <!-- Characters -->
              <div v-if="searchResults.characters.length">
                 <p class="text-[10px] font-bold text-jjk-muted uppercase px-3 py-1 tracking-widest">Personajes</p>
                 <div v-for="char in searchResults.characters" :key="char.id" 
                    @click="navigateTo(`/characters/${char.slug}`)"
                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-jjk-purple/10 cursor-pointer group transition-colors"
                 >
                    <div class="w-10 h-10 rounded-lg overflow-hidden bg-jjk-card flex-none">
                       <img :src="char.image_url" class="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p class="text-sm font-bold text-white group-hover:text-jjk-purple transition-colors">{{ char.name }}</p>
                       <p class="text-[10px] text-jjk-muted uppercase">{{ char.grade }}</p>
                    </div>
                 </div>
              </div>

              <!-- Techniques -->
              <div v-if="searchResults.techniques.length">
                 <p class="text-[10px] font-bold text-jjk-muted uppercase px-3 py-1 tracking-widest">Técnicas</p>
                 <div v-for="tech in searchResults.techniques" :key="tech.id" 
                    @click="navigateTo(`/techniques/${tech.slug}`)"
                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-jjk-purple/10 cursor-pointer group transition-colors"
                 >
                    <div class="w-10 h-10 rounded-lg bg-jjk-purple/10 flex items-center justify-center text-jjk-purple flex-none">
                       <Zap class="w-5 h-5" />
                    </div>
                    <div>
                       <p class="text-sm font-bold text-white group-hover:text-jjk-purple transition-colors">{{ tech.name }}</p>
                       <p class="text-[10px] text-jjk-muted uppercase">{{ tech.type }}</p>
                    </div>
                 </div>
              </div>

              <!-- Domains -->
              <div v-if="searchResults.domains.length">
                 <p class="text-[10px] font-bold text-jjk-muted uppercase px-3 py-1 tracking-widest">Dominios</p>
                 <div v-for="dom in searchResults.domains" :key="dom.id" 
                    @click="navigateTo(`/domains/${dom.slug}`)"
                    class="flex items-center gap-3 p-3 rounded-xl hover:bg-jjk-purple/10 cursor-pointer group transition-colors"
                 >
                    <div class="w-10 h-10 rounded-lg bg-jjk-pink/10 flex items-center justify-center text-jjk-pink flex-none">
                       <Ghost class="w-5 h-5" />
                    </div>
                    <p class="text-sm font-bold text-white group-hover:text-jjk-purple transition-colors">{{ dom.name }}</p>
                 </div>
              </div>

              <div v-if="!searchResults.characters.length && !searchResults.techniques.length && !searchResults.domains.length" class="p-8 text-center text-jjk-muted">
                 No se encontraron resultados para "{{ searchQuery }}"
              </div>
           </div>
        </div>
      </transition>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-4 ml-6">
      <button 
        @click="router.push('/actualizaciones')"
        class="p-2.5 rounded-full hover:bg-jjk-card text-jjk-muted hover:text-jjk-purple transition-all relative"
        title="Actualizaciones"
      >
        <Bell class="w-6 h-6" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-jjk-purple rounded-full"></span>
      </button>
      
      <button class="lg:hidden p-2.5 rounded-full hover:bg-jjk-card text-jjk-muted">
        <Menu class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
