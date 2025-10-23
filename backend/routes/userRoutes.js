import express from 'express';
import { registerUser, loginUser } from '../controllers/userAuth/userAuthControllers.js';
const router = express.Router();

// 1. Create a sub-router specifically for authentication routes
const authRouter = express.Router();

// 2. Define routes that only need /login and /register paths
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
router.use('/auth', authRouter); 


export default router;
 
