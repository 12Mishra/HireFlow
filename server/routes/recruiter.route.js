import express from 'express';
import { handleSignup , handleSignin, handleProfile } from '../controllers/recruiter.controllers.js';
import jwtAuthMiddleware from '../middlewares/Recruiterjwt.middleware.js';
const recruiterRouter = express.Router();

recruiterRouter.post('/auth/signup', handleSignup);
recruiterRouter.post('/auth/login', handleSignin);
recruiterRouter.get('/profile',jwtAuthMiddleware, handleProfile )
export default recruiterRouter;