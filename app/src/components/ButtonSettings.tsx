import type { ButtonConfig } from '../types'

interface ButtonSettingsProps {
  buttons: ButtonConfig[]
  onChangeButton: (id: string, patch: Partial<Pick<ButtonConfig, 'label' | 'notation'>>) => void
  onClose: () => void
}

function ButtonSettings({ buttons, onChangeButton, onClose }: ButtonSettingsProps) {
  const row1 = buttons.slice(0, 4)
  const row2 = buttons.slice(4, 8)

  const renderCard = (btn: ButtonConfig) => (
    <div
      key={btn.id}
      className="bg-slate-800 border border-slate-600 rounded-xl p-3 flex flex-col gap-2"
    >
      <div className="flex items-center justify-center">
        <span className="w-12 h-12 rounded-full bg-rose-700 border-2 border-rose-400 text-white font-bold flex items-center justify-center text-sm">
          {btn.label || '?'}
        </span>
      </div>
      <div>
        <label className="block text-[10px] text-slate-400 mb-0.5">
          表示名（ボタンの見た目）
        </label>
        <input
          value={btn.label}
          onChange={(e) => onChangeButton(btn.id, { label: e.target.value })}
          placeholder="例: LP"
          className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm"
        />
      </div>
      <div>
        <label className="block text-[10px] text-slate-400 mb-0.5">
          コンボ表記（挿入される文字）
        </label>
        <input
          value={btn.notation}
          onChange={(e) => onChangeButton(btn.id, { notation: e.target.value })}
          placeholder="例: LP"
          className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-100 text-sm"
        />
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-slate-100">ボタン設定</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
          >
            閉じる
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          実際のボタン配置と同じ並びです。「表示名」はボタンに表示される文字、「コンボ表記」はコンボ欄に挿入される文字列です（通常は同じで問題ありません）。
        </p>

        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-4 gap-2">{row1.map(renderCard)}</div>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-2">{row2.map(renderCard)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonSettings
