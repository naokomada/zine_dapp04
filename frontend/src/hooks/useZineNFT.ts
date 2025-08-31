import { useWriteContract } from 'wagmi';
import { zineNFTAbi } from '../lib/abi/zineNFTAbi';
import { ZINE_NFT_CONTRACT_ADDRESS } from '../lib/constants';

export const useZineNFT = () => {
  const { writeContract, isPending, error, data: hash } = useWriteContract();

  const mintNFT = async (bookTitle: string) => {
    return writeContract({
      address: ZINE_NFT_CONTRACT_ADDRESS,
      abi: zineNFTAbi,
      functionName: 'mint',
      args: [bookTitle],
    });
  };

  return {
    mintNFT,
    isPending,
    error,
    hash,
  };
};
