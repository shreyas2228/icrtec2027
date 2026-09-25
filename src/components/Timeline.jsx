import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Timeline.css';

export default function Timeline() {
  const { importantDates, conference } = conferenceData;

  const getStatusBadge = (status, isHighlight) => {
    if (isHighlight) {
      return (
        <span className="timeline-status-badge badge-highlight">
          <Calendar size={13} className="inline-icon" /> Conference Days
        </span>
      );
    }
    switch (status) {
      case 'completed':
        return (
          <span className="timeline-status-badge badge-completed">
            <CheckCircle2 size={13} className="inline-icon" /> Completed
          </span>
        );
      case 'active':
        return (
          <span className="timeline-status-badge badge-active">
            <span className="pulse-dot"></span> Active Deadline
          </span>
        );
      case 'upcoming':
      default:
        return (
          <span className="timeline-status-badge badge-upcoming">
            <Clock size={13} className="inline-icon" /> Scheduled
          </span>
        );
    }
  };

  return (
    <section id="timeline" className="section section-white timeline-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">TIMELINE & IMPORTANT DATES</span>
          <h2 className="section-title">Milestones & Submission Schedule</h2>
          <p className="section-desc">
            Mark your calendar with essential deadlines for {conference.acronym}. All deadlines operate strictly at 23:59 IST (UTC+05:30).
          </p>
        </div>

        {/* Timeline Visual Track */}
        <div className="timeline-container">
          <div className="timeline-track-line" aria-hidden="true"></div>

          <div className="timeline-cards-grid">
            {importantDates.map((item, index) => {
              const isPast = item.status === 'completed';
              const isActive = item.status === 'active';
              const isHero = item.isHighlight;

              return (
                <motion.div
                  key={item.id}
                  className={`timeline-card ${isPast ? 'is-completed' : ''} ${isActive ? 'is-active' : ''} ${isHero ? 'is-highlight' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-marker">
                    <span className="marker-index">{index + 1}</span>
                    <div className="marker-glow"></div>
                  </div>

                  <div className="timeline-card-inner">
                    <div className="timeline-card-header">
                      {getStatusBadge(item.status, item.isHighlight)}
                      <div className="timeline-date-tag">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <h3 className="timeline-card-title">{item.title}</h3>
                    <p className="timeline-card-desc">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Footer Notice */}
        <div className="timeline-notice-box">
          <div className="notice-icon-box">
            <AlertCircle size={22} />
          </div>
          <div className="notice-text">
            <h4>Strict Adherence to Timeline</h4>
            <p>
              To ensure rigorous single-blind peer review and prompt proceedings assembly, submissions received after the deadline will not be evaluated. All notifications will be delivered through the Microsoft CMT portal.
            </p>
          </div>
          <a href="#publication" className="btn btn-secondary btn-sm notice-action-btn">
            Submission Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
