<script setup>
const props = defineProps({
  text: String,
  type: {
    type: String,
    default: 'default' // 'purple', 'gold', 'red', 'blue', 'pink'
  }
})

const getClasses = () => {
  const base = 'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md'
  const themes = {
    gold: 'text-jjk-gold border-jjk-gold/30 bg-jjk-gold/10',
    purple: 'text-jjk-purple border-jjk-purple/30 bg-jjk-purple/10',
    red: 'text-jjk-red border-jjk-red/30 bg-jjk-red/10',
    blue: 'text-jjk-blue border-jjk-blue/30 bg-jjk-blue/10',
    pink: 'text-jjk-pink border-jjk-pink/30 bg-jjk-pink/10',
    default: 'text-jjk-muted border-jjk-border bg-jjk-surface'
  }
  return `${base} ${themes[props.type] || themes.default}`
}
</script>

<template>
  <span :class="getClasses()">
    {{ text }}
  </span>
</template>
