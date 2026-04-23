import { supabase } from './supabase'

export const characterService = {
  async getAll() {
    const { data, error } = await supabase
      .from('characters')
      .select(`
        *,
        clans (name, slug),
        domains (name, slug)
      `)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('characters')
      .select(`
        *,
        clans (*),
        domains (*),
        techniques (*),
        character_arcs (arcs (*))
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('is_featured', true)
      .limit(5)
    
    if (error) throw error
    return data
  },

  async getRelationships(characterId) {
    const { data, error } = await supabase
      .from('relationships')
      .select(`
        *,
        related_character:related_character_id (*)
      `)
      .eq('character_id', characterId)
    
    if (error) throw error
    return data
  },

  async incrementViews(slug) {
    const { error } = await supabase.rpc('increment_character_views', { character_slug: slug })
    if (error) console.error('Error incrementing views:', error)
  },

  async getPopular(limit = 5) {
    const { data, error } = await supabase
      .from('characters')
      .select('id, name, slug, image_url, grade, views_count')
      .order('views_count', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}
