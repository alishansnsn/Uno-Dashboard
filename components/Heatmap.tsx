
import React, { useState, useRef, useEffect } from 'react';
import { ClockIcon, ChevronDownIcon } from './Icons';

const Heatmap: React.FC = () => {
  // Generate a 7x8 grid
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = ['2pm', '1pm', '12pm', '11am', '10am', '9am', '8am'];
  
  const [selectedFilter, setSelectedFilter] = useState('Follower');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Custom mock intensity function to mimic the image pattern
  const getIntensity = (x: number, y: number) => {
    // Specific pattern to match the image broadly
    if (x === 3 && y === 3) return 3; // Brightest center
    if (x === 4 && y === 3) return 3;
    if (x === 3 && y === 2) return 2;
    if (x === 5 && y === 3) return 2;
    if (x === 2 && y === 3) return 2;
    if (x === 3 && y === 4) return 2;
    if (x === 4 && y === 2) return 2;
    if (x > 1 && x < 6 && y > 1 && y < 6) return 1;
    return 0;
  };

  const getColorClass = (intensity: number) => {
    switch(intensity) {
      case 3: return 'from-[#D1F366] to-[#D1F366] shadow-[0_0_8px_rgba(209,243,102,0.6)]';
      case 2: return 'from-[#B4D64D] to-[#B4D64D]';
      case 1: return 'from-[#4B5320] to-[#4B5320]'; // Dark olive
      default: return 'bg-[#27272A]'; // Base dark with pattern
    }
  };

  const getStyle = (intensity: number) => {
      if (intensity > 0) {
          // Diagonal stripes for colored blocks
          // Using repeating-linear-gradient to create the diagonal dashed effect
          // We mix transparency with a slightly darker shade to create the "dash" look on top of the base color
          const color = intensity === 3 ? '#D1F366' : intensity === 2 ? '#B4D64D' : '#4B5320';
          return {
             background: `repeating-linear-gradient(
                -45deg,
                ${color},
                ${color} 3px,
                rgba(0,0,0,0.2) 3px,
                rgba(0,0,0,0.2) 6px
              )`
          };
      } else {
          // Empty blocks pattern
          return {
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          };
      }
  };

  return (
    <div className="bg-dark-card rounded-[32px] p-6 h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-bg rounded-full border border-white/5">
                <ClockIcon className="text-gray-400" />
            </div>
            <h3 className="text-gray-200 font-medium">Time visit</h3>
        </div>
        
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
                <span>{selectedFilter}</span>
                <ChevronDownIcon />
            </button>
            
            {isDropdownOpen && (
                <div className="absolute right-0 top-11 w-32 bg-[#18181B] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                    {['Follower', 'Subscriber', 'Guest'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                setSelectedFilter(opt);
                                setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedFilter === opt ? 'text-neon-lime bg-white/5' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
         <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#27272A] border border-white/10"></div>
            <span>{'>'}500</span>
         </div>
         <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#4B5320]"></div>
            <span>{'>'}1,000</span>
         </div>
         <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#B4D64D]"></div>
            <span>{'>'}2,000</span>
         </div>
         <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#D1F366]"></div>
            <span>{'>'}3,000</span>
         </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex flex-1">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between pr-4 py-2">
                {hours.map(h => (
                    <span key={h} className="text-[10px] text-gray-600 font-medium text-right">{h}</span>
                ))}
            </div>
            
            {/* Grid */}
            <div className="grid grid-cols-7 gap-1.5 flex-1">
                {days.map((day, x) => (
                    <div key={day} className="flex flex-col gap-1.5">
                        {hours.map((_, y) => {
                            const intensity = getIntensity(x, y);
                            return (
                                <div 
                                    key={`${x}-${y}`} 
                                    className={`w-full h-full rounded-md transition-all duration-300 hover:scale-110 ${intensity === 0 ? 'bg-[#27272A]' : ''}`}
                                    style={getStyle(intensity)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
        
        {/* X Axis Labels */}
        <div className="flex pl-8 mt-3">
             <div className="grid grid-cols-7 gap-1.5 w-full text-center">
                 {days.map(d => (
                    <span key={d} className="text-[10px] text-gray-600 font-medium uppercase tracking-wide">{d}</span>
                 ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
