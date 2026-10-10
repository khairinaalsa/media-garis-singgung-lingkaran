import { ProgressProvider } from './lib/progress';
import Header from './components/Header';
import Landing from './components/Landing';
import Misi from './components/Misi';
import Konsep from './components/Konsep';
import Simulator from './components/Simulator';
import Eksperimen from './components/Eksperimen';
import Soal from './components/Soal';
import Tantangan from './components/Tantangan';
import Evaluasi from './components/Evaluasi';
import Footer from './components/Footer';

export default function App() {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
        <div className="noise" aria-hidden="true" />
        <Header />
        <main>
          <Landing />
          <Misi />
          <Konsep />
          <Simulator />
          <Eksperimen />
          <Soal />
          <Tantangan />
          <Evaluasi />
        </main>
        <Footer />
      </div>
    </ProgressProvider>
  );
}
