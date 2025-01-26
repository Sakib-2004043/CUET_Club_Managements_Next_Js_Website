import { NextResponse } from "next/server";
import Notification from "@/Database/models/notification";
import connectDB from "@/Database/connectDB";

// For 1 Increment
export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { clubName, count } = body;

    // Validate the input fields
    if (!clubName) {
      return NextResponse.json(
        { error: "Missing required field: clubName" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Increment the notification count for the specified club
    const result = await Notification.findOneAndUpdate(
      {}, // Match any document since we assume a single global document for notifications
      { $inc: { [clubName]: count } }, // Increment the count for the specified club
      { new: true, upsert: true } // Return the updated document and create one if none exists
    );
    const resultAdmin = await Notification.findOneAndUpdate(
      {}, // Match any document since we assume a single global document for notifications
      { $inc: { ["Admin"]: count } }, // Increment the count for the Admin
      { new: true, upsert: true } // Return the updated document and create one if none exists
    );

    // Check if the operation was successful
    if (!result) {
      return NextResponse.json(
        { error: "Failed to update notification count" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: `Notification count for "${clubName}" incremented successfully.`,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error Setting Zero notification count:", error);
    return NextResponse.json(
      { error: "Error Setting Zero notification count", details: error.message },
      { status: 500 }
    );
  }
}

// For Getting Notification Count
export async function PATCH(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { clubName } = body;
    console.log("Body",body)

    // Validate the input fields
    if (!clubName) {
      return NextResponse.json(
        { error: "Missing required field: clubName" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Query the notification count for the specified club
    const result = await Notification.findOne({});

    if (!result) {
      return NextResponse.json(
        { error: "No notifications found" },
        { status: 404 }
      );
    }
    // Get the notification count for the specific club
    const clubNotificationCount = result[clubName];

    // If no count exists for the specified club, return 0
    if (clubNotificationCount === undefined) {
      return NextResponse.json(
        { count: 0 },
        { status: 200 }
      );
    }

    // Return the notification count for the club
    return NextResponse.json(
      { count: clubNotificationCount },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching notification count:", error);
    return NextResponse.json(
      { error: "Error fetching notification count", details: error.message },
      { status: 500 }
    );
  }
}



// For Setting 0
export async function PUT(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { clubName } = body;

    // Validate the input fields
    if (!clubName) {
      return NextResponse.json(
        { error: "Missing required field: clubName" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Increment the notification count for the specified club
    const result = await Notification.findOneAndUpdate(
      {}, // Match any document since we assume a single global document for notifications
      { $set: { [clubName]: 0 } }, // Increment the count for the specified club
      { new: true, upsert: true } // Return the updated document and create one if none exists
    );

    // Check if the operation was successful
    if (!result) {
      return NextResponse.json(
        { error: "Failed to update notification count" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: `Notification count for "${clubName}" Set Zero successfully.`,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error incrementing notification count:", error);
    return NextResponse.json(
      { error: "Error Setting Zero notification count", details: error.message },
      { status: 500 }
    );
  }
}

