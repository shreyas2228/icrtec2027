import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ExternalLink, MessageCircle } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Contact.css';

export default function Contact() {
  const { conference, institution } = conferenceData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Paper Submission & CMT',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill out all required fields before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'Paper Submission & CMT',
      message: ''
    });
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <section id="contact" className="section section-dark contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header section-header-dark">
          <span className="section-badge-dark">CONFERENCE SECRETARIAT</span>
          <h2 className="section-title text-white">Get in Touch with Organizing Desk</h2>
          <p className="section-desc text-white-muted">
            Have questions about paper submission, registrations, sponsorships, or traveling to Mysuru? We are here to assist.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="contact-grid">
          {/* Left: Contact Info Cards */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-card-dark">
              <h3 className="contact-card-title">Secretariat Headquarters</h3>
              <p className="contact-inst-name">{institution.name}</p>

              <div className="contact-detail-items">
                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Mailing Address</span>
                    <p className="detail-value">{institution.address}</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Official Email Desk</span>
                    <a href={`mailto:${conference.contactEmail}`} className="detail-link">
                      {conference.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Secretariat Phone</span>
                    <a href={`tel:${conference.contactPhone}`} className="detail-link">
                      {conference.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-box">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="detail-label">Desk Working Hours</span>
                    <p className="detail-value">Mon – Sat: 09:00 AM – 05:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* CMT Portal Direct Link */}
              <div className="contact-cmt-box">
                <div className="cmt-text">
                  <strong>Online Submission Portal:</strong>
                  <span>Manage manuscripts and peer reviews on Microsoft CMT.</span>
                </div>
                <a
                  href="https://cmt3.research.microsoft.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  Access CMT <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Inquiry Form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-form-card">
              <h3 className="form-card-title">Send Us a Direct Message</h3>
              <p className="form-card-desc">
                Submit your inquiry and our conference secretariat will respond within 24 to 48 hours.
              </p>

              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={42} />
                  </div>
                  <h4 className="success-title">Message Successfully Dispatched!</h4>
                  <p className="success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your query regarding <em>{formData.category}</em> has been logged with the {conference.acronym} secretariat. A confirmation has been noted for {formData.email}.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleReset}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                  {errorMsg && (
                    <div className="form-error-banner">{errorMsg}</div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Dr. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. ramesh.kumar@institution.edu"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-category" className="form-label">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-category"
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Paper Submission & CMT">Paper Submission & Microsoft CMT</option>
                      <option value="Author Registration & Fees">Author Registration & Payment Fees</option>
                      <option value="Sponsorship & Exhibition">Corporate Sponsorship & Exhibition</option>
                      <option value="Travel & Accommodation">Travel, Accommodation & Mysuru Venue</option>
                      <option value="General Queries">General Queries / Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-textarea"
                      rows={4}
                      placeholder="Please specify your paper ID (if applicable) and detailed inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary form-submit-btn">
                    <Send size={16} /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
