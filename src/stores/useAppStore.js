import { defineStore } from 'pinia'
import { characterService } from '../services/characterService'

export const useAppStore = defineStore('app', {
  state: () => ({
    popularCharacters: [],
    loadingPopular: false
  }),

  actions: {
    async fetchPopular() {
      this.loadingPopular = true
      try {
        this.popularCharacters = await characterService.getPopular()
      } catch (err) {
        console.error('Error fetching popular:', err)
      } finally {
        this.loadingPopular = false
      }
    }
  }
})
