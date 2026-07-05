import React, { useState } from 'react';
import { X, Circle } from 'lucide-react';

interface MonthlyReportModalProps {
  onClose: () => void;
}

export default function MonthlyReportModal({ onClose }: MonthlyReportModalProps) {
  const [month, setMonth] = useState('2026-07');

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-[1px]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-[#2A3747]">Monthly Report</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-[#7F8EA3] uppercase mb-2 tracking-wider">Select Month</label>
            <input 
              type="month" 
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="border border-slate-400 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#E50000] focus:ring-1 focus:ring-[#E50000] w-full text-slate-800 font-medium"
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-md border border-red-100 bg-[#FFF5F5] text-[#C21C1C]">
            <div className="shrink-0 mt-0.5">
              <Circle className="w-5 h-5 text-[#E60000]" strokeWidth={2} />
            </div>
            <p className="text-[13px] leading-relaxed font-medium">
              Generates a report where each attended lecture counts as 1 mark, up to a maximum of 4 marks per month.
            </p>
          </div>

          <button 
            className="w-full py-3 rounded-md text-sm font-bold text-white bg-[#E60000] hover:bg-[#CC0000] transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E60000]"
          >
            Generate Report CSV
          </button>
        </div>
      </div>
    </div>
  );
}
