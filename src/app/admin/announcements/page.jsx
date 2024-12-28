"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./announce.css";

const Announcements = () => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]); 
  const [render, setRender] = useState(true)
  const router = useRouter(); // Next.js router for navigation

  // Fetch all announcements when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcement");
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
  }, [render]); // Empty dependency array ensures this runs once when the component mounts

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    setRender(!render)

    if (!announcement.trim()) {
      alert("Announcement cannot be empty.");
      return;
    }

    try {
      const response = await fetch("/api/announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: announcement, admin: "Admin" }),
      });

      if (response.ok) {
        alert("Announcement posted successfully!");
        setAnnouncement(""); // Clear the textarea
        router.refresh(); // Refresh the page to reflect the changes
      } else {
        alert("Failed to post announcement. Please try again.");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
      {/* Announcements Section */}
      <div className="admin-section">
        <h2 className="admin-section-title">Announcements</h2>

        {/* Post New Announcement */}
        <form className="admin-announcement-form" onSubmit={handlePostAnnouncement}>
          <textarea
            className="admin-announcement-textarea"
            placeholder="Write an announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          ></textarea>
          <button type="submit" className="admin-button announcement-button">
            Post Announcement
          </button>
        </form>

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
