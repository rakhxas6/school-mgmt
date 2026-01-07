import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// slicers
import { fetchStudents } from "../redux/slices/StudentSlicer";
// import { logout } from "../redux/slices/AuthSlicer";

const Complains = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const students = useSelector((state) => state.students?.students || []);
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Demo data - replace with actual API call later
  const [complaints] = useState([
    {
      id: 1,
      studentId: 1,
      userId: 8, // Matches your user ID
      studentEmail: "sudhan18@gmail.com",
      subject: "Broken Classroom Furniture",
      description: "The chairs in classroom 204 are broken and uncomfortable. Several students have complained about back pain.",
      category: "Facility",
      status: "pending",
      priority: "high",
      date: "2026-01-06",
      assignedTo: "Maintenance Department"
    },
    {
      id: 2,
      studentId: 2,
      userId: 2,
      studentEmail: "priya@example.com",
      subject: "Library Book Not Available",
      description: "The reference book 'Advanced Mathematics Vol. 2' has been unavailable for 3 weeks. Multiple students need it for exam preparation.",
      category: "Library",
      status: "in-progress",
      priority: "medium",
      date: "2026-01-05",
      assignedTo: "Library Staff"
    },
    {
      id: 3,
      studentId: 3,
      userId: 3,
      studentEmail: "amit@example.com",
      subject: "Cafeteria Food Quality Issue",
      description: "The food served in the cafeteria has been substandard recently. Many students are complaining about the taste and hygiene.",
      category: "Cafeteria",
      status: "pending",
      priority: "high",
      date: "2026-01-05",
      assignedTo: "Cafeteria Manager"
    },
    {
      id: 4,
      studentId: 4,
      userId: 4,
      studentEmail: "sita@example.com",
      subject: "Washroom Cleanliness",
      description: "The washrooms on the second floor are not being cleaned regularly. This is affecting student health and hygiene.",
      category: "Sanitation",
      status: "resolved",
      priority: "high",
      date: "2026-01-04",
      assignedTo: "Cleaning Staff",
      resolvedDate: "2026-01-05"
    },
    {
      id: 5,
      studentId: 5,
      userId: 8, // Another complaint from same user
      studentEmail: "sudhan18@gmail.com",
      subject: "Computer Lab Equipment Issue",
      description: "5 computers in the lab are not working properly. Students are unable to complete their practical assignments on time.",
      category: "Technology",
      status: "in-progress",
      priority: "medium",
      date: "2026-01-03",
      assignedTo: "IT Department"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [showMyComplaints, setShowMyComplaints] = useState(role === "student");

  // Fetch students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Function to get student info by ID from Redux
  const getStudentInfo = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      return {
        name: student.name,
        email: student.email,
        class: student.class,
        rollNumber: student.roll_number || `ID: ${student.id}`
      };
    }
    // Fallback demo data if student not found
    const demoStudents = {
      1: { name: "Sudhan", email: "sudhan18@gmail.com", class: "Class 11", rollNumber: "ID: 8" },
      2: { name: "Priya Sharma", email: "priya@example.com", class: "Grade 9-B", rollNumber: "2024045" },
      3: { name: "Amit Thapa", email: "amit@example.com", class: "Grade 11-C", rollNumber: "2024089" },
      4: { name: "Sita Rai", email: "sita@example.com", class: "Grade 8-A", rollNumber: "2024112" },
      5: { name: "Bikash Adhikari", email: "bikash@example.com", class: "Grade 12-B", rollNumber: "2024156" }
    };
    return demoStudents[studentId] || { name: "Unknown", email: "N/A", class: "N/A", rollNumber: "N/A" };
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter complaints based on user role and preferences
  const getFilteredComplaints = () => {
    let filtered = complaints;

    // If student role or "My Complaints" toggle is on, show only user's complaints
    if (showMyComplaints && user) {
      filtered = complaints.filter(complaint => 
        complaint.studentEmail === user.email || 
        complaint.userId === user.id
      );
    }

    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter(complaint => complaint.status === filter);
    }

    return filtered;
  };

  const filteredComplaints = getFilteredComplaints();

  // Get status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority badge styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Student Complaints</h2>
          <p className="text-gray-600">Track and manage student complaints and feedback</p>
          {user && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Logged in as:</span> {user.email}
              </p>
              {role && (
                <p className="text-sm text-blue-700 mt-1">
                  <span className="font-semibold">Role:</span> {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* View Toggle (for admin/teacher roles) */}
        {role !== "student" && (
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">View Mode:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMyComplaints(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !showMyComplaints
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Complaints
                </button>
                <button
                  onClick={() => setShowMyComplaints(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showMyComplaints
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  My Complaints
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({getFilteredComplaints().length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending ({complaints.filter(c => {
                const matchesUser = !showMyComplaints || c.studentEmail === user?.email || c.userId === user?.id;
                return c.status === "pending" && matchesUser;
              }).length})
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "in-progress"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Progress ({complaints.filter(c => {
                const matchesUser = !showMyComplaints || c.studentEmail === user?.email || c.userId === user?.id;
                return c.status === "in-progress" && matchesUser;
              }).length})
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "resolved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Resolved ({complaints.filter(c => {
                const matchesUser = !showMyComplaints || c.studentEmail === user?.email || c.userId === user?.id;
                return c.status === "resolved" && matchesUser;
              }).length})
            </button>
          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => {
            const studentInfo = getStudentInfo(complaint.studentId);
            const isMyComplaint = complaint.studentEmail === user?.email || complaint.userId === user?.id;
            
            return (
              <div
                key={complaint.id}
                className={`bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  isMyComplaint ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="p-5">
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {complaint.subject}
                        </h3>
                        {isMyComplaint && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            Your Complaint
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {studentInfo.name}
                        </span>
                        <span>Class: {studentInfo.class}</span>
                        <span>Roll: {studentInfo.rollNumber}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(complaint.date)}
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(complaint.status)}`}>
                          {complaint.status.replace("-", " ").toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityStyle(complaint.priority)}`}>
                          {complaint.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {complaint.description}
                  </p>

                  {/* Footer Section */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                      {complaint.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      Assigned to: <span className="font-medium">{complaint.assignedTo}</span>
                    </span>
                    {complaint.resolvedDate && (
                      <span className="text-sm text-green-600 ml-auto">
                        ✓ Resolved on {formatDate(complaint.resolvedDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredComplaints.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Complaints Found</h3>
            <p className="text-gray-500">
              {showMyComplaints 
                ? "You haven't submitted any complaints yet." 
                : `There are no ${filter !== "all" ? filter : ""} complaints to display.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complains;