<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { characterService } from '../../services/characterService'
import { User, Heart, Swords, GraduationCap } from 'lucide-vue-next'
import { t } from '../../utils/translations'

const props = defineProps({
  characterId: {
    type: String,
    required: true
  }
})

const router = useRouter()
const relationships = ref([])
const loading = ref(true)

const getRelationIcon = (type) => {
  if (type === 'ally') return Heart
  if (type === 'enemy') return Swords
  if (type === 'teacher' || type === 'student') return GraduationCap
  return User
}

const getRelationColor = (type) => {
  if (type === 'ally') return 'text-jjk-pink bg-jjk-pink/10'
  if (type === 'enemy') return 'text-jjk-red bg-jjk-red/10'
  if (type === 'teacher') return 'text-jjk-purple bg-jjk-purple/10'
  if (type === 'student') return 'text-jjk-blue bg-jjk-blue/10'
  return 'text-jjk-muted bg-jjk-surface'
}

onMounted(async () => {
  try {
    relationships.value = await characterService.getRelationships(props.characterId)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-16 bg-jjk-card rounded-xl animate-pulse"></div>
    </div>

    <div v-else-if="relationships.length" class="space-y-3">
      <div 
        v-for="rel in relationships" 
        :key="rel.id"
        @click="router.push(`/characters/${rel.related_character.slug}`)"
        class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group"
      >
        <div class="w-12 h-12 rounded-lg overflow-hidden bg-jjk-card flex-none grayscale group-hover:grayscale-0 transition-all border border-white/5">
          <img :src="rel.related_character.image_url" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-display font-bold text-white group-hover:text-jjk-purple transition-colors truncate">{{ rel.related_character.name }}</h4>
          <div class="flex items-center gap-1.5 mt-0.5">
             <component :is="getRelationIcon(rel.relation_type)" class="w-3 h-3" :class="getRelationColor(rel.relation_type).split(' ')[0]" />
             <span class="text-[9px] uppercase font-black tracking-widest" :class="getRelationColor(rel.relation_type).split(' ')[0]">
                {{ t('relations', rel.relation_type) }}
             </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-xs text-jjk-muted italic">No se han registrado relaciones clave.</p>
    </div>
  </div>
</template>
