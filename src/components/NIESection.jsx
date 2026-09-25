import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, GraduationCap, Award, Building, ExternalLink, ArrowRight } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './NIESection.css';

export default function NIESection() {
  const { institution } = conferenceData;

  return (
    <section id="nie" className="section section-subtle nie-section">
      <div className="container">
        <div className="nie-grid">
          {/* Left: Campus Graphic Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="nie-image-wrapper"
          >
            <div className="nie-campus-card">
              <img
                src="/nie-modern-campus-complex.png"
                alt="The National Institute of Engineering, Mysuru Campus - Heritage of Technical Excellence"
                className="nie-campus-img"
              />
              <div className="nie-img-overlay">
                <span className="nie-est-badge">ESTABLISHED 1946</span>
                <h4 className="nie-overlay-title">Heritage of Technical Excellence</h4>
                <p className="nie-overlay-sub">78+ Years of Academic Leadership in Karnataka</p>
              </div>
            </div>

            {/* Quick Stats Strip below image */}
            <div className="nie-stats-strip">
              <div className="nie-stat-tile">
                <GraduationCap size={20} className="nie-stat-icon" />
                <div>
                  <span className="stat-value">{institution.stats.alumni}</span>
                  <span className="stat-label">Global Alumni</span>
                </div>
              </div>
              <div className="nie-stat-tile">
                <Award size={20} className="nie-stat-icon" />
                <div>
                  <span className="stat-value">NAAC 'A'</span>
                  <span className="stat-label">Accredited & NBA</span>
                </div>
              </div>
              <div className="nie-stat-tile">
                <Landmark size={20} className="nie-stat-icon" />
                <div>
                  <span className="stat-value">14 Centers</span>
                  <span className="stat-label">Recognized R&D</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Institutional Profile */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="nie-content-col"
          >
            <div className="nie-header-crest-row">
              <img src="/nie-logo.png" alt="NIE Mysuru Crest" className="nie-content-logo" />
              <div className="nie-header-text">
                <span className="section-badge">HOST INSTITUTION</span>
                <h2 className="section-title">The National Institute of Engineering, Mysuru</h2>
              </div>
            </div>
            <p className="nie-affiliation-tag">
              {institution.affiliation} • {institution.approvedBy}
            </p>

            <p className="nie-narrative-text">
              {institution.history}
            </p>

            <p className="nie-narrative-text">
              Recognized as one of the premier self-financing engineering institutions in India, NIE offers comprehensive undergraduate, postgraduate, and doctoral research programs across core and computing engineering disciplines. NIE is known for state-of-the-art laboratory infrastructure, industry-supported R&D centers of excellence, and vibrant student-led research initiatives under the <strong>{institution.ieeeStudentBranch}</strong>.
            </p>

            <div className="nie-features-list">
              <div className="nie-feature-row">
                <div className="feature-bullet"></div>
                <span>Autonomous curriculum designed in collaboration with leading tech industries</span>
              </div>
              <div className="nie-feature-row">
                <div className="feature-bullet"></div>
                <span>Strategic research collaborations with leading universities across Europe and the USA</span>
              </div>
              <div className="nie-feature-row">
                <div className="feature-bullet"></div>
                <span>Sprawling green campuses in the royal heritage city of Mysuru</span>
              </div>
            </div>

            <div className="nie-cta-group">
              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <span>Explore NIE Official Portal</span>
                <ExternalLink size={16} />
              </a>
              <a href="#venue" className="btn btn-secondary">
                <span>View Campus Venue</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
