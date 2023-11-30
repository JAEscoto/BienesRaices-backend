import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  // getPropertiesByUserId,
  addProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertiesControllers.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
// router.get('/user/:id', getPropertiesByUserId)

router.post('/', addProperty);

router.patch('/:id', updateProperty);

router.delete('/:id', deleteProperty)

export default router;
