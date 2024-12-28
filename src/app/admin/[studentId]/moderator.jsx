import React, { useState } from "react";
import "./moderator.css";

import clubs from "@/shared/clubs";

const Moderator = ({ studentId, onCut }) => {
  const clubName = clubs.clubs; // List of clubs from the shared module
  const [selectedClub, setSelectedClub] = useState(""); // State for selected club

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value); // Update the selected club
  };

  const handleConfirm = async () => {
    if (!selectedClub) {
      alert("Please select a club before confirming.");
      return;
    }
  
    const isConfirmed = window.confirm(`Are you sure you want to assign ${selectedClub} as the moderator?`);
    if (isConfirmed) {
      const response = await fetch("/api/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          clubName: selectedClub,
        }),
      });
  
      const result = await response.json();
      console.log(result);
    } else {
      alert("Action cancelled.");
    }
  };

  

  return (
    <div className="moderator-container">
      <div className="moderator-card">
        <div className="moderator-header">
          <h2>Select a Club</h2>
          <select
            className="club-selector"
            value={selectedClub}
            onChange={handleClubChange}
          >
            <option value="" disabled>
              -- Choose a club --
            </option>
            {clubName.map((club, index) => (
              <option key={index} value={club}>
                {club}
              </option>
            ))}
            <option value="Member Only">Member Only</option>
          </select>
        </div>

        <div className="moderator-content">
          {selectedClub ? (
            <h3>You selected: {selectedClub}</h3>
          ) : (
            <h3>Please select a club.</h3>
          )}
        </div>

        <div className="moderator-actions">
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCut}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moderator;
