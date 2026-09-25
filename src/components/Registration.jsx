import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, AlertCircle, ArrowRight, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Registration.css';

export default function Registration() {
  const { registration, conference } = conferenceData;
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'

  return (
    <section id="registration" className="section section-white registration-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">CONFERENCE REGISTRATION</span>
          <h2 className="section-title">Registration Categories & Pricing</h2>
          <p className="section-desc">
            Secure your participation for {conference.acronym}. Early bird concessions available until {registration.earlyBirdDeadline}.
          </p>
        </div>

        {/* Currency Switch & Deadline Banner */}
        <div className="registration-top-bar">
          <div className="deadline-pills">
            <div className="deadline-pill early-pill">
              <span className="pill-dot"></span>
              <span>Early-Bird Deadline: <strong>{registration.earlyBirdDeadline}</strong></span>
            </div>
            <div className="deadline-pill regular-pill">
              <span>Author Registration: <strong>{registration.authorDeadline || registration.regularDeadline}</strong></span>
            </div>
          </div>

          <div className="currency-toggle-wrapper">
            <span className="currency-label">Currency:</span>
            <div className="currency-toggle">
              <button
                type="button"
                className={`currency-btn ${currency === 'INR' ? 'active' : ''}`}
                onClick={() => setCurrency('INR')}
              >
                ₹ INR (India)
              </button>
              <button
                type="button"
                className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => setCurrency('USD')}
              >
                $ USD (International)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Matrix Table / Cards */}
        <div className="registration-table-wrapper">
          <table className="registration-table">
            <thead>
              <tr>
                <th className="th-category">Delegate Category</th>
                <th className="th-price th-early">
                  <div className="th-badge">Recommended</div>
                  Early Bird Fee
                  <span className="th-sub">On or before {registration.earlyBirdDeadline}</span>
                </th>
                <th className="th-price">
                  Regular Fee
                  <span className="th-sub">After {registration.earlyBirdDeadline}</span>
                </th>
                <th className="th-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {registration.tiers.map((tier, index) => {
                const isIeee = tier.category.toLowerCase().includes('ieee') && !tier.category.toLowerCase().includes('non');
                const earlyPrice = currency === 'INR' ? tier.earlyBirdINR : tier.earlyBirdUSD;
                const regularPrice = currency === 'INR' ? tier.regularINR : tier.regularUSD;

                return (
                  <tr key={index} className={isIeee ? 'row-ieee-member' : ''}>
                    <td className="td-category">
                      <div className="category-cell">
                        <span className="category-title">{tier.category}</span>
                        {isIeee && <span className="ieee-member-tag">IEEE Discount</span>}
                      </div>
                    </td>
                    <td className="td-price td-early-price">
                      <span className="price-val">{earlyPrice}</span>
                    </td>
                    <td className="td-price td-regular-price">
                      <span className="price-val">{regularPrice}</span>
                    </td>
                    <td className="td-action">
                      <a
                        href="#contact"
                        className={`btn btn-sm ${isIeee ? 'btn-primary' : 'btn-secondary'} reg-table-btn`}
                      >
                        Select <ArrowRight size={13} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Policy & Inclusions Grid */}
        <div className="registration-info-grid">
          <div className="reg-info-card">
            <div className="info-header">
              <FileCheck size={20} className="info-icon" />
              <h4>Author Registration Mandatory Rule</h4>
            </div>
            <p>
              At least one author of each accepted paper must complete full registration at the author rate and commit to presenting the paper during their scheduled technical track.
            </p>
          </div>

          <div className="reg-info-card">
            <div className="info-header">
              <ShieldCheck size={20} className="info-icon" />
              <h4>Inclusions & Amenities</h4>
            </div>
            <ul className="inclusions-list">
              <li><Check size={14} className="check-bullet" /> Admission to all keynote addresses & technical tracks</li>
              <li><Check size={14} className="check-bullet" /> Conference kit, digital proceedings & official certificate</li>
              <li><Check size={14} className="check-bullet" /> Conference lunches, tea breaks & Gala Dinner banquet</li>
              <li><Check size={14} className="check-bullet" /> All fees inclusive of 18% GST (Tax invoices issued)</li>
            </ul>
          </div>
        </div>

        {/* Registration CTA banner */}
        <div className="registration-cta-banner">
          <div className="cta-left">
            <CreditCard size={28} className="cta-icon" />
            <div>
              <h3>Ready to Submit Your Registration?</h3>
              <p>Online payment portal accepts UPI, Net Banking, Credit/Debit Cards, and International Wire Transfer (SWIFT).</p>
            </div>
          </div>
          <div className="cta-right">
            <a
              href="https://cmt3.research.microsoft.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Author Registration via CMT <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
