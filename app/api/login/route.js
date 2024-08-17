import { connectDB } from "@lib/config/db";
import User from "@lib/models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { NextResponse } from "next/server";

export async function GET(request) {
     return NextResponse.json({
        message : "At login request"
     })
}
  

export async function POST(request) {
    await connectDB(); // Assuming connectDB connects to your database
  
    try {
      const { email, password } = await request.json();
  
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }); // Avoid revealing if password is incorrect
      }
  
      // Validate password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }); // Generic error for security
      }
  
      // Create a JWT (avoid sending sensitive information in payload)
      const token = { id: user._id }; // Include only user ID for authentication
      const signedToken = await jwt.sign(token, "secret"); // Use environment variable
  
      // Set cookie securely with appropriate options
      const response = NextResponse.json({ message: "Logged in successfully" });
      response.cookies.set(
        "token",
        signedToken,
        {
          httpOnly: true, // Prevent client-side JavaScript access
          path: "/", // Accessible from all routes
        }
      );
  
      return response;
    } catch (error) {
      console.error("Error logging in user:", error);
      return NextResponse.json({ message: "Error logging in" }, { status: 500 }); // Send error response with status code
    }
  }
  
  