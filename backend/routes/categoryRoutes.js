import express from 'express';
import { getAllCategories,addCategory, updateCategory, 
    deleteCategory} from '../controllers/adminAuth/categoryControllers.js';
const router = express.Router();


router.get('/categories', getAllCategories);     //fetching category list
router.post('/categories', addCategory);         //addcategories
router.put('/categories/:id', updateCategory );
router.delete('/categories/:id', deleteCategory);

export default router;