import { NextResponse } from "next/server";
import requestTable from "@/Database/models/joinRequest"; // Mongoose User model
import connectDB from "@/Database/connectDB";


export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { studentId, clubName } = body;

    if (!studentId || !clubName) {
      return NextResponse.json(
        { error: "Missing required fields: studentId or clubName" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find the request by studentId and clubName
    const request = await requestTable.findOne({
      studentId,
      requestedClub: clubName,
    });

    if (!request) {
      return NextResponse.json(
        { approval: "Not Requested" },
        { status: 201 }
      );
    }

    // Return the approval status
    return NextResponse.json(
      { approval: request.approval },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking membership status:", error);
    return NextResponse.json(
      { error: "Failed to check membership status", details: error.message },
      { status: 500 }
    );
  }
}




export async function POST(req) {

  const body = await req.json();
  const { studentId, clubName, status } = body;

  console.log(body)

  let approval = "";
  let msg = "";

  if(status === "Request To Join"){
    approval = "Pending"
    msg = "Request Pending. Cancel"
  }
  else if(status === "Request Pending. Cancel"){
    approval = "Not Requested"
    msg = "Request To Join"
  }
  else if(status === "Leave Club"){
    approval = "Not Requested"
    msg = "Request To Join"
  }
  try {
    // Ensure connection is made before performing any DB operations
    await connectDB();

    const savedRequest = await requestTable.findOneAndUpdate(
      { studentId, requestedClub: clubName }, // Query for existing request
      { studentId, requestedClub: clubName, approval }, // Data to upsert
      { upsert: true, new: true } // Upsert and return the updated document
    );

    console.log('Request sent successfully:', savedRequest);

    return NextResponse.json({ message: `${status} Request Sent Successfully`,msg }, { status: 201 });

  } catch (error) {
    console.error('Error storing data:', error);
    return NextResponse.json({ error: 'Failed to register user', details: error.message }, { status: 500 });
  }
}


