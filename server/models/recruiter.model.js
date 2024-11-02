import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";
import generateToken from "../services/authRecruiter.js";

const recruiterSchema = new mongoose.Schema({
    recruitername: {
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']

    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Please enter a valid password']
    },
    role: {
        type: String,
        default: "Recruiter",
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

recruiterSchema.pre('save', function (next) {
    const userRecruiter = this;

    if (!userRecruiter.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256", salt)
        .update(userRecruiter.password)
        .digest("hex");

    userRecruiter.password = hashedPassword;
    userRecruiter.salt = salt;
    next();
});

recruiterSchema.static('matchPasswordAndGenerateTokenForRecruiter', async function (email, password) {
    const Recruiter = await this.findOne({ email: email });
    
    if (!Recruiter) return false;

    
    const hashedPassword = Recruiter.password;
    const recruiterProvidedHash = createHmac("sha256", Recruiter.salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== recruiterProvidedHash) return false;

    const token = generateToken({ id: Recruiter._id, role: Recruiter.role });
    return token;

});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;