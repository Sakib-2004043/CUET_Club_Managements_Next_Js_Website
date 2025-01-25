'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

import "./profile.css";

const Profile = () => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // State to hold user data and image
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // For buffer-type image
  const [loading, setLoading] = useState(true);

  // Fetch user data from the API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Decode the token to extract studentId
        const decodedToken = jwtDecode(token);
        const { studentId } = decodedToken;

        if (!studentId) {
          console.error("Student ID not found in token");
          router.push('/login');
          return;
        }

        // Send POST request with studentId
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ studentId }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data

          // Check if the response contains image buffer data
          if (data.profileImage) {
            const base64Image = Buffer.from(data.profileImage).toString('base64');
            setProfileImage(`data:image/jpeg;base64,${base64Image}`);
          }
        } else {
          console.error('Failed to fetch user data:', response.statusText);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, router]);

  if (loading) return <div className="profile-loading">Loading...</div>;

  if (!user) return <div className="profile-error">User not found</div>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-title">User Profile</h1>
      </header>

      <div className="profile-content">
        <div className="profile-card">
          {/* Profile Image Section */}
          <div className="profile-image-section">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-no-image">No Profile Image</div>
            )}
          </div>

          {/* User Information Section */}
          <div className="profile-details">
            <div className="profile-detail">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{user.name}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Student ID:</span>
              <span className="profile-value">{user.studentId}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Department:</span>
              <span className="profile-value">{user.department}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Mobile:</span>
              <span className="profile-value">{user.mobile}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Batch:</span>
              <span className="profile-value">{user.batch}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Hall:</span>
              <span className="profile-value">{user.hall}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Admin:</span>
              <span className="profile-value">{user.admin}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
