import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Radio } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Countdown.css';

export default function Countdown() {
  const { conference } = conferenceData;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false
  });

  useEffect(() => {
    const targetDate = new Date(conference.countdownTarget).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [conference.countdownTarget]);

  return (
    <div className="countdown-band">
      <div className="container countdown-container">
        <div className="countdown-header-block">
          {timeLeft.isLive ? (
            <div className="live-status-chip">
              <Radio size={16} className="live-pulse-icon" />
              <span>THE CONFERENCE IS LIVE</span>
            </div>
          ) : (
            <div className="countdown-title-wrap">
              <div className="countdown-icon-circle">
                <Clock size={16} />
              </div>
              <div>
                <span className="countdown-super">COUNTDOWN TO SESSIONS</span>
                <h3 className="countdown-title">Conference Begins In</h3>
              </div>
            </div>
          )}
        </div>

        {!timeLeft.isLive ? (
          <div className="countdown-digits-grid">
            <div className="digit-unit">
              <span className="digit-number">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="digit-label">DAYS</span>
            </div>
            <span className="digit-separator">:</span>
            <div className="digit-unit">
              <span className="digit-number">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="digit-label">HOURS</span>
            </div>
            <span className="digit-separator">:</span>
            <div className="digit-unit">
              <span className="digit-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="digit-label">MINUTES</span>
            </div>
            <span className="digit-separator">:</span>
            <div className="digit-unit">
              <span className="digit-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="digit-label">SECONDS</span>
            </div>
          </div>
        ) : (
          <div className="live-banner">
            <p>Sessions and keynote livestreams are currently underway at NIE Mysuru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
