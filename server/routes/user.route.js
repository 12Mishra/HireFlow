import express from 'express';
import { handleUserSignup , handleUserSignin, handleProfile, handleDisplayJobs, handleJobApplicatiob } from '../controllers/user.controllers.js';
import jwtAuthMiddlewareUser from '../middlewares/Userjwt.middleware.js'

const userRouter = express.Router();

userRouter.post('/auth/signup', handleUserSignup);
userRouter.post('/auth/login', handleUserSignin);
userRouter.get('/profile', jwtAuthMiddlewareUser, handleProfile);
userRouter.get('/jobs/:id', jwtAuthMiddlewareUser, handleDisplayJobs);
userRouter.post('/jobs/:id/apply', jwtAuthMiddlewareUser, handleJobApplicatiob)
export default userRouter;