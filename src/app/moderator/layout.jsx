"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./layout.css"; // Assuming this CSS file exists
import { useRouter } from "next/navigation";
import { checkToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import { setZeroNotification } from "@/utils/notification";

export default function SubLayout({ children }) {
  const router = useRouter();

  const [rotate, setRotate] = useState(false); // State for rotating bell animation
  const [notifications, setNotifications] = useState(0); // Default to 0 notifications
  const [clubName, setClubName ] = useState("");

  const logo = "/CuetLogo.png";
  const bell = "/bell.png";

  const validateToken = async () => {
    try {
      const isValid = await checkToken(router);
      if (!isValid) {
        console.log("Redirected due to invalid token");
        return;
      }

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedData = jwtDecode(token);
          console.log("Admin : ", decodedData.admin);
          setClubName(decodedData.admin)
          if (decodedData.admin === "Admin") {
            router.push("/admin");
          } else if (decodedData.admin === "Member Only") {
            router.push("/user");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    } catch (error) {
      console.error("Error validating token:", error);
    }
  };

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
        setNotifications(data.count); 
        if(data.count > 0){
          setRotate(true)
        }
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    validateToken();
    fetchNotifications(clubName);
  }, [router,clubName]);

  const handleBellClick = async() => {

    setNotifications(0);
    await setZeroNotification(clubName);
    setRotate(false)
    router.push("moderator/moderation/approval")
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token"); // Remove token from local storage
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="sub-layout">
      <header className="moderator-header">
        <Image
          src={logo}
          alt="CUET Logo"
          width={60}
          height={60}
          style={{ height: "auto", width: "auto" }}
          className="logo"
        />
        <h1 className="moderator-heading">
          Welcome to CUET All Club Management - Moderator Panel
        </h1>
        <div className="notification-container">
          <div className="notification-bell-container">
            <Image
              src={bell}
              alt="Notification Bell"
              width={60}
              height={60}
              style={{ height: "auto", width: "auto" }}
              className={`bell ${rotate ? "rotate" : ""}`} // Apply the rotating class when notifications > 0
              onClick={handleBellClick}
            />
            {notifications >= 0 && (
              <span className="notification-dot">{notifications}</span>
            )}
          </div>
          <button className="log-out-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <nav className="moderator-nav">
        <Link href="/moderator" className="moderator-link" onClick={validateToken}>
          Home 🏠
        </Link>
        <Link href="/moderator/profile" className="moderator-link" onClick={validateToken}>
          Profile 👤
        </Link>
        <Link href="/moderator/announcements" className="moderator-link" onClick={validateToken}>
          Announcements 📢
        </Link>
        <Link href="/moderator/clubs" className="moderator-link">
          Clubs 🏛️
        </Link>
        <Link href="/moderator/moderation/announcements" className="moderator-link">
          Moderation ⚙️
        </Link>
      </nav>

      <main className="moderator-content">{children}</main>
    </div>
  );
}
