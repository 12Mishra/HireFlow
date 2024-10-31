import express from 'express';
import { handleUserSignup , handleUserSignin, handleProfile, handleDisplayJobs, handleJobProfile, handleJobApplication } from '../controllers/user.controllers.js';
import jwtAuthMiddlewareUser from '../middlewares/Userjwt.middleware.js'

const userRouter = express.Router();

userRouter.post('/auth/signup', handleUserSignup);
userRouter.post('/auth/login', handleUserSignin);
userRouter.get('/profile', jwtAuthMiddlewareUser, handleProfile);
userRouter.post('/jobprofile',jwtAuthMiddlewareUser, handleJobProfile );
userRouter.get('/jobs/:id', jwtAuthMiddlewareUser, handleDisplayJobs);
userRouter.post('/jobs/:id/apply', jwtAuthMiddlewareUser, handleJobApplication)
export default userRouter;