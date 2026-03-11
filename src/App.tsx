import Header from './sections/Header';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import GlobalReach from './sections/GlobalReach';
import Work from './sections/Work';
import Services from './sections/Services';
import Approach from './sections/Approach';
import StudioJourney from './sections/StudioJourney';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

export default function App() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Intro />
      <GlobalReach />
      <Work />
      <Services />
      <Approach />
      <StudioJourney />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
