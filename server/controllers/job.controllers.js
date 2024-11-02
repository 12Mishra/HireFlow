import JobPosting from "../models/jobPosting.model.js";
import mongoose from "mongoose";
export async function handleJobPosting(req, res){
    const { jobTitle,companyName, location, jobType, salary, description } = req.body;
    
    console.log(req.body);
    
    try {
        const recruiterdata = req.recruiterPayload;
        const recruiterId = new mongoose.Types.ObjectId(recruiterdata.id)
        console.log(typeof recruiterId);
        
        const job = new JobPosting({ jobTitle, companyName, location, jobType, salary, description, createdBy: recruiterId  });
        
        await job.save();

        res.status(201).json({ message: "Job posted successfully." });
    } catch (error) {
        console.error('Error during posting job:', error);
        res.status(500).json({ message: "Server error", error });
    }
}

export async function handleJobOpenings(req, res){
    try {
        const jobs=await JobPosting.find({}).populate('createdBy');;
        res.status(200).json({jobs});
    } catch (error) {
        console.error('Error during displaying jobs:', error);
        res.status(500).json({ message: "Server error", error });
    }

}

export async function handleSearchedJobs(req, res) {
    try {
        const searchedValue = req.body.searchedValue; 

        const query = {
            $or: []
        };

        if (searchedValue) {
            query.$or.push(
                { jobTitle: { $regex: searchedValue, $options: 'i' } },
                { companyName: { $regex: searchedValue, $options: 'i' } },
                { location: { $regex: searchedValue, $options: 'i' } },
                { jobType: { $regex: searchedValue, $options: 'i' } }
            );
        }

        const bodyJson = await JobPosting.find(query);

        if (bodyJson.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json({bodyJson});
    } catch (error) {
        res.status(400).json({ message: "Error occurred", error: error.message });
    }
}
