import React from 'react';
import ClassCard from '../../UI/ClassCard';


const WeeklyCalendarView = ({ classes, onEdit }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getClassesForDay = (day) => {
    return classes
      .filter((c) => c.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)); // Sort by time
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-5">
      {days.map((day) => (
        <div key={day} className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-blue-500">
          <h3 className="font-bold text-center text-xl text-slate-700 mb-4">{day}</h3>
          <div className="space-y-3">
            {getClassesForDay(day).length > 0 ? (
              getClassesForDay(day).map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} onEdit={onEdit} />
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 pt-4">No classes.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendarView;