import express from 'express';
import {loginAdmin } from '../controllers/adminAuth/adminAuthControllers.js';
import { getAllUsers, getAllAdmin, addUser,   updateUser,  deleteUser,  toggleUserStatus, addAdmin, updateAdmin, toggleAdminStatus, deleteAdmin} from '../controllers/adminAuth/adminAuthControllers.js';

const router = express.Router();
router.post('/login', loginAdmin);
router.get('/users/frontend', getAllUsers);  //fetching user list

router.get('/users/admin', getAllAdmin);     //fetching admin list
router.post('/users/admin', addUser);
router.put( '/users/admin/:id', updateUser);
router.patch('/users/admin/status/:id', toggleUserStatus);
router.delete('/users/admin/:id',deleteUser);

router.post('/users/admin', addAdmin); //  Use new function name
router.put( '/users/admin/:id', updateAdmin); //  Use new function name
router.patch('/users/admin/status/:id', toggleAdminStatus); //  Use new function name
router.delete('/users/admin/:id', deleteAdmin);

  
export default router;