"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./announce.css";

const Announcements = () => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [render, setRender] = useState(true);
  const router = useRouter();

  // Fetch all announcements when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcement");
        if (response.ok) {
          const data = await response.json();
          // Sort announcements by date in descending order
          const sortedData = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(sortedData);
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

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    setRender(!render);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`); // Highlight matching text
  };

  return (
    <div className="announcement-container">
      <h2 className="announcement-title">Announcements</h2>

      <div className="announcement-content">
        {/* Post New Announcement */}
        <form
          className="announcement-form"
          onSubmit={handlePostAnnouncement}
        >
          <h3 className="form-title">Post New Announcement</h3>
          <textarea
            className="form-textarea"
            placeholder="Write an announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          ></textarea>
          <button type="submit" className="form-button">
            Post Announcement
          </button>
        </form>

        {/* Display Announcements Table */}
        <div className="announcement-table-container">
          <h3 className="table-title">All Announcements</h3>
          {/* Search Bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <table className="announcement-table">
            <thead>
              <tr>
                <th className="table-header">Poster</th>
                <th className="table-header">Date</th>
                <th className="table-header">Announcements</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements
                  .filter((announcement) =>
                    announcement.message
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((announcement, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell">{announcement.admin}</td>
                      <td className="table-cell">
                        {new Date(announcement.createdAt).toLocaleString()}
                      </td>
                      <td
                        className="table-cell"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            announcement.message,
                            searchTerm
                          ),
                        }}
                      ></td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="table-cell">
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
