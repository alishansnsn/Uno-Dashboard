import React from 'react';
import { ArrowUpRightIcon, UserIcon, GraduationCapIcon, BriefcaseIcon } from './Icons';
import { StatData } from '../types';

const StatCard: React.FC<{ data: StatData }> = ({ data }) => {
  const isLime = data.theme === 'lime';
  
  return (
    <div className={`
      relative p-6 rounded-[32px] flex flex-col justify-between h-[180px] transition-transform hover:scale-[1.02]
      ${isLime ? 'bg-neon-lime text-black' : 'bg-dark-card text-white'}
    `}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full border ${isLime ? 'border-black/10' : 'border-white/10'}`}>
                {data.title === 'Company' ? <BriefcaseIcon className="w-5 h-5"/> : data.title.includes('no title') ? <UserIcon className="w-5 h-5" /> : <GraduationCapIcon className="w-5 h-5" />}
            </div>
            <span className={`font-medium ${isLime ? 'text-black/70' : 'text-gray-400'}`}>{data.title}</span>
        </div>
        <button className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-colors
          ${isLime ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-gray-200'}
        `}>
          <ArrowUpRightIcon />
        </button>
      </div>

      <div>
        <h3 className="text-4xl font-semibold tracking-tight mb-2">{data.value}</h3>
        <p className={`text-sm ${isLime ? 'text-black/60' : 'text-gray-500'}`}>
          <span className={isLime ? 'font-semibold text-black' : 'font-semibold text-white'}>{data.change.split(' ')[0]}</span>
          {' ' + data.change.split(' ').slice(1).join(' ')}
        </p>
      </div>
    </div>
  );
};

export default StatCard;