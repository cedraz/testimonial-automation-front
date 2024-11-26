import { Header } from '@/components/home/header';
import { Hero } from '@/components/home/hero';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <Hero />
    </div>
  );
}
