"use client";
import { useEffect, useState } from "react";
import "./user.css";

const UserLanding = () => {
  return (
    <div className="user-landing-page">    
      <section className="section motto-section">
        <h2 className="section-title">Our Motto</h2>
        <p className="section-content">
          "Unity in Diversity, Innovation in Action." CUET clubs aim to bring
          together creative minds, technical enthusiasts, and visionaries to
          achieve excellence in every field.
        </p>
      </section>

      <section className="section vision-section">
        <h2 className="section-title">Our Vision</h2>
        <p className="section-content">
          To foster an environment where students can explore their potential,
          build strong networks, and make a positive impact through innovation,
          teamwork, and dedication.
        </p>
      </section>

      <section className="section work-section">
        <h2 className="section-title">What We Do</h2>
        <ul className="section-content work-list">
          <li>Organize technical and cultural events.</li>
          <li>Promote innovation through workshops and hackathons.</li>
          <li>Encourage leadership and teamwork through club activities.</li>
          <li>Host inter-university competitions and seminars.</li>
        </ul>
      </section>

      <section className="section future-section">
        <h2 className="section-title">Our Future Plans</h2>
        <p className="section-content">
          CUET clubs are committed to creating a sustainable future by
          expanding collaborations, introducing new technologies, and nurturing
          global leaders. Our upcoming initiatives include a Tech Carnival,
          Social Awareness Campaign, and Startup Incubation Programs.
        </p>
      </section>

      <footer className="footer">
        <p className="footer-text">
          Join us today and be part of something extraordinary!
        </p>
      </footer>
    </div>
  );
};

export default UserLanding;
