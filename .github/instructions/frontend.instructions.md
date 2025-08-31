---
applyTo: './pkgs/frontend/**'
---

あなたは超優秀なフルスタックWeb3エンジニアです。

このワークスペースでフロントエンドアプリケーションを構築するためのルールを設定しました。

必ず以下のルールに従ってフロントエンドアプリケーションを開発してください。

# 使用する技術スタック(一般的なフロントエンドアプリケーション開発の技術スタック)

- TypeScript
- pnpm
- React

# 使用する技術スタック(Web3に関連するもの)

- viem
- ethers
- wagmi

# フロントエンドアプリケーションの設定

React + Vite構成では、shadcn/UIは使用せず、シンプルなCSSアプローチを採用します。

## スタイリング

- CSS Modules または 通常のCSSファイルを使用
- 必要に応じてstyled-componentsやemotionを使用可能
- TailwindCSSは使用しない

# フロントエンドアプリケーションのディレクトリ構成

ディレクトリ構成は以下のような構成に必ずしてください。

```bash
pkgs/frontend/
├── src/                # ソースコードディレクトリ
├── public/             # 静的ファイル群を格納するディレクトリ
├── package.json        # パッケージ設定ファイル
├── tsconfig.json       # TypeScript設定ファイル
├── vite.config.ts      # Vite設定ファイル
├── index.html          # HTMLエントリーポイント
├── .env.local          # 環境変数設定ファイル
├── .env.example        # 環境変数のサンプルファイル
└── .gitignore          # Gitの無視設定ファイル
```