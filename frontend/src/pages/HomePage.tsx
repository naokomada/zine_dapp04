import { Header } from '../components/layout/Header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>Register Your Book</h2>
        {/* ZineMinter component will go here */}
      </main>
    </div>
  );
};

export default HomePage;
