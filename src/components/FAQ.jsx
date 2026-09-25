import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './FAQ.css';

export default function FAQ() {
  const { faq, conference } = conferenceData;
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaq = faq.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="section section-white faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-title">Author & Attendee Inquiries</h2>
          <p className="section-desc">
            Common questions regarding paper submission, IEEE formatting, registration fees, and conference participation.
          </p>
        </div>

        {/* FAQ Search Bar */}
        <div className="faq-search-wrapper">
          <div className="faq-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search questions by keyword (e.g. templates, IEEE Xplore, hybrid, registration)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="faq-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="faq-accordion-container">
          {filteredFaq.length === 0 ? (
            <div className="faq-no-results">
              <p>No questions matched your search query "{searchQuery}".</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchQuery('')}
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (index % 5) * 0.05 }}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-left">
                      <HelpCircle size={18} className="faq-q-icon" />
                      <span className="faq-question-text">{item.question}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`faq-chevron ${isOpen ? 'rotate-chevron' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="faq-answer-content">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Contact Help Desk Card */}
        <div className="faq-helpdesk-card">
          <div className="helpdesk-left">
            <MessageSquare size={24} className="helpdesk-icon" />
            <div>
              <h4>Have an unaddressed question?</h4>
              <p>Reach out to the {conference.acronym} secretariat and technical chairs directly.</p>
            </div>
          </div>
          <a href="#contact" className="btn btn-secondary btn-sm">
            Contact Help Desk <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
