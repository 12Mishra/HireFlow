import express from 'express'
import { handleJobPosting, handleJobOpenings, handleSearchedJobs} from '../controllers/job.controllers.js';
import jwtAuthMiddlewareRecruiter from '../middlewares/Recruiterjwt.middleware.js';
import jwtAuthMiddlewareUser from '../middlewares/Userjwt.middleware.js';

const jobRouter=express.Router();

jobRouter.post('/addjob',jwtAuthMiddlewareRecruiter, handleJobPosting);
jobRouter.get('/jobopenings', jwtAuthMiddlewareUser, handleJobOpenings);
jobRouter.post('/jobopenings', jwtAuthMiddlewareUser, handleSearchedJobs);

export default jobRouter;

