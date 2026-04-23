import { ref, watch, onMounted } from 'vue'

export function useFavorites() {
  const favorites = ref([])

  // Load from localStorage
  const loadFavorites = () => {
    const saved = localStorage.getItem('jjk_favorites')
    if (saved) {
      try {
        favorites.value = JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing favorites', e)
        favorites.value = []
      }
    }
  }

  // Save to localStorage
  const saveFavorites = () => {
    localStorage.setItem('jjk_favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (id) => {
    return favorites.value.some(f => f.id === id)
  }

  const toggleFavorite = (item) => {
    const index = favorites.value.findIndex(f => f.id === item.id)
    if (index === -1) {
      // Add simple object to favorites to avoid storing complex reactive objects
      favorites.value.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image_url: item.image_url,
        type: item.type || 'character' // could be technique, domain etc.
      })
    } else {
      favorites.value.splice(index, 1)
    }
    saveFavorites()
  }

  onMounted(loadFavorites)

  return {
    favorites,
    isFavorite,
    toggleFavorite
  }
}
