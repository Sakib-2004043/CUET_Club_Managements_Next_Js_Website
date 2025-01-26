'use client';

import { useState } from 'react';
import './moderator.css'; // Import CSS file for styling

const ModeratorLandingPage = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="mod-landing-container">
      {/* Header Section */}
      <header className="mod-header">
        <h1 className="mod-title">🏛️ Club Moderator Dashboard</h1>
        <p className="mod-subtitle">Welcome! Manage your club activities seamlessly.</p>
      </header>

      {/* Quick Stats Section */}
      <div className="mod-stats">
        <div className="mod-stat-card">
          <h3>📢 Total Announcements</h3>
          <p>25</p>
        </div>
        <div className="mod-stat-card">
          <h3>👥 Club Members</h3>
          <p>150</p>
        </div>
        <div className="mod-stat-card">
          <h3>✅ Pending Approvals</h3>
          <p>8</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mod-tab-container">
        <button
          className={activeTab === 'announcements' ? 'mod-active-tab' : 'mod-tab'}
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </button>
        <button
          className={activeTab === 'clubMembers' ? 'mod-active-tab' : 'mod-tab'}
          onClick={() => setActiveTab('clubMembers')}
        >
          Club Members
        </button>
        <button
          className={activeTab === 'approvals' ? 'mod-active-tab' : 'mod-tab'}
          onClick={() => setActiveTab('approvals')}
        >
          Approvals
        </button>
      </div>

      {/* Tab Content Section */}
      <div className="mod-content">
        {activeTab === 'announcements' && (
          <div className="mod-card">
            <h2>📢 Announcements</h2>
            <p>Create and manage announcements for your club members.</p>
            <button className="mod-action-btn">Add New Announcement</button>
            <ul className="mod-announcement-list">
              <li>Meeting scheduled for 5th February at 4 PM.</li>
              <li>Club elections to be held next week.</li>
              <li>New projects launching soon, stay tuned!</li>
            </ul>
          </div>
        )}

        {activeTab === 'clubMembers' && (
          <div className="mod-card">
            <h2>👥 Club Members</h2>
            <p>View and manage all club members here.</p>
            <table className="mod-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>President</td>
                  <td>john.doe@example.com</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Vice President</td>
                  <td>jane.smith@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="mod-card">
            <h2>✅ Approvals</h2>
            <p>Approve or reject new member requests.</p>
            <ul className="mod-approval-list">
              <li>
                <span>Michael Brown</span>
                <div>
                  <button className="mod-approve-btn">Approve</button>
                  <button className="mod-reject-btn">Reject</button>
                </div>
              </li>
              <li>
                <span>Emily Davis</span>
                <div>
                  <button className="mod-approve-btn">Approve</button>
                  <button className="mod-reject-btn">Reject</button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorLandingPage;
