import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Globe, Award, Building2, BookOpen, ArrowRight, Mic, Calendar } from 'lucide-react';
import './Speakers.css';

export default function Speakers() {
  const upcomingCategories = [
    {
      id: 'cat-intl',
      icon: Globe,
      role: 'International Keynotes',
      tag: 'Global Academia & Institutes',
      desc: 'Distinguished scholars and IEEE Fellows from premier global universities sharing breakthrough computing paradigms.',
      status: 'Coming Up',
      gradient: 'linear-gradient(135deg, rgba(0, 180, 216, 0.12), rgba(0, 98, 155, 0.05))'
    },
    {
      id: 'cat-dl',
      icon: Award,
      role: 'IEEE Distinguished Lecturers',
      tag: 'IEEE Technical Societies',
      desc: 'Globally appointed IEEE lecturers delivering plenary lectures on 6G, intelligent systems, and VLSI advances.',
      status: 'Coming Up',
      gradient: 'linear-gradient(135deg, rgba(224, 169, 109, 0.12), rgba(0, 98, 155, 0.05))'
    },
    {
      id: 'cat-ind',
      icon: Building2,
      role: 'Industry Pioneers',
      tag: 'R&D Leaders & Tech Executives',
      desc: 'Industry chief scientists and research heads delivering practical roadmaps on AI hardware and sustainable tech.',
      status: 'Coming Up',
      gradient: 'linear-gradient(135deg, rgba(0, 180, 216, 0.12), rgba(16, 185, 129, 0.05))'
    },
    {
      id: 'cat-nat',
      icon: BookOpen,
      role: 'National Academia Fellows',
      tag: 'IISc, IITs & National Labs',
      desc: 'Leading faculty and research chairs spearheading national deep-tech missions and cyber-physical systems.',
      status: 'Coming Up',
      gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.12), rgba(0, 98, 155, 0.05))'
    }
  ];

  return (
    <section id="speakers" className="section section-light speakers-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">KEYNOTE SPEAKERS</span>
          <h2 className="section-title">Distinguished Academic & Industry Speakers</h2>
          <p className="section-desc">
            An esteemed lineup of global keynote researchers, IEEE Fellows, and industry leaders will be announced soon.
          </p>
        </div>

        {/* Central Coming Up Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="speakers-coming-up-card"
        >
          <div className="coming-up-glow-effect"></div>

          <div className="coming-up-header-row">
            <div className="coming-up-badge">
              <span className="pulsing-beacon"></span>
              <Sparkles size={14} className="beacon-icon" />
              <span>Coming Up</span>
            </div>
            <div className="coming-up-sub-badge">
              <Clock size={13} />
              <span>Speaker Lineup Under Finalization</span>
            </div>
          </div>

          <div className="coming-up-headline-box">
            <div className="mic-icon-circle">
              <Mic size={32} />
            </div>
            <div className="coming-up-headline-text">
              <h3 className="coming-up-title">Keynote Speakers Lineup — Coming Up</h3>
              <p className="coming-up-desc">
                We are actively finalizing invitations for world-renowned keynote speakers, IEEE Distinguished Lecturers, and industry innovators for <strong>ICRTEC 2027</strong>. Complete profiles, session titles, and keynote schedules will be published shortly.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="coming-up-categories-grid">
            {upcomingCategories.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="coming-up-cat-card"
                  style={{ background: item.gradient }}
                >
                  <div className="cat-card-header">
                    <div className="cat-icon-wrap">
                      <IconComponent size={20} />
                    </div>
                    <span className="cat-status-pill">{item.status}</span>
                  </div>
                  <h4 className="cat-role">{item.role}</h4>
                  <span className="cat-tag">{item.tag}</span>
                  <p className="cat-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Action / Notification Footer */}
          <div className="coming-up-footer">
            <div className="coming-up-footer-info">
              <Calendar size={18} className="footer-info-icon" />
              <div className="footer-info-text">
                <strong>Call for Papers is actively open</strong>
                <span>Submit your manuscript for IEEE Xplore publication or contact the secretariat with session inquiries.</span>
              </div>
            </div>
            <div className="coming-up-footer-actions">
              <a href="#publication" className="btn btn-secondary btn-sm">
                <span>Call For Papers</span>
                <ArrowRight size={14} />
              </a>
              <a href="#contact" className="btn btn-outline btn-sm">
                <span>Contact Secretariat</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
