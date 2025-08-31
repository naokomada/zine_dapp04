import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Zine DApp',
  projectId: 'c1b6f2d75232e6534f623a9913535911', // TODO: WalletConnect Cloud から取得した Project ID に置き換えてください
  chains: [baseSepolia],
  ssr: false, // Next.js を使わない場合は false
});