import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentForm from "../components/StudentForm";
import { fetchStudents } from "../redux/slices/StudentSlicer";
import { supabase } from "../services/supabaseClient";

const Students = () => {
  const dispatch = useDispatch();
  
  const [editStudent, setEditStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  
  const role = useSelector((state) => state.auth.role);
  const { students, loading, error } = useSelector((state) => state.students);
  const userEmail = useSelector((state) => state.auth.user?.email);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) {
        console.log("Delete error:", error);
        alert("Failed to delete student");
      } else {
        dispatch(fetchStudents());
      }
    }
  };

  // Get unique classes for filter
  const uniqueClasses = [...new Set(students.map(s => s.class))].sort();

  // Filter students based on search and class
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading students...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading students: {error}</p>
            <button
              onClick={() => dispatch(fetchStudents())}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Students</h2>
          <p className="text-gray-600">
            {role === "admin" && "Manage student records"}
            {role === "student" && "View your information"}
            {role === "guest" && "Browse student directory"}
          </p>
        </div>

        {/* Admin → Add / Edit Form */}
        {role === "admin" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {editStudent ? "Edit Student" : "Add New Student"}
              </h3>
              {editStudent && (
                <button
                  onClick={() => setEditStudent(null)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ✕ Cancel Edit
                </button>
              )}
            </div>
            <StudentForm
              onSuccess={() => {
                dispatch(fetchStudents());
                setEditStudent(null);
              }}
              editStudent={editStudent}
              clearEdit={() => setEditStudent(null)}
            />
          </div>
        )}

        {/* Student → Only view their own info */}
        {role === "student" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              My Information
            </h3>
            {students
              .filter((s) => s.email === userEmail)
              .map((s) => (
                <div key={s.id} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Full Name
                      </p>
                      <p className="text-lg text-gray-800">{s.name}</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Email Address
                      </p>
                      <p className="text-lg text-gray-800">{s.email}</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Class
                      </p>
                      <p className="text-lg text-gray-800">{s.class}</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Student ID
                      </p>
                      <p className="text-lg text-gray-800">#{s.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            {students.filter((s) => s.email === userEmail).length === 0 && (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-500">
                  No student information found for your account.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Guest & Admin → Search and Filter */}
        {(role === "guest" || role === "admin" || role === "teacher") && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Students
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Filter by Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Class
                  </label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Classes</option>
                    {uniqueClasses.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredStudents.length} of {students.length} students
              </div>
            </div>
          </>
        )}

        {/* Guest → Card View */}
        {(role === "guest" || role === "teacher") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-lg">
                      {s.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {s.name}
                    </h4>
                    <p className="text-sm text-gray-500">{s.class}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {s.email}
                  </p>
                </div>
              </div>
            ))}
            {filteredStudents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500">No students found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Admin → Table View with Edit/Delete */}
        {role === "admin" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">
                              {s.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {s.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {s.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {s.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setEditStudent(s)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(s.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-gray-500">
                    No students found matching your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;