import { NextResponse } from "next/server";
import userRegs from "@/Database/models/registration"; // Mongoose User model
import connectDB from "@/Database/connectDB";

export async function GET(req) {
  try {
    // Ensure connection is made before performing any DB operations
    await connectDB();

    const savedUser = await userRegs.find(); // Retrieve all users from the collection

    return NextResponse.json(
      { message: 'Users retrieved successfully', data: savedUser },
      { status: 200 } 
    );
  } catch (error) {
    console.error('Error retrieving data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve users', details: error.message },
      { status: 500 } 
    );
  }
}
