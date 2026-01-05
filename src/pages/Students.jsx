import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import StudentForm from "../components/StudentForm";
import { useSelector } from "react-redux";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const role = useSelector((state) => state.auth.role);
  const userEmail = useSelector((state) => state.auth.user?.email);

  const fetchStudents = async () => {
    const { data, error } = await supabase.from("students").select("*");
    if (error) {
      console.log("Error fetching students:", error);
    } else {
      setStudents(data || []);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) console.log("Delete error:", error);
      fetchStudents();
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Students</h2>

        {/* Admin → Add / Edit Form */}
        {role === "admin" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {editStudent ? "Edit Student" : "Add New Student"}
            </h3>
            <StudentForm
              onSuccess={fetchStudents}
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
                <div key={s.id} className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Name:</span>
                    <span className="text-gray-800">{s.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Email:</span>
                    <span className="text-gray-800">{s.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Class:</span>
                    <span className="text-gray-800">{s.class}</span>
                  </div>
                </div>
              ))}
            {students.filter((s) => s.email === userEmail).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No student information found for your account.
              </p>
            )}
          </div>
        )}

        {/* Guest → View-only all students */}
        {role === "guest" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {s.name}
                </h4>
                <p className="text-gray-600">
                  <span className="font-medium">Class:</span> {s.class}
                </p>
              </div>
            ))}
            {students.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No students found.</p>
              </div>
            )}
          </div>
        )}

        {/* Admin Table → Edit/Delete buttons */}
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
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {s.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {s.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setEditStudent(s)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(s.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No students found. Add your first student above!</p>
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