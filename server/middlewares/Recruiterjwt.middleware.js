import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

function jwtAuthMiddlewareRecruiter(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_RECRUITER);
        req.recruiterPayload = decoded; 
        next(); 
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ error: "Invalid Token" });
    }
}

export default jwtAuthMiddlewareRecruiter;
