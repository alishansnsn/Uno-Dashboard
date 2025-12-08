import React, { useState } from 'react';
import StatCard from './StatCards';
import EngagementChart from './EngagementChart';
import Heatmap from './Heatmap';
import Messages from './Messages';
import ToDoListModal from './ToDoListModal';
import { STATS } from '../constants';
import { FilterIcon, CalendarIcon, DownloadIcon, ClipboardListIcon } from './Icons';

const Overview: React.FC = () => {
  const [isToDoOpen, setIsToDoOpen] = useState(false);

  return (
    <>
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Welcome Text Section */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center mb-6 lg:mb-0">
            <p className="text-gray-400 mb-2">Welcome back,</p>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
              Darlene <br />
              Robertson
            </h1>
            <div className="inline-flex">
                 <span className="px-4 py-1.5 rounded-full bg-[#5B21B6] text-[#D8B4FE] text-xs font-semibold uppercase tracking-wide border border-white/10">Premium</span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, idx) => (
              <StatCard key={idx} data={stat} />
            ))}
          </div>
        </div>

        {/* Filters and Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center bg-dark-card p-1.5 rounded-full border border-white/5 overflow-x-auto w-full md:w-auto">
                <button className="px-6 py-2.5 bg-neon-lime text-black rounded-full text-sm font-semibold shadow-[0_0_15px_rgba(209,243,102,0.2)]">All</button>
                <button className="px-6 py-2.5 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-colors">Engagement</button>
                <button className="px-6 py-2.5 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-colors">Visit</button>
                <button className="px-6 py-2.5 text-gray-400 hover:text-white rounded-full text-sm font-medium transition-colors">Post</button>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <button className="w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <FilterIcon />
                </button>
                <button className="w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <CalendarIcon />
                </button>
                <button 
                  onClick={() => setIsToDoOpen(true)}
                  className="w-10 h-10 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-lime/50 transition-colors"
                  title="Tasks"
                >
                    <ClipboardListIcon />
                </button>
                <button className="flex items-center space-x-2 bg-dark-card border border-white/10 px-5 py-2.5 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <DownloadIcon />
                    <span>Download reports</span>
                </button>
            </div>
        </div>

        {/* Main Grid: Charts & Messages */}
        <div className="grid grid-cols-12 gap-6 h-auto lg:h-[400px]">
          {/* Engagement Chart */}
          <div className="col-span-12 lg:col-span-5 h-[400px] lg:h-auto">
            <EngagementChart />
          </div>

          {/* Heatmap */}
          <div className="col-span-12 lg:col-span-4 h-[400px] lg:h-auto">
            <Heatmap />
          </div>

          {/* Messages */}
          <div className="col-span-12 lg:col-span-3 h-[400px] lg:h-auto">
            <Messages />
          </div>
        </div>
        
        {/* ToDo List Modal */}
        <ToDoListModal isOpen={isToDoOpen} onClose={() => setIsToDoOpen(false)} />
    </>
  );
};

export default Overview;