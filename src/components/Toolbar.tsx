import { Plus, CalendarDays, Download, Save } from 'lucide-react';

interface ToolbarProps {
  faculty: string;
  setFaculty: (v: string) => void;
  semester: string;
  setSemester: (v: string) => void;
  course: string;
  setCourse: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  faculties: string[];
  semesters: string[];
  courses: string[];
  onAddStudent: () => void;
  onOpenReport: () => void;
  onSaveAttendance: () => void;
}

export default function Toolbar({
  faculty, setFaculty,
  semester, setSemester,
  course, setCourse,
  date, setDate,
  faculties, semesters, courses,
  onAddStudent, onOpenReport, onSaveAttendance
}: ToolbarProps) {
  return (
    <div className="bg-white px-4 py-3 border-b border-slate-300 shadow-sm flex flex-wrap items-end gap-4">
      <div className="flex flex-col flex-1 min-w-[180px] max-w-[240px]">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Faculty</label>
        <select 
          value={faculty} 
          onChange={e => setFaculty(e.target.value)}
          className="border border-slate-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#8A1A2B] focus:ring-1 focus:ring-[#8A1A2B] bg-white w-full transition-shadow"
        >
          <option value="">Select Faculty...</option>
          {faculties.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="flex flex-col flex-1 min-w-[160px] max-w-[220px]">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Semester</label>
        <select 
          value={semester} 
          onChange={e => setSemester(e.target.value)}
          className="border border-slate-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#8A1A2B] focus:ring-1 focus:ring-[#8A1A2B] bg-white w-full transition-shadow"
        >
          <option value="">Select Semester...</option>
          {semesters.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex flex-col flex-2 min-w-[250px] max-w-[400px]">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Course</label>
        <select 
          value={course} 
          onChange={e => setCourse(e.target.value)}
          className="border border-slate-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#8A1A2B] focus:ring-1 focus:ring-[#8A1A2B] bg-white w-full disabled:bg-slate-50 disabled:text-slate-400 transition-shadow"
          disabled={!faculty || !semester}
        >
          <option value="">Select Course...</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex flex-col w-[180px]">
        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Date</label>
        <input 
          type="date" 
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border border-slate-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#8A1A2B] focus:ring-1 focus:ring-[#8A1A2B] w-full transition-shadow text-slate-800"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto pt-4 md:pt-0">
        <button 
          onClick={onSaveAttendance}
          disabled={!course}
          className={`px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors h-[38px] flex items-center justify-center min-w-[130px]
            ${course ? 'bg-[#b11f2d] hover:bg-[#8A1A2B] shadow-sm' : 'bg-[#f4868f] cursor-not-allowed'}`}
        >
          Save Attendance
        </button>
        <button disabled={!course} onClick={onAddStudent} className="p-2 border border-slate-300 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-[38px] w-[38px] flex items-center justify-center bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <Plus className="w-5 h-5" />
        </button>
        <button disabled={!course} onClick={onOpenReport} className="p-2 border border-slate-300 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-[38px] w-[38px] flex items-center justify-center bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <CalendarDays className="w-5 h-5" />
        </button>
        <button disabled={!course} className="p-2 border border-slate-300 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-[38px] w-[38px] flex items-center justify-center bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <Download className="w-5 h-5" />
        </button>
        <button disabled={!course} className="p-2 border border-slate-300 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-[38px] w-[38px] flex items-center justify-center bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <Save className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
