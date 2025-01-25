import React from 'react';
import Link from 'next/link';

import "./page.css";
import Header from './header';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header/>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Connect. Collaborate. Excel.</h2>
          <p className="hero-description">Join your favorite clubs and stay updated with centralized announcements.</p>
          <Link href="/register">
            <button className="hero-cta-button">Join a Club</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="features-list">
            <div className="feature">
              <h3 className="feature-title">Streamlined Management</h3>
              <p className="feature-description">Join clubs and manage approvals effortlessly.</p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-description">Admins and moderators have specific roles for efficient management.</p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Centralized Announcements</h3>
              <p className="feature-description">Never miss an update from your favorite clubs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <h2 className="about-title">About Our System</h2>
          <p className="about-description">
            The CUET Club Management System is designed to simplify the process of joining, managing, and engaging with clubs at CUET. 
            Whether you're a student looking to participate or an admin managing multiple clubs, this platform provides all the tools you need.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-container">
          <h2 className="testimonials-title">What Students Say</h2>
          <div className="testimonials-list">
            <div className="testimonial">
              <p className="testimonial-text">"This platform has made club management so much easier. I love the centralized announcements feature!"</p>
              <p className="testimonial-author">- John Doe, Student</p>
            </div>
            <div className="testimonial">
              <p className="testimonial-text">"As an admin, I appreciate the role-based access. It keeps everything organized and secure."</p>
              <p className="testimonial-author">- Jane Smith, Club Admin</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
