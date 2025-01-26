'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams for dynamic routing
import "./profile.css";

const Profile = () => {
  const router = useRouter();
  const [studentId, setStudentId] = useState(null);
  const [admin, setAdmin] = useState(null);

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

      const data = await JSON.parse(localStorage.getItem("STDID"));
      console.log("STDID : ",data.studentId)
      if (data) {
        setStudentId(data.studentId);
        setAdmin(data.admin);
      }

      try {
        // Send POST request with studentId
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {studentId : studentId} ),
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId, admin }),
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
        
        <div className="mod-prof-profile-info">
          <p className="mod-prof-profile-info-item"><strong>Name:</strong> {user.name}</p>
          <p className="mod-prof-profile-info-item"><strong>Student ID:</strong> {user.studentId}</p>
          <p className="mod-prof-profile-info-item"><strong>Email:</strong> {user.email}</p>
          <p className="mod-prof-profile-info-item"><strong>Department:</strong> {user.department}</p>
          <p className="mod-prof-profile-info-item"><strong>Mobile:</strong> {user.mobile}</p>
          <p className="mod-prof-profile-info-item"><strong>Batch:</strong> {user.batch}</p>
          <p className="mod-prof-profile-info-item"><strong>Hall:</strong> {user.hall}</p>
          <p className="mod-prof-profile-info-item"><strong>Clubs Moderator:</strong> {user.admin}</p>
        </div>
      </div>

      {/* Displaying the membership status */}
      <div className="mod-prof-membership-status-container">
        <h2 className="mod-prof-membership-status-heading">Membership Request</h2>
        {membershipStatus.length > 0 ? (
          <table className="mod-prof-membership-table">
            <thead>
              <tr>
                <th className="mod-prof-table-header">Club</th>
                <th className="mod-prof-table-header">Status</th>
                <th className="mod-prof-table-header">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {membershipStatus.map((request, index) => (
                <tr key={index} className="mod-prof-membership-table-row">
                  <td className="mod-prof-table-cell">{request.requestedClub}</td>
                  <td className="mod-prof-table-cell mod-prof-status-cell">{request.approval === "Not Requested"?"Left Club":request.approval}</td>
                  <td className="mod-prof-table-cell mod-prof-action-cell">
                    {request.approval === "Pending" && (
                      <>
                        <button
                          className="mod-prof-accept-button"
                          onClick={() => handleAction(request.requestedClub, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="mod-prof-reject-button"
                          onClick={() => handleAction(request.requestedClub, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.approval === "Accepted" && (
                      <button
                        className="mod-prof-remove-button"
                        onClick={() => handleAction(request.requestedClub, "Removed")}
                      >
                        Remove from Club
                      </button>
                    )}
                    {request.approval === "Rejected" && (
                      <button
                        className="mod-prof-allow-button"
                        onClick={() => handleAction(request.requestedClub, "Accepted")}
                      >
                        Allow to Join
                      </button>
                    )}
                    {request.approval === "Removed" && (
                      <button
                        className="mod-prof-cancel-button"
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
          <p className="mod-prof-no-requests-message">No membership requests found.</p>
        )}
      </div>

    </div>
  );
};

export default Profile;
