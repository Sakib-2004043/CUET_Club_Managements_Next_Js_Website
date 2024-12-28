"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./admin.css"; // Import regular CSS file

const AdminLanding = () => {
  // Dummy data for clubs
  const [clubs] = useState([
    { name: "Coding Club", members: 50 },
    { name: "Photography Club", members: 75 },
    { name: "Music Club", members: 30 },
    { name: "Sports Club", members: 90 },
    { name: "Drama Club", members: 60 },
  ]);

  // Chart data
  const chartData = {
    labels: clubs.map((club) => club.name),
    datasets: [
      {
        label: "Number of Members",
        data: clubs.map((club) => club.members),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
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
    <div className="admin-interface">
      <h1 className="admin-title">Admin Landing</h1>
      <div className="admin-chart-container">
        <h2 className="admin-subtitle">Club Members Overview</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminLanding;
