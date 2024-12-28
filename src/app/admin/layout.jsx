"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import './layout.css'; // Assuming this CSS file exists in the same directory
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

export default function subLayout({ children }) {
  const router = useRouter();

  // Define the validateToken function outside of useEffect to make it accessible in JSX
  const validateToken = async () => {
    const isValid = await checkToken(router);
    if (!isValid) {
      console.log('Redirected due to invalid token');
      return;
    }

    const token = localStorage.getItem("token");

    // Decode the token using jwt-decode
    if (token) {
      try {
        const decodedData = jwtDecode(token);
        console.log("Admin : ", decodedData.admin);

        if(decodedData.admin === "Member Only"){
          router.push("/user")
        }
        else if(decodedData.admin !== "Admin"){
          router.push("/moderator")
        }
        
      } 
      catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  // Run the token validation check when the component mounts
  useEffect(() => {
    validateToken();
  }, [router]);

  return (
    <div className="sub-layout">
      <h1 className="admin-title">Admin Dashboard</h1>
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
        <Link href="/admin" className="admin-link">
          Reports
        </Link>
      </nav>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
