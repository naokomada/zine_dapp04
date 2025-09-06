// hardhatからviemクライアントを直接インポートします
import { viem } from "hardhat";

async function main(): Promise<void> {
  // 1. デプロイ済みコントラクトのアドレスとtokenId
  const contractAddress: `0x${string}` = "0x573e526c0Ce89c1361b81020F1aE916aCfa4f2Ae"; // <-- 取得したいコントラクトのアドレス
  const tokenId = 2;

  // 2. コントラクト名 (型: string)
  const contractName: string = "ZineNFT";

  console.log(`Getting state from ${contractName} at ${contractAddress} ...`);

  // 3. viemを使ってコントラクトのインスタンスを取得
  //    Hardhat-viemがABIから型を推論してくれます
  const zineContract = await viem.getContractAt(contractName, contractAddress);

  // 4. コントラクトの読み取り専用関数を呼び出す
  //    .read プロパティ経由で呼び出します
  //const res: string = await counterContract.read.name();
  const res: string = await zineContract.read.getBookTitle([tokenId]);

  // 5. 結果を表示
  console.log(`✅ Current value is: ${res.toString()}`);
}

// スクリプトの実行とエラーハンドリング
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });