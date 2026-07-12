import type { ButtonConfig } from '../types'

interface ButtonPadProps {
  buttons: ButtonConfig[]
  onPressButton: (button: ButtonConfig) => void
}

function ButtonPad({ buttons, onPressButton }: ButtonPadProps) {
  // 格闘ゲームの標準配置(LP MP HP PP / LK MK HK KK)に合わせて並べ替え
  const row1 = buttons.slice(0, 4)
  const row2 = buttons.slice(4, 8)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {row1.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => onPressButton(btn)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full font-bold text-sm sm:text-base bg-rose-700 hover:bg-rose-600 active:bg-rose-500 border-2 border-rose-400 text-white transition-colors shadow-md flex items-center justify-center"
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {row2.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => onPressButton(btn)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full font-bold text-sm sm:text-base bg-rose-700 hover:bg-rose-600 active:bg-rose-500 border-2 border-rose-400 text-white transition-colors shadow-md flex items-center justify-center"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}


export default ButtonPad
