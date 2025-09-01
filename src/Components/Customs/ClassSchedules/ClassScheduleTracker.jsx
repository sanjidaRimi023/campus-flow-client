import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import NextClassReminder from './NextClassReminder';
import WeeklyCalendarView from './WeeklyCalendarView';
import AddEditClassModal from '../../UI/AddEditClassModal';
import { useClassSchedule } from '../../../Hooks/useClassSchedule';


const ClassScheduleTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const { classes, isLoading, isError } = useClassSchedule();

  const handleOpenModal = (classItem = null) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  if (isLoading) return <div className="text-center p-10">Loading Your Schedule...</div>;
  if (isError) return <div className="text-center p-10 text-red-600">Failed to load schedule.</div>;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Class Schedule</h1>
          <p className="text-slate-500">Your weekly academic planner.</p>
        </div>
          {classes && classes.length > 0 && <NextClassReminder classes={classes} />}

      </header>

      <WeeklyCalendarView classes={classes} onEdit={handleOpenModal} />

      <button
        onClick={() => handleOpenModal()}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
      >
        <PlusCircle size={22} />
        <span>Add Class</span>
      </button>

      {isModalOpen && (
        <AddEditClassModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          classData={selectedClass}
          allClasses={classes}
        />
      )}
    </div>
  );
};

export default ClassScheduleTracker;