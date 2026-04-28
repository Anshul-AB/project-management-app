import express from 'express';
import { login, signUp, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup", signUp)
router.post("/verify-otp", verifyOTP)
router.post("/login", login)

export default router;
