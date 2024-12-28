"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";
import { checkToken } from "@/utils/auth";

const AdminInterface = () => {
  const [users, setUsers] = useState([]); // All users fetched from the API
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {

    //checkToken(router)
    // Fetch users when the component loads
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("/api/admin");

        const usersData = await usersResponse.json();
        setUsers(usersData.data); // Set all users
        console.log(usersData);
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);


  return (
    <div className="admin-container">

      {/* Announcements Section */}
      <div className="admin-section">
        <h2 className="admin-section-title">Announcements</h2>
        <form className="admin-announcement-form">
          <textarea
            className="admin-announcement-textarea"
            placeholder="Write an announcement..."
          ></textarea>
          <button type="submit" className="admin-button announcement-button">
            Post Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInterface;
