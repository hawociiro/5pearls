import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#8A1A2B] text-white px-6 py-3 flex justify-between items-center shadow-md select-none">
      <div className="flex items-center gap-4">
        <div className="bg-[#BA2A3F] p-2 rounded-md shadow-sm border border-white/10">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide uppercase">Attendance Manager</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right flex flex-col justify-center">
          <span className="text-[13px] font-bold leading-tight">Eng Said Abdihakim</span>
          <span className="text-[11px] text-red-200 leading-tight">Software Engineering</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#BA2A3F] border-[2px] border-[#E86D7F] flex items-center justify-center font-bold text-sm shadow-sm">
          SA
        </div>
      </div>
    </header>
  );
}
