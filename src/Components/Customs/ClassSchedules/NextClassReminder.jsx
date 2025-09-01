import React, { useState, useEffect } from 'react';
import { BellRing } from 'lucide-react';

const getNextClassInfo = (classes) => {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5); 

  const upcomingToday = classes
    .filter(c => c.day === dayOfWeek && c.startTime > currentTime)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (upcomingToday.length === 0) return null;

  const nextClass = upcomingToday[0];
  const [hours, minutes] = nextClass.startTime.split(':');
  const classTime = new Date();
  classTime.setHours(hours, minutes, 0, 0);

  return { ...nextClass, timeUntil: classTime.getTime() - now.getTime() };
};

const formatTime = (ms) => {
  if (ms <= 0) return "is starting now!";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `in ${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

const NextClassReminder = ({ classes }) => {
  const [nextClassInfo, setNextClassInfo] = useState(getNextClassInfo(classes));

  useEffect(() => {
    const timer = setInterval(() => {
      setNextClassInfo(getNextClassInfo(classes));
    }, 1000); // Update every second for a live countdown
    return () => clearInterval(timer);
  }, [classes]);

  if (!nextClassInfo) {
    return null; // Don't show if no classes are left today
  }

  return (
    <div className="bg-green-100 text-green-900 p-3 rounded-lg flex items-center gap-3 shadow-sm border border-green-200 animate-pulse-once">
      <BellRing size={20} />
      <p className="font-semibold">
        Next: <span className="font-bold">{nextClassInfo.subjectName}</span>{' '}
        <span className="font-normal">{formatTime(nextClassInfo.timeUntil)}</span>
      </p>
    </div>
  );
};

export default NextClassReminder;