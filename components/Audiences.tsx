
import React from 'react';
import { AGE_DISTRIBUTION, GENDER_DISTRIBUTION, INTERESTS_DATA } from '../constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { UserIcon } from './Icons';

const Audiences: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-white">Audience Demographics</h2>

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-card rounded-3xl p-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-1">Total Audience</p>
                <h3 className="text-3xl font-bold text-white">1.2M</h3>
                <span className="text-green-400 text-sm">+12% this month</span>
            </div>
            <div className="bg-dark-card rounded-3xl p-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-1">New Followers</p>
                <h3 className="text-3xl font-bold text-white">8,400</h3>
                <span className="text-green-400 text-sm">+5.4% this week</span>
            </div>
            <div className="bg-dark-card rounded-3xl p-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-1">Top Location</p>
                <h3 className="text-3xl font-bold text-white">United States</h3>
                <span className="text-gray-400 text-sm">35% of total audience</span>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[400px]">
             {/* Age & Gender */}
            <div className="bg-dark-card rounded-[32px] p-6 flex flex-col space-y-6">
                <div className="flex justify-between">
                     <h3 className="font-semibold text-lg text-white">Gender</h3>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                     <div className="flex-1 min-h-[200px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={GENDER_DISTRIBUTION}
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {GENDER_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A' }} itemStyle={{color:'#fff'}} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                            {GENDER_DISTRIBUTION.map((g) => (
                                <div key={g.name} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: g.fill}}></div>
                                    {g.name} {g.value}%
                                </div>
                            ))}
                        </div>
                     </div>
                     <div className="flex-1 min-h-[200px]">
                        <h4 className="text-sm text-gray-400 mb-2">Age Group</h4>
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={AGE_DISTRIBUTION} layout="vertical">
                                 <XAxis type="number" hide />
                                 <YAxis dataKey="name" type="category" width={40} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                                 <Bar dataKey="value" barSize={15} radius={[0, 4, 4, 0]}>
                                     {AGE_DISTRIBUTION.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={entry.fill} />
                                     ))}
                                 </Bar>
                                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A' }} />
                             </BarChart>
                         </ResponsiveContainer>
                     </div>
                </div>
            </div>

            {/* Interests */}
            <div className="bg-dark-card rounded-[32px] p-6 flex flex-col">
                <h3 className="font-semibold text-lg text-white mb-4">Audience Interests</h3>
                <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={INTERESTS_DATA}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Interests"
                                dataKey="A"
                                stroke="#D1F366"
                                strokeWidth={2}
                                fill="#D1F366"
                                fillOpacity={0.4}
                            />
                            <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A' }} itemStyle={{color:'#fff'}} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Audiences;
