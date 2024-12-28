"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import clubsData from "@/shared/clubs.json";

import "./clubName.css";

const ClubPage = ({ params }) => {
  const router = useRouter();

  // Unwrap the params
  const { clubName } = use(params);

  const decodedClubName = decodeURIComponent(clubName);
  const clubInfo = clubsData.clubInfo;
  const additionalInfo = clubInfo[decodedClubName] || "Information not available.";

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

        // Fetch the current status from the API
        const response = await fetch(`/api/request`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: studentId,
            clubName: decodedClubName,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.approval === "Pending") {
            setMembershipStatus("Request Pending. Cancel");
          } 
          else if (result.approval === "Accepted") {
            setMembershipStatus("Leave Club");
          } 
          else if (result.approval === "Not Requested") {
            setMembershipStatus("Request To Join");
          }
          else if (result.approval === "Rejected") {
            setMembershipStatus("Request Rejected");
          } 
          else if (result.approval === "Removed") {
            setMembershipStatus("Removed From Club");
          } 


        }
      } catch (error) {
        console.error("Error checking membership status:", error);
      }
    };

    checkMembershipStatus();
  }, [decodedClubName, membershipStatus]);

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId,
          clubName: decodedClubName,
          status: membershipStatus,
        }),
      });

      const result = await response.json();

      console.log(result);

      setMembershipStatus(result.msg);
    } catch (error) {
      console.error("Error during request submission:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Add confirmation dialog before handling request
  const confirmAndHandleRequest = () => {
    let confirmationMessage = "";
    if (membershipStatus === "Request To Join") {
      confirmationMessage = "Are you sure you want to request to join this club?";
    } 
    else if (membershipStatus === "Request Pending. Cancel") {
      confirmationMessage = "Are you sure you want to cancel your pending request?";
    } 
    else if (membershipStatus === "Leave Club") {
      confirmationMessage = "Are you sure you want to leave this club?";
    }
    else if (membershipStatus === "Request Rejected") {
      alert("Your Request Rejected. Contact Admin or Moderator")
      return
    }
    else if (membershipStatus === "Removed From Club") {
      alert("You are removed. Contact Admin or Moderator")
      return
    }
    

    const confirmed = window.confirm(confirmationMessage);
    if (confirmed) {
      handleRequest();
    }
  };

  // Defining a function to determine button styles
  const getButtonStyle = () => {
    switch (membershipStatus) {
      case "Request to Join":
        return "request-join-button"; // Green button
      case "Request Pending. Cancel":
        return "request-pending-button"; // Yellow button
      case "Leave Club":
        return "leave-club-button"; // Red button
      case "Request Rejected":
        return "reject-button"; 
      case "Removed From Club":
        return "reject-button";
      default:
        return "club-request-button"; // Default styling
    }
  };

  return (
    <div className="club-page-container">
      <h1 className="club-page-title">{decodedClubName}</h1>
      <p className="club-page-info">{additionalInfo}</p>
      <button
        className="club-back-button"
        onClick={() => router.push("/user/clubs")}
      >
        Back to All Clubs
      </button>
      <button
        className={`${getButtonStyle()}`}
        onClick={confirmAndHandleRequest}
      >
        {membershipStatus}
      </button>
    </div>
  );
};

export default ClubPage;
