"use client";
import "./moderator.css";

const ModeratorLanding = () => {
  return (
    <div className="moderator-landing-page">
      {/* Header Section */}
      <header className="mod-land-header">
        <h1 className="mod-land-header-title">🌟 Welcome to CUET Club Portal</h1>
        <p className="mod-land-header-subtitle">
          A unified platform to explore, connect, and grow through vibrant club activities.
        </p>
      </header>

      {/* Motto Section */}
      <section className="mod-land-section motto-section">
        <h2 className="mod-land-section-title">Our Motto</h2>
        <p className="mod-land-section-content">
          "Unity in Diversity, Innovation in Action." CUET clubs bring together creative minds, technical enthusiasts, and visionaries to achieve excellence in every field.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mod-land-section vision-section">
        <h2 className="mod-land-section-title">Our Vision</h2>
        <p className="mod-land-section-content">
          To cultivate an environment where students can discover their full potential, forge strong networks, and contribute to society through innovation, teamwork, and dedication.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="mod-land-section highlights-section">
        <h2 className="mod-land-section-title">Highlights of Our Clubs</h2>
        <ul className="mod-land-section-content highlights-list">
          <li>🌟 15+ Active Clubs Across Various Domains</li>
          <li>🏆 Over 50 Achievements in National and International Events</li>
          <li>📚 A Growing Community of 500+ Members</li>
          <li>🔗 Collaboration with Industry Leaders and Alumni</li>
        </ul>
      </section>

      {/* Activities Section */}
      <section className="mod-land-section activities-section">
        <h2 className="mod-land-section-title">What We Do</h2>
        <p className="mod-land-section-content">
          Our clubs organize events and activities aimed at fostering creativity, innovation, and leadership. Some of our major initiatives include:
        </p>
        <ul className="work-list">
          <li>📅 Hosting Technical and Cultural Festivals</li>
          <li>💻 Conducting Workshops and Hackathons</li>
          <li>🤝 Networking Events with Professionals</li>
          <li>🎨 Organizing Art Exhibitions and Performances</li>
        </ul>
      </section>

      {/* Future Plans Section */}
      <section className="mod-land-section future-section">
        <h2 className="mod-land-section-title">Our Future Plans</h2>
        <p className="mod-land-section-content">
          CUET clubs are committed to a brighter future. Upcoming initiatives include:
        </p>
        <ul className="future-plans-list">
          <li>🚀 Launching a Tech Carnival for Innovators</li>
          <li>🌍 Social Awareness Campaigns for Community Growth</li>
          <li>🏢 Startup Incubation Programs for Aspiring Entrepreneurs</li>
          <li>🎤 Hosting International Conferences and Seminars</li>
        </ul>
      </section>

      {/* Join Us Section */}
      <section className="mod-land-section join-section">
        <h2 className="mod-land-section-title">Why Join Us?</h2>
        <p className="mod-land-section-content">
          By joining CUET clubs, you gain access to:
        </p>
        <ul className="join-benefits-list">
          <li>💼 Leadership Opportunities</li>
          <li>🌟 Exclusive Skill-Building Programs</li>
          <li>🔗 Networking with Industry Experts</li>
          <li>🎉 A Platform to Showcase Your Talents</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="mod-land-footer">
        <p className="mod-land-footer-text">
          ✨ Be part of a journey that transforms ideas into reality. Join us today and make an impact! ✨
        </p>
      </footer>
    </div>
  );
};

export default ModeratorLanding;
