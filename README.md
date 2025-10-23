# RuPPs System - Ruito Position Profit and Loss

取引管理システム（RuPPs）は、取引の明細照会、承認管理、強制入力、レポート生成などの機能を提供するWebアプリケーションです。

## 🚀 技術スタック

- **React 18** - UIライブラリ
- **React Router v6** - ルーティング
- **Tailwind CSS** - スタイリング
- **Vite** - ビルドツール
- **Axios** - HTTPクライアント
- **MockJS** - モックデータ生成

## 📋 機能

### 1. ダッシュボード
- システムの概要表示
- 統計情報の可視化
- クイックアクション

### 2. 取引明細照会
- 取引データの検索・フィルタリング
- CSV エクスポート
- ページネーション付きテーブル表示

### 3. 承認照会
- 承認待ちリクエストの管理
- 承認/却下操作
- 一括操作対応

### 4. 取引強制入力
- CSVファイルアップロード
- 手動入力フォーム
- バリデーション機能

### 5. レポート
- 各種レポート生成
- Excel出力
- カスタムフィルタリング

### 6. 設定
- ユーザー情報管理
- システム設定
- 通知設定

## 🛠️ セットアップ

### 必要要件
- Node.js 16.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

## 🔐 ログイン情報（デモ）

- **ユーザー名**: admin
- **パスワード**: admin

## 📁 プロジェクト構造

```
rupps-system/
├── src/
│   ├── api/              # API呼び出し
│   │   ├── request.js    # Axios設定
│   │   ├── transaction.js
│   │   ├── approval.js
│   │   └── user.js
│   ├── components/       # コンポーネント
│   │   ├── common/       # 共通コンポーネント
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Card.jsx
│   │   └── layout/       # レイアウトコンポーネント
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       └── Layout.jsx
│   ├── pages/            # ページコンポーネント
│   │   ├── Dashboard.jsx
│   │   ├── TransactionList.jsx
│   │   ├── ApprovalList.jsx
│   │   ├── ForceInput.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── router/           # ルーティング設定
│   │   └── index.jsx
│   ├── mock/             # モックデータ
│   │   └── index.js
│   ├── utils/            # ユーティリティ関数
│   │   └── helpers.js
│   ├── styles/           # スタイル
│   │   └── index.css
│   ├── App.jsx          # アプリケーションルート
│   └── main.jsx         # エントリーポイント
├── public/              # 静的ファイル
├── index.html           # HTML テンプレート
├── package.json         # 依存関係
├── vite.config.js       # Vite 設定
├── tailwind.config.js   # Tailwind CSS 設定
└── postcss.config.js    # PostCSS 設定
```

## 🎨 デザインシステム

### カラーパレット
- **Primary**: Red (#C53030) - メインアクション、強調
- **Success**: Green - 成功状態、承認
- **Warning**: Yellow - 警告、申請中
- **Danger**: Red - エラー、却下
- **Gray**: グレースケール - テキスト、背景

### コンポーネント
全てのコンポーネントは Tailwind CSS を使用してスタイリングされています。

## 🔧 APIエンドポイント（モック）

現在、MockJS を使用してフロントエンドのみで動作します。以下のAPIがモック化されています：

- `GET /rupps/transactions` - 取引一覧取得
- `POST /rupps/transactions/upload` - CSV アップロード
- `POST /rupps/transactions/force-input` - 強制入力
- `GET /rupps/approvals` - 承認一覧取得
- `POST /rupps/approvals/:id/approve` - 承認
- `POST /rupps/approvals/:id/reject` - 却下
- `POST /auth/login` - ログイン
- `GET /auth/user` - ユーザー情報取得

## 📝 開発ガイドライン

### コーディング規約
- コンポーネントはPascalCaseで命名
- ファイル名は拡張子に .jsx を使用
- Tailwind CSSのユーティリティクラスを使用
- コメントは日本語で記述

### コンポーネントの作成
```jsx
import React from 'react';
import { Button } from '../components/common';

const MyComponent = () => {
  return (
    <div className="p-4">
      <Button onClick={() => console.log('clicked')}>
        クリック
      </Button>
    </div>
  );
};

export default MyComponent;
```

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📄 ライセンス

MIT License

## 📞 サポート

問題が発生した場合は、GitHubのissueセクションで報告してください。
