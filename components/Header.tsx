
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon, PresentationIcon, UserIcon, SettingsIcon, LogOutIcon, HelpCircleIcon } from './Icons';
import { ViewType } from '../types';

interface HeaderProps {
    activeTab?: ViewType;
    onTabChange?: (tab: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'overview', onTabChange }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleNavClick = (tab: ViewType) => {
      if (onTabChange) {
          onTabChange(tab);
      }
  };

  return (
    <header className="flex items-center justify-between mb-8 relative z-50">
      {/* Left Navigation */}
      <div className="flex items-center space-x-2 bg-[#18181B] p-1.5 rounded-full border border-white/5">
        <div className="flex items-center space-x-2">
            <div className="bg-[#27272A] p-2 rounded-full">
                <svg className="w-5 h-5 text-neon-purple" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
            </div>
        </div>

        <nav className="flex items-center space-x-1">
          <button 
            onClick={() => handleNavClick('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(209,243,102,0.3)]' : 'text-gray-400 hover:text-white'}`}
          >
            <PresentationIcon className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button 
             onClick={() => handleNavClick('insights')}
             className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm transition-colors ${activeTab === 'insights' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(209,243,102,0.3)] font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            <span>Insights</span>
            {activeTab !== 'insights' && <ChevronDownIcon className="w-3 h-3" />}
          </button>
          <button 
             onClick={() => handleNavClick('analytics')}
             className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm transition-colors relative ${activeTab === 'analytics' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(209,243,102,0.3)] font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            <span>Analytics</span>
             {activeTab !== 'analytics' && (
                <div className="absolute top-1 right-1 bg-yellow-400 text-black rounded-full w-3 h-3 flex items-center justify-center">
                    <span className="text-[8px] font-bold">?</span>
                </div>
             )}
          </button>
          <button 
            onClick={() => handleNavClick('audiences')}
            className={`px-4 py-2 rounded-full text-sm transition-colors hidden sm:block ${activeTab === 'audiences' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(209,243,102,0.3)] font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Audiences
          </button>
          <button 
            onClick={() => handleNavClick('reports')}
            className={`px-4 py-2 rounded-full text-sm transition-colors hidden sm:block ${activeTab === 'reports' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(209,243,102,0.3)] font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <button className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <SearchIcon />
        </button>
        <button className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 relative">
          <BellIcon />
          <div className="absolute top-3 right-3 w-2 h-2 bg-neon-lime rounded-full border-2 border-[#0F0F11]"></div>
        </button>
        
        <div 
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer hover:border-neon-lime transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-full h-full object-cover" />
        </div>

        {/* Dropdown Menu */}
        {isProfileOpen && (
            <div className="absolute top-14 right-0 w-56 bg-[#18181B] border border-white/10 rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-medium text-white">Darlene Robertson</p>
                    <p className="text-xs text-gray-500 truncate">darlene@example.com</p>
                </div>
                <div className="py-1">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center space-x-2 transition-colors">
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center space-x-2 transition-colors">
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                    </button>
                </div>
                <div className="border-t border-white/5 py-1">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2 transition-colors">
                        <LogOutIcon className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
