import express from 'express'
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoriesControllers.js'

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router;