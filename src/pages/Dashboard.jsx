import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlicer";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchClasses } from "../redux/slices/ClassesSlicer";
import { fetchStudents } from "../redux/slices/StudentSlicer";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { classes} = useSelector((state) => state.classes);
  const { students} = useSelector((state) => state.students);
  // console.log(classes)
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h2 className="text-xl font-bold text-gray-800">School MS</h2>
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/students"
                  className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                >
                  Students
                </Link>
                <Link
                  to="/teachers"
                  className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                >
                  Teachers
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm text-gray-600">
                <span className="font-semibold">{user?.email}</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors flex items-center space-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              Students
            </Link>
            <Link
              to="/teachers"
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              Teachers
            </Link>
            <div className="text-sm text-gray-600 pt-2">
              <span className="font-semibold">{user?.email}</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                {role}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of school data</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Students
                </p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{students.length}</h3>
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
                <h3 className="text-3xl font-bold text-gray-800 mt-2">0</h3>
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
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{classes.length}</h3>
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
        </div>

        {/* Recent Activity */}
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
      </div>
    </div>
  );
};

export default Dashboard;
