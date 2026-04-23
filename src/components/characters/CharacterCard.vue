<script setup>
import { ref } from 'vue'
import { Shield, Zap, Skull, Crown } from 'lucide-vue-next'
import { t } from '../../utils/translations'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const isSpecial = props.character.grade === 'Special Grade'
const imageError = ref(false)

const getGradeClasses = (grade) => {
  if (grade === 'Special Grade') return 'text-jjk-gold border-jjk-gold/50 bg-jjk-gold/10'
  if (grade === 'Grade 1') return 'text-jjk-purple border-jjk-purple/30 bg-jjk-purple/10'
  return 'text-jjk-muted border-jjk-border bg-jjk-surface'
}
</script>

<template>
  <div 
    class="group relative bg-jjk-card border rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
    :class="[
      isSpecial ? 'border-jjk-gold/30 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:border-jjk-gold/60' : 'border-jjk-border hover:border-jjk-purple/50',
      'hover:scale-[1.02] hover:shadow-2xl'
    ]"
  >
    <!-- Special Grade Subtle Shine -->
    <div v-if="isSpecial" class="absolute inset-0 bg-gradient-to-tr from-jjk-gold/5 via-transparent to-transparent z-10 pointer-events-none"></div>

    <!-- Image -->
    <div class="aspect-[3/4] overflow-hidden relative bg-jjk-surface">
      <!-- Fallback Placeholder Image -->
      <img 
        v-if="!character.image_url || imageError"
        src="https://tlhxlgfmwfmxmubwnymj.supabase.co/storage/v1/object/public/characters/placeholder.jpg"
        class="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
      />

      <img 
        v-if="character.image_url && !imageError"
        :src="character.image_url" 
        :alt="character.name" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        @error="imageError = true"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-jjk-black via-jjk-black/20 to-transparent"></div>
    </div>

    <!-- Badges -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 z-20">
      <span :class="['px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md transition-colors', getGradeClasses(character.grade)]">
        {{ t('grades', character.grade) }}
      </span>
    </div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-20">
      <div class="space-y-1">
        <h3 
          class="text-2xl font-display font-extrabold text-white transition-colors leading-tight"
          :class="isSpecial ? 'group-hover:text-jjk-gold' : 'group-hover:text-jjk-purple'"
        >
          {{ character.name }}
        </h3>
        <p class="text-xs text-jjk-muted font-medium flex items-center gap-2 uppercase tracking-widest">
          <Shield class="w-3 h-3" /> {{ character.clans?.name || 'Sin Clan' }}
        </p>
      </div>

      <div class="flex items-center justify-between pt-2">
        <div class="flex gap-2">
          <!-- Habilidades / Stats icons removed as requested -->
        </div>
        <button 
          class="text-[10px] font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 tracking-widest"
          :class="isSpecial ? 'text-jjk-gold' : 'text-jjk-purple'"
        >
          VER PERFIL
        </button>
      </div>
    </div>
  </div>
</template>
