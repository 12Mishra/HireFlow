import express from 'express';
import { handleSignup , handleSignin, handleProfile, handlemyJobPostings, handleJobApplications, handleJobReviews} from '../controllers/recruiter.controllers.js';
import jwtAuthMiddlewareRecruiter from '../middlewares/Recruiterjwt.middleware.js';
const recruiterRouter = express.Router();

recruiterRouter.post('/auth/signup', handleSignup);
recruiterRouter.post('/auth/login', handleSignin);
recruiterRouter.get('/profile',jwtAuthMiddlewareRecruiter, handleProfile );
recruiterRouter.get('/jobs/postings', jwtAuthMiddlewareRecruiter , handlemyJobPostings )
recruiterRouter.get('/jobs/:id/applications', jwtAuthMiddlewareRecruiter, handleJobApplications);
recruiterRouter.post('/jobs/:id/applications/:applicationId', jwtAuthMiddlewareRecruiter, handleJobReviews);

export default recruiterRouter;