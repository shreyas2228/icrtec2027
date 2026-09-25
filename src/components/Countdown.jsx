import React, { useState, useEffect } from 'react';
import { Clock, Radio } from 'lucide-react';
import { conferenceData } from '../data/conferenceData';
import './Countdown.css';

export default function Countdown() {
  const { conference, importantDates } = conferenceData;

  // Dynamically locate the active milestone or next upcoming deadline
  const activeMilestone =
    (importantDates || []).find((d) => d.status === 'active') ||
    (importantDates || []).find((d) => d.status === 'upcoming') ||
    { title: 'Call for Papers', date: '15 October 2026', isoDate: '2026-10-15T23:59:59+05:30' };

  const targetDateStr = activeMilestone.isoDate || conference.countdownTarget || '2026-10-15T23:59:59+05:30';
  const milestoneTitle = activeMilestone.title;
  const milestoneDate = activeMilestone.date;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false
  });

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

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
  }, [targetDateStr]);

  return (
    <div className="countdown-band">
      <div className="container countdown-container">
        <div className="countdown-header-block">
          {timeLeft.isLive ? (
            <div className="live-status-chip">
              <Radio size={16} className="live-pulse-icon" />
              <span>{milestoneTitle.toUpperCase()} IS NOW ACTIVE</span>
            </div>
          ) : (
            <div className="countdown-title-wrap">
              <div className="countdown-icon-circle">
                <Clock size={16} />
              </div>
              <div>
                <span className="countdown-super">ACTIVE DEADLINE • {milestoneDate}</span>
                <h3 className="countdown-title">{milestoneTitle} In</h3>
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
            <p>{milestoneTitle} portal is now open for manuscript submissions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
