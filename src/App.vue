<script setup>
import { RouterView } from 'vue-router'
import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'
import FloatingGithub from './components/shared/FloatingGithub.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-jjk-black text-jjk-text">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Top Header -->
      <AppHeader />

      <!-- Main Layout -->
      <div class="flex flex-1 overflow-hidden">
        <main class="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar relative">
          <RouterView v-slot="{ Component }">
            <transition name="page-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </main>
      </div>
    </div>

    <!-- Floating Action Button -->
    <FloatingGithub />
  </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2a2a3e;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7b4fe8;
}
</style>
