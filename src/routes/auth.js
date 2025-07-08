import express from 'express';
const router = express.Router();

import {
  loginUser,
  registerUser,
  promoteToAdmin,
} from '../controllers/authController.js';
import { protect, isAdmin } from '../middlewares/auth.js';

//Public routes
router.post('/login', loginUser);

//Admin routes
router.route('/register').post(protect, isAdmin, registerUser);
router.route('/promote/:id').put(protect, isAdmin, promoteToAdmin);

//Example routes
router.get('/dashboard/admin', protect, isAdmin, (req, res) => {
  res.send('Welcome to the ADMIN dashboard');
});

router.get('/dashboard/staff', protect, (req, res) => {
  res.send(`Welcome to the STAFF dashboard, ${req.user.name}`);
});

export default router;