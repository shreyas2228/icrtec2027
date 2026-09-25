import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Train, Bus, Navigation, ExternalLink, Building, Landmark } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Venue.css';

const travelIcons = {
  Air: Plane,
  Train: Train,
  'Road / Bus': Bus,
  'Local Transit': Navigation
};

export default function Venue() {
  const { venue, institution, conference } = conferenceData;

  return (
    <section id="venue" className="section section-white venue-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">CONFERENCE VENUE & TRAVEL</span>
          <h2 className="section-title">The Royal City of Mysuru & NIE Campus</h2>
          <p className="section-desc">
            Experience academic excellence in the serene, heritage ambiance of Mysuru, Karnataka, India.
          </p>
        </div>

        {/* Venue Master Grid */}
        <div className="venue-master-grid">
          {/* Left: NIE Venue Card & Location Details */}
          <motion.div
            className="venue-info-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="venue-card-main">
              <div className="venue-card-badge">
                <Building size={14} className="inline-icon" /> Host Institution
              </div>
              <h3 className="venue-card-title">{venue.institution}</h3>
              <p className="venue-campus-text">{venue.campus}</p>

              <div className="venue-address-box">
                <MapPin size={18} className="address-icon" />
                <span>{institution.address}</span>
              </div>

              <p className="venue-narrative">
                {venue.description}
              </p>

              <div className="venue-action-buttons">
                <a
                  href="https://maps.google.com/?q=The+National+Institute+of+Engineering+Mysuru"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <Navigation size={16} /> Open in Google Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Mysuru City Highlights */}
            <div className="mysuru-highlights-card">
              <div className="highlights-header">
                <Landmark size={20} className="landmark-icon" />
                <h4>About Mysuru (The Heritage Capital)</h4>
              </div>
              <p>
                Known for majestic palaces, silk, sandalwood, and clean green boulevards. Mysuru consistently ranks among the cleanest cities in India and offers an inspiring retreat for global researchers and delegates.
              </p>
            </div>
          </motion.div>

          {/* Right: Embedded Interactive Map / Location Visual */}
          <motion.div
            className="venue-map-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="map-frame-wrapper">
              <iframe
                title="NIE Mysuru Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.3995898863673!2d76.64160477583688!3d12.288220087977468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf6f9df88f34f7%3A0xe5492d2b5167b587!2sThe%20National%20Institute%20of%20Engineering%20(NIE)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-overlay-badge">
                <span className="dot-live"></span>
                <span>NIE South Campus, Manandavadi Rd</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connectivity Cards Grid */}
        <div className="connectivity-section">
          <h3 className="h3 connectivity-heading">How to Reach NIE Mysuru</h3>
          <div className="connectivity-grid">
            {venue.connectivity.map((item, idx) => {
              const Icon = travelIcons[item.mode] || Navigation;

              return (
                <div key={idx} className="connectivity-card">
                  <div className="connectivity-icon-wrapper">
                    <Icon size={24} />
                  </div>
                  <h4 className="connectivity-mode">By {item.mode}</h4>
                  <p className="connectivity-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
