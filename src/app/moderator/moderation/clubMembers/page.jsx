"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

import "./modMem.css";

const clubMembers = () => {
  const [users, setUsers] = useState([]); // All users fetched from the API
  const [filteredUsers, setFilteredUsers] = useState([]); // Users to display after search
  const [searchText, setSearchText] = useState(""); // Search input text
  const [moderation, setModeration] = useState(""); // Store moderation data
  const router = useRouter(); // Next.js router for navigation

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    // Fetch users when the component loads
    const fetchData = async () => {
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const decodedToken = jwtDecode(token);
        const { admin } = decodedToken;

        if (!admin) {
          console.error("Club Name Not Found.");
          router.push('/login');
          return;
        }
        setModeration(admin)
        const usersResponse = await fetch('/api/moderation', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ admin }),
        });

        const usersData = await usersResponse.json();
        setUsers(usersData.data); // Set all users
        setFilteredUsers(usersData.data); // Initially show all users
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);

  // Update filteredUsers based on search input
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    // Filter users based on name, studentId, department, or hall
    const filtered = users.filter((user) =>
      [user.name, user.studentId, user.department, user.hall].some((field) =>
        field?.toLowerCase().includes(searchValue)
      )
    );
    setFilteredUsers(filtered);
  };

  // Function to highlight only the typed portion
  const highlightMatch = (text) => {
    if (!searchText) return text; // If no search text, return original text

    // Create a regex to match the search text (case insensitive)
    const regex = new RegExp(`(${searchText})`, "i");

    // Replace matched text with a span that applies bold styling
    const parts = text?.split(regex); // Split text into matching and non-matching parts
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Convert buffer to base64 string for rendering images
  const convertBufferToBase64 = (buffer) => {
    if (!buffer) return null;
    const base64Image = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  };

  // Handle row click to navigate to the student's moderation page
  const handleRowClick = (studentId) => {
    const data = {
      studentId : studentId,
      admin : moderation
    }
    localStorage.setItem("STDID",JSON.stringify(data))
    console.log(localStorage.getItem("STDID"))
    router.push(`/moderator/moderation/clubMembers/profile`);
  };

  return (
    <div className="moderation-container">
      {/* Student Data Section */}
      <div className="moderation-section">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
          className="moderation-search-input"
        />

        <h2 className="moderation-section-title">Student Data</h2>
        <table className="moderation-table">
          <thead>
            <tr>
              <th className="moderation-table-header">Profile</th>
              <th className="moderation-table-header">Name</th>
              <th className="moderation-table-header">StudentID</th>
              <th className="moderation-table-header">Dept</th>
              <th className="moderation-table-header">Moderator</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="moderation-table-row"
                onClick={() => handleRowClick(user.studentId)} // Navigate on row click
                style={{ cursor: "pointer" }} // Indicate clickability
              >
                <td className="moderation-table-data">
                  {user.profileImage ? (
                    <img
                      src={convertBufferToBase64(user.profileImage)}
                      alt="Profile"
                      className="moderation-profile-image"
                    />
                  ) : (
                    <span className="no-image-text">No Image</span>
                  )}
                </td>
                <td className="moderation-table-data">{highlightMatch(user.name)}</td>
                <td className="moderation-table-data">{highlightMatch(user.studentId)}</td>
                <td className="moderation-table-data">{highlightMatch(user.department)}</td>
                <td className="moderation-table-data">{highlightMatch(user.admin)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default clubMembers;
