import { Header } from '../components/layout/Header';
import { ZineMinter } from '../components/ZineMinter';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>Register Your Book</h2>
        <ZineMinter />
      </main>
    </div>
  );
};

export default HomePage;