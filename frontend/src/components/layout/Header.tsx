import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  return (
    <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Zine DApp</h1>
      <ConnectButton />
    </header>
  );
};
