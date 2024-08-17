const { default: mongoose, mongo } = require("mongoose");

 
 const todoSchema = mongoose.Schema({
    title : {
        type : String , 
        required : true 
    },
    description : {
        type : String , 
        required : true 
    },
    isCompleted : {
        type : Boolean , 
        default : false
    },
 },{timeStamp : true} );

 const TodoModel = mongoose.models.tode || mongoose.model("tode" ,todoSchema )

 export default TodoModel;