import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useZineNFT } from '../hooks/useZineNFT';
import { useWaitForTransactionReceipt } from 'wagmi';

export const ZineMinter = () => {
  const { isConnected } = useAccount();
  const [bookTitle, setBookTitle] = useState('');
  const { mintNFT, isPending, error, hash } = useZineNFT();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    if (!bookTitle) return;
    await mintNFT(bookTitle);
  };

  return (
    <div>
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Enter book title"
        style={{ marginRight: '1rem', padding: '0.5rem' }}
        disabled={isPending || isConfirming}
      />
      <button
        onClick={handleMint}
        disabled={!isConnected || !bookTitle || isPending || isConfirming}
      >
        {isPending ? 'Minting...' : isConfirming ? 'Waiting for confirmation...' : 'Register Ownership'}
      </button>
      
      {!isConnected && <p style={{ color: 'red' }}>Please connect your wallet to mint.</p>}
      
      {hash && <div>Transaction Hash: {hash}</div>}
      
      {isConfirming && <div>Waiting for confirmation...</div>}
      
      {isConfirmed && <div>Transaction confirmed!</div>}
      
      {error && (
        <div>
          <p style={{ color: 'red' }}>Error: {error.shortMessage || error.message}</p>
        </div>
      )}
    </div>
  );
};