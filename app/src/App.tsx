import { useEffect, useMemo, useState } from 'react'
import type { ButtonConfig, Direction, FavoriteItem, Move, MoveLibraryData } from './types'
import { DEFAULT_MOVE_LIBRARY } from './types'
import {
  loadButtons,
  saveButtons,
  loadFavorites,
  saveFavorites,
  loadComboText,
  saveComboText,
  loadMoveLibrary,
  saveMoveLibrary,
} from './storage'
import DirectionPad from './components/DirectionPad'
import ButtonPad from './components/ButtonPad'
import FavoritesBar from './components/FavoritesBar'
import ButtonSettings from './components/ButtonSettings'
import MoveLibrary from './components/MoveLibrary'
import HelpModal from './components/HelpModal'


function App() {
  const [comboText, setComboText] = useState('')
  const [buttons, setButtons] = useState<ButtonConfig[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [moveLibrary, setMoveLibrary] = useState<MoveLibraryData>(DEFAULT_MOVE_LIBRARY)
  const [directionBuffer, setDirectionBuffer] = useState<Direction[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showMoveLibrary, setShowMoveLibrary] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [copied, setCopied] = useState(false)



  // 初期ロード（localStorageから復元）
  useEffect(() => {
    setComboText(loadComboText())
    setButtons(loadButtons())
    setFavorites(loadFavorites())
    setMoveLibrary(loadMoveLibrary())
  }, [])

  // 変更のたびに保存
  useEffect(() => {
    saveComboText(comboText)
  }, [comboText])

  useEffect(() => {
    if (buttons.length > 0) saveButtons(buttons)
  }, [buttons])

  useEffect(() => {
    if (favorites.length > 0) saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    saveMoveLibrary(moveLibrary)
  }, [moveLibrary])


  const bufferLabel = useMemo(() => directionBuffer.join(''), [directionBuffer])

  // テキスト末尾に区切り「＞」を付けつつ追記する共通処理
  const appendToCombo = (segment: string) => {
    setComboText((prev) => {
      if (!prev) return segment
      const trimmed = prev.replace(/\s*>\s*$/, '')
      return `${trimmed} > ${segment}`
    })
  }

  const handlePressDirection = (dir: Direction) => {
    setDirectionBuffer((prev) => [...prev, dir])
  }

  const handlePressButton = (btn: ButtonConfig) => {
    const directions = directionBuffer.length > 0 ? directionBuffer.join('') : '5'
    appendToCombo(`${directions}${btn.notation}`)
    setDirectionBuffer([])
  }

  const handleConfirmDirectionOnly = () => {
    if (directionBuffer.length === 0) return
    appendToCombo(directionBuffer.join(''))
    setDirectionBuffer([])
  }

  const handleClearBuffer = () => {
    setDirectionBuffer([])
  }

  const handlePressFavorite = (fav: FavoriteItem) => {
    appendToCombo(fav.notation)
  }

  const handlePressMove = (move: Move) => {
    appendToCombo(move.notation)
  }


  const handleAddFavorite = (label: string, notation: string) => {
    setFavorites((prev) => [
      ...prev,
      { id: `fav_${Date.now()}`, label, notation },
    ])
  }

  const handleDeleteFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const handleChangeButton = (
    id: string,
    patch: Partial<Pick<ButtonConfig, 'label' | 'notation'>>,
  ) => {
    setButtons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(comboText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // クリップボードAPIが使えない環境向けフォールバック
      const textarea = document.createElement('textarea')
      textarea.value = comboText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleClearAll = () => {
    setComboText('')
    setDirectionBuffer([])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-6 px-3">
      <header className="w-full max-w-2xl mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Combolith</h1>
          <p className="text-slate-400 text-sm">格闘ゲームコンボエディタ</p>
        </div>
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 shrink-0"
        >
          ？ このアプリについて
        </button>

      </header>


      <main className="w-full max-w-2xl flex flex-col gap-5">
        {/* テキストボックス */}
        <section>
          <textarea
            value={comboText}
            onChange={(e) => setComboText(e.target.value)}
            rows={4}
            placeholder="ここにコンボが表示されます。直接編集も可能です。"
            className="w-full resize-y rounded-lg bg-slate-900 border border-slate-700 p-3 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-sm font-medium"
            >
              {copied ? 'コピーしました！' : 'コピー'}
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-sm"
            >
              全消去
            </button>
          </div>
        </section>

        {/* コントローラー型入力部 */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-300">コントローラー入力</h2>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              ボタン設定
            </button>
          </div>

          <div className="flex flex-wrap gap-6 items-start justify-center">
            <DirectionPad
              bufferedDirections={directionBuffer}
              onPressDirection={handlePressDirection}
            />
            <ButtonPad buttons={buttons} onPressButton={handlePressButton} />
          </div>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-xs text-slate-400">
              入力中: {bufferLabel || '(なし)'}
            </span>
            <button
              type="button"
              onClick={handleConfirmDirectionOnly}
              disabled={directionBuffer.length === 0}
              className="text-xs px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white"
            >
              方向のみ確定
            </button>
            <button
              type="button"
              onClick={handleClearBuffer}
              disabled={directionBuffer.length === 0}
              className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200"
            >
              入力取消
            </button>
          </div>
        </section>

        {/* お気に入り(システム入力) */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <FavoritesBar
            favorites={favorites}
            onPressFavorite={handlePressFavorite}
            onAddFavorite={handleAddFavorite}
            onDeleteFavorite={handleDeleteFavorite}
          />
        </section>

        {/* 必殺技ライブラリ(折りたたみ可能) */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <button
            type="button"
            onClick={() => setShowMoveLibrary((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-sm font-semibold text-slate-300">必殺技</span>
            <span className="text-xs text-slate-400">
              {showMoveLibrary ? '閉じる ▲' : '開く ▼'}
            </span>
          </button>
          {showMoveLibrary && (
            <div className="mt-2">
              <MoveLibrary
                data={moveLibrary}
                onChange={setMoveLibrary}
                onPressMove={handlePressMove}
              />
            </div>
          )}

        </section>
      </main>



      {showSettings && (
        <ButtonSettings
          buttons={buttons}
          onChangeButton={handleChangeButton}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}


      <footer className="text-xs text-slate-600 mt-8">
        データはこのブラウザ内にのみ保存されます（ログイン不要）
      </footer>
    </div>
  )
}

export default App
