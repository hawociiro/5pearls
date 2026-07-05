import { Student } from '../types';

interface AttendanceTableProps {
  students: Student[];
  onToggleAttendance: (id: string) => void;
}

export default function AttendanceTable({ students, onToggleAttendance }: AttendanceTableProps) {
  const presentCount = students.filter(s => s.present).length;
  const totalCount = students.length;
  const rate = totalCount === 0 ? 0 : Math.round((presentCount / totalCount) * 100);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[13px] text-left border-collapse">
          <thead className="text-[11px] font-bold text-slate-500 uppercase bg-[#F4F6F8] border-b border-slate-300 sticky top-0 z-10 tracking-wider">
            <tr>
              <th className="px-6 py-4 w-16">#</th>
              <th className="px-6 py-4 w-48">STUDENT ID</th>
              <th className="px-6 py-4">FULL NAME</th>
              <th className="px-6 py-4 w-32 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                <td className="px-6 py-3.5 text-slate-400 font-medium">{String(idx + 1).padStart(2, '0')}</td>
                <td className="px-6 py-3.5 font-bold text-[#3B4C63]">{student.studentId}</td>
                <td className="px-6 py-3.5 font-bold text-[#2A3747]">{student.fullName}</td>
                <td className="px-6 py-3.5 text-right">
                  <div className="flex justify-end items-center h-full">
                    <input 
                      type="checkbox" 
                      checked={student.present}
                      onChange={() => onToggleAttendance(student.id)}
                      className="w-[18px] h-[18px] text-[#1E74E8] bg-white border-slate-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#1E74E8]"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 bg-slate-50/50">
                  No students added to this course yet. Add students to track attendance.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="bg-[#F4F6F8] border-t border-slate-300 px-6 py-3 flex justify-between items-center text-xs font-bold text-slate-600 shrink-0">
        <div>
          Total Enrolled: <span className="text-slate-800 ml-1">{totalCount}</span>
        </div>
        <div className="flex gap-8">
          <div>Present: <span className="text-[#10B981] ml-1">{presentCount}</span></div>
          <div>Absent: <span className="text-[#EF4444] ml-1">{totalCount - presentCount}</span></div>
          <div>Rate: <span className="text-[#DC2626] ml-1">{rate}%</span></div>
        </div>
      </div>
    </div>
  );
}
