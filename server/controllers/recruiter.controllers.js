import Recruiter from "../models/recruiter.model.js";
import generateToken from "../services/authRecruiter.js";
import JobPosting from "../models/jobPosting.model.js";
import Application from "../models/application.model.js";
import mongoose from "mongoose";
export async function handleSignup(req, res) {
    const { recruitername, company, email, password } = req.body;
    
    try {
        const existingRecruiter = await Recruiter.findOne({ email });

        if (existingRecruiter) {
            return res.status(400).json({ message: "Recruiter already exists." });
        }

        const recruiter = new Recruiter({ recruitername, company, email, password });
        await recruiter.save();
        console.log(recruiter);
        
        const recruiterPayload = {
            id: recruiter.id,
            username: recruiter.recruitername,
            role:recruiter.role
        };

        const token = generateToken(recruiterPayload);

        res.cookie('authRecruiterToken', token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24, 
        });

        res.status(201).json({ message: "Recruiter registered successfully." , token});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}   

export async function handleSignin(req, res) {
    const { email, password } = req.body;
    
    
    try {
        const token = await Recruiter.matchPasswordAndGenerateTokenForRecruiter(email, password);
        console.log(token);
        
        if (!token) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
  
        res.cookie('authRecruiterToken', token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({ message: 'Login successful', user: { email }, token: {token}}); 
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

export async function handleProfile(req, res){
    try {
        const recruiterData = req.recruiterPayload;
        console.log(recruiterData);
        
        const recruiterId=recruiterData.id;
        const recruiter= await Recruiter.findById(recruiterId);

        res.status(200).json({recruiter});

    } catch (error) {
        console.error('Profile fetching error:', error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
        
    }
}
export async function handlemyJobPostings(req, res) {
    try {
        const recruiterdata = req.recruiterPayload;
        
        if (!recruiterdata || !recruiterdata.id) {
            return res.status(400).json({ message: "Recruiter ID not found" });
        }

        const recruiterId = new mongoose.Types.ObjectId(recruiterdata.id);
        console.log('Recruiter ID (ObjectId):', recruiterId);
        
        const jobs = await JobPosting.find({ createdBy: recruiterId })
            .sort({ postedDate: -1 });         
        console.log('Found jobs:', jobs);
        
        return res.status(200).json({ jobs});
        
    } catch (error) {
        console.error('Error fetching recruiter job postings:', error);
        return res.status(500).json({ 
            success: false,
            message: "Error fetching job postings",
            error: error.message 
        });
    }
}

export async function handleJobApplications(req, res) {
    const jobId = req.params.id;
    console.log(jobId);
    
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const applications = await Application.find({ appliedJob: jobId })
            .populate('userId'); 

        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job" });
        }

        res.status(200).json({ applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ 
            message: "Server error",
            error: error.message 
        });
    }
}

export async function handleJobReviews(req, res) {
    const job_id = req.params.id;
    const user_id = req.params.applicationId;

    if (!mongoose.Types.ObjectId.isValid(job_id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(401).json({ message: "Invalid user ID" });
    }

    const review = req.body;

    try {
        const application = await Application.findOneAndUpdate(
            { _id: user_id, appliedJob: job_id },
            { accepted: review },
            { new: true }
        ).populate('userId');

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ application });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ 
            message: "Server error",
            error: error.message 
        });
    }
}
