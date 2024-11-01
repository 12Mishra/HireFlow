import express from 'express'
import { handleJobPosting, handleJobOpenings, handleDisplayJobsAvailable } from '../controllers/job.controllers.js';
import jwtAuthMiddlewareRecruiter from '../middlewares/Recruiterjwt.middleware.js';
import jwtAuthMiddlewareUser from '../middlewares/Userjwt.middleware.js';

const jobRouter=express.Router();

jobRouter.get('/', jwtAuthMiddlewareUser, handleDisplayJobsAvailable)
jobRouter.post('/addjob',jwtAuthMiddlewareRecruiter, handleJobPosting);
jobRouter.get('/jobopenings', jwtAuthMiddlewareUser, handleJobOpenings);

export default jobRouter;

