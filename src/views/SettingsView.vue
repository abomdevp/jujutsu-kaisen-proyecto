<script setup>
import { Globe, Check } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const setLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('user-locale', lang)
}
</script>

<template>
  <div class="space-y-8 pb-20 max-w-4xl mx-auto">
    <div class="space-y-2">
      <h1 class="text-5xl font-display font-black text-white uppercase tracking-tighter">Configuración</h1>
      <p class="text-jjk-muted">Personaliza tu experiencia.</p>
    </div>

    <div class="grid gap-6">
      <div class="space-y-4">
        <h2 class="text-sm font-bold text-jjk-muted uppercase tracking-widest px-2">{{ t('settings.language') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            @click="setLanguage('es')"
            :class="[
              'flex items-center justify-between p-6 bg-jjk-card border rounded-2xl transition-all group',
              locale === 'es' ? 'border-jjk-purple shadow-lg shadow-jjk-purple/10' : 'border-jjk-border hover:border-jjk-purple/50'
            ]"
          >
            <div class="flex items-center gap-4">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center transition-colors', locale === 'es' ? 'bg-jjk-purple text-white' : 'bg-jjk-purple/10 text-jjk-purple']">
                <Globe class="w-5 h-5" />
              </div>
              <div class="text-left">
                <p class="text-white font-bold">{{ t('settings.spanish') }}</p>
                <p class="text-xs text-jjk-muted">Español (Latinoamérica)</p>
              </div>
            </div>
            <Check v-if="locale === 'es'" class="w-5 h-5 text-jjk-purple" />
          </button>

          <button 
            @click="setLanguage('en')"
            :class="[
              'flex items-center justify-between p-6 bg-jjk-card border rounded-2xl transition-all group',
              locale === 'en' ? 'border-jjk-purple shadow-lg shadow-jjk-purple/10' : 'border-jjk-border hover:border-jjk-purple/50'
            ]"
          >
            <div class="flex items-center gap-4">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center transition-colors', locale === 'en' ? 'bg-jjk-purple text-white' : 'bg-jjk-purple/10 text-jjk-purple']">
                <Globe class="w-5 h-5" />
              </div>
              <div class="text-left">
                <p class="text-white font-bold">{{ t('settings.english') }}</p>
                <p class="text-xs text-jjk-muted">English (United States)</p>
              </div>
            </div>
            <Check v-if="locale === 'en'" class="w-5 h-5 text-jjk-purple" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
