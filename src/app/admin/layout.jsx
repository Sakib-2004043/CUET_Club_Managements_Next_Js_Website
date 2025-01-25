"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './layout.css'; // Assuming this CSS file exists in the same directory
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode library
import { setZeroNotification } from '@/utils/notification';

export default function SubLayout({ children }) {
  const router = useRouter();
  const logo = "/CuetLogo.png"; 
  const bell = "/bell.png";

  // State for notifications and club name
  const [notifications, setNotifications] = useState(0);
  const [clubName, setClubName] = useState("");
  const [rotate, setRotate] = useState(false); // State to trigger rotation
  const [render, setRender] = useState(true)

  const fetchNotifications = async (clubName) => {
    try {
      const response = await fetch("/api/notification", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clubName }),
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.count); // Assuming the response contains a `count` field
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

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

        // Save decoded club name to the state
        setClubName(decodedData.admin); // Assuming `clubName` is available in the token

        // Fetch the notification count
        fetchNotifications(decodedData.admin);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, [router, render]);

  useEffect(() => {
    if (notifications > 0) {
      setRotate(true); // Start the rotation animation when notifications > 0
    } else {
      setRotate(false); // Stop the rotation if no notifications
    }
  }, [notifications]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleBellClick = () => {
    setZeroNotification(clubName);
    setRender(!render)
    router.push("/admin/approval"); // Ensure this is an absolute path
  };

  return (
    <div className="sub-layout">
      <header className="admin-header">
        <Image 
          src={logo} 
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
          <div className="notification-bell-container">
            <Image 
              src={bell} 
              alt="Notification Bell" 
              width={60} 
              height={60} 
              style={{ height: "auto", width: "auto" }} 
              className={`bell ${rotate ? 'rotate' : ''}`} // Apply the rotating class when notifications > 0
              onClick={handleBellClick} 
            />
            <span className="notification-dot">{notifications}</span>
          </div>
          <button className="log-out-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
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
