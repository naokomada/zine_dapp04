# zine_dapp04



npx hardhat ignition deploy ignition/modules/ZineNFT.ts --network base_sepolia



frontend

pnpm install
pnpm run dev


   1. スマートコントラクトのデプロイ:
       * contract ディレクトリで、あなたの秘密鍵などを設定した .env ファイルを作成してください。
       * pnpm --filter contract run deploy:base_sepolia コマンドを実行して、コントラクトを Base Sepolia にデプロイしてください。
   2. フロントエンドの設定:
       * デプロイしたコントラクトアドレスを frontend/src/lib/constants.ts に設定してください。
       * WalletConnect を利用する場合は、frontend/src/lib/wagmi.ts の projectId をご自身のものに置き換えてください。

  上記の設定が完了したら、frontend ディレクトリで pnpm run dev を実行すると、開発サーバーが起動します。