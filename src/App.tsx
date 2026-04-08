import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Testimonials from './sections/Testimonials';
import ProjectShowcase from './sections/ProjectShowcase';
import Intro from './sections/Intro';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ProjectPage from './pages/ProjectPage';
import LoadingScreen from './components/LoadingScreen';

function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // Wait for the page to fully render before scrolling
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <Header />
      <Hero />
      <Testimonials />
      <ProjectShowcase />
      <Intro />
      <CTA />
      <Footer />
    </main>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/projects/:slug', element: <ProjectPage /> },
]);

export default function App() {
  return (
    <>
      <LoadingScreen />
      <RouterProvider router={router} />
      <SpeedInsights />
    </>
  );
}
