import User from "../models/user.model.js";
import generateToken from "../services/authUser.js";
import JobPosting from "../models/jobPosting.model.js";
import jobProfile from "../models/jobprofile.model.js";
import Application from "../models/application.model.js";

export async function handleUserSignup(req, res) {
    const { username, email, age, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        console.log("hi");
        const user = new User({ username, email, age, password });

        await user.save();

        const userPayload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(userPayload);

        res.cookie("authToken", token, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 });

        res.status(201).json({ message: "User registered successfully.", token });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: "Server error", error });
    }
}

export async function handleUserSignin(req, res) {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.cookie('authToken', token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24, 
        });

        return res.status(200).json({ message: 'Login successful', user: { email }, token: { token } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

export async function handleProfile(req, res) {
    try {
        const userdata = req.userPayload;
        console.log(userdata);

        const userId = userdata.id;
        const user = await User.findById(userId);

        res.status(200).json({ user });

    } catch (error) {
        console.error('Profile fetching error:', error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}

export async function handleDisplayJobs(req, res) {
    const job_id = req.params.id;

    try {
        const jobs = await JobPosting.findById(job_id);
        res.status(200).json({ jobs });

    } catch (error) {
        console.error("Error occured displaying job", error);
        res.status(400).json({ message: "Server error" })

    }
}

export async function handleJobProfile(req, res) {
    const user_id = req.userPayload.id;
    console.log(user_id);
    
    try {
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const { location, aboutme, techskills, degree } = req.body;

        console.log(req.body);

        const existingProfile = await jobProfile.findOne({ email: user.email });

        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists for this user"
            });
        }

        const jobProfileData = {
            name: user.username,
            email: user.email,
            location,
            aboutme,
            techskills,
            degree,
            userId: user_id
        };

        const profile = await jobProfile.create(jobProfileData);
        console.log(profile);

        return res.status(201).json({
            message: 'Job profile created successfully',
            profile,
        });

    } catch (error) {
        console.error('Error creating job profile:', error);
        return res.status(500).json({
            message: 'An error occurred while creating the job profile',
        });
    }
}


export async function handleJobApplication(req, res) {
    const job_id = req.params.id;
    const user_id = req.userPayload.id;

    const { pastexp, content, companyExpectations } = req.body;

    try {
        const job = await JobPosting.findById(job_id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const user = await jobProfile.findOne({ userId: user_id }); 
        if (!user) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        const existingApplication = await Application.findOne({ user: user_id, job: job_id });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const newApplication = new Application({
            userId: user_id,
            pastexp,
            content,
            companyExpectations,
            appliedJob: job_id
        });
        
        job.applicationCount += 1;

        await job.save();
        await newApplication.save();

        return res.status(201).json({ message: 'Application submitted successfully', application: newApplication });

    } catch (error) {
        console.error('Error during job application:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function handlemyApplications(req, res) {
    const user_id = req.userPayload.id; 
    try {
        const applications = await Application.find({ userId: user_id }).populate('appliedJob');
        res.status(200).json({ applications });
    } catch (error) {
        console.error('Error during fetching applications:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
