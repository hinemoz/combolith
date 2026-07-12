import type { ButtonConfig, FavoriteItem, MoveLibraryData } from './types'
import { DEFAULT_BUTTONS, DEFAULT_FAVORITES, DEFAULT_MOVE_LIBRARY } from './types'

const BUTTONS_KEY = 'combolith.buttons.v1'
const FAVORITES_KEY = 'combolith.favorites.v1'
const COMBO_TEXT_KEY = 'combolith.comboText.v1'
const MOVE_LIBRARY_KEY = 'combolith.moveLibrary.v1'


function safeParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback
  try {
    const parsed = JSON.parse(json)
    return parsed as T
  } catch {
    return fallback
  }
}

export function loadButtons(): ButtonConfig[] {
  return safeParse<ButtonConfig[]>(localStorage.getItem(BUTTONS_KEY), DEFAULT_BUTTONS)
}

export function saveButtons(buttons: ButtonConfig[]): void {
  localStorage.setItem(BUTTONS_KEY, JSON.stringify(buttons))
}

export function loadFavorites(): FavoriteItem[] {
  return safeParse<FavoriteItem[]>(localStorage.getItem(FAVORITES_KEY), DEFAULT_FAVORITES)
}

export function saveFavorites(favorites: FavoriteItem[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function loadComboText(): string {
  return localStorage.getItem(COMBO_TEXT_KEY) ?? ''
}

export function saveComboText(text: string): void {
  localStorage.setItem(COMBO_TEXT_KEY, text)
}

export function loadMoveLibrary(): MoveLibraryData {
  return safeParse<MoveLibraryData>(localStorage.getItem(MOVE_LIBRARY_KEY), DEFAULT_MOVE_LIBRARY)
}

export function saveMoveLibrary(data: MoveLibraryData): void {
  localStorage.setItem(MOVE_LIBRARY_KEY, JSON.stringify(data))
}


