import express from 'express';
import {auth} from '../utils/auth.js';
import {updateUser, deleteUser, signout, getUser, getUsers} from '../controllers/userController.js'
const router = express.Router();

router.put('/update/:userid', auth, updateUser);
router.delete('/delete/:userid',auth, deleteUser);
router.post('/signout',signout);
router.get('/users', auth, getUsers);
router.get('/:userId', getUser);
export default router;