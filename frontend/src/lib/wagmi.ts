import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Zine DApp',
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  chains: [baseSepolia],
  ssr: false, // Next.js を使わない場合は false
});