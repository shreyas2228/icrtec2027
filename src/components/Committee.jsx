import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Shield, 
  Search, 
  Building2, 
  Globe, 
  Users, 
  CheckCircle2, 
  X, 
  GraduationCap, 
  Briefcase, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Committee.css';

export default function Committee() {
  const { committee, conference, institution } = conferenceData;
  const [activeTab, setActiveTab] = useState('advisory');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'
  const [expandedAll, setExpandedAll] = useState(false);

  // Group directory categories
  const advisoryMembers = useMemo(() => committee.advisoryCommittee || [], [committee]);
  const oversightMembers = useMemo(() => committee.oversightCommittee || [], [committee]);
  const tpcMembers = useMemo(() => committee.technicalProgramCommittee || [], [committee]);
  const trackChairMembers = useMemo(() => committee.trackChairs || [], [committee]);

  const operationsMembers = useMemo(() => {
    return [
      ...(committee.publicationCommittee || []).map(m => ({ ...m, roleTitle: 'Publication Committee' })),
      ...(committee.registrationCommittee || []).map(m => ({ ...m, roleTitle: 'Registration Committee' })),
      ...(committee.foreignDelegatesKeynotes || []).map(m => ({ ...m, roleTitle: 'Foreign Delegates & Keynotes' })),
      ...(committee.websiteCommittee || []).map(m => ({ ...m, roleTitle: 'Website Committee' })),
      ...(committee.logisticsCommittee || []).map(m => ({ ...m, roleTitle: 'Logistics Committee' }))
    ];
  }, [committee]);

  const allDirectoryMembers = useMemo(() => {
    return [
      ...advisoryMembers.map(m => ({ ...m, groupKey: 'advisory', groupLabel: 'Advisory Board' })),
      ...oversightMembers.map(m => ({ ...m, groupKey: 'oversight', groupLabel: 'Oversight Committee' })),
      ...tpcMembers.map(m => ({ ...m, groupKey: 'tpc', groupLabel: 'Technical Program Committee' })),
      ...trackChairMembers.map(m => ({ ...m, groupKey: 'tracks', groupLabel: 'Track Chair' })),
      ...operationsMembers.map(m => ({ ...m, groupKey: 'operations', groupLabel: m.roleTitle || 'Organizing Team' }))
    ];
  }, [advisoryMembers, oversightMembers, tpcMembers, trackChairMembers, operationsMembers]);

  const tabs = [
    { id: 'advisory', label: 'Advisory Board', count: advisoryMembers.length, icon: Globe },
    { id: 'oversight', label: 'Oversight Committee', count: oversightMembers.length, icon: Shield },
    { id: 'tpc', label: 'Technical Program Committee', count: tpcMembers.length, icon: Users },
    { id: 'tracks', label: 'Track Chairs', count: trackChairMembers.length, icon: Award },
    { id: 'operations', label: 'Organizing Teams', count: operationsMembers.length, icon: Briefcase },
    { id: 'all', label: 'All Scholars', count: allDirectoryMembers.length, icon: LayoutGrid }
  ];

  const filteredDirectoryMembers = useMemo(() => {
    let list = activeTab === 'all'
      ? allDirectoryMembers
      : allDirectoryMembers.filter(m => m.groupKey === activeTab);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = allDirectoryMembers.filter(member =>
        member.name.toLowerCase().includes(q) ||
        (member.designation && member.designation.toLowerCase().includes(q)) ||
        (member.institution && member.institution.toLowerCase().includes(q)) ||
        (member.groupLabel && member.groupLabel.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allDirectoryMembers, activeTab, searchQuery]);

  const displayedMembers = expandedAll || searchQuery ? filteredDirectoryMembers : filteredDirectoryMembers.slice(0, 16);

  const getInstitutionBadgeClass = (inst = '') => {
    const s = inst.toLowerCase();
    if (s.includes('purdue') || s.includes('california') || s.includes('hong kong') || s.includes('dakota') || s.includes('usa')) {
      return 'inst-badge-global';
    }
    if (s.includes('iit') || s.includes('indian institute of technology')) {
      return 'inst-badge-iit';
    }
    if (s.includes('nit') || s.includes('bits')) {
      return 'inst-badge-premier';
    }
    if (s.includes('ieee')) {
      return 'inst-badge-ieee';
    }
    if (s.includes('mathworks') || s.includes('director') || s.includes('coreel')) {
      return 'inst-badge-industry';
    }
    return 'inst-badge-nie';
  };

  return (
    <section id="committee" className="section section-light committee-section-pro">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">GOVERNANCE & ACADEMIC OVERSIGHT</span>
          <h2 className="section-title">Conference Organizing Committee</h2>
          <p className="section-desc">
            Governed by pioneering researchers, IEEE Fellows, and distinguished academic leadership from {institution.shortName}, Mysuru, IITs, Purdue, and premier global universities.
          </p>
        </div>

        {/* ===================================================================
            TIER 1: HONORARY EXECUTIVE PATRONS & LEADERSHIP SHOWCASE
            =================================================================== */}
        <div className="leadership-showcase-block">
          <div className="leadership-block-header">
            <span className="leadership-eyebrow">HONORARY PATRONS & LEADERSHIP</span>
            <h3 className="leadership-heading">Apex Executive Committee</h3>
          </div>

          {/* Chief Patrons Row */}
          <div className="chief-patrons-grid">
            {(committee.chiefPatrons || []).map((cp, idx) => (
              <Tilt3D key={idx} maxTilt={10} scale={1.02} className="chief-patron-tilt">
                <div className="chief-patron-card">
                  <div className="chief-card-halo"></div>
                  <div className="chief-badge">
                    <Award size={14} className="chief-badge-icon" />
                    <span>CHIEF PATRON</span>
                  </div>
                  <div className="chief-avatar-box">
                    <GraduationCap size={28} className="chief-icon" />
                  </div>
                  <h4 className="chief-name">{cp.name}</h4>
                  <p className="chief-desig">{cp.designation}</p>
                  <div className="chief-inst-pill">
                    <Building2 size={13} />
                    <span>{cp.institution}</span>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>

          {/* Patrons & General Chair Row */}
          <div className="patrons-general-grid">
            {/* Patrons */}
            {(committee.patrons || []).map((patron, idx) => (
              <Tilt3D key={idx} maxTilt={10} scale={1.02} className="patron-tilt">
                <div className="patron-card">
                  <div className="patron-role-tag">PATRON</div>
                  <h4 className="patron-name">{patron.name}</h4>
                  <p className="patron-desig">{patron.designation}</p>
                  <span className="patron-inst">{patron.institution}</span>
                </div>
              </Tilt3D>
            ))}

            {/* General Chair */}
            {(committee.generalChairs || []).map((gc, idx) => (
              <Tilt3D key={`gc-${idx}`} maxTilt={10} scale={1.02} className="general-chair-tilt">
                <div className="general-chair-card">
                  <div className="gc-ribbon">
                    <Award size={14} />
                    <span>GENERAL CHAIR</span>
                  </div>
                  <h4 className="gc-name">{gc.name}</h4>
                  <p className="gc-desig">{gc.designation}</p>
                  <div className="gc-inst">
                    <Building2 size={13} />
                    <span>{gc.institution}</span>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>

        {/* ===================================================================
            TIER 2: KEY CONFERENCE WORKING CHAIRS (BENTO SUITE)
            =================================================================== */}
        <div className="working-chairs-block">
          <div className="chairs-block-header">
            <span className="leadership-eyebrow">PROGRAM CHAIRS & OPERATIONS</span>
            <h3 className="leadership-heading">Conference Executive Chairs</h3>
          </div>

          <div className="chairs-bento-grid">
            {(committee.chairs || []).map((chair, idx) => (
              <Tilt3D key={idx} maxTilt={12} scale={1.03} className="chair-bento-tilt">
                <div className="chair-bento-card">
                  <div className="chair-role-badge">
                    <span>{chair.roleTitle}</span>
                  </div>
                  <h4 className="chair-card-name">{chair.name}</h4>
                  <p className="chair-card-desig">{chair.designation}</p>
                  <div className="chair-card-inst">
                    <Building2 size={13} />
                    <span>{chair.institution}</span>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>

        {/* ===================================================================
            TIER 3: INTERACTIVE COMMITTEE DIRECTORY (TABS + SMART SEARCH)
            =================================================================== */}
        <div className="committee-directory-block">
          <div className="directory-header-row">
            <div>
              <span className="leadership-eyebrow">ACADEMIC & TECHNICAL DIRECTORY</span>
              <h3 className="directory-heading">Committee Scholars & Reviewers</h3>
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Cards View"
              >
                <LayoutGrid size={15} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'compact' ? 'active' : ''}`}
                onClick={() => setViewMode('compact')}
                title="Compact Directory View"
              >
                <List size={15} />
                <span>Compact</span>
              </button>
            </div>
          </div>

          {/* Search Toolbar */}
          <div className="directory-search-wrapper">
            <div className="directory-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="directory-search-input"
                placeholder="Search scholars by name, university (e.g. IIT Bombay, Purdue, NITK, ECE)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveTab('all');
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {searchQuery && (
              <span className="search-live-count">
                Found {filteredDirectoryMembers.length} matching scholar{filteredDirectoryMembers.length === 1 ? '' : 's'}
              </span>
            )}
          </div>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="directory-tabs-bar" role="tablist">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`directory-tab-pill ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setExpandedAll(false);
                    }}
                  >
                    <Icon size={14} className="tab-icon" />
                    <span>{tab.label}</span>
                    <span className="tab-counter">{tab.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Directory Content: Grid or Compact */}
          {filteredDirectoryMembers.length === 0 ? (
            <div className="directory-empty-state">
              <Users size={36} className="empty-icon" />
              <h4>No scholars found matching "{searchQuery}"</h4>
              <p>Try searching with another keyword like 'IIT', 'ECE', 'Professor', or 'Purdue'.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchQuery('')}
              >
                Reset Search
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="directory-cards-grid">
              <AnimatePresence mode="popLayout">
                {displayedMembers.map((member, idx) => (
                  <motion.div
                    key={`${member.name}-${idx}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: (idx % 12) * 0.03 }}
                    className="scholar-grid-card"
                  >
                    <div className="scholar-card-top">
                      <div className="scholar-name-wrap">
                        <CheckCircle2 size={16} className="scholar-verified" />
                        <h4 className="scholar-name">{member.name}</h4>
                      </div>
                      {member.groupLabel && (
                        <span className="scholar-group-pill">{member.groupLabel}</span>
                      )}
                    </div>

                    <p className="scholar-desig">{member.designation}</p>

                    {member.institution && (
                      <div className="scholar-inst-box">
                        <span className={`inst-badge-chip ${getInstitutionBadgeClass(member.institution)}`}>
                          <Building2 size={12} className="shrink-0" />
                          <span>{member.institution}</span>
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Compact Directory Table View */
            <div className="compact-directory-wrapper">
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Scholar Name</th>
                    <th>Role / Committee</th>
                    <th>Designation</th>
                    <th>Institution & University Affiliation</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMembers.map((member, idx) => (
                    <tr key={`${member.name}-${idx}`}>
                      <td className="td-name">
                        <div className="td-name-cell">
                          <CheckCircle2 size={14} className="scholar-verified" />
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className="td-role">
                        <span className="td-role-tag">{member.groupLabel || member.roleTitle || 'Committee'}</span>
                      </td>
                      <td className="td-desig">{member.designation}</td>
                      <td className="td-inst">
                        <span className={`inst-badge-chip ${getInstitutionBadgeClass(member.institution)}`}>
                          {member.institution}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Expand / Collapse Button if > 16 members */}
          {!searchQuery && filteredDirectoryMembers.length > 16 && (
            <div className="directory-expand-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm expand-toggle-btn"
                onClick={() => setExpandedAll(!expandedAll)}
              >
                {expandedAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp size={15} />
                  </>
                ) : (
                  <>
                    <span>View All {filteredDirectoryMembers.length} Scholars in {tabs.find(t => t.id === activeTab)?.label}</span>
                    <ChevronDown size={15} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Oversight Note */}
        <div className="committee-pro-note">
          <Shield size={20} className="pro-note-icon" />
          <span>
            The <strong>{conference.acronym}</strong> technical evaluations and peer review oversight adhere strictly to IEEE publication and ethics guidelines, led by senior IEEE Fellows and academic leaders from India, USA, Europe, and Asia.
          </span>
        </div>
      </div>
    </section>
  );
}
