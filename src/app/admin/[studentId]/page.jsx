'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams for dynamic routing
import "./studentProfile.css";
import Moderator from './moderator';

const Profile = () => {
  const router = useRouter();
  const { studentId } = useParams(); // Get studentId from dynamic route params

  // State to hold user data and image
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // For buffer-type image
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState([]); 
  const [render, setRender] = useState(true)
  const [showModeration, setShowModeration] = useState(false)

  // Fetch user data from the API on component mount
  useEffect(() => {
    const fetchUserData = async () => {

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

  }, [studentId, router, render, showModeration]);

  const handleAction = async(clubName,action) => {
    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId,
        clubName: clubName,
        status: action,
      }),
    });

    const result = await response.json();

    console.log(result);

    setRender(!render)

  }

  const handleClose = () => {
    setShowModeration(false); // Hide the Moderator component on cancel
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  if (!user) return <div className="error-message">User not found</div>;

  return (
    <div className="profile-page">
      {showModeration && <Moderator studentId={studentId} onCut={handleClose}/>}
      
      <div className="profile-card">
        <h1 className="profile-heading">User Profile</h1>
        <div className="profile-image-container">
          {profileImage ? (
            <div className="profile-image">
              <img src={profileImage} alt="Profile" className="profile-img" />
            </div>
          ) : (
            <p className="no-image-message">No profile image available</p>
          )}
        </div>
        <button 
          className="make-moderator-button"
          onClick={_ => setShowModeration(true)}
        >
            Update Moderator Status
        </button>
        <div className="profile-info">
          <table className="profile-info-table">
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td><strong>Student ID:</strong></td>
                <td>{user.studentId}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{user.department}</td>
              </tr>
              <tr>
                <td><strong>Mobile:</strong></td>
                <td>{user.mobile}</td>
              </tr>
              <tr>
                <td><strong>Batch:</strong></td>
                <td>{user.batch}</td>
              </tr>
              <tr>
                <td><strong>Hall:</strong></td>
                <td>{user.hall}</td>
              </tr>
              <tr>
                <td><strong>Clubs Moderator:</strong></td>
                <td>{user.admin}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Displaying the membership status */}
      <div className="membership-status-container">
        <h2 className="membership-status-heading">Membership Request</h2>
        {membershipStatus.length > 0 ? (
          <table className="membership-table">
            <thead>
              <tr>
                <th className="table-header">Club</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {membershipStatus.map((request, index) => (
                <tr key={index} className="membership-table-row">
                  <td className="table-cell">{request.requestedClub}</td>
                  <td className="table-cell status-cell">{request.approval === "Not Requested"?"Left Club":request.approval}</td>
                  <td className="table-cell action-cell">
                    {request.approval === "Pending" && (
                      <>
                        <button
                          className="accept-button"
                          onClick={() => handleAction(request.requestedClub, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleAction(request.requestedClub, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.approval === "Accepted" && (
                      <button
                        className="remove-button"
                        onClick={() => handleAction(request.requestedClub, "Removed")}
                      >
                        Remove from Club
                      </button>
                    )}
                    {request.approval === "Rejected" && (
                      <button
                        className="allow-button"
                        onClick={() => handleAction(request.requestedClub, "Accepted")}
                      >
                        Allow to Join
                      </button>
                    )}
                    {request.approval === "Removed" && (
                      <button
                        className="cancel-button"
                        onClick={() => handleAction(request.requestedClub, "Accepted")}
                      >
                        Cancel Removal
                      </button>
                    )}
                  </td>
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
