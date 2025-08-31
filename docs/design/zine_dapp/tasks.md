# zine dapp 実装タスクリスト

## 概要

このタスクリストは、「zine dapp」を段階的に実装するためのコーディングタスクです。`requirements.md`と`design.md`に基づき、スマートコントラクトとフロントエンドの開発を順番に進めます。

## 実装タスク

### フェーズ1: プロジェクト基盤とスマートコントラクト

- [x] 1. **プロジェクト基盤セットアップ**
  - `pnpm` を使ったモノレポ（ワークスペース）環境の確認。
  - `contract` に Hardhat プロジェクトがセットアップされていることを確認。
  - `frontend` に Vite + React + TypeScript プロジェクトをセットアップ。

- [x] 2. **スマートコントラクト開発 (ZineNFT)**
  - `contract/contracts/ZineNFT.sol` を実装。
    - ERC-721を継承。
    - `tokenId`と書名をマッピングする変数 `mapping(uint256 => string) private _bookTitles;` を定義。
    - `mint(string memory bookTitle)` 関数を実装（`to` は `msg.sender` を内部で指定）。
      - ミント後、引数の `bookTitle` を `_bookTitles` マッピングに保存する。
    - `tokenId`を引数に取り、書名を返す `getBookTitle(uint256 tokenId) external view returns (string memory)` 関数を実装。
    - `tokenURI` 関数をオーバーライドし、**固定のメタデータURLを返すように実装。

- [ ] 3. **スマートコントラクトのテストとデプロイ**
  - `contract/test/ZineNFT.test.ts` で `mint` 関数のユニットテストを作成。
  - Hardhatスクリプトを作成し、`ZineNFT.sol` を Base Sepolia にデプロイ。
  - デプロイしたコントラクトアドレスを控えておく。

### フェーズ2: フロントエンド開発

- [ ] 4. **Web3設定とプロバイダー実装**
  - `frontend` で `wagmi`, `viem` をインストール。
  - `src/lib/wagmi.ts` を作成し、Base Sepoliaネットワークと各種ウォレット（MetaMask, etc.）を設定したWagmiプロバイダーを構成。
  - `App.tsx` をWagmiプロバイダーでラップする。

- [ ] 5. **基本UIコンポーネント実装**
  - `src/components/layout/Header.tsx` を作成。
    - ウォレット接続・切断・アドレス表示機能を持つボタンを実装する。（RainbowKitやConnectKitの利用も検討）
  - `src/pages/HomePage.tsx` を作成し、`Header`コンポーネントを配置。

- [ ] 6. **NFTミンターコンポーネント実装**
  - `src/components/ZineMinter.tsx` を作成。
    - 書名を入力するためのテキストフィールドを設置。
    - 「所有権を登録する」ボタンを設置。ウォレットが未接続の場合は非活性化する。

- [ ] 7. **コントラクトインタラクション実装 (カスタムフック)**
  - `contract` から `ZineNFT.json` (ABI) を `frontend/src/lib/abi/` にコピー。
  - `frontend/src/lib/constants.ts` にデプロイしたコントラクトアドレスを定義。
  - `src/hooks/useZineNFT.ts` を作成。
    - `useWriteContract` を使って `mint` 関数を呼び出す `mintNFT(bookTitle: string)` 関数を実装。
    - ミント処理中のローディング状態 (`isPending`) やエラー (`error`) を返すようにする。

### フェーズ3: 統合と仕上げ

- [ ] 8. **コンポーネントの統合**
  - `HomePage.tsx` に `ZineMinter.tsx` を配置。
  - `ZineMinter.tsx` 内で `useZineNFT` フックを呼び出し、ボタンクリックで `mintNFT` が実行されるように接続。
  - ミント処理中や完了後、エラー発生時にユーザーにフィードバック（例: トースト通知、メッセージ表示）を行うUIを実装。

- [ ] 9. **フロントエンドテスト**
  - React Testing Library を使い、`ZineMinter.tsx` コンポーネントの基本的な動作をテスト。

- [ ] 10. **最終動作確認**
  - Base Sepolia上で、ウォレット接続から書名入力、NFT発行までの一連のフローが正常に完了することを確認。
  - ブロックエクスプローラーで、発行されたNFTと記録された書名を確認。