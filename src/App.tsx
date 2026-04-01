import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Testimonials from './sections/Testimonials';
import ProjectShowcase from './sections/ProjectShowcase';
import Intro from './sections/Intro';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ProjectPage from './pages/ProjectPage';

function Home() {
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
  return <RouterProvider router={router} />;
}
