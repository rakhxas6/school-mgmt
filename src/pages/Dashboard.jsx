import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsPiggyBank } from "react-icons/bs";

import { fetchClasses } from "../redux/slices/ClassesSlicer";
import { fetchStudents } from "../redux/slices/StudentSlicer";
import { fetchTeachers } from "../redux/slices/TeacherSlicer";
import StudentSubjects from "./StudentSubjects";
import TeachersDashboard from "./TeachersDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { classes } = useSelector((state) => state.classes);
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
       { role === "admin" && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Overview of school data</p>
          </div>
        )}

        {/* Role-based Dashboard Content */}
        {role === "student" ? (
          <StudentSubjects />
        ) : role === "teacher" ? (
          <TeachersDashboard />
        ) : (
          <>
            {/* Stats Cards - Only for Admin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Students
                    </p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                      {students.length}
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Teachers
                    </p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                      {teachers.length}
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Classes</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                      {classes.length}
                    </h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      className="w-8 h-8 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Fees Collected
                    </p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                      $ 23,000
                    </h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <BsPiggyBank className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Student Performance - Admin View */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Student Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Attendance Rate</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">Class Rank</p>
                  <p className="text-2xl font-bold text-yellow-600">3rd</p>
                </div>
              </div>
            </div>

            {/* Recent Activity - Admin View */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                <p className="text-gray-500 text-center py-8">
                  No recent activity to display
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;