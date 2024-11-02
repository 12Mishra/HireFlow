import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    pastexp: {
        type: String,
        required: true
    },
    content: {  // why do you think you fit for this job
        type: String,
        required: true
    },
    companyExpectations: {
        type: String,
        required: true
    },
    appliedJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPosting"
    },
    accepted:{
        type: ['Accept', 'Reject', 'Under Review'],
        default: 'Under Review'
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;