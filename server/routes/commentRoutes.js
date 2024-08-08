import express from 'express';
import {auth} from '../utils/auth.js'
import { createComment, getComments, likeComment, editComment, deleteComment, getAllComments } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create', auth, createComment);
router.get('/get-comments/:postId', getComments);
router.put('/likeComment/:commentId', auth, likeComment);
router.put('/editComment/:commentId', auth, editComment);
router.delete('/deleteComment/:commentId', auth, deleteComment);
router.get('/get-all-comments', auth, getAllComments);
export default router;