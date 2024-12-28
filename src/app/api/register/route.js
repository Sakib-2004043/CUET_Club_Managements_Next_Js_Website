import { NextResponse } from "next/server";
import userRegs from "@/Database/models/registration"; // Mongoose User model
import connectDB from "@/Database/connectDB";
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    // Parse form data from the request
    const body = await req.formData();

    // Retrieve form fields and file
    const name = body.get("name");
    const studentId = body.get("studentId");
    const email = body.get("email");
    const password = body.get("password");
    const department = body.get("department");
    const batch = body.get("batch");
    const hall = body.get("hall");
    const mobile = body.get("mobile");
    const file = body.get("profileImage"); // The uploaded file

    // Validate file existence
    if (!file) {
      console.error("File not found in the request.");
      return NextResponse.json(
        { success: false, message: "Profile image not found." },
        { status: 202 }
      );
    }

    // Convert file to Buffer
    const bufferData = await file.arrayBuffer();
    const imageBuffer = Buffer.from(bufferData);

    console.log("Image buffer:", imageBuffer);

    // Ensure connection to the database
    await connectDB();

    // Creating a new user
    const newUser = new userRegs({
      name,
      studentId,
      email,
      password,
      department,
      batch,
      hall,
      mobile,
      clubsMember: [],
      admin: "Member Only",
      clubsModerator: [],
      profileImage: imageBuffer, // Store image as buffer
    });

    console.log("Creating new user:", newUser);

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    // Return success response
    return NextResponse.json(
      { message: "User registered successfully", data: savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing data:", error);
    return NextResponse.json(
      { error: "Failed to register user", details: error.message },
      { status: 500 }
    );
  }
}

// Log In Part
export async function PATCH(req) {

  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Find user by email
    const user = await userRegs.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Compare the password (Consider using bcrypt for secure password comparison)
    const isPasswordValid = password === user.password; // Replace with bcrypt.compare in production
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        admin: user.admin,
        department: user.department,
        batch: user.batch,
        hall: user.hall,
        mobile:user.mobile,
        clubsModerator: user.clubsModerator,
        clubsMember: user.clubsMember,
        //profileImage: user.profileImage
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token validity: 1 hour
    );

    // Respond with the token and user details
    return NextResponse.json(
      {
        message: 'Login successful.',
        token,
        admin: user.admin
      },{ status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}