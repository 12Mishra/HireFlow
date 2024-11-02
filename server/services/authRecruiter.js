import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function generateToken(recruiterData){
    return jwt.sign(recruiterData, process.env.JWT_SECRET_RECRUITER);
}

export default generateToken;