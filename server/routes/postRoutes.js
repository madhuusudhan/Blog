import express from 'express';
import {auth} from '../utils/auth.js'
import { create, getPosts, deletePost, updatePost } from '../controllers/postConrtoller.js';
const router = express.Router();

router.post('/create', auth, create);
router.get('/getposts',getPosts);
router.delete('/delete/:postId/:userId', auth, deletePost);
router.put('/update/:postId/:userId', auth, updatePost);
export default router;