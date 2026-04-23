<script setup>
import { Github } from 'lucide-vue-next'
</script>

<template>
  <a 
    href="https://github.com/abomdevp" 
    target="_blank" 
    rel="noopener noreferrer"
    class="fixed bottom-8 right-8 z-50 group"
  >
    <!-- Tooltip -->
    <div class="absolute bottom-full right-0 mb-4 px-3 py-1.5 bg-jjk-purple text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap shadow-xl">
      Visitar GitHub
      <div class="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-jjk-purple"></div>
    </div>

    <!-- Main Button -->
    <div class="relative w-14 h-14 bg-jjk-purple rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all transform hover:scale-110 active:scale-95">
      <!-- Pulse Effect -->
      <div class="absolute inset-0 rounded-full bg-jjk-purple animate-ping opacity-20"></div>
      
      <Github class="w-7 h-7 relative z-10" />
    </div>
  </a>
</template>

<style scoped>
@keyframes ping {
  75%, 100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
</style>
