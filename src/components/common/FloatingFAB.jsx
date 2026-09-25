import React, { useState, useEffect } from 'react';
import { ArrowUp, Ticket } from 'lucide-react';
import './FloatingFAB.css';

export default function FloatingFAB() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToRegistration = (e) => {
    e.preventDefault();
    const el = document.getElementById('registration');
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
    <aside className="floating-fab-container" aria-label="Quick Actions">
      {/* Quick Register CTA Button */}
      <a
        href="#registration"
        onClick={scrollToRegistration}
        className="fab-btn fab-register-btn"
        title="Register for ICRTEC 2027"
        aria-label="Register Now"
      >
        <span className="fab-pulse-ring"></span>
        <Ticket className="fab-icon" size={20} />
        <span className="fab-text">Register Now</span>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fab-btn fab-top-btn ${showBackToTop ? 'fab-visible' : 'fab-hidden'}`}
        title="Back to Top"
        aria-label="Back to Top"
      >
        <ArrowUp className="fab-icon" size={20} />
      </button>
    </aside>
  );
}
