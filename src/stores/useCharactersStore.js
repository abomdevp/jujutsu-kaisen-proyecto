import { defineStore } from 'pinia'
import { characterService } from '../services/characterService'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    featuredCharacters: [],
    selectedCharacter: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCharacters() {
      this.loading = true
      try {
        this.characters = await characterService.getAll()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchFeatured() {
      try {
        this.featuredCharacters = await characterService.getFeatured()
      } catch (err) {
        console.error('Error fetching featured:', err)
      }
    },

    async fetchCharacterBySlug(slug) {
      this.loading = true
      try {
        this.selectedCharacter = await characterService.getBySlug(slug)
        return this.selectedCharacter
      } catch (err) {
        this.error = err.message
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
