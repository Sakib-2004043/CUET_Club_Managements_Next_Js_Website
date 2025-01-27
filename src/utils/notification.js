export const userNotification = async (clubName , count) => {
  try {
    console.log("ClubName", clubName);

    // Make a POST request to /api/notification
    const response = await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clubName, count }),
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Notification successfully sent:", result);
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
};

export const setZeroNotification = async(clubName) => {
  try {
    console.log("ClubName", clubName);

    // Make a POST request to /api/notification
    const response = await fetch("/api/notification", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clubName }),
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Notification successfully sent:", result);
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
}
