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

        if(decodedData.admin === "Admin"){
          router.push("/admin") // Redirect to user route
        }
        else if(decodedData.admin === "Member Only"){
          router.push("/user") // Redirect to user route
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
      <nav className="moderator-nav">
        <Link href="/moderator" className="moderator-link" onClick={validateToken}>
          Home
        </Link>
        <Link href="/moderator/profile" className="moderator-link" onClick={validateToken}>
          Profile
        </Link>
        <Link href="/moderator/clubs" className="moderator-link" onClick={validateToken}>
          Clubs
        </Link>
        <Link href="/moderator/moderation" className="moderator-link">
          Moderation
        </Link>
        <Link href="/moderator/announcements" className="moderator-link">
          Announcements
        </Link>
      </nav>
      <main className="user-content">
        {children}
      </main>
    </div>
  );
}
