// レバー方向（テンキー表記）。5はニュートラル
export type Direction = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

// ボタン設定（ユーザーが自由に編集可能）
export interface ButtonConfig {
  id: string // 内部識別子（変更不可）
  label: string // 表示ラベル（編集可能）
  notation: string // コンボ表記に使われる文字列（編集可能） 例: "P", "K"
}

// お気に入り（ワンタップ入力できる文字列登録）
export interface FavoriteItem {
  id: string
  label: string // ボタンに表示するラベル 例: "ディレイ"
  notation: string // 挿入する文字列 例: "[delay]"
}

export const DIRECTIONS: Direction[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3']

export const DEFAULT_BUTTONS: ButtonConfig[] = [
  { id: 'btn1', label: 'LP', notation: 'LP' },
  { id: 'btn2', label: 'MP', notation: 'MP' },
  { id: 'btn3', label: 'HP', notation: 'HP' },
  { id: 'btn4', label: 'PP', notation: 'PP' },
  { id: 'btn5', label: 'LK', notation: 'LK' },
  { id: 'btn6', label: 'MK', notation: 'MK' },
  { id: 'btn7', label: 'HK', notation: 'HK' },
  { id: 'btn8', label: 'KK', notation: 'KK' },
]


export const DEFAULT_FAVORITES: FavoriteItem[] = [
  { id: 'fav1', label: 'ディレイ', notation: '[delay]' },
  { id: 'fav2', label: 'キャンセル', notation: '[cancel]' },
  { id: 'fav3', label: 'ラッシュ', notation: '[rush]' },
]

// 必殺技ライブラリ: ゲーム > キャラクター > 技 の階層構造
export interface Move {
  id: string
  characterId: string
  name: string // 表示名 例: "波動拳"
  notation: string // コンボ表記に挿入する文字列 例: "236P"
}

export interface Character {
  id: string
  gameId: string
  name: string // 例: "リュウ"
}

export interface Game {
  id: string
  name: string // 例: "ストリートファイター6"
}

export interface MoveLibraryData {
  games: Game[]
  characters: Character[]
  moves: Move[]
  lastSelectedGameId?: string
  lastSelectedCharacterId?: string
}

export const DEFAULT_MOVE_LIBRARY: MoveLibraryData = {
  games: [],
  characters: [],
  moves: [],
}


