import express from 'express';
import { 
    getAllUsers,
    confirmarUser,
    autenticar,
    resetPassword,
    nuevoPassword,
    createUser,
    updateUser, 
    deleteUser, 
    getUserById 
 } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById)
router.get('/confirmar/:token', confirmarUser);

router.post('/', createUser);
router.post('/login', autenticar);
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', nuevoPassword);

router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
