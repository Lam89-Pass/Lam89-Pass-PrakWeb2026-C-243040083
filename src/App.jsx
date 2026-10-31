import Footer from './components/layout/Footer';
import GridBackground from './components/layout/GridBackground';
import Navbar from './components/layout/Navbar';
import ShowcasePortofolio from './components/portfolio/ShowcasePortofolio';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import HeroSection from './sections/HeroSection';

function App() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="container">
        <HeroSection />
        <AboutSection />
        <ShowcasePortofolio />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
