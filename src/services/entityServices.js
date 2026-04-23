import { supabase } from './supabase'
import updatesData from '../data/updates.json'

export const techniqueService = {
  async getAll() {
    const { data, error } = await supabase
      .from('techniques')
      .select('*, characters(name, slug)')
    if (error) throw error
    return data
  },
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('techniques')
      .select('*, characters(*)')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  }
}

export const domainService = {
  async getAll() {
    const { data, error } = await supabase
      .from('domains')
      .select('*, characters(name, slug)')
    if (error) throw error
    return data
  },
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('domains')
      .select('*, characters(*)')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  }
}

export const clanService = {
  async getAll() {
    const { data, error } = await supabase.from('clans').select('*')
    if (error) throw error
    return data
  },
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('clans')
      .select('*, characters(*)')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  }
}

export const changelogService = {
  async getAll() {
    // Retornamos los datos locales ordenados por fecha
    return [...updatesData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },
  async getLatest() {
    if (!updatesData.length) return null
    // Retornamos el más reciente
    const sorted = [...updatesData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    return sorted[0]
  }
}
