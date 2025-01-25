"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import './layout.css'; // Assuming this CSS file exists in the same directory
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode library

export default function SubLayout({ children }) {
  const router = useRouter();
  const logo = "/CuetLogo.png"; // Update with the correct file path and extension

  // State for notifications
  const [notifications, setNotifications] = useState(0);

  const validateToken = async () => {
    const isValid = await checkToken(router);
    if (!isValid) {
      console.log('Redirected due to invalid token');
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedData = jwtDecode(token);
        console.log("Admin : ", decodedData.admin);

        if (decodedData.admin === "Member Only") {
          router.push("/user");
        } else if (decodedData.admin !== "Admin") {
          router.push("/moderator");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login")
  }

  // Dummy notification count for now, you can integrate with your notification logic
  const toggleNotifications = () => setNotifications(notifications === 0 ? 5 : 0); // For demo purposes

  return (
    <div className="sub-layout">
      <header className="admin-header">
        <Image 
          src="/CuetLogo.png" 
          alt="CUET Logo" 
          width={60} 
          height={60} 
          style={{ height: "auto", width: "auto" }} 
          className="logo" 
        />
        <h1 className="admin-heading">
          Welcome to CUET All Club Management - Admin Panel
        </h1>
        <div className="notification-container">
          <div className="notification-bell-container" onClick={toggleNotifications}>
            <i className={`fas fa-bell ${notifications > 0 ? "active" : ""}`}></i>
            {notifications > 0 && (
              <span className="notification-dot">{notifications}</span>
            )}
          </div>
          <span className='notification' onClick={toggleNotifications}>Notification</span>
        </div>
        <button className="log-out-button" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <nav className="admin-nav">
        <Link href="/admin" className="admin-link" onClick={validateToken}>
          Home
        </Link>
        <Link href="/admin/memberInfo" className="admin-link" onClick={validateToken}>
          Members
        </Link>
        <Link href="/admin/memberContact" className="admin-link" onClick={validateToken}>
          Contact
        </Link>
        <Link href="/admin/announcements" className="admin-link">
          Announcements
        </Link>
        <Link href="/admin/approval" className="admin-link">
          Approval
        </Link>
      </nav>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
