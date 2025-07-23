📅 My Calendar App（仮完成版）
大学生の生活に寄り添う、シンプルで機能的なカレンダーWebアプリです。予定の管理だけでなく、将来的には日記・収支・食事記録の機能も備える予定です。

🚀 特徴（現状の実装）
月表示のカレンダー（予定の追加・表示・削除が可能）

カレンダー下部の 固定メニュー（カレンダー・設定）

メニューの「＋」ボタンから「日記」「収支」「食事」を追加可能（選択肢は動的に減る）

ダークモード切替対応（設定画面）

テーマカラー変更対応（背景カラー変更）

ローディング画面でファビコンが回転（1周アニメーション）

シンプルで軽量なUI（Tailwind CSS使用）

✨ 今後追加予定の機能
週表示／日表示のカレンダー表示

各メニュー（日記・収支・食事）の実装

予定の編集機能

ローカルストレージへのデータ保存

スマホ・PCでの完全レスポンシブ対応

🛠 使用技術
技術	用途
React	フロントエンドフレームワーク
Tailwind CSS	UIスタイリング
Vite	高速ビルドツール
Git + GitHub	バージョン管理・公開

🧑‍💻 使用方法
bash
コピーする
# 1. リポジトリをクローン
git clone https://github.com/csno25810/my-app-2025.git
cd my-app-2025

# 2. 必要なパッケージをインストール
npm install

# 3. アプリを起動
npm run dev
ブラウザで http://localhost:5173 にアクセスしてください。

📁 ディレクトリ構成（抜粋）
arduino
コピーする
my-app-2025/
├── public/
│   └── favicon.png
├── src/
│   ├── App.js
│   ├── index.js
│   ├── pages/
│   │   └── CalendarView.js
│   ├── components/
│   │   └── LoadingScreen.js
│   └── ...
├── tailwind.config.js
└── README.md
🎨 テーマカラー参考（ファビコンブルー）
#5AC8FA （Tailwindでは bg-sky-200 相当）

🔖 ライセンス
MIT

