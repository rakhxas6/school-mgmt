import React, { useState } from "react";

const Notices = () => {
  // Demo notices data
  const [notices] = useState([
    {
      id: 1,
      title: "Annual Sports Day - January 15, 2026",
      description: "All students are required to participate in the annual sports day. Please submit your event preferences by January 10th.",
      date: "2026-01-05",
      category: "Event",
      priority: "high"
    },
    {
      id: 2,
      title: "Mid-term Examination Schedule Released",
      description: "The mid-term examination schedule has been posted on the notice board. Students should review their exam dates and prepare accordingly.",
      date: "2026-01-04",
      category: "Academic",
      priority: "high"
    },
    {
      id: 3,
      title: "Library Books Return Reminder",
      description: "All borrowed library books must be returned by January 12th. Late returns will incur a fine of Rs. 10 per day.",
      date: "2026-01-03",
      category: "Library",
      priority: "medium"
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting - January 20, 2026",
      description: "Parents are invited to meet with teachers to discuss student progress. Please schedule your appointment at the front office.",
      date: "2026-01-02",
      category: "Meeting",
      priority: "medium"
    },
  ]);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">School Notices</h2>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800 flex-1">
                  {notice.title}
                </h3>
                {notice.date && (
                  <span className="text-sm text-gray-500 ml-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(notice.date)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{notice.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {notice.category && (
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {notice.category}
                  </span>
                )}
                {notice.priority && (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      notice.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : notice.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {notice.priority.toUpperCase()} PRIORITY
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;