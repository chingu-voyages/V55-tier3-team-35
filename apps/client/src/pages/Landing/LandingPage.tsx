import CTA from '@/components/landing/CTA';
import FAQ from '@/components/landing/FAQ';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Nav from '@/components/landing/Nav';

import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div
      className={`${styles.landingRoot} min-h-screen bg-[#0F0F0F] overflow-x-hidden`}
    >
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-radial from-white/5 to-transparent opacity-30 blur-3xl z-0" />
      <Nav />
      <Hero />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
