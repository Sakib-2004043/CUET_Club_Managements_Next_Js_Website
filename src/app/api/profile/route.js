import { NextResponse } from "next/server";
import userRegs from "@/Database/models/registration"; // Mongoose User model
import connectDB from "@/Database/connectDB";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body
    const { studentId } = await req.json();
    if(!studentId){
      return NextResponse.json("Student Id Not Found")
    }
    console.log("StdID : ",studentId)

    // Check if studentId is provided
    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the user data from the database
    const user = await userRegs.findOne({ studentId });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Respond with user data (excluding sensitive information like password)
    return NextResponse.json(
      {
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        department: user.department,
        mobile: user.mobile,
        batch: user.batch,
        hall: user.hall,
        clubsMember: user.clubsMember || [],
        admin: user.admin || "NO",
        clubsModerator: user.clubsModerator || [],
        profileImage: user.profileImage
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body
    const { studentId, ...updatedData } = await req.json();

    // Check if studentId is provided
    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Find the user and update their information
    const user = await userRegs.findOneAndUpdate(
      { studentId },
      { $set: updatedData }, // Updates only the fields provided in the request body
      { new: true } // Returns the updated document
    );

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Respond with the updated user data
    return NextResponse.json(
      { message: "User updated successfully"},
      { status: 200 }
    );
  } 
  catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
