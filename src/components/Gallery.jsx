import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Gallery.css';

export default function Gallery() {
  const { gallery } = conferenceData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = ['All', ...Array.from(new Set(gallery.map(item => item.category)))];

  const filteredImages = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="section section-dark gallery-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header section-header-dark">
          <span className="section-badge-dark">ICRTEC 2023 ARCHIVES & CAMPUS</span>
          <h2 className="section-title text-white">Visual Glimpses of Excellence</h2>
          <p className="section-desc text-white-muted">
            Memories from the inaugural edition of IEEE ICRTEC 2023 and the landmark campus of NIE Mysuru.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="gallery-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid with 3D Tilt */}
        <div className="gallery-grid">
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="gallery-tilt-item"
            >
              <Tilt3D maxTilt={14} scale={1.03} className="gallery-card-tilt">
                <div
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                >
                  <div className="gallery-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-card-overlay">
                      <span className="gallery-cat-chip">{item.category}</span>
                      <h4 className="gallery-card-title">{item.title}</h4>
                      <div className="gallery-zoom-icon">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.9, y: 20, rotateX: 6 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.9, y: 20, rotateX: 6 }}
                transition={{ duration: 0.28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={closeLightbox}
                  aria-label="Close image viewer"
                >
                  <X size={22} />
                </button>

                <button
                  type="button"
                  className="lightbox-nav-btn prev-btn"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>

                <div className="lightbox-image-container">
                  <img
                    src={filteredImages[selectedImageIndex].image}
                    alt={filteredImages[selectedImageIndex].title}
                    className="lightbox-image"
                  />
                  <div className="lightbox-caption-bar">
                    <span className="lightbox-category">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h3 className="lightbox-title">
                      {filteredImages[selectedImageIndex].title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  className="lightbox-nav-btn next-btn"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
