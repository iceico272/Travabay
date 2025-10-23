import express from 'express';
import multer from 'multer';

import {getSubcategoryAboutBySlug, getAllSubcategories,addSubcategory,updateSubcategory, 
    deleteSubcategory } from '../controllers/adminAuth/subCategoryController.js';

const router = express.Router();
const sliderStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Make sure this folder exists
      cb(null, 'uploads/slider_files');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const sliderUpload = multer({ storage: sliderStorage });
  
  router.get('/subcategories', getAllSubcategories);//fetching sub category list
  // Add Subcategory with files
  router.post(
    '/subcategories', 
    sliderUpload.array('slider_files', 10), // accepts up to 10 files
    addSubcategory
  );
  // In adminRoutes.js
  router.get('/subcategories/about/:slug', getSubcategoryAboutBySlug); 
  router.put(
    '/subcategories/:id',
    sliderUpload.array('slider_files', 10),
    updateSubcategory
  );
  
  
  router.delete('/subcategories/:id',  deleteSubcategory);

  export default  router;