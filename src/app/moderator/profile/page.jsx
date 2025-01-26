'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

import "./profile.css";

const Profile = () => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const { studentId } = decodedToken;

        if (!studentId) {
          console.error("Student ID not found in token");
          router.push('/login');
          return;
        }

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
          setUser(data);

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

  if (loading) return <div className="mod-prof-loading-spinner">Loading...</div>;

  if (!user) return <div className="mod-prof-error-message">User not found</div>;

  return (
    <div className="mod-prof-profile-page">
      <div className="mod-prof-profile-card">
        <h1 className="mod-prof-profile-heading">User Profile</h1>
        <div className="mod-prof-profile-image-container">
          {profileImage ? (
            <div className="mod-prof-profile-image">
              <img src={profileImage} alt="Profile" className="mod-prof-profile-img" />
            </div>
          ) : (
            <p className="mod-prof-no-image-message">No profile image available</p>
          )}
        </div>
        <table className="mod-prof-profile-table">
          <tbody>
            <tr>
              <th className="mod-prof-table-header">Name</th>
              <td className="mod-prof-table-data">{user.name}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Student ID</th>
              <td className="mod-prof-table-data">{user.studentId}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Email</th>
              <td className="mod-prof-table-data">{user.email}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Department</th>
              <td className="mod-prof-table-data">{user.department}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Mobile</th>
              <td className="mod-prof-table-data">{user.mobile}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Batch</th>
              <td className="mod-prof-table-data">{user.batch}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Hall</th>
              <td className="mod-prof-table-data">{user.hall}</td>
            </tr>
            <tr>
              <th className="mod-prof-table-header">Clubs Moderator</th>
              <td className="mod-prof-table-data">{user.admin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
