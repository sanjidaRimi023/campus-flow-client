import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useClassSchedule } from '../../Hooks/useClassSchedule';



// Helper function to check for time conflicts
const isTimeOverlapping = (newClass, allClasses) => {
  return allClasses.some(existingClass => {
    if (newClass.id === existingClass.id || newClass.day !== existingClass.day) {
      return false; // Don't compare with self or on different days
    }
    return newClass.startTime < existingClass.endTime && newClass.endTime > existingClass.startTime;
  });
};

const AddEditClassModal = ({ isOpen, onClose, classData, allClasses }) => {
  const { saveClass } = useClassSchedule();
  const [formData, setFormData] = useState({ subjectName: '', day: 'Monday', startTime: '', endTime: '', instructor: '', color: 'blue' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Populate form if we are editing an existing class
    if (classData) {
      setFormData(classData);
    } else {
      // Reset form if we are adding a new one
      setFormData({ subjectName: '', day: 'Monday', startTime: '09:00', endTime: '10:00', instructor: '', color: 'blue' });
    }
  }, [classData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.startTime >= formData.endTime) {
      setError('Error: End time must be after start time.');
      return;
    }
    if (isTimeOverlapping(formData, allClasses)) {
      setError('Warning: This class overlaps with another scheduled class.');
      return; // Stop submission on overlap
    }
    saveClass(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">{classData ? 'Edit Class' : 'Add New Class'}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><X size={28} /></button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded flex items-center gap-3">
            <AlertTriangle size={20} /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields: Subject Name, Day, Color, Start Time, End Time, Instructor */}
          {/* Example Field: */}
          <div>
            <label htmlFor="subjectName" className="block text-sm font-medium text-slate-700">Subject Name</label>
            <input type="text" name="subjectName" id="subjectName" value={formData.subjectName} onChange={handleChange} className="mt-1 w-full border-slate-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          {/* ... (Add other fields similarly for day, time, etc.) ... */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">{classData ? 'Update Class' : 'Add Class'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditClassModal;