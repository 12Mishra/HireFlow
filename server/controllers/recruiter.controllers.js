import Recruiter from "../models/recruiter.model.js";
import generateToken from "../services/authRecruiter.js";

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

        console.log(recruiterPayload);

        const token = generateToken(recruiterPayload);
        console.log(token);
        
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
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'strict'
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