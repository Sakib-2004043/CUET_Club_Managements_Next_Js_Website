import React from 'react';
import Link from 'next/link';

import "./page.css"

export default function LandingPage() {
  return (
    <div >
      {/* Header */}
      <header className="header">
        <br/>
        <h1>CUET Club Management System</h1>
        <div className="header-container">
          <nav>
            <Link href="/about">About</Link>
            <br/>
            <Link href="/clubs">Clubs</Link>
            <br/>
            <Link href="/login">Login</Link>
            <br/>
            <Link href="/register">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Connect. Collaborate. Excel.</h2>
          <p>Join your favorite clubs and stay updated with centralized announcements.</p>
          <Link href="/register">
            <button className="cta-button">Join a Club</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature">
              <h3>Streamlined Management</h3>
              <p>Join clubs and manage approvals effortlessly.</p>
            </div>
            <div className="feature">
              <h3>Role-Based Access</h3>
              <p>Admin and moderators have specific roles for efficient management.</p>
            </div>
            <div className="feature">
              <h3>Centralized Announcements</h3>
              <p>Never miss an update from your favorite clubs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 CUET Club Management System</p>
          <p>Chittagong University of Engineering & Technology</p>
        </div>
      </footer>
    </div>
  );
}
