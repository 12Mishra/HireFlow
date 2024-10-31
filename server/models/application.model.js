import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        ref:"JobPosting",
    },
    email:{
        type:String,
        ref:"JobPosting",
    },
    location:{
        type:String,
        ref:"JobPosting"
    },
    aboutme:{
        type:String,
        ref:"JobPosting"
    },
    techskills:{
        type:[String],
        ref:"JobPosting"
    },
    degree:{
        type:[String],
        ref:"JobPosting"
    },
    pastexp:{
        type:String,
        required:true
    },
    content:{  // why do you think you fit for this job
        type:String,
        required:true
    },
    companyExpectations:{
        type:String,
        required:true
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
