import type { Bookmark, Settings } from './types'

type Config = { supabaseUrl?: string; supabasePublishableKey?: string }
const config = (window as Window & { LAUNCHPAD_CONFIG?: Config }).LAUNCHPAD_CONFIG ?? {}
export const SUPABASE_URL = config.supabaseUrl ?? ''
export const SUPABASE_KEY = config.supabasePublishableKey ?? ''

type RestInit = Omit<RequestInit,'body'> & { body?: unknown; returnRows?: boolean }
export async function sb<T>(path:string, init:RestInit = {}):Promise<T>{
  if(!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Supabase configuration is missing.')
  const headers = new Headers(init.headers)
  headers.set('apikey',SUPABASE_KEY); headers.set('Content-Type','application/json'); headers.set('Accept','application/json')
  if(init.returnRows) headers.set('Prefer','return=representation')
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{...init,headers,body:init.body === undefined ? undefined : JSON.stringify(init.body)})
  const text = await response.text(); let data:unknown = null
  if(text.trim()){ try{data=JSON.parse(text)}catch{data={raw:text}} }
  if(!response.ok){ const e = data as Record<string,string>|null; throw new Error(e?.message || e?.error || e?.hint || e?.raw || `Supabase HTTP ${response.status}`) }
  return data as T
}

export async function fetchRemote(){
  const bookmarks = await sb<Bookmark[]>('bookmarks?select=*&order=position.asc')
  const settingsRows = await sb<Settings[]>('settings?select=*&order=created_at.asc&limit=1')
  return {bookmarks: Array.isArray(bookmarks)?bookmarks:[], settings: settingsRows?.[0]}
}
