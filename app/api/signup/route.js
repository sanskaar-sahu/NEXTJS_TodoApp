import { connectDB } from "@lib/config/db";
import User from "@lib/models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { NextResponse } from "next/server";


export async function POST(request) {
    await connectDB(); // Assuming connectDB connects to your database
  
    try {
      const { fullname, email, password } = await request.json();
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ fullname, email, password: hashPassword });
      const response = NextResponse.json({ message: "Successfully created account" });
      response.cookies.set()
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ message: "Error creating account", error }, { status: 500 }); // Send an error response with status code
    }
  }
  

export async function GET(request){
    return NextResponse.json({message : "At Login Page"})
}