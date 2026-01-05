import React from "react";
import homeImage from "../assets/sms.svg";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl w-full space-y-8 flex flex-row items-center">
        {/* Image Container */}
        <div className="flex justify-center items-center">
          <img
            src={homeImage}
            alt="School Management System"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="text-center space-y-6">
          <div className="div">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to
              <br />
              School Management
              <br />
              System
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Streamline school management, class organization, and add students
              and faculty. Seamlessly track attendance, assess performance, and
              provide feedback. Access records, view marks, and communicate
              effortlessly.
            </p>
          </div>
          {/* Call to Actions */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              <a href="/login">Login</a>
            </button>
            <p className="text-center text-sm text-gray-600">
              Are you a new student?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
