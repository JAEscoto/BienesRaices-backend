import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  getPropertiesByUserId,
  getPropertyByCategoryId,
  getPropertyByPriceId,
  getPropertyByTitulo,
  getPropertiesByStatus,
  addProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertiesControllers.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.get('/user/:id', getPropertiesByUserId);
router.get('/category/:id', getPropertyByCategoryId);
router.get('/price/:id', getPropertyByPriceId);
router.get('/titulo/search', getPropertyByTitulo);
router.get('/tipo/status', getPropertiesByStatus);

router.post('/', addProperty);

router.patch('/:id', updateProperty);

router.delete('/:id', deleteProperty);

export default router;
