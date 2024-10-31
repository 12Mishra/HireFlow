import mongoose from "mongoose";

const jobProfileSchema=mongoose.Schema({
    name:{
        type:String,
        ref:"User",
    },
    email:{
        type:String,
        ref:"User"
    },
    location:{
        type:String,
        required:true
    },
    aboutme:{
        type:String,
        required:true
    },
    techskills:{
        type:[String],
        required:true
    },
    degree:{
        type:[String],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const jobProfile=mongoose.model("JobProfile", jobProfileSchema);
export default jobProfile;