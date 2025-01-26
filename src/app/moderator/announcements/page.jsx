"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenDecoder } from "@/utils/decode";

import "./announce.css"

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const router = useRouter(); // Next.js router for navigation
  const [render, setRender] = useState(true);

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
    <div className="mod-annc-container">
      {/* Page Header */}
      <header className="mod-annc-header">
        <h1 className="mod-annc-title">Announcements</h1>
        <p className="mod-annc-subtitle">
          Stay informed with the latest updates and announcements.
        </p>
      </header>

      {/* Announcements Table */}
      <main className="mod-annc-section">
        <section className="mod-annc-table-container">
          <h2 className="mod-annc-table-title">Recent Announcements</h2>
          <table className="mod-annc-table">
            <thead>
              <tr>
                <th className="mod-annc-table-header">Posted By</th>
                <th className="mod-annc-table-header">Date</th>
                <th className="mod-annc-table-header">Details</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <tr key={index} className="mod-annc-table-row">
                    <td className="mod-annc-table-cell">{announcement.admin}</td>
                    <td className="mod-annc-table-cell">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </td>
                    <td className="mod-annc-table-cell">{announcement.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="mod-annc-table-cell">
                    No announcements available at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Announcements;
