import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadioTower, 
  Cpu, 
  BrainCircuit, 
  Zap, 
  Bot, 
  Building2, 
  Atom, 
  Activity, 
  HeartPulse, 
  Sprout, 
  ArrowRight, 
  X, 
  CheckCircle 
} from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Tracks.css';

const trackIcons = [
  RadioTower,    // Track 1: Communication & Electromagnetics
  Cpu,           // Track 2: VLSI & Embedded Intelligence
  BrainCircuit,  // Track 3: Responsible AI & Sustainable Computing
  Zap,           // Track 4: Smart Energy & Sustainable Mobility
  Bot,           // Track 5: Autonomous Systems & Sustainable Industry
  Building2,     // Track 6: Resilient Built Environment
  Atom,          // Track 7: Computational Science & Advanced Materials
  Activity,      // Track 8: Smart Sensing & Connected Systems
  HeartPulse,    // Track 9: Intelligent Healthcare & Bio electronics
  Sprout         // Track 10: Digital Tech for Agriculture & Environment
];

export default function Tracks() {
  const { tracks } = conferenceData;
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <section id="tracks" className="section section-subtle tracks-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">RESEARCH DOMAINS</span>
          <h2 className="section-title">Conference Technical Tracks</h2>
          <p className="section-desc">
            Authors are invited to submit original, high-quality technical papers addressing state-of-the-art research across ten core thematic areas.
          </p>
        </div>

        {/* Tracks Grid with 3D Tilt */}
        <div className="tracks-grid">
          {tracks.map((track, idx) => {
            const IconComp = trackIcons[idx % trackIcons.length];
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="track-tilt-item"
              >
                <Tilt3D maxTilt={14} scale={1.03} className="track-card-tilt">
                  <div
                    onClick={() => setActiveTrack(track)}
                    className="track-card card"
                  >
                    <div className="track-card-top">
                      <span className="track-index">TRACK {track.number}</span>
                      <div className="track-icon-wrap">
                        <IconComp size={22} />
                      </div>
                    </div>

                    <h3 className="track-title">{track.title}</h3>
                    <p className="track-desc">{track.description}</p>

                    <div className="track-subtopics-preview">
                      <span className="subtopics-count">{track.topics.length} Targeted Topics</span>
                      <ul className="preview-list">
                        {track.topics.slice(0, 3).map((topic, tIdx) => (
                          <li key={tIdx}>{topic}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="track-card-bottom">
                      <span className="explore-text">Explore All Topics</span>
                      <div className="explore-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Track Details Modal */}
      <AnimatePresence>
        {activeTrack && (
          <div className="modal-backdrop" onClick={() => setActiveTrack(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20, rotateX: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20, rotateX: 6 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="modal-box track-modal modal-3d-box"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setActiveTrack(null)}
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>

              <div className="track-modal-header">
                <span className="track-badge">TRACK {activeTrack.number}</span>
                <h3 className="modal-track-heading">{activeTrack.title}</h3>
                <p className="modal-track-desc">{activeTrack.description}</p>
              </div>

              <div className="track-modal-body">
                <h4 className="topics-list-heading">Target Research Topics</h4>
                <div className="modal-topics-grid">
                  {activeTrack.topics.map((item, tIdx) => (
                    <div key={tIdx} className="modal-topic-item">
                      <CheckCircle size={16} className="topic-bullet-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-action-row">
                  <a
                    href="#publication"
                    onClick={() => setActiveTrack(null)}
                    className="btn btn-primary"
                  >
                    View Submission Guidelines <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
