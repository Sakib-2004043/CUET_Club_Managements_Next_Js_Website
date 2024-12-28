import { NextResponse } from "next/server";
import announcements from "@/Database/models/announcement"; 
import requests from "@/Database/models/joinRequest"
import connectDB from "@/Database/connectDB";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body
    const body = await req.json();

    
    const newAnnouncement = new announcements({
      admin: body.admin,
      message: body.text
    });


    // Save the user to the database
    const savedNewAnnouncement = await newAnnouncement.save();
    console.log("Announcement Published successfully:", savedNewAnnouncement);

    // Return success response
    return NextResponse.json(
      { message: "Announcement Published successfully", data: savedNewAnnouncement },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all announcements from the database
    const allAnnouncements = await announcements.find().sort({ createdAt: -1 }); // Sorting by date in descending order

    // Return the fetched announcements as a response
    return NextResponse.json(
      { message: "Announcements fetched successfully", data: allAnnouncements },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Connect to the database
    await connectDB();

    // Fetch all announcements with the specified criteria
    const allAnnouncements = await announcements
      .find({
        $or: [{ admin: "Admin" }, { admin: body.admin }],
      })
      .sort({ createdAt: -1 }); // Sorting by date in descending order

    // Return the fetched announcements as a response
    return NextResponse.json(
      {
        message: "Announcements fetched successfully",
        data: allAnnouncements,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    // Parse the request body
    const body = await req.json();
    

    // Connect to the database
    await connectDB();

    // Fetch accepted requests for the student
    const clubs = await requests.find({
      studentId: body.studentId,
      approval: "Accepted"
    });

    // Extract club names from the requests
    const clubNames = clubs.map((club) => club.requestedClub);
    console.log(clubNames)

    // Fetch announcements for the admin "Admin" or for the clubs in `clubNames`
    const allAnnouncements = await announcements
      .find({
        $or: [{ admin: "Admin" }, { admin: { $in: clubNames } }],
      })
      .sort({ createdAt: -1 }); // Sorting by date in descending order

    // Return the fetched announcements as a response
    return NextResponse.json(
      {
        message: "Announcements fetched successfully",
        data: allAnnouncements,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
