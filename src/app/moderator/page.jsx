'use client';

import { useState } from 'react';
import './moderator.css'; // Import normal CSS file

const ModeratorLandingPage = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome, Moderator!</h1>
        <p>Manage your clubs, members, and announcements here.</p>
      </header>

      <div className="tabContainer">
        <button
          className={activeTab === 'announcements' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </button>
        <button
          className={activeTab === 'clubMembers' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('clubMembers')}
        >
          Club Members
        </button>
        <button
          className={activeTab === 'approvals' ? 'activeTab' : 'tab'}
          onClick={() => setActiveTab('approvals')}
        >
          Approvals
        </button>
      </div>

      <div className="content">
        {activeTab === 'announcements' && (
          <div className="card">
            <h2>📢 Announcements</h2>
            <p>Create and manage announcements for your club members.</p>
          </div>
        )}

        {activeTab === 'clubMembers' && (
          <div className="card">
            <h2>👥 Club Members</h2>
            <p>View and manage all club members here.</p>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="card">
            <h2>✅ Approvals</h2>
            <p>Approve or reject new member requests.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorLandingPage;
