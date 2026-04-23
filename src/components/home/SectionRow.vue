<script setup>
import CharacterCard from '../characters/CharacterCard.vue'
import TechniqueCard from '../shared/TechniqueCard.vue'
import { Zap } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  items: Array,
  type: {
    type: String,
    default: 'character'
  }
})
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-cinzel font-bold border-l-4 border-jjk-purple pl-4 uppercase tracking-wider">
        {{ title }}
      </h2>
      <button class="text-jjk-purple text-sm font-bold hover:text-jjk-violet transition-colors">
        Ver todo
      </button>
    </div>

    <div class="flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x">
      <div v-for="item in items" :key="item.id" class="snap-start flex-none w-64 md:w-72">
        <template v-if="type === 'character'">
           <CharacterCard :character="item" @click="$router.push(`/characters/${item.slug}`)" />
        </template>
        <template v-else-if="type === 'technique'">
           <TechniqueCard :technique="item" />
        </template>
      </div>
    </div>
  </section>
</template>
