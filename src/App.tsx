import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import AttendanceTable from './components/AttendanceTable';
import AddStudentModal from './components/AddStudentModal';
import MonthlyReportModal from './components/MonthlyReportModal';
import { Users } from 'lucide-react';
import { Student } from './types';

// Mock data
const FACULTIES = ['Software Engineering', 'Computer Science', 'Information Technology'];
const SEMESTERS = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
const COURSES: Record<string, string[]> = {
  'Software Engineering_Semester 1': ['SE101 - Intro to Programming', 'SE102 - Web Development'],
  'Software Engineering_Semester 2': ['SE201 - Software Design', 'SE202 - Database Systems'],
  'Computer Science_Semester 1': ['CS101 - Intro to CS', 'CS102 - Discrete Math'],
};

const MOCK_STUDENTS: Record<string, Student[]> = {
  'SE101 - Intro to Programming': [
    { id: '1', studentId: 'SE-001', fullName: 'Alice Smith', present: true },
    { id: '2', studentId: 'SE-002', fullName: 'Bob Jones', present: true },
    { id: '3', studentId: 'SE-004', fullName: 'Laura Dern', present: true },
    { id: '4', studentId: 'SE-005', fullName: 'Mike Ross', present: true },
  ]
};

export default function App() {
  const [faculty, setFaculty] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('2026-07-05');
  
  const [students, setStudents] = useState<Student[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Update courses and students when selection changes
  const currentCourses = (faculty && semester) ? (COURSES[`${faculty}_${semester}`] || []) : [];

  useEffect(() => {
    if (!currentCourses.includes(course)) {
      setCourse('');
    }
  }, [faculty, semester, currentCourses]);

  useEffect(() => {
    if (course) {
      setStudents(MOCK_STUDENTS[course] || []);
    } else {
      setStudents([]);
    }
  }, [course]);

  const handleToggleAttendance = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const handleAddStudent = (studentId: string, fullName: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId,
      fullName,
      present: true,
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    
    // Also update mock store so it persists if they switch back and forth
    if (course) {
      MOCK_STUDENTS[course] = updatedStudents;
    }
    setIsAddModalOpen(false);
  };

  const handleSaveAttendance = () => {
    if (course) {
      MOCK_STUDENTS[course] = [...students];
    }
    setToastMessage('Attendance saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#ECEFF1] flex flex-col font-sans text-slate-800">
      <Header />
      <Toolbar 
        faculty={faculty} setFaculty={setFaculty}
        semester={semester} setSemester={setSemester}
        course={course} setCourse={setCourse}
        date={date} setDate={setDate}
        faculties={FACULTIES}
        semesters={SEMESTERS}
        courses={currentCourses}
        onAddStudent={() => setIsAddModalOpen(true)}
        onOpenReport={() => setIsReportModalOpen(true)}
        onSaveAttendance={handleSaveAttendance}
      />

      <main className="flex-1 w-full p-4 flex flex-col mx-auto">
        <div className="flex-1 bg-white border border-[#B0BEC5] rounded-lg shadow-sm overflow-hidden flex flex-col">
          {!course ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
              <Users className="w-[68px] h-[68px] mb-4 text-[#B0BEC5] opacity-70" strokeWidth={1.5} />
              <h2 className="text-xl font-bold text-[#455A64] mb-1.5">No Course Selected</h2>
              <p className="text-[#607D8B] text-sm">Please select a faculty, semester and course to manage attendance.</p>
            </div>
          ) : (
            <AttendanceTable 
              students={students} 
              onToggleAttendance={handleToggleAttendance} 
            />
          )}
        </div>
      </main>

      {isAddModalOpen && (
        <AddStudentModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddStudent} 
        />
      )}
      
      {isReportModalOpen && (
        <MonthlyReportModal 
          onClose={() => setIsReportModalOpen(false)} 
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-[#10B981] text-white px-4 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-bold text-sm tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
