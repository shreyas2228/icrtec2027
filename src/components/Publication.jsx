import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, FileText, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Publication.css';

export default function Publication() {
  const { publication, conference } = conferenceData;

  return (
    <section id="publication" className="section section-dark publication-section">
      <div className="container">
        <div className="publication-grid">
          {/* Left: Scientific Publishing & IEEE Compliance */}
          <div className="pub-content-col">
            <span className="section-badge-dark">INDEXING & PROCEEDINGS</span>
            <h2 className="section-title text-white">Publication in IEEE Xplore</h2>
            
            {/* Disclaimer Alert Box */}
            <div className="pub-disclaimer-card">
              <ShieldAlert size={22} className="disclaimer-icon" />
              <div>
                <h4 className="disclaimer-title">Official IEEE Inclusion Standard</h4>
                <p className="disclaimer-text">
                  {publication.disclaimer}
                </p>
              </div>
            </div>

            <div className="pub-spec-list">
              <div className="pub-spec-item">
                <CheckCircle2 size={18} className="text-electric-cyan shrink-0" />
                <div>
                  <strong className="spec-title">Paper Format:</strong>
                  <span className="spec-desc">{publication.paperFormat}</span>
                </div>
              </div>

              <div className="pub-spec-item">
                <CheckCircle2 size={18} className="text-electric-cyan shrink-0" />
                <div>
                  <strong className="spec-title">Originality Screening:</strong>
                  <span className="spec-desc">{publication.plagiarismRule}</span>
                </div>
              </div>
            </div>

            <div className="pub-guidelines-box">
              <h4 className="guidelines-heading">Author Responsibilities & Submission Protocol:</h4>
              <ul className="guidelines-list">
                {publication.guidelines.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="pub-buttons-row">
              <a
                href={conference.cmtUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-3d-depth"
              >
                <span>Submit via Microsoft CMT</span>
                <ExternalLink size={15} />
              </a>

              <a
                href={publication.templatesUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white btn-3d-depth"
              >
                <FileText size={15} />
                <span>IEEE Manuscript Templates</span>
              </a>

              <a
                href={conference.previousEditionUrl || "https://ieeexplore.ieee.org/xpl/conhome/1849209/all-proceedings"}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white btn-3d-depth"
              >
                <ExternalLink size={15} />
                <span>ICRTEC 2023 Proceedings</span>
              </a>
            </div>
          </div>

          {/* Right: 3D Abstract Document Visualization Graphic */}
          <div className="pub-visual-col">
            <Tilt3D maxTilt={18} scale={1.04} className="pub-tilt-wrapper">
              <div className="doc-visualization-card">
                <div className="doc-top-bar">
                  <div className="doc-indicator-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="doc-type-label">IEEE_CONFERENCE_TEMPLATE.PDF</span>
                </div>

                <div className="doc-paper-sheet">
                  <div className="doc-header-strip">
                    <div className="doc-ieee-stamp">IEEE</div>
                    <div className="doc-title-placeholder"></div>
                    <div className="doc-authors-placeholder"></div>
                  </div>

                  <div className="doc-columns-grid">
                    <div className="doc-column">
                      <div className="doc-h-bar"></div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line short"></div>
                      <div className="doc-diagram-box">
                        <div className="diag-line diag-1"></div>
                        <div className="diag-line diag-2"></div>
                        <span className="diag-caption">Figure 1. Architecture</span>
                      </div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line"></div>
                    </div>

                    <div className="doc-column">
                      <div className="doc-h-bar"></div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line"></div>
                      <div className="doc-table-box">
                        <div className="table-row-bar"></div>
                        <div className="table-row-bar"></div>
                        <div className="table-row-bar"></div>
                        <span className="diag-caption">Table I. Evaluation</span>
                      </div>
                      <div className="doc-text-line"></div>
                      <div className="doc-text-line short"></div>
                    </div>
                  </div>

                  <div className="doc-verified-badge">
                    <BookOpen size={16} />
                    <span>IEEE Xplore Scoped</span>
                  </div>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  );
}
