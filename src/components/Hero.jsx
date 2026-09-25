import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  FileText, 
  ChevronDown, 
  Atom, 
  Award, 
  Cpu, 
  Shield, 
  Globe, 
  Zap, 
  Radio, 
  Bot, 
  Building2, 
  Activity, 
  HeartPulse, 
  Sprout,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Hero3DCanvas from './common/Hero3DCanvas';
import Tilt3D from './common/Tilt3D';
import './Hero.css';

const trackMeta = [
  { icon: Radio, color: '#00b4d8', tag: 'NETWORKS', label: 'Communication & RF' },
  { icon: Cpu, color: '#f59e0b', tag: 'HARDWARE', label: 'VLSI & Embedded' },
  { icon: Shield, color: '#10b981', tag: 'AI & DATA', label: 'Responsible AI' },
  { icon: Zap, color: '#38bdf8', tag: 'ENERGY', label: 'Smart Mobility' },
  { icon: Bot, color: '#a855f7', tag: 'ROBOTICS', label: 'Autonomous Industry' },
  { icon: Building2, color: '#14b8a6', tag: 'URBAN', label: 'Resilient Built Env' },
  { icon: Atom, color: '#818cf8', tag: 'QUANTUM', label: 'Computational Sci' },
  { icon: Activity, color: '#fb7185', tag: 'SENSING', label: 'Smart Instrumentation' },
  { icon: HeartPulse, color: '#f43f5e', tag: 'BIOMED', label: 'Healthcare Systems' },
  { icon: Sprout, color: '#a3e635', tag: 'AGRITECH', label: 'Sustainable Society' },
];

export default function Hero() {
  const { institution, conference, tracks } = conferenceData;
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 10 tracks smoothly every 3.8s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTrackIndex((prev) => (prev + 1) % 10);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const currentTrack = tracks[activeTrackIndex] || tracks[0];
  const currentMeta = trackMeta[activeTrackIndex] || trackMeta[0];

  return (
    <section id="home" className="hero-section">
      {/* Background Tech Circuit Grid & Dynamic 3D Glow Orbs */}
      <div className="hero-bg-grid"></div>
      <div className="hero-glow-orb orb-1"></div>
      <div className="hero-glow-orb orb-2"></div>
      <div className="hero-3d-grid-plane"></div>

      <div className="container hero-container">
        {/* Left: Academic & Conference Identity */}
        <div className="hero-content">
          {/* Step 1: IEEE Label & Institution */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-row"
          >
            <span className="hero-ieee-tag">IEEE ComSoC & IEEE CAS TECHNICAL CO-SPONSORED</span>
            <span className="hero-inst-pill">{institution.name}, Mysuru</span>
          </motion.div>

          {/* Step 2: Conference Title Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-titles-block"
          >
            <p className="hero-super-title">THE 2ND INTERNATIONAL CONFERENCE ON</p>
            <h1 className="hero-heading hero-main-heading">
              Recent Trends in Electronics & <br />
              <span className="text-electric-cyan text-glow-3d">Communication</span>
            </h1>
            <div className="hero-acronym-badge">
              <span className="acronym-title">{conference.acronym}</span>
              <span className="acronym-divider">•</span>
              <span className="acronym-edition">{conference.edition}</span>
            </div>

            {/* Conference Theme Spotlight */}
            <div className="hero-theme-spotlight">
              <div className="hero-theme-tag">
                <Sparkles size={13} className="inline-icon" />
                <span>THEME</span>
              </div>
              <span className="hero-theme-text">{conference.theme}</span>
            </div>

            {/* Previous Edition Proceedings Link */}
            <div className="hero-prev-edition-wrapper">
              <a
                href={conference.previousEditionUrl}
                target="_blank"
                rel="noreferrer"
                className="hero-prev-edition-link"
              >
                <span className="prev-edition-pill">PREVIOUS PROCEEDINGS</span>
                <span className="prev-edition-label">Explore ICRTEC 2023 on IEEE Xplore</span>
                <ExternalLink size={13} className="prev-edition-arrow" />
              </a>
            </div>
          </motion.div>

          {/* Step 3: 3D Tilt Metadata Cards (Date, Venue) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-meta-grid"
          >
            <Tilt3D maxTilt={14} scale={1.04} className="hero-meta-tilt">
              <div className="hero-meta-card">
                <div className="meta-icon-circle">
                  <Calendar size={18} className="meta-icon" />
                </div>
                <div className="meta-card-text">
                  <span className="meta-card-label">CONFERENCE DATES</span>
                  <span className="meta-card-val">{conference.dates}</span>
                </div>
              </div>
            </Tilt3D>

            <Tilt3D maxTilt={14} scale={1.04} className="hero-meta-tilt">
              <div className="hero-meta-card">
                <div className="meta-icon-circle">
                  <MapPin size={18} className="meta-icon" />
                </div>
                <div className="meta-card-text">
                  <span className="meta-card-label">HOST INSTITUTION</span>
                  <span className="meta-card-val">{institution.name}, {institution.address}</span>
                </div>
              </div>
            </Tilt3D>
          </motion.div>

          {/* Step 4: CTAs & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-actions-row"
          >
            <a
              href="#registration"
              onClick={(e) => { e.preventDefault(); scrollTo('registration'); }}
              className="btn btn-accent hero-btn-cta btn-3d-depth"
            >
              <span>Register Now</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#publication"
              onClick={(e) => { e.preventDefault(); scrollTo('publication'); }}
              className="btn btn-outline-white hero-btn-cta btn-3d-depth"
            >
              <FileText size={16} />
              <span>Submit Paper</span>
            </a>

            <a
              href="#timeline"
              onClick={(e) => { e.preventDefault(); scrollTo('timeline'); }}
              className="btn-text-link"
            >
              <span>View Important Dates</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Notice Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-ieee-xplore-note"
          >
            <Award size={16} className="text-electric-cyan shrink-0" />
            <p className="note-text">
              All peer-reviewed, accepted, and presented papers will be submitted for possible inclusion in <strong>IEEE Xplore</strong>.
            </p>
          </motion.div>
        </div>

        {/* Right: Futuristic Quantum Track Radar & Telemetry Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hero-visual-wrapper"
        >
          <div 
            className="hero-radar-terminal"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Terminal Cyber Header Bar */}
            <div className="terminal-header-bar">
              <div className="terminal-status-indicator">
                <span className="terminal-dot pulse"></span>
                <span className="terminal-sys-code">IEEE // 10 RESEARCH DOMAINS</span>
              </div>
              <div className="terminal-edition-tag">
                <span>ICRTEC 2027</span>
              </div>
            </div>

            {/* Central Holographic Radar Chamber */}
            <div className="radar-chamber">
              {/* Interactive 3D Canvas Constellation Sphere */}
              <Hero3DCanvas />

              {/* Decorative Concentric Radar Rings & Crosshairs */}
              <div className="radar-grid-ring ring-outer"></div>
              <div className="radar-grid-ring ring-mid"></div>
              <div className="radar-crosshair-h"></div>
              <div className="radar-crosshair-v"></div>
              <div className="radar-sweep-beam"></div>

              {/* Central 3D Core Node */}
              <div className="core-node-3d">
                <div className="core-glow-pulse"></div>
                <Atom size={26} className="core-icon-3d" />
                <span className="core-caption-3d">IEEE • NIE</span>
                <span className="core-sub-3d">{conference.acronym}</span>
              </div>

              {/* 10 Precision Orbital Quantum Beacons */}
              {tracks.map((track, idx) => {
                const meta = trackMeta[idx] || trackMeta[0];
                const Icon = meta.icon;
                const isActive = idx === activeTrackIndex;

                // Mathematical polar coordinates (36° increments, starting top 12 o'clock)
                const angleDeg = idx * 36 - 90;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radiusPct = 42;
                const leftPct = 50 + radiusPct * Math.cos(angleRad);
                const topPct = 50 + radiusPct * Math.sin(angleRad);

                return (
                  <button
                    key={track.id}
                    type="button"
                    className={`orbital-quantum-beacon ${isActive ? 'active' : ''}`}
                    style={{
                      left: `${leftPct.toFixed(2)}%`,
                      top: `${topPct.toFixed(2)}%`,
                      '--beacon-color': meta.color
                    }}
                    onClick={() => {
                      setActiveTrackIndex(idx);
                      scrollTo('tracks');
                    }}
                    onMouseEnter={() => {
                      setActiveTrackIndex(idx);
                      setIsPaused(true);
                    }}
                    aria-label={`Track ${track.number}: ${track.title}`}
                    title={`Track ${track.number}: ${track.title}`}
                  >
                    <span className="beacon-ring"></span>
                    <span className="beacon-pip"></span>
                    <span className="beacon-num">{track.number}</span>
                    <span className="beacon-icon">
                      <Icon size={13} />
                    </span>
                    {isActive && <span className="beacon-ping"></span>}
                  </button>
                );
              })}
            </div>

            {/* Active Holographic HUD Telemetry Card */}
            <div className="telemetry-deck-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="telemetry-hud-card"
                  style={{ '--hud-accent': currentMeta.color }}
                  onClick={() => scrollTo('tracks')}
                >
                  <div className="hud-card-top">
                    <div className="hud-badge-group">
                      <span className="hud-live-dot" style={{ background: currentMeta.color }}></span>
                      <span className="hud-track-id">TRACK {currentTrack.number}</span>
                      <span className="hud-domain-tag">{currentMeta.tag}</span>
                    </div>
                    <span className="hud-counter-tag">{activeTrackIndex + 1} of 10</span>
                  </div>

                  <h3 className="hud-track-heading">{currentTrack.title}</h3>

                  <div className="hud-topic-chips">
                    {currentTrack.topics.slice(0, 3).map((topic, tIdx) => (
                      <span key={tIdx} className="hud-chip">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="hud-card-action">
                    <span className="hud-action-label">
                      <span>Explore Technical Subtopics</span>
                      <ArrowRight size={13} />
                    </span>
                    <span className="hud-topics-count">6 Targeted Topics</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Segmented Track Keypad Selector (01 - 10) */}
              <div className="terminal-keypad-selector">
                {tracks.map((track, idx) => {
                  const meta = trackMeta[idx] || trackMeta[0];
                  const isActive = idx === activeTrackIndex;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      className={`keypad-pip ${isActive ? 'active' : ''}`}
                      style={{ '--key-color': meta.color }}
                      onClick={() => setActiveTrackIndex(idx)}
                      title={`Focus Track ${track.number}: ${meta.label}`}
                    >
                      <span className="key-num">{track.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Small Scroll Down Indicator */}
      <div className="hero-scroll-indicator" onClick={() => scrollTo('quick-actions')}>
        <span className="scroll-caption">EXPLORE CONFERENCE</span>
        <ChevronDown size={18} className="scroll-chevron" />
      </div>
    </section>
  );
}

