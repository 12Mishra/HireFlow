import User from "../models/user.model.js";
import generateToken from "../services/authUser.js";
import JobPosting from "../models/jobPosting.model.js";

export async function handleUserSignup(req, res) {
    const { username, email, age, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const user = new User({ username, email, age, password });
        await user.save();

        const userPayload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(userPayload);

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
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'strict'
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

export async function handleJobApplicatiob(req, res) {
    const job_id = req.params.id;
    const user_id = req.user.id;
    try {
        const job = await JobPosting.findById(job_id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        const existingApplication = await Application.findOne({ user: user_id, job: job_id });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const newApplication = new Application({
            user: userId,
            job: jobId,
        });

        await newApplication.save();

        return res.status(201).json({ message: 'Application submitted successfully', application: newApplication });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}