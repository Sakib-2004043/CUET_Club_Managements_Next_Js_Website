import { NextResponse } from "next/server";
import requestTable from "@/Database/models/joinRequest"; // Mongoose User model
import connectDB from "@/Database/connectDB";


export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch requests based on the filter
    const requests = await requestTable.find();

    if (!requests || requests.length === 0) {
      return NextResponse.json(
        { message: "No requests found" },
        { status: 200 }
      );
    }

    // Return the found requests
    return NextResponse.json(
      { requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving requests:", error);
    return NextResponse.json(
      { error: "Failed to retrieve requests", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { studentId } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: "Missing required field: studentId" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find all requests for the given studentId
    const requests = await requestTable.find({ studentId });

    if (!requests || requests.length === 0) {
      return NextResponse.json(
        { message: "No requests found for this studentId" },
        { status: 201 }
      );
    }

    // Return the found requests
    return NextResponse.json(
      { requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving requests:", error);
    return NextResponse.json(
      { error: "Failed to retrieve requests", details: error.message },
      { status: 500 }
    );
  }
}

// Moderator Approval Fetching
export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { studentId , admin} = body;

    if (!studentId) {
      return NextResponse.json(
        { error: "Missing required field: studentId" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find all requests for the given studentId
    const requests = await requestTable.find({ studentId: studentId, requestedClub: admin });

    if (!requests || requests.length === 0) {
      return NextResponse.json(
        { message: "No requests found for this studentId" },
        { status: 201 }
      );
    }

    // Return the found requests
    return NextResponse.json(
      { requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving requests:", error);
    return NextResponse.json(
      { error: "Failed to retrieve requests", details: error.message },
      { status: 500 }
    );
  }
}