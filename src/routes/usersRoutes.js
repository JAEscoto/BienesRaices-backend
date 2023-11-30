import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById)

router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
