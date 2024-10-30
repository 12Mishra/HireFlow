import express from 'express';
import { handleUserSignup , handleUserSignin, handleProfile } from '../controllers/user.controllers.js';
import jwtAuthMiddleware from '../middlewares/Userjwt.middleware.js'

const userRouter = express.Router();

userRouter.post('/auth/signup', handleUserSignup);
userRouter.post('/auth/login', handleUserSignin);
userRouter.get('/profile', jwtAuthMiddleware, handleProfile);

export default userRouter;