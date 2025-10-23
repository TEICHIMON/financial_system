# RuPPs システム - プロジェクト概要

## 🎯 プロジェクトについて

このプロジェクトは、あなたの画像を参考に作成した **RuPPs（Ruito Position Profit and Loss）** 取引管理システムです。

## ✨ 実装された機能

### 🎨 デザイン
- ✅ 赤色をメインカラーにしたテーマ
- ✅ レスポンシブデザイン
- ✅ Tailwind CSS による洗練されたUI
- ✅ 日本語インターフェース

### 🔧 技術的な改善点
- ✅ **Tailwind CSS** を使用（純粋なユーティリティクラス）
- ✅ **BrowserRouter** を使用した React Router v6 の実装
- ✅ **API の完全な封装**（Axios + インターセプター）
- ✅ **再利用可能な共通コンポーネント**の作成

### 📦 共通コンポーネント

1. **Button** - 様々なバリエーション（primary, secondary, danger, success, outline, ghost）
2. **Input** - ラベル、エラー表示、バリデーション付き
3. **Select** - ドロップダウン選択
4. **Table** - ソート、ページネーション、行選択機能付き
5. **Pagination** - フル機能のページネーション
6. **Modal** - モーダルダイアログ
7. **DatePicker** - 日付選択
8. **FileUpload** - ファイルアップロード
9. **Loading** - ローディングインジケーター
10. **Card** - コンテナカード

### 📄 実装されたページ

1. **Dashboard（ダッシュボード）**
   - 統計情報の表示
   - クイックアクション
   - 最近のアクティビティ

2. **Transaction List（取引明細照会）**
   - 高度な検索フィルター
   - CSV エクスポート
   - ページネーション付きテーブル

3. **Approval List（承認照会）**
   - 承認/却下機能
   - 一括操作
   - モーダルによる確認

4. **Force Input（取引強制入力）**
   - CSV アップロード
   - 手動入力フォーム
   - バリデーション

5. **Reports（レポート）**
   - レポート生成
   - Excel出力
   - データ可視化

6. **Settings（設定）**
   - ユーザー情報管理
   - システム設定
   - 通知設定

7. **Login（ログイン）**
   - 認証機能
   - Protected Routes

## 🏗️ アーキテクチャ

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │  Pages   │  │  Router  │           │
│  └────┬─────┘  └────┬─────┘           │
│       │             │                  │
│  ┌────▼─────────────▼─────┐           │
│  │    Components           │           │
│  │  - Common               │           │
│  │  - Layout               │           │
│  └────┬────────────────────┘           │
│       │                                 │
│  ┌────▼────────┐  ┌──────────┐        │
│  │  API Layer  │  │  Utils   │        │
│  └────┬────────┘  └──────────┘        │
│       │                                 │
│  ┌────▼────────┐                       │
│  │  Mock Data  │                       │
│  └─────────────┘                       │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 データフロー

```
User Action
    ↓
Component Event Handler
    ↓
API Call (with Interceptors)
    ↓
Mock Data (MockJS)
    ↓
Response Processing
    ↓
State Update
    ↓
UI Re-render
```

## 🔐 認証フロー

```
Login Page
    ↓
Enter Credentials
    ↓
API Call (/auth/login)
    ↓
Receive Token
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
    ↓
Protected Routes Check Token
    ↓
Access Granted/Denied
```

## 📁 ファイル構成の詳細

### `/src/api/`
- **request.js**: Axios インスタンスの設定、インターセプター
- **transaction.js**: 取引関連のAPI
- **approval.js**: 承認関連のAPI
- **user.js**: ユーザー関連のAPI

### `/src/components/common/`
全ての再利用可能なUIコンポーネント

### `/src/components/layout/`
- **Header.jsx**: トップヘッダー
- **Sidebar.jsx**: サイドバーナビゲーション
- **Layout.jsx**: メインレイアウト

### `/src/pages/`
各ページのコンポーネント

### `/src/router/`
React Router の設定と Protected Routes

### `/src/mock/`
MockJS によるテストデータ生成

### `/src/utils/`
- **helpers.js**: 日付フォーマット、ファイルダウンロードなどのユーティリティ

## 🎨 スタイリング

### カラースキーム
- **Primary**: `#C53030` (Red)
- **Success**: `#059669` (Green)
- **Warning**: `#D97706` (Yellow)
- **Danger**: `#DC2626` (Red)
- **Gray Scale**: `#F9FAFB` ~ `#111827`

### Tailwind CSS クラスの使用例

```jsx
// ボタン
<button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
  クリック
</button>

// カード
<div className="bg-white rounded-lg shadow p-6">
  コンテンツ
</div>

// グリッドレイアウト
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* アイテム */}
</div>
```

## 🔌 API 統合

現在は MockJS を使用していますが、実際のバックエンドに接続する場合：

1. `src/api/request.js` の `baseURL` を変更
2. MockJS のインポートを削除（`src/App.jsx` から `./mock` を削除）
3. 環境変数を設定（`.env` ファイル）

```javascript
// vite.config.js または .env
VITE_API_BASE_URL=https://api.example.com
```

## 🧪 テストデータ

MockJS により以下のデータが自動生成されます：

- **取引データ**: 100件のランダムな取引
- **承認データ**: 50件の承認リクエスト
- **ユーザーデータ**: 3つのテストユーザー

## 🚀 次のステップ

### 推奨される機能追加
1. ユニットテスト（Jest + React Testing Library）
2. E2Eテスト（Playwright または Cypress）
3. 国際化（i18n）
4. ダークモード
5. エクスポート機能の強化（PDF、Excel）
6. リアルタイム通知（WebSocket）
7. チャート・グラフ（Recharts、Chart.js）
8. ファイルドラッグ＆ドロップ

### パフォーマンス最適化
- React.memo の使用
- useMemo / useCallback の最適化
- Code splitting（React.lazy）
- 画像の遅延読み込み
- Service Worker によるキャッシング

## 📚 学習リソース

- [React 公式ドキュメント](https://react.dev/)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/)
- [React Router ドキュメント](https://reactrouter.com/)
- [Vite ドキュメント](https://vitejs.dev/)

## 🎉 完成！

このプロジェクトは完全に動作する状態で、以下の特徴があります：

✅ モダンな技術スタック
✅ クリーンなコードアーキテクチャ
✅ 再利用可能なコンポーネント
✅ レスポンシブデザイン
✅ プロダクション対応

あなたのニーズに合わせてカスタマイズを楽しんでください！
