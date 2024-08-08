import express from 'express';
import {signup, signin, googleFun} from '../controllers/authController.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',googleFun);

export default router;