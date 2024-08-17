import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname : {
        type : String ,
        required : true ,
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
    },
    isAdmin : {
       type : Boolean ,
       default : false
    },
    
    verifyToken :{ type : String},
    verifyTokenExpiry : {type : Date},
    forgetPasswordToken :{ type : String},
    forgetPasswordExpiry : {type : Date}
} , {timeStamp : true});

const User =  mongoose.models.users || mongoose.model("users" , userSchema);

export default User;