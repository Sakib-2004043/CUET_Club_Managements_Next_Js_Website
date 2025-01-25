"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./announce.css";
import { tokenDecoder } from "@/utils/decode";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
          // Sort announcements by descending time (latest first)
          const sortedAnnouncements = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(sortedAnnouncements);
        } else {
          alert("Failed to fetch announcements. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    fetchAnnouncements();
  }, []);

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi")); // Split text around search term
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="announcement-container">
      {/* Header Section */}
      <header className="announcement-header">
        <h1 className="announcement-title">Club Announcements</h1>
        <p className="announcement-subtitle">
          Stay updated with the latest news and events!
        </p>
      </header>

      {/* Search Bar */}
      <div className="announcement-search-container">
        <input
          type="text"
          className="announcement-search-input"
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Announcements Table */}
      <section className="announcement-section">
        <div className="announcement-table-container">
          <h3 className="announcement-table-title">All Announcements</h3>
          <table className="announcement-table">
            <thead>
              <tr>
                <th>Poster</th>
                <th>Date</th>
                <th>Announcement</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement, index) => (
                  <tr key={index} className="announcement-table-row">
                    <td className="announcement-table-cell">
                      {highlightText(announcement.admin, searchQuery)}
                    </td>
                    <td className="announcement-table-cell">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </td>
                    <td className="announcement-table-cell">
                      {highlightText(announcement.message, searchQuery)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="announcement-no-data">
                    No announcements match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
