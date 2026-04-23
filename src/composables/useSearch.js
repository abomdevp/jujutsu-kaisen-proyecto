import { ref, watch } from 'vue'
import { supabase } from '../services/supabase'

export function useSearch() {
  const searchQuery = ref('')
  const searchResults = ref({
    characters: [],
    techniques: [],
    domains: [],
    clans: []
  })
  const isSearching = ref(false)

  const performSearch = async (query) => {
    if (!query || query.length < 2) {
      searchResults.value = { characters: [], techniques: [], domains: [], clans: [] }
      return
    }

    isSearching.value = true
    try {
      // Parallel searches for better performance
      const [chars, techs, doms, clns] = await Promise.all([
        supabase.from('characters').select('id, name, slug, image_url, grade').ilike('name', `%${query}%`).limit(5),
        supabase.from('techniques').select('id, name, slug, type').ilike('name', `%${query}%`).limit(5),
        supabase.from('domains').select('id, name, slug').ilike('name', `%${query}%`).limit(5),
        supabase.from('clans').select('id, name, slug').ilike('name', `%${query}%`).limit(5)
      ])

      searchResults.value = {
        characters: chars.data || [],
        techniques: techs.data || [],
        domains: doms.data || [],
        clans: clns.data || []
      }
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      isSearching.value = false
    }
  }

  // Optional: Debounced search logic could be added here or in the component
  
  return {
    searchQuery,
    searchResults,
    isSearching,
    performSearch
  }
}
