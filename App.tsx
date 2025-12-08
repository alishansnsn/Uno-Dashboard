
import React, { useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Insights from './components/Insights';
import Analytics from './components/Analytics';
import Audiences from './components/Audiences';
import Reports from './components/Reports';
import { ViewType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<ViewType>('overview');

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans p-4 md:p-8 lg:p-10 selection:bg-neon-lime selection:text-black">
      <div className="max-w-[1440px] mx-auto">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'insights' && <Insights />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'audiences' && <Audiences />}
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
}

export default App;
