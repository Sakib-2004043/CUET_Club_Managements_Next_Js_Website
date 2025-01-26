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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ admin: tokenData.admin }),
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
  }, [render]); // Empty dependency array ensures this runs once when the component mounts

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();

    const tokenData = await tokenDecoder(router);

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
        body: JSON.stringify({ text: announcement, admin: tokenData.admin }),
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
    setRender(!render)
  };

  return (
    <div className="moderation-container">
      {/* Announcements Section */}
      <div className="moderation-section">
        <h2 className="moderation-section-title">Announcements</h2>

        {/* Post New Announcement */}
        <form className="moderation-announcement-form" onSubmit={handlePostAnnouncement}>
          <textarea
            className="moderation-announcement-textarea"
            placeholder="Write an announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          ></textarea>
          <button type="submit" className="moderation-button announcement-button">
            Post Announcement
          </button>
        </form>

        {/* Displaying Announcements in Table */}
        <div className="moderation-announcement-table-container">
          <h3 className="moderation-announcement-table-title">All Announcements</h3>
          <table className="moderation-announcement-table">
            <thead>
              <tr>
                <th>Poster</th>
                <th className="moderation-announcement-table-header">Date</th>
                <th className="moderation-announcement-table-header">Announcements</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <tr key={index} className="moderation-announcement-table-row">
                    <td className="moderation-announcement-table-cell">{announcement.admin}</td>
                    <td className="moderation-announcement-table-cell">
                      {new Date(announcement.createdAt).toLocaleString()} {/* Format date */}
                    </td>
                    <td className="moderation-announcement-table-cell">{announcement.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="moderation-announcement-table-cell">
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
