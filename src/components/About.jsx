import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users2, BookOpenCheck, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './About.css';

const iconMap = {
  Lightbulb: Lightbulb,
  Users2: Users2,
  BookOpenCheck: BookOpenCheck,
  Building2: Building2
};

export default function About() {
  const { conference, aboutConference } = conferenceData;

  return (
    <section id="about" className="section section-light about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">ABOUT THE CONFERENCE</span>
          <h2 className="section-title">Advancing Global Research & Sustainable Innovation</h2>
          <p className="section-desc">
            Organized by The National Institute of Engineering (NIE), Mysuru in technical co-sponsorship with IEEE ComSoC and IEEE CAS, Bangalore Section.
          </p>
        </div>

        {/* Split Overview Layout */}
        <div className="about-overview-grid">
          {/* Left: Narrative Overview */}
          <div className="about-narrative-card">
            <h3 className="h3 narrative-heading">
              {conference.name} ({conference.acronym})
            </h3>
            <p className="narrative-paragraph">
              {aboutConference.overview}
            </p>
            <p className="narrative-paragraph">
              {aboutConference.scope}
            </p>
            {aboutConference.reviewPolicy && (
              <p className="narrative-paragraph">
                {aboutConference.reviewPolicy}
              </p>
            )}

            <div className="about-highlights-list">
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Single-blind peer review with IEEE CrossCheck screening</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>All presented papers submitted for possible inclusion in IEEE Xplore</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Keynote addresses by IEEE Fellows and global research directors</span>
              </div>
            </div>
          </div>

          {/* Right: IEEE Standards & Compliance Callout */}
          <Tilt3D maxTilt={10} scale={1.02} className="about-ieee-tilt">
            <div className="about-ieee-box">
              <div className="ieee-box-header">
                <div className="ieee-icon-circle">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <span className="ieee-box-tag">IEEE QUALITY ASSURANCE</span>
                  <h4 className="ieee-box-title">Academic & Technical Rigor</h4>
                </div>
              </div>
              <p className="ieee-box-text">
                {conference.acronym} adheres strictly to the publication ethics, review rigor, and formatting standards mandated by the IEEE. Every accepted paper is subjected to multi-reviewer technical scrutiny.
              </p>
              <div className="ieee-feature-tags">
                <span className="f-tag">Single-Blind Review</span>
                <span className="f-tag">CrossCheck Verified</span>
                <span className="f-tag">IEEE Xplore Scope</span>
                <span className="f-tag">Best Paper Awards</span>
              </div>
              <div className="ieee-cta-wrap">
                <a href="#tracks" className="btn btn-secondary" style={{ width: '100%' }}>
                  Explore Research Tracks
                </a>
              </div>
            </div>
          </Tilt3D>
        </div>

        {/* Why Attend Grid with 3D Tilt Cards */}
        <div className="why-attend-block">
          <h3 className="why-attend-heading">Why Attend {conference.acronym}?</h3>
          <div className="why-attend-grid">
            {aboutConference.whyAttend.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Lightbulb;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="why-tilt-item"
                >
                  <Tilt3D maxTilt={15} scale={1.04} className="why-card-tilt">
                    <div className="why-card card">
                      <div className="why-icon-box">
                        <IconComp size={24} />
                      </div>
                      <h4 className="why-card-title">{item.title}</h4>
                      <p className="why-card-desc">{item.desc}</p>
                    </div>
                  </Tilt3D>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
