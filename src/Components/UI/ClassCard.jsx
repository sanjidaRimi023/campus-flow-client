import React from 'react';
import { Clock, User, Edit } from 'lucide-react';

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
  green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
  red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-500' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-500' },
  default: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' },
};

const ClassCard = ({ classItem, onEdit }) => {
  const { subjectName, startTime, endTime, instructor, color } = classItem;
  const theme = colorMap[color] || colorMap.default;

  return (
    <div className={`${theme.bg} ${theme.text} p-3 rounded-lg border-l-4 ${theme.border} shadow-sm relative group cursor-pointer`}>
      <h4 className="font-bold">{subjectName}</h4>
      <div className="text-sm mt-1 space-y-1 opacity-90">
        <p className="flex items-center gap-2"><Clock size={14} />{startTime} - {endTime}</p>
        <p className="flex items-center gap-2"><User size={14} />{instructor}</p>
      </div>
      <button
        onClick={() => onEdit(classItem)}
        className="absolute top-2 right-2 p-1 bg-white/60 rounded-full text-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-blue-600"
      >
        <Edit size={16} />
      </button>
    </div>
  );
};

export default ClassCard;