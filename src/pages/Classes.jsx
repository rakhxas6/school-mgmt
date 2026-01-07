import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../redux/slices/ClassesSlicer";
import { fetchStudents } from "../redux/slices/StudentSlicer";
import { fetchTeachers } from "../redux/slices/TeacherSlicer";

const Classes = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  // console.log(classes)
  // console.log(students)

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id || classItem.name}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {classItem.name}
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                  <span className="text-gray-700 font-medium">Students</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {
                    students.filter(
                      (student) => student.class === classItem.name
                    ).length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Teachers</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {
                    teachers.filter(
                      (teacher) => teacher.class === classItem.name
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No classes found</p>
        </div>
      )}
    </div>
  );
};

export default Classes;
