import express from 'express';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../controllers/adminAuth/countriesControllers.js';
const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // You must create this folder manually
      cb(null, 'uploads/country_files'); 
    },
    filename: (req, file, cb) => {
      // Save file with original name and timestamp to ensure uniqueness
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  // Create the multer instance
  const upload = multer({ storage: storage }); 
  router.get('/countries', getCountries);//fetching country list
  // Apply multer middleware before your controller function
  router.post('/countries',  upload.array('files', 10), addCountry);
  router.put('/countries/:id',upload.array('files', 10), updateCountry);
  router.delete('/countries/:id', deleteCountry); 
  
  export default router;