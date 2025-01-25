"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./contact.css";
import { checkToken } from "@/utils/auth";

const Contact = () => {
  const [users, setUsers] = useState([]); // All users fetched from the API
  const [filteredUsers, setFilteredUsers] = useState([]); // Users to display after search
  const [searchContact, setSearchContact] = useState(""); // Search input text
  const router = useRouter();
  const render = useState(false)

  useEffect(() => {
    //checkToken(router)

    // Fetch users when the component loads
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("/api/admin");

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

  const handleSearchContact = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchContact(searchValue);

    // Filter users based on name, studentId, email, or mobile
    const filtered = users.filter((user) =>
      [user.name, user.studentId, user.email, user.mobile]
        .some((field) => field?.toLowerCase().includes(searchValue))
    );
    setFilteredUsers(filtered);
  };

  // Function to highlight only the typed portion
  const highlightMatch = (text) => {
    if (!searchContact) return text; // If no search text, return original text

    // Create a regex to match the search text (case insensitive)
    const regex = new RegExp(`(${searchContact})`, "i");

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

  return (
    <div className="admin-container">
      {/* Contact Section */}
      <div className="admin-section">
        <div className="search-container">
          <input
            type="text"
            value={searchContact}
            onChange={handleSearchContact}
            placeholder="Search by Name, StudentID, Email, or Mobile..."
            className="search-input"
          />
        </div>

        <h2 className="section-title">Student Contact Directory</h2>
        <p className="section-description">
          Here you can find the contact details of all students. You can search using any of the fields like name, student ID, email, or mobile.
        </p>

        <table className="contact-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">StudentID</th>
              <th className="table-header">Email</th>
              <th className="table-header">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="table-row">
                <td className="table-data">{highlightMatch(user.name)}</td>
                <td className="table-data">{highlightMatch(user.studentId)}</td>
                <td className="table-data">{highlightMatch(user.email)}</td>
                <td className="table-data">{highlightMatch(user.mobile)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
