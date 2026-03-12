import Header from './sections/Header';
import Hero from './sections/Hero';
import ProjectShowcase from './sections/ProjectShowcase';
import Testimonials from './sections/Testimonials';
import Intro from './sections/Intro';
import GlobalReach from './sections/GlobalReach';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

export default function App() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <ProjectShowcase />
      <Testimonials />
      <Intro />
      <GlobalReach />
      <CTA />
      <Footer />
    </main>
  );
}
