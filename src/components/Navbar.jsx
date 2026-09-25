import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { institution, conference } = conferenceData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['home', 'about', 'nie', 'speakers', 'tracks', 'publication', 'timeline', 'registration', 'committee', 'venue', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Left: Dual Branding (IEEE & NIE) */}
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="navbar-brand-group">
          <div className="brand-logo-circle ieee-circle">
            <span className="logo-text">IEEE</span>
          </div>
          <div className="brand-separator"></div>
          <div className="brand-logo-circle nie-circle">
            <img src="/nie-logo.png" alt="NIE Logo" className="brand-nie-logo" />
          </div>
          <div className="brand-details">
            <span className="brand-inst-name">{institution.name}</span>
            <span className="brand-conf-acronym">{conference.acronym}</span>
          </div>
        </a>

        {/* Center / Right: Desktop Navigation */}
        <nav className="navbar-nav-desktop" aria-label="Main Navigation">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a
            href="#tracks"
            onClick={(e) => scrollToSection(e, 'tracks')}
            className={`nav-link ${activeSection === 'tracks' ? 'active' : ''}`}
          >
            Tracks
          </a>
          <a
            href="#speakers"
            onClick={(e) => scrollToSection(e, 'speakers')}
            className={`nav-link ${activeSection === 'speakers' ? 'active' : ''}`}
          >
            Speakers
          </a>
          <a
            href="#timeline"
            onClick={(e) => scrollToSection(e, 'timeline')}
            className={`nav-link ${activeSection === 'timeline' ? 'active' : ''}`}
          >
            Dates
          </a>
          <a
            href="#committee"
            onClick={(e) => scrollToSection(e, 'committee')}
            className={`nav-link ${activeSection === 'committee' ? 'active' : ''}`}
          >
            Committee
          </a>
          <a
            href="#venue"
            onClick={(e) => scrollToSection(e, 'venue')}
            className={`nav-link ${activeSection === 'venue' ? 'active' : ''}`}
          >
            Venue
          </a>
          <a
            href="#gallery"
            onClick={(e) => scrollToSection(e, 'gallery')}
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
          <a
            href={conference.previousEditionUrl || "https://ieeexplore.ieee.org/xpl/conhome/1849209/all-proceedings"}
            target="_blank"
            rel="noreferrer"
            className="nav-link nav-link-external"
            title="ICRTEC 2023 Proceedings on IEEE Xplore"
          >
            ICRTEC 2023 <ArrowUpRight size={12} className="nav-external-icon" />
          </a>
        </nav>

        {/* Right: Register Now Action */}
        <div className="navbar-action-group">
          <a
            href="#registration"
            onClick={(e) => scrollToSection(e, 'registration')}
            className="btn btn-accent btn-nav-cta"
          >
            <span>Register Now</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-links">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="mobile-nav-item">
                Home
              </a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="mobile-nav-item">
                About Conference
              </a>
              <a href="#nie" onClick={(e) => scrollToSection(e, 'nie')} className="mobile-nav-item">
                About NIE
              </a>
              <a href="#tracks" onClick={(e) => scrollToSection(e, 'tracks')} className="mobile-nav-item">
                Conference Tracks
              </a>
              <a href="#speakers" onClick={(e) => scrollToSection(e, 'speakers')} className="mobile-nav-item">
                Distinguished Speakers
              </a>
              <a href="#publication" onClick={(e) => scrollToSection(e, 'publication')} className="mobile-nav-item">
                IEEE Publication
              </a>
              <a href="#timeline" onClick={(e) => scrollToSection(e, 'timeline')} className="mobile-nav-item">
                Important Dates
              </a>
              <a href="#registration" onClick={(e) => scrollToSection(e, 'registration')} className="mobile-nav-item">
                Registration Fees
              </a>
              <a href="#committee" onClick={(e) => scrollToSection(e, 'committee')} className="mobile-nav-item">
                Committee
              </a>
              <a href="#venue" onClick={(e) => scrollToSection(e, 'venue')} className="mobile-nav-item">
                Venue & Location
              </a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="mobile-nav-item">
                Moments & Gallery
              </a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="mobile-nav-item">
                Contact Secretariat
              </a>
              <a 
                href={conference.previousEditionUrl || "https://ieeexplore.ieee.org/xpl/conhome/1849209/all-proceedings"} 
                target="_blank" 
                rel="noreferrer" 
                className="mobile-nav-item mobile-external-item"
              >
                ICRTEC 2023 (IEEE Xplore) <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="mobile-nav-footer">
              <a
                href="#registration"
                onClick={(e) => scrollToSection(e, 'registration')}
                className="btn btn-accent"
                style={{ width: '100%' }}
              >
                Register Now <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
