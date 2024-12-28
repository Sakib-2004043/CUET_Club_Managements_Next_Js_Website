"use client"
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import clubsData from "@/shared/clubs.json";

import "./clubs.css"

const ClubCardView = () => {
  const router = useRouter();
  const clubs = clubsData.clubs;

  const handleCardClick = (club) => {
    const clubName = encodeURIComponent(club); // Encode club name for the URL
    router.push(`/user/clubs/${clubName}`); // Navigate to the dynamic route
  };

  return (
    <div className="club-container">
      {clubs.map((club, index) => (
        <div
          key={index}
          className="club-card"
          onClick={() => handleCardClick(club)} // Add onClick handler
        >
          <h3 className="club-title">{club}</h3>
        </div>
      ))}
    </div>
  );
};

export default ClubCardView;
