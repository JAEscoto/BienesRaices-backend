import express from 'express';
import { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    confirmarUser,
    // autenticarLogin
    // resetPassword
 } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById)
router.get('/confirmar-cuenta/:token', confirmarUser)

router.post('/', createUser);
// router.post('/forgot-password', resetPassword);

router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
