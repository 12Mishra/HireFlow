import express from 'express';
import { handleSignup , handleSignin, handleProfile, handlemyJobPostings } from '../controllers/recruiter.controllers.js';
import jwtAuthMiddlewareRecruiter from '../middlewares/Recruiterjwt.middleware.js';
const recruiterRouter = express.Router();

recruiterRouter.post('/auth/signup', handleSignup);
recruiterRouter.post('/auth/login', handleSignin);
recruiterRouter.get('/profile',jwtAuthMiddlewareRecruiter, handleProfile );
recruiterRouter.get('/myjobpostings',jwtAuthMiddlewareRecruiter, handlemyJobPostings )

export default recruiterRouter;