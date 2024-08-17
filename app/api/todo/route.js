import { connectDB } from "@lib/config/db";
import TodoModel from "@lib/models/TodoModel";
import { NextResponse } from "next/server";


const LoadDB = async()=>{
    await connectDB();
}

LoadDB();

export async function GET(request){
    const todos = await TodoModel.find({});
   return  NextResponse.json({todos : todos});
}

export async function POST(request){
    const {title , description} = await request.json()
    let user = await TodoModel.create({
        title,description
    });
    user.save();
    return  NextResponse.json({message : "Task Added"});
 }

 export async function DELETE(request) {
    await connectDB();
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    try {
        await TodoModel.findByIdAndDelete(mongoId);
        return NextResponse.json({ message: "Task Deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Error deleting task" });
    }
}

export async function PUT(request) {
    await connectDB();
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    try {
        await TodoModel.findByIdAndUpdate(mongoId , {
            $set : {
                isCompleted : true
                
            }
        });
        return NextResponse.json({ message: "Task Completed" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Error completing task" });
    }
}