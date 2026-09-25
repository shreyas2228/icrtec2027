import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, School, Globe2 } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import Tilt3D from './common/Tilt3D';
import './Stats.css';

const statIcons = [FileText, Users, School, Globe2];

function StatCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { statistics } = conferenceData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section section-dark stats-section">
      <div className="container">
        <div className="stats-header">
          <span className="section-badge-dark">CONFERENCE REACH</span>
          <h2 className="section-title text-white">Projected Scale & Global Participation</h2>
          <p className="section-desc text-white-muted">
            Bringing together international researchers, industry thought leaders, and scholars at NIE Mysuru.
          </p>
        </div>

        <div className="stats-grid">
          {statistics.map((item, idx) => {
            const IconComp = statIcons[idx % statIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="stat-tilt-item"
              >
                <Tilt3D maxTilt={15} scale={1.04} className="stat-card-tilt">
                  <div className="stat-card card-dark">
                    <div className="stat-icon-wrapper">
                      <IconComp size={26} />
                    </div>
                    <StatCounter
                      target={item.target}
                      suffix={item.suffix}
                      inView={isInView}
                    />
                    <span className="stat-metric-name">{item.label}</span>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
