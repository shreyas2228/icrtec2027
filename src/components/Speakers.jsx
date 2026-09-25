import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Building, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Speakers.css';

export default function Speakers() {
  const { speakers } = conferenceData;
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <section id="speakers" className="section section-light speakers-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">KEYNOTE SPEAKERS</span>
          <h2 className="section-title">Distinguished Academic & Industry Speakers</h2>
          <p className="section-desc">
            Visionary researchers, IEEE Fellows, and industry directors delivering keynote perspectives on next-generation computing frontiers.
          </p>
        </div>

        {/* Speakers Grid with 3D Tilt */}
        <div className="speakers-grid">
          {speakers.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="speaker-tilt-item"
            >
              <Tilt3D maxTilt={12} scale={1.03} className="speaker-card-tilt">
                <div
                  className="speaker-card card"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <div className="speaker-image-box">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="speaker-thumb"
                      loading="lazy"
                    />
                    <span className="speaker-role-pill">{speaker.role}</span>
                  </div>

                  <div className="speaker-info">
                    <h3 className="speaker-full-name">{speaker.name}</h3>
                    <p className="speaker-post">{speaker.designation}</p>
                    <div className="speaker-inst-row">
                      <Building size={14} className="inst-icon" />
                      <span>{speaker.institution}</span>
                    </div>
                    <div className="speaker-area-tag">
                      <span>{speaker.researchArea}</span>
                    </div>
                    <button className="speaker-view-btn" type="button">
                      <span>View Keynote Abstract</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Speaker Biography & Keynote Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <div className="modal-backdrop" onClick={() => setSelectedSpeaker(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20, rotateX: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20, rotateX: 6 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="modal-box speaker-modal modal-3d-box"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedSpeaker(null)}
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>

              <div className="speaker-modal-grid">
                <div className="modal-photo-col">
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="modal-speaker-img"
                  />
                  <div className="modal-speaker-badge">
                    <Sparkles size={14} />
                    <span>{selectedSpeaker.role}</span>
                  </div>
                </div>

                <div className="modal-content-col">
                  <h3 className="modal-speaker-name">{selectedSpeaker.name}</h3>
                  <p className="modal-speaker-desig">{selectedSpeaker.designation}</p>
                  <p className="modal-speaker-inst">{selectedSpeaker.institution}</p>

                  <div className="modal-topic-box">
                    <div className="topic-badge">KEYNOTE PRESENTATION</div>
                    <h4 className="topic-title">"{selectedSpeaker.keynoteTitle}"</h4>
                  </div>

                  <div className="modal-bio-block">
                    <h5 className="bio-subhead">Scholar Biography</h5>
                    <p className="bio-text">{selectedSpeaker.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
