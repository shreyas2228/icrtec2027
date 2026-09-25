import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, GraduationCap, CheckCircle2, Star } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Awards.css';

const awardIcons = [Trophy, Award, GraduationCap];

export default function Awards() {
  const { awards, conference } = conferenceData;

  return (
    <section id="awards" className="section section-light awards-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">HONORS & RECOGNITION</span>
          <h2 className="section-title">Conference Research Awards</h2>
          <p className="section-desc">
            Celebrating outstanding academic contributions, scientific rigor, and transformative innovation presented at {conference.acronym}.
          </p>
        </div>

        {/* Awards Cards Grid with 3D Tilt */}
        <div className="awards-grid">
          {awards.map((award, index) => {
            const IconComponent = awardIcons[index % awardIcons.length];
            const isGrand = index === 0;

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="award-tilt-item"
              >
                <Tilt3D maxTilt={14} scale={1.03} className="award-card-tilt">
                  <div className={`award-card ${isGrand ? 'is-grand-award' : ''}`}>
                    {isGrand && (
                      <div className="grand-award-banner">
                        <Trophy size={13} />
                        <span>PREMIER HONOR</span>
                      </div>
                    )}

                    <div className="award-icon-box">
                      <IconComponent size={28} className="award-icon" />
                    </div>

                    <div className="award-content">
                      <h3 className="award-title">{award.title}</h3>
                      <p className="award-description">{award.description}</p>

                      <div className="award-eligibility-block">
                        <div className="eligibility-title">
                          <CheckCircle2 size={15} className="check-icon" />
                          <span>Eligibility Criteria:</span>
                        </div>
                        <p className="eligibility-text">{award.eligibility}</p>
                      </div>
                    </div>

                    <div className="award-footer">
                      <span className="award-citation-tag">
                        <Star size={13} /> Official IEEE Citation & Certificate
                      </span>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        {/* Evaluation Banner */}
        <div className="awards-evaluation-banner">
          <div className="evaluation-text">
            <strong>Evaluation Process:</strong> All presented papers are evaluated independently by technical session chairs, keynote evaluators, and the Award Selection Committee based on original contribution, experimental validation, and presentation clarity.
          </div>
        </div>
      </div>
    </section>
  );
}
