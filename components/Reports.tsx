
import React from 'react';
import { REPORTS_LIST } from '../constants';
import { FileTextIcon, DownloadIcon, FilterIcon, PlusIcon } from './Icons';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">Generated Reports</h2>
            <div className="flex items-center gap-3">
                 <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 transition-colors">
                     <FilterIcon className="w-4 h-4" />
                     <span className="text-sm">Filter</span>
                 </button>
                 <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neon-lime text-black font-semibold hover:bg-neon-lime/90 transition-colors">
                     <PlusIcon className="w-4 h-4" />
                     <span className="text-sm">Create New</span>
                 </button>
            </div>
        </div>

        <div className="bg-dark-card rounded-[32px] overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="text-xs uppercase bg-white/5 text-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Report Name</th>
                            <th className="px-6 py-4 font-semibold">Date Created</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Size</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {REPORTS_LIST.map((report) => (
                            <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/5 rounded-lg text-neon-purple group-hover:text-neon-lime transition-colors">
                                            <FileTextIcon />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{report.name}</p>
                                            <p className="text-xs text-gray-500">{report.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{report.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${report.type === 'PDF' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-green-500/30 text-green-400 bg-green-500/10'}`}>
                                        {report.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{report.size}</td>
                                <td className="px-6 py-4">
                                    {report.status === 'Ready' ? (
                                        <span className="flex items-center text-green-400 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                                            Ready
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-yellow-400 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
                                            Processing
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        className={`p-2 rounded-full transition-colors ${report.status === 'Ready' ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'opacity-30 cursor-not-allowed text-gray-600'}`}
                                        disabled={report.status !== 'Ready'}
                                    >
                                        <DownloadIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination / Footer */}
            <div className="p-4 border-t border-white/5 flex justify-center">
                <button className="text-xs text-gray-500 hover:text-white transition-colors">View all reports</button>
            </div>
        </div>
    </div>
  );
};

export default Reports;
