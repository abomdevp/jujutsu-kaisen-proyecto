import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { characterService } from '../services/characterService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Inicio' }
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/characters/CharactersView.vue'),
      meta: { title: 'Personajes' }
    },
    {
      path: '/characters/:slug',
      name: 'character-detail',
      component: () => import('../views/characters/CharacterDetailView.vue'),
      meta: { title: 'Archivo de Personaje' }
    },
    {
      path: '/clans',
      name: 'clans',
      component: () => import('../views/clans/ClansView.vue'),
      meta: { title: 'Clanes' }
    },
    {
      path: '/clans/:slug',
      name: 'clan-detail',
      component: () => import('../views/clans/ClanDetailView.vue'),
      meta: { title: 'Archivo de Clan' }
    },
    {
      path: '/techniques',
      name: 'techniques',
      component: () => import('../views/techniques/TechniquesView.vue'),
      meta: { title: 'Técnicas' }
    },
    {
      path: '/techniques/:slug',
      name: 'technique-detail',
      component: () => import('../views/techniques/TechniqueDetailView.vue'),
      meta: { title: 'Archivo de Técnica' }
    },
    {
      path: '/domains',
      name: 'domains',
      component: () => import('../views/domains/DomainsView.vue'),
      meta: { title: 'Expansiones de Dominio' }
    },
    {
      path: '/domains/:slug',
      name: 'domain-detail',
      component: () => import('../views/domains/DomainDetailView.vue'),
      meta: { title: 'Archivo de Dominio' }
    },
    {
      path: '/arcs',
      name: 'arcs',
      component: () => import('../views/arcs/ArcsView.vue'),
      meta: { title: 'Arcos de Historia' }
    },
    {
      path: '/arcs/:slug',
      name: 'arc-detail',
      component: () => import('../views/arcs/ArcDetailView.vue'),
      meta: { title: 'Detalle de Arco' }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { title: 'Buscador Global' }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { title: 'Mis Favoritos' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { title: 'Configuración' }
    },
    {
      path: '/actualizaciones',
      name: 'updates',
      component: () => import('../views/UpdatesView.vue'),
      meta: { title: 'Actualizaciones' }
    },
    {
      path: '/soundtrack',
      name: 'soundtrack',
      component: () => import('../views/SoundtrackView.vue'),
      meta: { title: 'Banda Sonora' }
    }
  ]
})

router.afterEach((to) => {
  // Update Document Title
  const baseTitle = 'Jujutsu Archive'
  const pageTitle = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
  document.title = pageTitle

  // Analytics: Increment views if viewing a character
  if (to.name === 'character-detail' && to.params.slug) {
    characterService.incrementViews(to.params.slug)
  }
})

export default router
