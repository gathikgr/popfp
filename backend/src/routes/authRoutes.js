import { Router } from 'express';
import { adminSignup, login } from '../controllers/authController.js';

const router = Router();
router.post('/admin-signup', adminSignup);
router.post('/login', login);

export default router;
