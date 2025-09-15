//User Schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{type: String,required: true,trim: true},
        email:{type: String , required: true , unique:true },
        password:{ type: String ,required:true ,minlength:6},
        role:{type : String,enum:["patient","doctor","admin"],default:"patient"},
        specialization:{type:String },
    },

    {timestamps: true}
);

export default mongoose.model("User",userSchema);