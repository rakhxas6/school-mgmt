import React, { useEffect } from "react";
import { fetchStudents } from "../redux/slices/StudentSlicer";
import { useDispatch, useSelector } from "react-redux";
import { subjects } from "../constants/constant";
import { fetchTeachers } from "../redux/slices/TeacherSlicer";

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  // console.log(user)
  // console.log(students)
  const { students } = useSelector((state) => state.students);

  
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);
  // console.log(teachers);

  const currentStudent = students.find((stu) => stu.email === user?.email);
  // console.log(currentStudent)

  // Demo data for student
  const studentInfo = {
    name: currentStudent?.name || user?.name || "Student Name",
    rollNumber: currentStudent?.rollNumber || "N/A",
    email: currentStudent?.email || user?.email || "N/A",
    class: currentStudent?.class || "N/A",
    section: currentStudent?.section || "Science",
  };

  // Function to get grade color
  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Calculate overall stats
  const overallPercentage = (
    subjects.reduce((acc, sub) => acc + sub.percentage, 0) / subjects.length
  ).toFixed(1);
  const overallAttendance = (
    subjects.reduce((acc, sub) => acc + sub.attendance, 0) / subjects.length
  ).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Student Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{studentInfo.name}</h2>
            <div className="space-y-1 text-blue-100">
              <p>Roll Number: {studentInfo.rollNumber}</p>
              <p>Class: {studentInfo.class}</p>
              <p>Section: {studentInfo.section}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm mb-1">Overall Performance</p>
              <p className="text-4xl font-bold">{overallPercentage}%</p>
              <p className="text-sm mt-1">Attendance: {overallAttendance}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Subject Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                    subject.grade
                  )}`}
                >
                  {subject.grade}
                </span>
              </div>
            </div>

            {/* Subject Details */}
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Teacher</p>
                <p className="text-gray-800 font-medium">{subject.teacher}</p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                {/* Performance */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-semibold text-gray-800">
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Attendance */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-semibold text-gray-800">
                      {subject.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${subject.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Subjects</p>
              <p className="text-3xl font-bold text-gray-800">
                {subjects.length}
              </p>
            </div>
            <div className="text-4xl">📖</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-green-600">
                {overallPercentage}%
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Attendance</p>
              <p className="text-3xl font-bold text-blue-600">
                {overallAttendance}%
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;
