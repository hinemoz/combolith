import type { Direction } from '../types'

interface DirectionPadProps {
  bufferedDirections: Direction[]
  onPressDirection: (direction: Direction) => void
}

// テンキー配置(7 8 9 / 4 5 6 / 1 2 3)のレバー入力パッド
const PAD_LAYOUT: Direction[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3']

function DirectionPad({ bufferedDirections, onPressDirection }: DirectionPadProps) {
  return (
    <div className="inline-grid grid-cols-3 gap-1.5">
      {PAD_LAYOUT.map((dir) => {
        const isNeutral = dir === '5'
        const isActiveInBuffer = bufferedDirections.includes(dir)
        return (
          <button
            key={dir}
            type="button"
            onClick={() => onPressDirection(dir)}
            className={[
              'w-14 h-14 sm:w-16 sm:h-16 rounded-lg font-bold text-lg select-none',
              'flex items-center justify-center transition-colors',
              'border',
              isNeutral
                ? 'bg-slate-700 border-slate-500 text-slate-200'
                : 'bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700',
              isActiveInBuffer ? 'ring-2 ring-amber-400' : '',
            ].join(' ')}
            aria-label={isNeutral ? 'ニュートラル(5)' : `方向 ${dir}`}
          >
            {isNeutral ? '5' : dir}
          </button>
        )
      })}
    </div>
  )


}

export default DirectionPad
