import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://oniichan2095:sanskar100@cluster0.p7wca3h.mongodb.net/todoApp");
        console.log("Connect to DB");
    }catch(err){
        console.log(err , "Error connexcting db")
    }
}