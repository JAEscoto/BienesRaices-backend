import express from 'express';
import { createPrice, deletePrice, getAllPrices, updatePrice } from '../controllers/pricesControllers.js';

const router = express.Router();

router.get('/', getAllPrices);
router.post('/', createPrice);
router.patch('/:id', updatePrice);
router.delete('/:id', deletePrice);

export default router;