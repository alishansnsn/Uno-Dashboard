import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { TRAFFIC_DATA, DEVICE_DATA, GEO_DATA, TOP_PAGES } from '../constants';
import { GlobeIcon, UserIcon, ClockIcon, ActivityIcon } from './Icons';

const MiniStat: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-dark-card rounded-3xl p-5 border border-white/5 flex items-center space-x-4">
        <div className="p-3 bg-white/5 rounded-full text-neon-lime">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
             <h2 className="text-2xl font-semibold text-white">Traffic Analysis</h2>
             <div className="flex space-x-2 bg-dark-card p-1 rounded-full border border-white/5">
                 {['Today', 'Week', 'Month', 'Year'].map(t => (
                     <button key={t} className={`px-4 py-1.5 text-xs rounded-full transition-colors ${t === 'Today' ? 'bg-neon-lime text-black font-bold' : 'text-gray-400 hover:text-white'}`}>{t}</button>
                 ))}
             </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStat label="Total Users" value="24,593" icon={<UserIcon />} />
            <MiniStat label="Avg. Duration" value="4m 32s" icon={<ClockIcon />} />
            <MiniStat label="Bounce Rate" value="42.5%" icon={<ActivityIcon />} />
            <MiniStat label="Active Now" value="312" icon={<GlobeIcon />} />
        </div>

        {/* Main Traffic Chart */}
        <div className="bg-dark-card rounded-[32px] p-6 h-[350px] flex flex-col">
            <h3 className="font-semibold text-lg text-white mb-6">Traffic Volume</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRAFFIC_DATA}>
                        <defs>
                            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D1F366" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#D1F366" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px', color: '#fff' }} 
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#D1F366" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Breakdown Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[300px] lg:h-[350px]">
            {/* Devices */}
            <div className="bg-dark-card rounded-[32px] p-6 flex flex-col">
                <h3 className="font-semibold text-lg text-white mb-2">Device Usage</h3>
                <div className="flex-1">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={DEVICE_DATA}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {DEVICE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                            <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Geography */}
            <div className="bg-dark-card rounded-[32px] p-6 lg:col-span-2 flex flex-col">
                <h3 className="font-semibold text-lg text-white mb-2">Top Countries</h3>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={GEO_DATA} margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#A1A1AA', fontSize: 12}} width={60} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A' }} />
                            <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
                                {GEO_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#D1F366' : '#27272A'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-dark-card rounded-[32px] p-6 overflow-hidden">
             <h3 className="font-semibold text-lg text-white mb-6">Top Landing Pages</h3>
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-400">
                     <thead className="text-xs uppercase bg-white/5 text-gray-200">
                         <tr>
                             <th className="px-6 py-3 rounded-l-xl">Page URL</th>
                             <th className="px-6 py-3">Views</th>
                             <th className="px-6 py-3">Bounce Rate</th>
                             <th className="px-6 py-3 rounded-r-xl">Avg. Duration</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                         {TOP_PAGES.map((row, i) => (
                             <tr key={i} className="hover:bg-white/5 transition-colors">
                                 <td className="px-6 py-4 font-medium text-white">{row.page}</td>
                                 <td className="px-6 py-4">{row.views}</td>
                                 <td className="px-6 py-4 text-neon-lime">{row.bounce}</td>
                                 <td className="px-6 py-4">{row.duration}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </div>
    </div>
  );
};

export default Analytics;