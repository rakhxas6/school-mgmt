import React, { useEffect, useState } from "react";
// import { BookOpen, Calendar, User, TrendingUp } from 'lucide-react';
import { BiUser, BiCalendar, BiBookOpen, BiTrendingUp } from "react-icons/bi";
import { fetchStudents } from "../redux/slices/StudentSlicer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../redux/slices/TeacherSlicer";

export default function TeachersDashboard() {
  const dispatch = useDispatch();

  // const { user, role } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);

  //  console.log(students)

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const [student] = useState([
    {
      id: students[0]?.id,
      name: students[0]?.name,
      grade: students[0]?.class,
      subjects: [
        { name: "Mathematics", teacher: teachers[0]?.name, attendance: 92 },
        { name: "Physics", teacher: teachers[1]?.name, attendance: 88 },
        { name: "Chemistry", teacher: teachers[2]?.name, attendance: 95 },
        { name: "English", teacher: teachers[2]?.name, attendance: 90 },
      ],
    },
    {
      id: students[1]?.id,
      name: students[1]?.name,
      grade: students[1]?.class,
      subjects: [
        { name: "Mathematics", teacher: teachers[0]?.name, attendance: 85 },
        { name: "Physics", teacher: teachers[1]?.name, attendance: 78 },
        { name: "Chemistry", teacher: teachers[2]?.name, attendance: 82 },
        { name: "English", teacher: teachers[2]?.name, attendance: 88 },
      ],
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(student[0]);

  const calculateOverallAttendance = (subjects) => {
    const total = subjects.reduce((sum, sub) => sum + sub?.attendance, 0);
    return (total / subjects?.length).toFixed(1);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBg = (percentage) => {
    if (percentage >= 90) return "bg-green-100";
    if (percentage >= 75) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Attendance Dashboard
          </h1>
          <p className="text-gray-600">
            Track student performance and attendance records
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">
                  {student?.length}
                </p>
              </div>
              <BiUser className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Subjects</p>
                <p className="text-3xl font-bold text-gray-800">
                  {selectedStudent.subjects?.length}
                </p>
              </div>
              <BiBookOpen className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Overall Attendance</p>
                <p
                  className={`text-3xl font-bold ${getAttendanceColor(
                    calculateOverallAttendance(selectedStudent?.subjects)
                  )}`}
                >
                  {calculateOverallAttendance(selectedStudent?.subjects)}%
                </p>
              </div>
              <BiTrendingUp className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Students
            </h2>
            <div className="space-y-2">
              {student.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedStudent.id === student.id
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <p className="font-semibold text-gray-800">{student?.name}</p>
                  <p className="text-sm text-gray-600">
                    Grade: {student?.grade}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Avg: {calculateOverallAttendance(student?.subjects)}%
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {selectedStudent?.name}
              </h2>
              <p className="text-gray-600">Grade: {selectedStudent?.grade}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <BiCalendar className="w-5 h-5" />
              Attendance by Subject
            </h3>

            <div className="space-y-4">
              {selectedStudent.subjects.map((subject, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">
                        {subject?.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Teacher: {subject?.teacher}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getAttendanceBg(
                        subject?.attendance
                      )} ${getAttendanceColor(subject?.attendance)}`}
                    >
                      {subject?.attendance}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        subject.attendance >= 90
                          ? "bg-green-500"
                          : subject.attendance >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${subject?.attendance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">
                Attendance Summary
              </h4>
              <p className="text-sm text-gray-600">
                Overall attendance rate:{" "}
                <span className="font-semibold">
                  {calculateOverallAttendance(selectedStudent.subjects)}%
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {calculateOverallAttendance(selectedStudent.subjects) >= 90
                  ? "✓ Excellent attendance record"
                  : calculateOverallAttendance(selectedStudent.subjects) >= 75
                  ? "⚠ Good attendance, but room for improvement"
                  : "⚠ Attendance needs attention"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
