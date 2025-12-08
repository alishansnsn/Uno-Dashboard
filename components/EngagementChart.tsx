
import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { ENGAGEMENT_DATA } from '../constants';
import { UserIcon, MoreHorizontalIcon, DownloadIcon, PresentationIcon } from './Icons';

const EngagementChart: React.FC = () => {
  // Active Index state for the floating label
  const [activeIndex, setActiveIndex] = useState(3); // Default to April
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Calculate left position for the floating label based on active index
  // Formula: (index + 0.5) / length * 100
  const getLeftPosition = (index: number) => {
      // 100% width divided by number of data points
      const percentage = ((index + 0.5) / ENGAGEMENT_DATA.length) * 100;
      return `calc(${percentage}%)`;
  };

  const activeData = ENGAGEMENT_DATA[activeIndex];

  return (
    <div className="bg-dark-card rounded-[32px] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-bg rounded-full border border-white/5">
                <UserIcon className="text-gray-400" />
            </div>
            <h3 className="text-gray-200 font-medium">Engagement rate</h3>
        </div>
        <div className="flex items-center space-x-2">
            <div className="flex bg-dark-bg rounded-full p-1 border border-white/5">
                <button className="px-4 py-1.5 text-xs text-gray-400 rounded-full hover:text-white transition-colors">Monthly</button>
                <button className="px-4 py-1.5 text-xs text-black bg-neon-lime rounded-full font-medium shadow-[0_0_10px_rgba(209,243,102,0.2)] transition-transform hover:scale-105">Annually</button>
            </div>
             <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <MoreHorizontalIcon />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 top-10 w-40 bg-[#18181B] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                    <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white flex items-center space-x-2 transition-colors">
                      <PresentationIcon className="w-3 h-3" />
                      <span>View Details</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white flex items-center space-x-2 transition-colors">
                      <DownloadIcon className="w-3 h-3" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                )}
             </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px] relative group">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={ENGAGEMENT_DATA} 
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state.activeTooltipIndex !== undefined && typeof state.activeTooltipIndex === 'number') {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
          >
             <defs>
                <pattern id="stripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <rect width="4" height="8" fill="#581c87" /> 
                    <rect x="4" width="4" height="8" fill="#7e22ce" />
                </pattern>
                <linearGradient id="gradientActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#52525B', fontSize: 12 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#52525B', fontSize: 12 }} 
                tickFormatter={(value) => `${value}%`}
            />
            {/* Tooltip disabled in favor of floating label */}
            <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={40}>
              {ENGAGEMENT_DATA.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={index === activeIndex ? 'url(#gradientActive)' : 'url(#stripe)'}
                    strokeWidth={0}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Dynamic Floating Label for Active Item */}
        <div 
            className="absolute top-[10%] transform -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out z-10"
            style={{ left: getLeftPosition(activeIndex) }}
        >
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl text-center min-w-[100px]">
                <p className="text-[10px] text-gray-300 mb-1">{activeData.name}, 2023</p>
                <p className="text-xl font-bold text-white">{activeData.fullValue || activeData.value}</p>
                <div className="flex justify-center mt-1">
                     <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeData.change?.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                         {activeData.change}
                     </span>
                </div>
            </div>
             {/* Little triangle pointer */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white/20 mx-auto mt-[-1px]"></div>
        </div>

      </div>
    </div>
  );
};

export default EngagementChart;
