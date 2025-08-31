import { useState } from 'react';
import { useAccount } from 'wagmi';

export const ZineMinter = () => {
  const { isConnected } = useAccount();
  const [bookTitle, setBookTitle] = useState('');

  const handleMint = () => {
    // TODO: Implement minting logic
    alert(`Minting NFT for: ${bookTitle}`);
  };

  return (
    <div>
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Enter book title"
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleMint} disabled={!isConnected || !bookTitle}>
        Register Ownership
      </button>
      {!isConnected && <p style={{ color: 'red' }}>Please connect your wallet to mint.</p>}
    </div>
  );
};
