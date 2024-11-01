import JobPosting from "../models/jobPosting.model.js";
import Recruiter from "../models/recruiter.model.js";

export async function handleJobPosting(req, res){
    const { jobTitle,companyName, location, jobType, salary, description } = req.body;
    
    console.log(req.body);
    
    try {
        const recruiterdata = req.recruiterPayload;
        const recruiterId=recruiterdata.id;

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

export async function handleDisplayJobsAvailable(req, res){
    try {
        const jobs=await JobPosting.find({}).populate('createdBy');
        res.status(200).json({jobs});
    } catch (error) {
        console.error('Error during displaying jobs:', error);
        res.status(500).json({ message: "Server error", error });
    }
}