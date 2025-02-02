import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
  updateUser, // Import the updateUser controller
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);
router.patch('/:id', verifyToken, updateUser);

export default router;
