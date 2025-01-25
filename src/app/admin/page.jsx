"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./admin.css"; 
import clubInfo from "@/shared/clubs";

const AdminLanding = () => {
  const [clubs, setClubs] = useState({});
  const clubNames = clubInfo.clubs;
  console.log("Club Names:", clubNames);

  // Fetch data from API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/approval");
        if (!response.ok) {
          throw new Error("Failed to fetch club data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);

        // Calculate total accepted members per club
        const acceptedMembersCount = {};
        clubNames.forEach((club) => (acceptedMembersCount[club] = 0)); // Initialize counts

        data.requests.forEach((request) => {
          if (request.approval === "Accepted" && request.requestedClub in acceptedMembersCount) {
            acceptedMembersCount[request.requestedClub]++;
          }
        });

        console.log("Accepted Members Count:", acceptedMembersCount);
        setClubs(acceptedMembersCount);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, [clubNames]);

  // Prepare data for Bar chart
  const chartData = {
    labels: Object.keys(clubs), // Club names
    datasets: [
      {
        label: "Active Members",
        data: Object.values(clubs), // Number of members
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="admin-home-landing">
      <header className="admin-home-header">
        <p className="admin-home-description">
          Welcome to the admin dashboard. Here, you can view statistics about the clubs, including the number of active members in each club. Use this data to make informed decisions and track club performance.
        </p>
      </header>

      <section className="admin-statistics">
        <h2 className="statistics-title">Overall Club Statistics</h2>
        <p className="statistics-summary">
          Total Clubs: {clubNames.length} <br />
          Total Active Members:{" "}
          {Object.values(clubs).reduce((total, count) => total + count, 0)}
        </p>
      </section>

      <section className="admin-chart">
        <h2 className="chart-title">Active Members by Club</h2>
        {Object.keys(clubs).length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="loading-message">Loading club data...</p>
        )}
      </section>

      <footer className="admin-home-footer">
        <p className="footer-message">
          Keep track of club memberships to ensure the smooth functioning of all clubs. Reach out to club moderators for more details.
        </p>
      </footer>
    </div>
  );
};

export default AdminLanding;
