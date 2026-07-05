import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddStudentModalProps {
  onClose: () => void;
  onAdd: (studentId: string, fullName: string) => void;
}

export default function AddStudentModal({ onClose, onAdd }: AddStudentModalProps) {
  const [tab, setTab] = useState<'manual' | 'csv'>('manual');
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim() && fullName.trim()) {
      onAdd(studentId.trim(), fullName.trim());
    }
  };

  const isFormValid = studentId.trim() && fullName.trim();

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-[1px]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-bold text-[#2A3747]">Add Students</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 gap-6">
          <button 
            className={`py-3 text-sm font-bold text-center border-b-2 transition-colors focus:outline-none ${tab === 'manual' ? 'border-[#E53935] text-[#E53935]' : 'border-transparent text-[#7F8EA3] hover:text-[#52647A]'}`}
            onClick={() => setTab('manual')}
          >
            Manual Entry
          </button>
          <button 
            className={`py-3 text-sm font-bold text-center border-b-2 transition-colors focus:outline-none ${tab === 'csv' ? 'border-[#E53935] text-[#E53935]' : 'border-transparent text-[#7F8EA3] hover:text-[#52647A]'}`}
            onClick={() => setTab('csv')}
          >
            CSV Import
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {tab === 'manual' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[11px] font-bold text-[#7F8EA3] uppercase mb-2 tracking-wider">Roll Number</label>
                <input 
                  type="text" 
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  placeholder="e.g. SE-006"
                  className="border border-slate-400 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#E53935] focus:ring-1 focus:ring-[#E53935] w-full text-slate-800 font-medium placeholder-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold text-[#7F8EA3] uppercase mb-2 tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="border border-slate-400 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#E53935] focus:ring-1 focus:ring-[#E53935] w-full text-slate-800 font-medium placeholder-slate-400"
                />
              </div>
              <button 
                type="submit"
                disabled={!isFormValid}
                className={`mt-2 py-3 rounded-md text-sm font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E53935]
                  ${isFormValid ? 'bg-[#F26C78] hover:bg-[#E55361]' : 'bg-[#F4A5AC] cursor-not-allowed'}`}
              >
                Add Student
              </button>
            </form>
          ) : (
            <div className="py-12 text-center text-[#7F8EA3] text-sm bg-slate-50 rounded-md border border-dashed border-slate-300">
              CSV Import functionality is coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
