'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams for dynamic routing
import "./studentProfile.css";

const Profile = () => {
  const router = useRouter();
  const { studentId } = useParams(); // Get studentId from dynamic route params

  // State to hold user data and image
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // For buffer-type image
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState([]); // State to store membership data

  // Fetch user data from the API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!studentId) {
        console.error("Student ID not found in route");
        router.push('/login');
        return;
      }

      try {
        // Send POST request with studentId
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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

    const fetchMembership = async () => {
      try {
        const response = await fetch('/api/approval', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId }),
        });

        if (response.ok) {
          const data = await response.json();
          setMembershipStatus(data.requests || []); // Save the membership data (requests) to state
        } else {
          console.error('Failed to fetch membership data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching membership data:', error);
      }
    };

    fetchUserData();
    fetchMembership();

  }, [studentId, router]);

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

      {/* Displaying the membership status */}
      <div className="membership-status-container">
        <h2 className="membership-status-heading">Membership Status</h2>
        {membershipStatus.length > 0 ? (
          <table className="membership-table">
            <thead>
              <tr>
                <th className="table-header">Club</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {membershipStatus.map((request, index) => (
                <tr key={index} className="membership-table-row">
                  <td className="table-cell">{request.requestedClub}</td>
                  <td className="table-cell status-cell">{request.approval}</td>
                  <td className="table-cell action-cell">
                    <button className="action-button accept-button">Accept</button>
                    <button className="action-button reject-button">Reject</button>
                  </td> {/* New column for buttons */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-requests-message">No membership requests found.</p>
        )}
      </div>

    </div>
  );
};

export default Profile;
