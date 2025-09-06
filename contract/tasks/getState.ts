import { task } from 'hardhat/config';

task("getState", "本の所有票の状態を確認するタスク")
  .addParam("tokenid", "取得したいNFTのtokenid")
  .setAction(async (taskArgs) => {
    // 実行時に渡される引数をtokenIdとして使用します
    const tokenId = taskArgs.tokenid;

    // 1. デプロイ済みコントラクトのアドレス
    const contractAddress: `0x${string}` = "0x573e526c0Ce89c1361b81020F1aE916aCfa4f2Ae"; // <-- 取得したいコントラクトのアドレス

    // 2. コントラクト名 (型: string)
    const contractName: string = "ZineNFT";

    console.log(`Getting state from ${contractName} at ${contractAddress} ...`);

    // 3. viemを使ってコントラクトのインスタンスを取得
    const zineContract = await viem.getContractAt(contractName, contractAddress);

    // 4. コントラクトの読み取り専用関数を呼び出す
    //    .read プロパティ経由で呼び出します
    const res: string = await zineContract.read.getBookTitle([tokenId]);

    // 5. 結果を表示
    console.log(`✅ Current value is: ${res.toString()}`);
});
