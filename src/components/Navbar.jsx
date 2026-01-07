import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, role, handleLogout }) => {
  return (
    
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
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors flex items-center gap-2"
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
  )
}

export default Navbar