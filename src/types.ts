export type ThemeMode = 'dark' | 'light' | 'system'
export type ViewMode = 'grid' | 'row' | 'tile'
export type ScrollDirection = 'horizontal' | 'vertical'

export interface Bookmark {
  id?: string
  name: string
  url: string
  icon_url?: string
  emoji?: string
  position: number
  updated_at?: string
}

export interface ThemeSettings {
  mode: ThemeMode
  preset: string
  accent: string
  bg: string
  panel: string
  tile: string
  text: string
  border: string
  bgImage: string
  overlay: number
}

export interface GridSettings {
  rows: number
  cols: number
  iconSize: number
  tileSize: number
  gap: number
  radius: number
  showLabels: boolean
  rtl: boolean
  startCorner: string
  viewMode: ViewMode
  scrollDirection: ScrollDirection
  zoom: number
  reverseOrder: boolean
  font: string
  labelSize: number
  labelWeight: number
  textWrap: number
  scrollbar: 'auto' | 'thin' | 'none'
  centerTiles: boolean
}

export interface Settings { id?: string; theme: ThemeSettings; grid: GridSettings }
