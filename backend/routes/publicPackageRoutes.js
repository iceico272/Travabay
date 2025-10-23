import express from 'express';
import { getPublicPackages } from '../controllers/public/packagesController.js'; 
const router = express.Router();

router.get('/all', getPublicPackages); 

export default router;