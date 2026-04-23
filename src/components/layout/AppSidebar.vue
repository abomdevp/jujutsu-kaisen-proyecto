<script setup>
import { 
  Home, 
  Users, 
  Zap, 
  Ghost, 
  Swords, 
  Map, 
  Heart, 
  Search, 
  Settings,
  Bell,
  Music
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const menuItems = [
  { name: 'nav.home', path: '/', icon: Home },
  { name: 'nav.characters', path: '/characters', icon: Users },
  { name: 'nav.techniques', path: '/techniques', icon: Users },
  { name: 'nav.domains', path: '/domains', icon: Users },
  { name: 'nav.clans', path: '/clans', icon: Users },
  { name: 'nav.arcs', path: '/arcs', icon: Users },
]

const secondaryItems = [
  { name: 'nav.search', path: '/search', icon: Search },
  { name: 'nav.favorites', path: '/favorites', icon: Heart },
  { name: 'nav.settings', path: '/settings', icon: Settings },
  { name: 'nav.updates', path: '/actualizaciones', icon: Bell },
  { name: 'nav.soundtrack', path: '/soundtrack', icon: Music },
]
</script>

<template>
  <aside class="w-20 lg:w-64 flex flex-col h-full bg-jjk-surface border-r border-jjk-border transition-all duration-300">
    <!-- Logo Section -->
    <div class="h-20 flex items-center px-6">
      <RouterLink to="/" class="flex items-center gap-3 group">
        <span class="hidden lg:block font-display text-lg font-black tracking-tighter text-white uppercase leading-none">
          {{ $t('common.expediente') }}
        </span>
      </RouterLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
      <RouterLink 
        v-for="item in menuItems" 
        :key="item.name" 
        :to="item.path"
        class="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group hover:bg-jjk-purple/10"
        active-class="bg-jjk-purple/20 text-jjk-purple border-l-4 border-jjk-purple"
      >
        <component :is="item.icon" class="w-6 h-6 transition-transform group-hover:scale-110" />
        <span class="hidden lg:block font-medium">{{ $t(item.name) }}</span>
      </RouterLink>

      <div class="pt-6 pb-2">
        <div class="h-px bg-jjk-border mx-2"></div>
      </div>

      <RouterLink 
        v-for="item in secondaryItems" 
        :key="item.name" 
        :to="item.path"
        class="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group hover:bg-jjk-purple/10 text-jjk-muted hover:text-jjk-text"
        active-class="bg-jjk-purple/20 text-jjk-purple"
      >
        <div class="relative">
          <component :is="item.icon" class="w-6 h-6" />
          <span v-if="item.name === 'nav.updates'" class="absolute -top-1 -right-1 w-2 h-2 bg-jjk-purple rounded-full"></span>
        </div>
        <span class="hidden lg:block font-medium">{{ $t(item.name) }}</span>
      </RouterLink>
    </nav>

    <!-- User Profile / Bottom Section -->
    <div class="p-4 border-t border-jjk-border">
      <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-jjk-card transition-colors cursor-pointer group">
        <div class="w-10 h-10 rounded-full bg-jjk-surface border border-jjk-purple/30 overflow-hidden flex-none">
          <img src="https://tlhxlgfmwfmxmubwnymj.supabase.co/storage/v1/object/public/characters/gojo.jpg" alt="Avatar" />
        </div>
        <div class="hidden lg:block overflow-hidden">
          <p class="text-xs font-display font-black uppercase tracking-tighter text-white truncate leading-none">{{ $t('common.expediente') }}</p>
          <p class="text-[10px] text-jjk-muted font-bold uppercase tracking-widest truncate mt-1">Satoru Gojo</p>
        </div>
      </div>
    </div>
  </aside>
</template>
