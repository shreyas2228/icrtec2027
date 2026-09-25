import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Handshake, CheckCircle2, Mail } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Sponsors.css';

export default function Sponsors() {
  const { sponsors, conference } = conferenceData;

  return (
    <section id="sponsors" className="section section-light sponsors-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">COLLABORATION & ALLIANCES</span>
          <h2 className="section-title">Sponsors & Academic Partners</h2>
          <p className="section-desc">
            Organized in technical co-sponsorship and collaboration with leading IEEE entities, academic universities, and research institutions.
          </p>
        </div>

        {/* Sponsor Categories */}
        <div className="sponsors-categories-container">
          {sponsors.map((categoryGroup, index) => (
            <div key={index} className="sponsor-category-block">
              <div className="category-header">
                <span className="category-line"></span>
                <h3 className="category-title">{categoryGroup.category}</h3>
                <span className="category-line"></span>
              </div>

              <div className="sponsor-partners-row">
                {categoryGroup.partners.map((partner, pIdx) => (
                  <motion.a
                    key={pIdx}
                    href={partner.link}
                    target={partner.link !== '#' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="partner-card"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: pIdx * 0.1 }}
                  >
                    <div className="partner-logo-box">
                      <Handshake size={24} className="partner-icon" />
                    </div>
                    <div className="partner-info">
                      <h4 className="partner-name">{partner.name}</h4>
                      <span className="partner-role">{partner.type}</span>
                    </div>
                    {partner.link !== '#' && (
                      <ExternalLink size={14} className="partner-ext-icon" />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call for Sponsorship Banner */}
        <div className="sponsor-cta-card">
          <div className="sponsor-cta-text">
            <h3 className="h3">Partner with {conference.acronym}</h3>
            <p>
              Elevate your corporate brand visibility among 600+ international researchers, faculty deans, graduate engineers, and technology leaders. Explore Platinum, Gold, and Silver sponsorship tiers.
            </p>
          </div>
          <div className="sponsor-cta-actions">
            <a href="#contact" className="btn btn-primary">
              <Mail size={16} /> Request Sponsorship Deck
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
