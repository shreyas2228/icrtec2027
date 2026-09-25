import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Countdown from './components/Countdown';
import About from './components/About';
import NIESection from './components/NIESection';
import Stats from './components/Stats';
import Speakers from './components/Speakers';
import Tracks from './components/Tracks';
import Publication from './components/Publication';
import Timeline from './components/Timeline';
import Awards from './components/Awards';
import Registration from './components/Registration';
import Committee from './components/Committee';
import Venue from './components/Venue';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* Global 3D Effects & Interactive Floating Elements */
import Background3D from './components/common/Background3D';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingFAB from './components/common/FloatingFAB';

import './App.css';

export default function App() {
  return (
    <div className="app-root">
      {/* Global 3D Ambient Particle Constellation Background */}
      <Background3D />

      {/* Global Smooth Scroll Reading Progress Indicator */}
      <ScrollProgress />

      {/* 1. Sticky Dark Navbar */}
      <Navbar />

      <main className="app-main-content">
        {/* 2. Hero Section (3D Interactive Constellation & Tilt) */}
        <Hero />

        {/* 3. Quick Action Cards (3D Tilt & Specular Glare) */}
        <QuickActions />

        {/* 4. Live Countdown Band (3D Beveled Flip Timer) */}
        <Countdown />

        {/* 5. About Conference (3D Tilt Cards) */}
        <About />

        {/* 6. About NIE Mysuru (Campus Profile & Accreditations) */}
        <NIESection />

        {/* 7. Key Statistics (3D Tilt Cards with Animated Number Counters) */}
        <Stats />

        {/* 8. Distinguished Speakers (3D Tilt & Perspective Modal) */}
        <Speakers />

        {/* 9. Technical Tracks & Subtopics (3D Tilt & Perspective Modal) */}
        <Tracks />

        {/* 10. Publication & IEEE Xplore (3D Isometric Document Visualization) */}
        <Publication />

        {/* 11. Important Dates & Milestone Timeline */}
        <Timeline />

        {/* 12. Research Awards & Recognition (3D Tilt Honors) */}
        <Awards />

        {/* 13. Registration Fees & Pricing Matrix (Currency Switcher) */}
        <Registration />

        {/* 14. Organizing Committee & Governance (Executive Showcase & 3D Directory) */}
        <Committee />

        {/* 15. Venue & Travel Guide to Mysuru (Google Maps & Transit) */}
        <Venue />

        {/* 16. Photo Gallery & Archives (3D Tilt & Perspective Lightbox) */}
        <Gallery />

        {/* 17. Sponsors & Academic Partners */}
        <Sponsors />

        {/* 18. Frequently Asked Questions (Animated Accordion) */}
        <FAQ />

        {/* 19. Contact Desk & Inquiry Form (Interactive Secretariat Desk) */}
        <Contact />
      </main>

      {/* 20. Footer (NIE & IEEE Branding, Portals, View Counter) */}
      <Footer />

      {/* Floating 3D Action Buttons (Quick Register & Back To Top) */}
      <FloatingFAB />
    </div>
  );
}
