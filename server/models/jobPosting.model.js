//protected route for recruiter
import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        default: Date.now,
    },
    closingDate: {
        type: Date,
        default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    applicationCount:{
        type:Number,
        default:0
    },
    createdBy:{
        type:Object,
        ref:"recruiter"
    }
}); 

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;
