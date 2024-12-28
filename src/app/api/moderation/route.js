import { NextResponse } from "next/server";
import userRegs from "@/Database/models/registration";
import requestTable from "@/Database/models/joinRequest";
import connectDB from "@/Database/connectDB";

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { studentId, clubName } = body;

    // Validate the input fields
    if (!studentId || !clubName) {
      return NextResponse.json(
        { error: "Missing required fields: studentId or clubName" },
        { status: 202 }
      );
    }

    // Connect to the database
    await connectDB();

    // Update the admin field for the given studentId
    const result = await userRegs.updateOne(
      { studentId }, // Find by studentId
      { $set: { admin: clubName } } // Update admin field
    );

    // Check if a document was modified
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "No user found with the provided studentId" },
        { status: 201 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No changes made to the document" },
        { status: 200 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: `Moderator assigned to ${clubName}` },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in making moderator:", error);
    return NextResponse.json(
      { error: "Error in making moderator", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const clubName = body.admin; // Club name from admin field
    const approval = "Accepted"; // Filter by accepted requests

    // Validate input
    if (!clubName) {
      return NextResponse.json(
        { error: "Missing required field: admin (clubName)" },
        { status: 202 }
      );
    }

    // Connect to the database
    await connectDB();

    // Fetch all requests with the given clubName and approval status
    const requests = await requestTable.find({ requestedClub: clubName, approval });

    // Extract the studentIds from the requests
    const studentIds = requests.map((request) => request.studentId);

    // Fetch users with matching studentIds
    const users = await userRegs.find({ studentId: { $in: studentIds } });

    // Combine data from both collections
    const responseData = users.map((user) => {
      const requestDetails = requests.find((req) => req.studentId === user.studentId);
      return {
        studentId: user.studentId,
        name: user.name,
        email: user.email,
        department: user.department,
        hall: user.hall,
        clubsMember: user.clubsMember,
        profileImage: user.profileImage,
        requestedClub: requestDetails?.requestedClub || null,
        approval: requestDetails?.approval || null,
      };
    });

    console.log(users)

    // Return the combined data
    return NextResponse.json(
      { success: true, data: users },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in PUT handler:", error);
    return NextResponse.json(
      { error: "Error in fetching data", details: error.message },
      { status: 500 }
    );
  }
}
