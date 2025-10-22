# 金融取引管理システム (Financial Trading Management System)

## プロジェクト概要

このプロジェクトは、日本の金融取引を管理するための最新のWebアプリケーションです。旧来のモノリシックなJSPベースのシステムから、モダンな前後端分離アーキテクチャへの移行を実現します。

## 技術スタック

### フロントエンド
- **React 19.x** - UIライブラリ
- **Vite 6.x** - ビルドツール
- **Redux Toolkit** - 状態管理
- **React Router DOM** - ルーティング
- **Ant Design** - UIコンポーネントライブラリ
- **Tailwind CSS 4.x** - ユーティリティファーストCSSフレームワーク
- **Axios** - HTTPクライアント
- **Mock.js** - モックデータ生成
- **Day.js** - 日付処理

## プロジェクト構造

```
src/
├── app/                          # アプリケーションコア
│   ├── store/                    # Redux store
│   ├── router/                   # ルーター設定
│   ├── api/                      # API設定
│   └── App.jsx                   # メインアプリコンポーネント
│
├── pages/                        # ページコンポーネント（高内聚設計）
│   ├── Login/                    # ログインページ
│   ├── Home/                     # ホームページ
│   ├── TransactionManagement/    # 取引管理
│   │   ├── TransactionDetail/    # 取引明細照会
│   │   ├── ForceInput/           # 強制入力
│   │   └── ForceInputHistory/    # 強制入力履歴
│   ├── BalanceManagement/        # 残高損益管理
│   ├── MarketValueManagement/    # 時価管理
│   └── ApprovalManagement/       # 承認管理
│
├── shared/                       # 共有リソース
│   ├── components/               # 共通コンポーネント
│   ├── hooks/                    # カスタムフック
│   ├── utils/                    # ユーティリティ関数
│   └── constants/                # 定数
│
├── assets/                       # 静的リソース
├── styles/                       # グローバルスタイル
└── main.jsx                      # エントリーポイント
```

## アーキテクチャの特徴

### 高内聚コンポーネント設計
各ページは自己完結型のモジュールとして設計されています：

```
TransactionDetail/
├── index.jsx           # ページエントリー
├── components/         # ページ専用コンポーネント
├── hooks/             # ページ専用フック
├── store/             # ページ専用状態管理
├── api.js             # API定義
├── mock.js            # モックデータ
├── constants.js       # 定数
└── index.css          # スタイル
```

### UI/データ分離
- **ページコンポーネント**: UIの組み立てのみ担当
- **カスタムフック**: ビジネスロジックとデータ処理
- **Redux Slice**: グローバル状態管理
- **API層**: バックエンド通信

## セットアップ

### 前提条件
- Node.js 22.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 主な機能

### 1. 認証システム
- ログイン/ログアウト
- JWT トークン管理
- 保護されたルート

**デモ用ログイン情報:**
- ユーザー名: 任意
- パスワード: `123456`

### 2. 取引管理
#### 取引明細照会
- 高度な検索フィルター（取引番号、顧客、日付範囲など）
- ページネーション付きデータテーブル
- 詳細情報モーダル
- CSV エクスポート機能

#### Rupps取引強制入力
- CSV ファイルアップロード
- リアルタイムファイル検証
- エラー表示
- 承認者選択

#### 強制入力履歴照会
- 履歴データの検索と表示

### 3. その他の機能
- 残高損益管理
- 時価管理
- 承認管理

## Mock.js の使用

開発環境では、Mock.js を使用してバックエンド API をシミュレートします：

```javascript
// 自動的に初期化される
import './app/api/mock';

// カスタムモックの追加
Mock.mock(/\/api\/your-endpoint/, 'post', {
  code: 200,
  data: { /* your data */ }
});
```

## 開発ガイドライン

### 新しいページの追加

1. **ページディレクトリの作成**
```bash
mkdir -p src/pages/NewPage/{components,hooks,store}
```

2. **必要なファイルの作成**
- `index.jsx` - ページコンポーネント
- `api.js` - API 定義
- `mock.js` - モックデータ
- `constants.js` - 定数
- `store/newPageSlice.js` - Redux slice (必要な場合)

3. **ルートの追加**
```javascript
// src/app/router/index.jsx
{
  path: '/new-page',
  element: <NewPage />,
}
```

### コーディング規約

- **コンポーネント**: PascalCase (例: `UserProfile.jsx`)
- **関数/変数**: camelCase (例: `handleSubmit`)
- **定数**: UPPER_SNAKE_CASE (例: `MAX_FILE_SIZE`)
- **ファイル名**: kebab-case または PascalCase

### 状態管理のルール

1. **ローカル状態**: コンポーネント内で完結する状態は `useState`
2. **共有状態**: 複数コンポーネントで使用する状態は Redux
3. **非同期処理**: `createAsyncThunk` を使用

## ビルドとデプロイ

```bash
# 本番ビルド
npm run build

# dist/ フォルダの内容をデプロイ
```

## トラブルシューティング

### 問題: モックデータが動作しない
- `src/app/api/mock.js` がインポートされているか確認
- ブラウザのコンソールで Mock.js の初期化ログを確認

### 問題: ルーティングエラー
- HashRouter を使用しているため、URL は `#/path` 形式
- ブラウザをリフレッシュして再試行

### 問題: スタイルが適用されない
- `src/styles/global.css` がインポートされているか確認
- Tailwind CSS の設定を確認

## 今後の開発計画

- [ ] TypeScript への移行
- [ ] 単体テストの追加（Jest + React Testing Library）
- [ ] E2E テストの追加（Playwright）
- [ ] パフォーマンス最適化
- [ ] アクセシビリティの向上
- [ ] 国際化（i18n）対応
- [ ] PWA対応

## ライセンス

このプロジェクトは社内用です。

## 連絡先

プロジェクトに関する質問や提案は、開発チームまでお問い合わせください。
