import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    user: {
        type: Object,
        ref: 'User', 
        required: true,
    },
    job: {
        type: Object,
        ref: 'JobPosting', 
        required: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied', 
    },
    appliedDate: {
        type: Date,
        default: Date.now, 
    },
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
