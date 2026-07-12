interface HelpModalProps {
  onClose: () => void
}

function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-100">使い方・データ保存について</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
          >
            閉じる
          </button>
        </div>

        <div className="space-y-5 text-sm text-slate-300 leading-relaxed">
          <section>
            <h3 className="text-slate-100 font-semibold mb-1">基本の使い方</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                レバー（テンキー配置の9方向）をタップすると入力が「バッファ」に貯まります。
                続けてボタンを押すと「方向＋ボタン」の形でコンボ欄に追記されます。
              </li>
              <li>
                方向だけを確定したい場合は「方向のみ確定」ボタンを使います。「入力取消」で今貯めている入力をリセットできます。
              </li>
              <li>コンボ欄（テキストボックス）は直接キーボードで編集することもできます。</li>
              <li>「コピー」ボタンでコンボ全文をクリップボードにコピーできます。</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-100 font-semibold mb-1">システム入力</h3>
            <p>
              ディレイ / キャンセル / ラッシュなど、ゲーム共通のシステム操作をワンタップで入力できる欄です。

              「編集」から自由に追加・削除できます。
            </p>
          </section>

          <section>
            <h3 className="text-slate-100 font-semibold mb-1">必殺技ライブラリ</h3>
            <p>
              「ゲーム → キャラクター → 技」の階層で必殺技コマンドを登録しておける機能です。
              一度登録しておけば、次回以降はワンタップでコンボ欄に技コマンドを挿入できます。
              「編集」からゲーム・キャラ・技をそれぞれ追加・削除できます。
            </p>
          </section>

          <section>
            <h3 className="text-slate-100 font-semibold mb-1">ボタン設定</h3>
            <p>
              コントローラーの8ボタンについて、「表示名（ボタンの見た目）」と「コンボ表記（コンボ欄に挿入される文字）」を自由にカスタマイズできます。
            </p>
          </section>

          <section className="border-t border-slate-700 pt-4">
            <h3 className="text-slate-100 font-semibold mb-1">データの保存について（重要）</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                このアプリにはログイン機能がなく、サーバーには一切データを送信しません。
                すべてのデータは<strong>今お使いのブラウザの中（localStorage）</strong>にのみ保存されます。
              </li>
              <li>
                そのため、<strong>他の端末やブラウザを開いても、同じデータは表示されません。</strong>
                （例: スマホで入力した内容はPCのブラウザには表示されません）
              </li>
              <li>
                ブラウザの設定で「閲覧履歴・Cookie・サイトデータを削除」を行うと、保存されている内容もすべて消えてしまいます。
              </li>
              <li>
                シークレットウィンドウ（プライベートブラウジング）で使用した場合、ウィンドウを閉じるとデータは保存されません。
              </li>
              <li>
                現時点では他端末へのデータ移行機能（エクスポート/インポート）はありません。
                他の端末でも同じコンボを使いたい場合は、「コピー」ボタンでコピーしたテキストを手動で貼り付けてご利用ください。
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
