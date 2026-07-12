import { useState } from 'react'
import type { FavoriteItem } from '../types'

interface FavoritesBarProps {
  favorites: FavoriteItem[]
  onPressFavorite: (favorite: FavoriteItem) => void
  onAddFavorite: (label: string, notation: string) => void
  onDeleteFavorite: (id: string) => void
}

function FavoritesBar({
  favorites,
  onPressFavorite,
  onAddFavorite,
  onDeleteFavorite,
}: FavoritesBarProps) {
  const [editing, setEditing] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newNotation, setNewNotation] = useState('')

  const handleAdd = () => {
    const label = newLabel.trim()
    const notation = newNotation.trim()
    if (!label || !notation) return
    onAddFavorite(label, notation)
    setNewLabel('')
    setNewNotation('')
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-300">システム入力</h2>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
        >
          {editing ? '完了' : '編集'}
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-2">
        ディレイ / キャンセル / ラッシュなど、共通システム操作をワンタップ入力できます（編集して上手に使ってね）
      </p>



      <div className="flex flex-wrap gap-2">
        {favorites.map((fav) => (
          <div key={fav.id} className="relative">
            <button
              type="button"
              onClick={() => onPressFavorite(fav)}
              className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-500 text-white text-sm font-medium"
            >
              {fav.label}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => onDeleteFavorite(fav.id)}
                aria-label={`${fav.label}を削除`}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs leading-5 text-center"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-3 flex flex-wrap gap-2 items-center bg-slate-800/60 p-3 rounded-lg border border-slate-700">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="ラベル (例: ディレイ)"
            className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm w-32"
          />
          <input
            value={newNotation}
            onChange={(e) => setNewNotation(e.target.value)}
            placeholder="挿入文字列 (例: [delay])"
            className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm w-40"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1 rounded bg-sky-700 hover:bg-sky-600 text-white text-sm"
          >
            追加
          </button>
        </div>
      )}
    </div>
  )
}

export default FavoritesBar
