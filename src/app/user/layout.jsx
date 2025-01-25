"use client";
import { useEffect } from "react";
import Link from "next/link";
import "./layout.css"; // Assuming the CSS file exists
import { useRouter } from "next/navigation";
import { checkToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is imported correctly

export default function SubLayout({ children }) {
  const router = useRouter();

  const validateToken = async () => {
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

        if (decodedData.admin === "Admin") {
          router.push("/admin");
        } else if (decodedData.admin !== "Member Only") {
          router.push("/moderator");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    validateToken();
  }, [router]);

  return (
    <div className="sub-layout">
      <header className="header-section">
        <div className="h1-div">
          <h1 className="header-title">Welcome to CUET Clubs</h1>
        </div>
        <div className="link-div">
          <nav className="user-nav">
            <Link href="/user" className="user-link">
              Home
            </Link>
            <Link href="/user/profile" className="user-link">
              Profile
            </Link>
            <Link href="/user/clubs" className="user-link">
              Clubs
            </Link>
            <Link href="/user/announcements" className="user-link">
              Announcements
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="user-content">{children}</main>
    </div>
  );
}
