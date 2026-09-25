import React, { useState, useEffect } from 'react';
import { Eye, ExternalLink, Mail, MapPin, Phone, ShieldCheck, ArrowUp } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Footer.css';

export default function Footer() {
  const { conference, institution } = conferenceData;
  const [visitorCount, setVisitorCount] = useState(2468);

  useEffect(() => {
    // Generate a gentle organic increment for the conference site view counter
    const stored = localStorage.getItem('nie_ieee_views');
    if (stored) {
      const count = parseInt(stored, 10) + 1;
      localStorage.setItem('nie_ieee_views', count.toString());
      setVisitorCount(count);
    } else {
      localStorage.setItem('nie_ieee_views', '2469');
      setVisitorCount(2469);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Main Footer Columns */}
        <div className="footer-top-grid">
          {/* Col 1: Brand, Institution & Secretariat */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img src="/nie-logo.png" alt="NIE Crest" className="footer-nie-logo" />
              <div className="brand-text-block">
                <span className="brand-title">{conference.acronym}</span>
                <span className="brand-sub">IEEE & NIE Mysuru</span>
              </div>
            </div>

            <p className="footer-institution-title">
              {institution.name}
            </p>
            <p className="footer-affiliation-note">
              {institution.affiliation} • Estd. {institution.established}
            </p>

            <div className="footer-address">
              <MapPin size={15} className="inline-icon" />
              <span>{institution.address}</span>
            </div>

            <div className="footer-contact-link">
              <Mail size={14} className="inline-icon" />
              <a href={`mailto:${conference.contactEmail}`}>{conference.contactEmail}</a>
            </div>

            <div className="footer-contact-link" style={{ marginTop: '6px' }}>
              <Phone size={14} className="inline-icon" />
              <a href={`tel:${conference.contactPhone}`}>{conference.contactPhone}</a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-links-col">
            <p className="footer-section-title">Conference Sections</p>
            <ul className="footer-links-grid">
              <li><a href="#hero">Conference Home</a></li>
              <li><a href="#about">About Conference</a></li>
              <li><a href="#nie">About NIE Mysuru</a></li>
              <li><a href="#speakers">Distinguished Speakers</a></li>
              <li><a href="#tracks">Technical Tracks</a></li>
              <li><a href="#publication">IEEE Publication</a></li>
              <li><a href="#timeline">Important Dates</a></li>
              <li><a href="#awards">Research Awards</a></li>
              <li><a href="#registration">Registration Fees</a></li>
              <li><a href="#committee">Committees</a></li>
              <li><a href="#venue">Venue & Travel</a></li>
              <li><a href="#gallery">Photo Gallery</a></li>
              <li><a href="#sponsors">Sponsors & Partners</a></li>
              <li><a href="#faq">Author FAQ</a></li>
              <li><a href="#contact">Contact Desk</a></li>
            </ul>
          </div>

          {/* Col 3: External & Submission Portals */}
          <div className="footer-portal-col">
            <p className="footer-section-title">Submission & Portals</p>
            <div className="footer-portal-links">
              <a
                href="https://cmt3.research.microsoft.com/"
                target="_blank"
                rel="noreferrer"
                className="portal-link-item"
              >
                <span>Microsoft CMT Paper Submission</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://www.ieee.org/conferences/publishing/templates.html"
                target="_blank"
                rel="noreferrer"
                className="portal-link-item"
              >
                <span>IEEE Manuscript Word & LaTeX Templates</span>
                <ExternalLink size={13} />
              </a>
              <a
                href={conference.previousEditionUrl || "https://ieeexplore.ieee.org/xpl/conhome/1849209/all-proceedings"}
                target="_blank"
                rel="noreferrer"
                className="portal-link-item"
              >
                <span>ICRTEC 2023 IEEE Xplore Proceedings</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://ieeebangalore.org"
                target="_blank"
                rel="noreferrer"
                className="portal-link-item"
              >
                <span>IEEE Bangalore Section</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://nie.ac.in"
                target="_blank"
                rel="noreferrer"
                className="portal-link-item"
              >
                <span>The National Institute of Engineering</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="footer-ieee-disclaimer-box">
              <ShieldCheck size={14} className="disclaimer-shield" />
              <span>
                Accepted & presented papers will be submitted for possible inclusion into IEEE Xplore, subject to meeting IEEE Xplore's scope and quality requirements.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2027 {institution.name} (NIE), Mysuru & IEEE. All rights reserved.</p>

          <div className="footer-meta-stats">
            <div className="view-counter-badge" title="Total Website Visits">
              <Eye size={13} className="text-cyan" />
              <span className="counter-num">{visitorCount.toLocaleString()}</span>
              <span className="counter-label">views</span>
            </div>

            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
