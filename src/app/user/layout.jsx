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

        if(decodedData.admin === "YES"){
          router.push("/admin") // Redirect to user route
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
      <h1 className="user-title">User Dashboard</h1>
      <nav className="user-nav">
        <Link href="/user" className="user-link" onClick={validateToken}>
          Home
        </Link>
        <Link href="/user/profile" className="user-link" onClick={validateToken}>
          Profile
        </Link>
        <Link href="/user/clubs" className="user-link" onClick={validateToken}>
          Clubs
        </Link>
        <Link href="/user/settings" className="user-link">
          Settings
        </Link>
        <Link href="/user/reports" className="user-link">
          Reports
        </Link>
      </nav>
      <main className="user-content">
        {children}
      </main>
    </div>
  );
}
