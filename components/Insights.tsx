import React from 'react';
import { INSIGHT_ALERTS, GROWTH_DATA, SENTIMENT_DATA } from '../constants';
import { TrendingUpIcon, AlertCircleIcon, ActivityIcon, CheckIcon, ArrowUpRightIcon } from './Icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const InsightCard: React.FC<{ data: any }> = ({ data }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return <TrendingUpIcon className="text-black" />;
      case 'warning': return <AlertCircleIcon className="text-black" />;
      default: return <ActivityIcon className="text-black" />;
    }
  };

  const getBg = (type: string) => {
    switch(type) {
        case 'success': return 'bg-neon-lime text-black';
        case 'warning': return 'bg-orange-400 text-black';
        default: return 'bg-neon-purple text-white';
    }
  };

  return (
    <div className="bg-dark-card rounded-[32px] p-6 border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-full ${getBg(data.type)}`}>
                {getIcon(data.type)}
            </div>
            {data.change && (
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                    {data.change}
                 </span>
            )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{data.description}</p>
        <button className="mt-4 flex items-center space-x-2 text-sm font-medium hover:text-neon-lime transition-colors">
            <span>View details</span>
            <ArrowUpRightIcon className="w-3 h-3" />
        </button>
    </div>
  );
};

const Insights: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
             <h2 className="text-2xl font-semibold text-white">AI-Driven Insights</h2>
             <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-gray-300 transition-colors">Refresh Analysis</button>
        </div>

        {/* Top Row: Insight Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSIGHT_ALERTS.map((alert, idx) => (
                <InsightCard key={idx} data={alert} />
            ))}
        </div>

        {/* Middle Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            {/* Growth Trend */}
            <div className="bg-dark-card rounded-[32px] p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-white">Growth Trajectory</h3>
                    <div className="flex space-x-2">
                        <span className="flex items-center text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-neon-lime mr-2"></div> Organic</span>
                        <span className="flex items-center text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-neon-purple mr-2"></div> Paid</span>
                    </div>
                </div>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={GROWTH_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px', color: '#fff' }} 
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#D1F366" strokeWidth={3} dot={{r: 4, fill: '#18181B', stroke: '#D1F366', strokeWidth: 2}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="value2" stroke="#A855F7" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-dark-card rounded-[32px] p-6 flex flex-col">
                <h3 className="font-semibold text-lg text-white mb-6">Audience Sentiment</h3>
                <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={SENTIMENT_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {SENTIMENT_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px' }} itemStyle={{color: '#fff'}} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                         <span className="text-3xl font-bold text-white">85%</span>
                         <span className="text-sm text-gray-500">Positive</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Row: Recommendations */}
        <div className="bg-dark-card rounded-[32px] p-6">
            <h3 className="font-semibold text-lg text-white mb-4">Recommended Actions</h3>
            <div className="space-y-3">
                {[
                    'Reply to top 3 comments on "Summer Vibes" post to boost engagement.',
                    'Schedule "Product Teaser" for Tuesday 9:00 AM (Peak time).',
                    'Update bio link to point to new landing page.'
                ].map((action, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0F0F11] rounded-2xl border border-white/5 hover:border-neon-lime/30 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-gray-400">
                                <span className="text-xs">{i + 1}</span>
                            </div>
                            <span className="text-gray-300 text-sm">{action}</span>
                        </div>
                        <button className="text-neon-lime text-sm font-medium hover:underline">Do this</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Insights;