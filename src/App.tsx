import Header from './sections/Header';
import Hero from './sections/Hero';
import Testimonials from './sections/Testimonials';
import ProjectShowcase from './sections/ProjectShowcase';
import Intro from './sections/Intro';
import GlobalReach from './sections/GlobalReach';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

export default function App() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Testimonials />
      <ProjectShowcase />
      <Intro />
      <GlobalReach />
      <CTA />
      <Footer />
    </main>
  );
}
