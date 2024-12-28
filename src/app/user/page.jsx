"use client";
import { useEffect, useState } from "react";

import "./user.css"

const UserLanding = () => {

  
  const [user, setUser] = useState({
    name: "John Doe",
    studentId: "2004043",
    department: "CSE",
    hall: "SRH",
    batch: "2020",
  });

  const [announcements, setAnnouncements] = useState([
    { id: 1, message: "Club registration is open now!", date: "2024-12-10" },
    { id: 2, message: "New meeting scheduled for SRH residents.", date: "2024-12-09" },
    { id: 3, message: "Welcome new members of the Robotics Club!", date: "2024-12-08" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <header className="mb-5 text-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-gray-500 mt-2">Today is {new Date().toLocaleDateString()}</p>
      </header>

      {/* Quick Access Section */}
      <section className="grid grid-cols-2 gap-5 mb-10">
        <div className="bg-blue-500 text-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Join a Club</h2>
          <p className="mt-2">Explore available clubs and join the one you like!</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">My Clubs</h2>
          <p className="mt-2">View clubs you are currently a member of.</p>
        </div>
        <div className="bg-purple-500 text-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Announcements</h2>
          <p className="mt-2">Check the latest updates from your clubs.</p>
        </div>
        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Request Status</h2>
          <p className="mt-2">Track your pending club requests.</p>
        </div>
      </section>

      {/* Announcements */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Recent Announcements</h2>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          {announcements.length > 0 ? (
            <ul>
              {announcements.map((a) => (
                <li key={a.id} className="mb-3 border-b pb-2">
                  <p className="text-gray-800">{a.message}</p>
                  <p className="text-sm text-gray-500">Date: {a.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No announcements yet.</p>
          )}
        </div>
      </section>

      {/* User Info */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Your Info</h2>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Student ID:</strong> {user.studentId}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Batch:</strong> {user.batch}</p>
          <p><strong>Hall:</strong> {user.hall}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-600">
        <p>&copy; 2024 CUET Club Management System</p>
      </footer>
    </div>
  );
};

export default UserLanding;
