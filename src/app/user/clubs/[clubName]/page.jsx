"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import clubsData from "@/shared/clubs.json";

import "./clubName.css";
import { decreaseNotification, setNotification } from "@/utils/notification";

const ClubPage = ({ params }) => {
  const router = useRouter();
  const { clubName } = use(params);
  const decodedClubName = decodeURIComponent(clubName);

  const logo = "/clubLogo/"+clubsData.photos[decodedClubName];
  const clubInfo = clubsData.clubInfo[decodedClubName];
  const achievements = clubInfo.achievements || [];
  const events = clubInfo.events || [];
  const outcomes = clubInfo.outcomes || [];
  const additionalInfo = clubInfo.description || "Information not available.";

  const [membershipStatus, setMembershipStatus] = useState("Request To Join");

  useEffect(() => {
    const checkMembershipStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMembershipStatus("Request To Join");
          return;
        }

        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const studentId = tokenPayload.studentId;

        const response = await fetch(`/api/request`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ studentId, clubName: decodedClubName }),
        });

        const result = await response.json();
        if (response.ok) {
          setMembershipStatus(result.approval === "Pending" ? "Request Pending. Cancel" : 
                              result.approval === "Accepted" ? "Leave Club" : 
                              result.approval === "Not Requested" ? "Request To Join" : 
                              result.approval === "Rejected" ? "Request Rejected" : 
                              result.approval === "Removed" ? "Removed From Club" : 
                              "Request To Join");
        }
      } catch (error) {
        console.error("Error checking membership status:", error);
      }
    };

    checkMembershipStatus();
  }, [decodedClubName]);

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        router.push("/login");
        return;
      }

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const studentId = tokenPayload.studentId;

      const response = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentId, clubName: decodedClubName, status: membershipStatus }),
      });

      const result = await response.json();
      setMembershipStatus(result.msg);

      if (membershipStatus === "Request To Join") setNotification(decodedClubName);
      if (membershipStatus === "Request Pending. Cancel") decreaseNotification(decodedClubName);
    } catch (error) {
      console.error("Error during request submission:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const confirmAndHandleRequest = () => {
    const messages = {
      "Request To Join": "Are you sure you want to request to join this club?",
      "Request Pending. Cancel": "Are you sure you want to cancel your pending request?",
      "Leave Club": "Are you sure you want to leave this club?",
    };

    const message = messages[membershipStatus];
    if (!message) {
      alert(membershipStatus.includes("Rejected") || membershipStatus.includes("Removed")
        ? "Contact Admin or Moderator."
        : "Unexpected status."
      );
      return;
    }

    if (window.confirm(message)) handleRequest();
  };

  const getButtonStyle = () => {
    switch (membershipStatus) {
      case "Request To Join":
        return "request-join-button";
      case "Request Pending. Cancel":
        return "request-pending-button";
      case "Leave Club":
        return "leave-club-button";
      case "Request Rejected":
      case "Removed From Club":
        return "reject-button";
      default:
        return "club-request-button";
    }
  };

  return (
    <div className="club-page-container">
      <div className="club-header">
        <img src={logo} alt={`${decodedClubName} Logo`} className="club-logo" />
        <h1 className="club-page-title">{decodedClubName}</h1>
      </div>
      <p className="club-page-info">{additionalInfo}</p>

      <div className="club-info-sections">
        <div className="info-section">
          <h2 className="achieve-header">Achievements</h2>
          <ul className="ul-achivement">
            {achievements.length > 0 ? achievements.map((a, i) => <li key={i}>{a}</li>) : "No achievements available."}
          </ul>
        </div>
        <div className="info-section">
          <h2>Events</h2>
          <ul>
            {events.length > 0 ? events.map((e, i) => <li key={i}>{e}</li>) : "No events available."}
          </ul>
        </div>
        <div className="info-section">
          <h2 className="outcome-header">Outcomes</h2>
          <ul className="ul-outcome">
            {outcomes.length > 0 ? outcomes.map((o, i) => <li key={i}>{o}</li>) : "No outcomes available."}
          </ul>
        </div>
      </div>

      <div className="button-group">
        <button className="club-back-button" onClick={() => router.push("/user/clubs")}>Back to All Clubs</button>
        <button className={getButtonStyle()} onClick={confirmAndHandleRequest}>{membershipStatus}</button>
      </div>
    </div>
  );
};

export default ClubPage;
