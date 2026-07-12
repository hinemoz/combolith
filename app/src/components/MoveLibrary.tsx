import { useMemo, useState } from 'react'
import type { Character, Game, Move, MoveLibraryData } from '../types'

interface MoveLibraryProps {
  data: MoveLibraryData
  onChange: (updater: (prev: MoveLibraryData) => MoveLibraryData) => void
  onPressMove: (move: Move) => void
}

function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`
}

function MoveLibrary({ data, onChange, onPressMove }: MoveLibraryProps) {
  const [editing, setEditing] = useState(false)

  const [newGameName, setNewGameName] = useState('')
  const [newCharName, setNewCharName] = useState('')
  const [newMoveName, setNewMoveName] = useState('')
  const [newMoveNotation, setNewMoveNotation] = useState('')

  const selectedGameId = data.lastSelectedGameId ?? ''
  const selectedCharacterId = data.lastSelectedCharacterId ?? ''

  const charactersOfGame = useMemo(
    () => data.characters.filter((c) => c.gameId === selectedGameId),
    [data.characters, selectedGameId],
  )

  const movesOfCharacter = useMemo(
    () => data.moves.filter((m) => m.characterId === selectedCharacterId),
    [data.moves, selectedCharacterId],
  )

  const selectedGame = data.games.find((g) => g.id === selectedGameId)
  const selectedCharacter = data.characters.find((c) => c.id === selectedCharacterId)

  const handleSelectGame = (gameId: string) => {
    onChange((prev) => {
      const firstChar = prev.characters.find((c) => c.gameId === gameId)
      return {
        ...prev,
        lastSelectedGameId: gameId,
        lastSelectedCharacterId: firstChar?.id,
      }
    })
  }

  const handleSelectCharacter = (characterId: string) => {
    onChange((prev) => ({ ...prev, lastSelectedCharacterId: characterId }))
  }

  const handleAddGame = () => {
    const name = newGameName.trim()
    if (!name) return
    const newGame: Game = { id: makeId('game'), name }
    onChange((prev) => ({
      ...prev,
      games: [...prev.games, newGame],
      lastSelectedGameId: newGame.id,
      lastSelectedCharacterId: undefined,
    }))
    setNewGameName('')
  }

  const handleAddCharacter = () => {
    const name = newCharName.trim()
    if (!name || !selectedGameId) return
    const newChar: Character = { id: makeId('char'), gameId: selectedGameId, name }
    onChange((prev) => ({
      ...prev,
      characters: [...prev.characters, newChar],
      lastSelectedCharacterId: newChar.id,
    }))
    setNewCharName('')
  }

  const handleAddMove = () => {
    const name = newMoveName.trim()
    const notation = newMoveNotation.trim()
    if (!name || !notation || !selectedCharacterId) return
    const newMove: Move = { id: makeId('move'), characterId: selectedCharacterId, name, notation }
    onChange((prev) => ({ ...prev, moves: [...prev.moves, newMove] }))
    setNewMoveName('')
    setNewMoveNotation('')
  }

  const handleDeleteMove = (id: string) => {
    onChange((prev) => ({ ...prev, moves: prev.moves.filter((m) => m.id !== id) }))
  }

  const handleDeleteCharacter = (id: string) => {
    onChange((prev) => ({
      ...prev,
      characters: prev.characters.filter((c) => c.id !== id),
      moves: prev.moves.filter((m) => m.characterId !== id),
      lastSelectedCharacterId:
        prev.lastSelectedCharacterId === id ? undefined : prev.lastSelectedCharacterId,
    }))
  }

  const handleDeleteGame = (id: string) => {
    onChange((prev) => {
      const charIdsToRemove = prev.characters.filter((c) => c.gameId === id).map((c) => c.id)
      return {
        ...prev,
        games: prev.games.filter((g) => g.id !== id),
        characters: prev.characters.filter((c) => c.gameId !== id),
        moves: prev.moves.filter((m) => !charIdsToRemove.includes(m.characterId)),
        lastSelectedGameId: prev.lastSelectedGameId === id ? undefined : prev.lastSelectedGameId,
        lastSelectedCharacterId:
          prev.lastSelectedGameId === id ? undefined : prev.lastSelectedCharacterId,
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-500">
          ゲーム・キャラクターごとに技コマンドを登録して、ワンタップでコンボに挿入できます
        </p>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 shrink-0 ml-2"
        >
          {editing ? '完了' : '編集'}
        </button>
      </div>

      {/* ゲーム選択 */}

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label className="text-xs text-slate-400 w-16 shrink-0">ゲーム</label>
        <select
          value={selectedGameId}
          onChange={(e) => handleSelectGame(e.target.value)}
          className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-slate-100 text-sm flex-1 min-w-[8rem]"
        >
          <option value="">選択してください</option>
          {data.games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {editing && selectedGame && (
          <button
            type="button"
            onClick={() => handleDeleteGame(selectedGame.id)}
            className="text-xs px-2 py-1 rounded bg-red-700 hover:bg-red-600 text-white"
          >
            このゲームを削除
          </button>
        )}
      </div>

      {editing && (
        <div className="flex flex-wrap gap-2 mb-3 items-center bg-slate-800/60 p-2 rounded-lg border border-slate-700">
          <input
            value={newGameName}
            onChange={(e) => setNewGameName(e.target.value)}
            placeholder="新しいゲーム名"
            className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm flex-1 min-w-[8rem]"
          />
          <button
            type="button"
            onClick={handleAddGame}
            className="px-3 py-1 rounded bg-sky-700 hover:bg-sky-600 text-white text-sm"
          >
            ゲーム追加
          </button>
        </div>
      )}

      {/* キャラ選択 */}
      {selectedGameId && (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <label className="text-xs text-slate-400 w-16 shrink-0">キャラ</label>
            <select
              value={selectedCharacterId}
              onChange={(e) => handleSelectCharacter(e.target.value)}
              className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-slate-100 text-sm flex-1 min-w-[8rem]"
            >
              <option value="">選択してください</option>
              {charactersOfGame.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {editing && selectedCharacter && (
              <button
                type="button"
                onClick={() => handleDeleteCharacter(selectedCharacter.id)}
                className="text-xs px-2 py-1 rounded bg-red-700 hover:bg-red-600 text-white"
              >
                このキャラを削除
              </button>
            )}
          </div>

          {editing && (
            <div className="flex flex-wrap gap-2 mb-3 items-center bg-slate-800/60 p-2 rounded-lg border border-slate-700">
              <input
                value={newCharName}
                onChange={(e) => setNewCharName(e.target.value)}
                placeholder="新しいキャラ名"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm flex-1 min-w-[8rem]"
              />
              <button
                type="button"
                onClick={handleAddCharacter}
                className="px-3 py-1 rounded bg-sky-700 hover:bg-sky-600 text-white text-sm"
              >
                キャラ追加
              </button>
            </div>
          )}
        </>
      )}

      {/* 技一覧 */}
      {selectedCharacterId && (
        <>
          <div className="flex flex-wrap gap-2 mb-2">
            {movesOfCharacter.length === 0 && (
              <span className="text-xs text-slate-500">まだ技が登録されていません</span>
            )}
            {movesOfCharacter.map((move) => (
              <div key={move.id} className="relative">
                <button
                  type="button"
                  onClick={() => onPressMove(move)}
                  className="px-3 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 border border-indigo-500 text-white text-sm font-medium"
                  title={move.notation}
                >
                  {move.name}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMove(move.id)}
                    aria-label={`${move.name}を削除`}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs leading-5 text-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="flex flex-wrap gap-2 items-center bg-slate-800/60 p-3 rounded-lg border border-slate-700">
              <input
                value={newMoveName}
                onChange={(e) => setNewMoveName(e.target.value)}
                placeholder="技名 (例: 波動拳)"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm w-32"
              />
              <input
                value={newMoveNotation}
                onChange={(e) => setNewMoveNotation(e.target.value)}
                placeholder="コマンド (例: 236P)"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm w-32"
              />
              <button
                type="button"
                onClick={handleAddMove}
                className="px-3 py-1 rounded bg-sky-700 hover:bg-sky-600 text-white text-sm"
              >
                技を追加
              </button>
            </div>
          )}
        </>
      )}

      {!selectedGameId && (
        <p className="text-xs text-slate-500">
          「編集」からゲームを追加して始めてください
        </p>
      )}
    </div>
  )
}

export default MoveLibrary
