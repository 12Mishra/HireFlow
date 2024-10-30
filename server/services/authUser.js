import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function generateToken(userData){
    return jwt.sign(userData, process.env.JWT_SECRET);
}

export default generateToken;