'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

import "./profile.css"

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

  if (loading) return <div className="loading-spinner">Loading...</div>;

  if (!user) return <div className="error-message">User not found</div>;

  return (
    <div className="profile-page">
      <h1 className="profile-heading">User Profile</h1>
      <div className="profile-card">
        <div className="profile-image-container">
          {profileImage ? (
            <div className="profile-image">
              <img src={profileImage} alt="Profile" className="profile-img" />
            </div>
          ) : (
            <p className="no-image-message">No profile image available</p>
          )}
        </div>
        <div className="profile-info">
          <p className="profile-info-item"><strong>Name:</strong> {user.name}</p>
          <p className="profile-info-item"><strong>Student ID:</strong> {user.studentId}</p>
          <p className="profile-info-item"><strong>Email:</strong> {user.email}</p>
          <p className="profile-info-item"><strong>Department:</strong> {user.department}</p>
          <p className="profile-info-item"><strong>Mobile:</strong> {user.mobile}</p>
          <p className="profile-info-item"><strong>Batch:</strong> {user.batch}</p>
          <p className="profile-info-item"><strong>Hall:</strong> {user.hall}</p>
          <p className="profile-info-item"><strong>Clubs Member:</strong> {user.clubsMember}</p>
          <p className="profile-info-item"><strong>Admin:</strong> {user.admin}</p>
          <p className="profile-info-item"><strong>Clubs Moderator:</strong> {user.clubsModerator}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
