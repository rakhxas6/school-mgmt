import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../redux/slices/TeacherSlicer";

const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-600">Loading teachers...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading teachers: {error}</p>
        <button
          onClick={() => dispatch(fetchTeachers())}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!teachers || teachers.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No teachers found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Teachers</h2>
      <ul className="space-y-2" role="list">
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {teacher.name}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                <span className="font-medium">Class:</span> {teacher.class}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Role:</span> {teacher.role_name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Subject:</span> {teacher.subjects}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teachers;
