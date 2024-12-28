"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./announce.css";
import { tokenDecoder } from "@/utils/decode";

const Announcements = () => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]); 
  const [render, setRender] = useState(true)
  const router = useRouter(); // Next.js router for navigation

  

  // Fetch all announcements when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      
      try {
        const tokenData = await tokenDecoder(router);

    
        const response = await fetch("/api/announcement", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId: tokenData.studentId }),
      });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.data); // Set the fetched announcements
        } else {
          alert("Failed to fetch announcements. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    fetchAnnouncements();
  }, [render]);

  return (
    <div className="admin-container">
      {/* Announcements Section */}
      <div className="admin-section">

        {/* Displaying Announcements in Table */}
        <div className="announcement-table-container">
          <h3 className="announcement-table-title">All Announcements</h3>
          <table className="announcement-table">
            <thead>
              <tr>
                <th>Poster</th>
                <th className="announcement-table-header">Date</th>
                <th className="announcement-table-header">Announcements</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <tr key={index} className="announcement-table-row">
                    <td className="announcement-table-cell">{announcement.admin}</td>
                    <td className="announcement-table-cell">
                      {new Date(announcement.createdAt).toLocaleString()} {/* Format date */}
                    </td>
                    <td className="announcement-table-cell">{announcement.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="announcement-table-cell">
                    No announcements to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
