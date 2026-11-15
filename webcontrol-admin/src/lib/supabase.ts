import { createBrowserClient, type SupabaseClient } from '@supabase/ssr'


export function createClient(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(url, key, {
    global: {
      fetch(options: RequestInfo, init: RequestInit) {
        return window.fetch(options, init)
      }
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: window.localStorage
    }
  })
}

export type SupabaseSelectable = {
  id: string
  name: string
  slug: string
  description: string | null
  url: string
  enabled: boolean
  updated_at: string
}