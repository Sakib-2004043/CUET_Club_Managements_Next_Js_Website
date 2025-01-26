"use client";
import { useEffect, useState } from "react";
import "./approval.css";
import { useRouter } from "next/navigation";

const ModApprovalPage = () => {
  const [approvals, setApprovals] = useState([]);
  const [filteredApprovals, setFilteredApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState(""); // Search input text

  const router = useRouter();

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1]; // Get the payload part of the JWT
      const decoded = JSON.parse(atob(payload)); // Decode base64 and parse as JSON
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token"); // Adjust key if necessary
    const decodedToken = decodeToken(token);

    if (decodedToken) {
      const requestedClub = decodedToken.admin; // Get requested club name from the decoded token
      console.log("Requested Club from Token:", requestedClub);
      
      const fetchApprovals = async () => {
        try {
          const response = await fetch("/api/approval", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clubName: requestedClub }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          // Define custom sorting order for approval statuses
          const approvalOrder = {
            "Pending": 1,
            "Rejected": 2,
            "Removed": 3,
            "Accepted": 4, 
            "Not Requested": 5
          };

          // Sort approvals by approval status using the custom order, and by updatedAt in descending order
          const sortedApprovals = data.requests.sort((a, b) => {
            const statusComparison = approvalOrder[a.approval] - approvalOrder[b.approval];
            if (statusComparison !== 0) {
              return statusComparison;
            }
            // If statuses are the same, sort by updatedAt in descending order
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });

          setApprovals(sortedApprovals);
          setFilteredApprovals(sortedApprovals);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchApprovals();
    } else {
      console.error("No valid token found or failed to decode token");
      setLoading(false);
    }
  }, [refresh]);

  const handleAction = async (studentId, requestedClub, action) => {
    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          clubName: requestedClub,
          status: action,
        }),
      });

      const result = await response.json();
      console.log(result);

      // Trigger refresh
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleSearchText = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    // Filter users based on name, studentId, email, or mobile
    const filtered = approvals.filter((approval) =>
      [approval.studentId, approval.requestedClub].some((field) =>
        field?.toLowerCase().includes(searchValue)
      )
    );
    setFilteredApprovals(filtered);
  };

  // Function to group by `approval` variable
  const groupByApproval = (data) => {
    return data.reduce((groups, item) => {
      const { approval } = item;
      if (!groups[approval]) {
        groups[approval] = [];
      }
      groups[approval].push(item);
      return groups;
    }, {});
  };

  // Function to highlight only the typed portion
  const highlightMatch = (text) => {
    if (!searchText) return text; // If no search text, return original text

    // Create a regex to match the search text (case insensitive)
    const regex = new RegExp(`(${searchText})`, "i");

    // Replace matched text with a span that applies bold styling
    const parts = text?.split(regex); // Split text into matching and non-matching parts
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="mod-approv-highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleClick = (studentId) => {
    console.log(studentId);
    // router.push(`/admin/${studentId}`);
  };

  if (loading) {
    return <div className="mod-approv-loading">Loading approvals...</div>;
  }

  if (error) {
    return <div className="mod-approv-error">Error: {error}</div>;
  }

  // Group filtered approvals by `approval` variable
  const groupedApprovals = groupByApproval(filteredApprovals);

  return (
    <div className="mod-approv-container">
      <h1 className="mod-approv-title">Approvals</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchText}
        placeholder="Search..."
        className="mod-approv-admin-search-text"
      />
      <br />
      {Object.entries(groupedApprovals).map(([approvalStatus, group]) => (
        <div key={approvalStatus} className="mod-approv-group">
          <h2 className="mod-approv-group-title">{approvalStatus}</h2>
          <table className="mod-approv-table">
            <thead className="mod-approv-table-header">
              <tr>
                <th className="mod-approv-table-header-cell">Student ID</th>
                <th className="mod-approv-table-header-cell">Requested Club</th>
                <th className="mod-approv-table-header-cell">Approval Status</th>
                <th className="mod-approv-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.map((approval, index) => (
                <tr key={index} className="mod-approv-table-row">
                  <td className="mod-approv-table-cell">
                    <p onClick={() => handleClick(approval.studentId)}>
                      {highlightMatch(approval.studentId)}
                    </p>
                  </td>
                  <td className="mod-approv-table-cell">
                    {highlightMatch(approval.requestedClub)}
                  </td>
                  <td className="mod-approv-table-cell">
                    {approval.approval === "Not Requested"
                      ? "Left Club"
                      : approval.approval}
                  </td>
                  <td className="mod-approv-table-cell mod-approv-action-cell">
                    {approval.approval === "Pending" && (
                      <>
                        <button
                          className="mod-approv-accept-button"
                          onClick={() =>
                            handleAction(
                              approval.studentId,
                              approval.requestedClub,
                              "Accepted"
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="mod-approv-reject-button"
                          onClick={() =>
                            handleAction(
                              approval.studentId,
                              approval.requestedClub,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {approval.approval === "Accepted" && (
                      <button
                        className="mod-approv-remove-button"
                        onClick={() =>
                          handleAction(
                            approval.studentId,
                            approval.requestedClub,
                            "Removed"
                          )
                        }
                      >
                        Remove from Club
                      </button>
                    )}
                    {approval.approval === "Rejected" && (
                      <button
                        className="mod-approv-allow-button"
                        onClick={() =>
                          handleAction(
                            approval.studentId,
                            approval.requestedClub,
                            "Accepted"
                          )
                        }
                      >
                        Allow to Join
                      </button>
                    )}
                    {approval.approval === "Removed" && (
                      <button
                        className="mod-approv-cancel-button"
                        onClick={() =>
                          handleAction(
                            approval.studentId,
                            approval.requestedClub,
                            "Accepted"
                          )
                        }
                      >
                        Cancel Removal
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ModApprovalPage;
