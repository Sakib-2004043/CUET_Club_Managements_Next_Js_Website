"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import './layout.css'; // Assuming this CSS file exists in the same directory
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode library

export default function subLayout({ children }) {
  const router = useRouter();
  const logo = "/CuetLogo.png"; // Update with the correct file path and extension

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

  return (
    <div className="sub-layout">
      <header className="admin-header">
        <Image src={logo} alt="CUET Logo" width={100} height={100} className='logo' />
        <h1 className="admin-heading">
          Welcome to CUET All Club Management - Admin Panel
        </h1>
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
      <main className="admin-content">{children}</main>
    </div>
  );
}
